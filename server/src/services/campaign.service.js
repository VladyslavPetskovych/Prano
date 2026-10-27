const crypto = require("crypto");
const {Types} = require("mongoose");

const {Campaign, CampaignLead, CampaignScan, User} = require("../models");
const {ApiError} = require("../errors");
const smsService = require("./sms.service");

// Повторне відкриття тим самим відвідувачем протягом цього часу не рахуємо (оновлення сторінки, подвійне сканування)
const REPEAT_VISIT_WINDOW_MS = 30 * 1000;
const STATS_TIMEZONE = "Europe/Kyiv";

const HOUR_MS = 60 * 60 * 1000;
const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_CODE_ATTEMPTS = 5;
// Обмеження, щоб сторінку не використали для розсилки SMS за наш рахунок
const MAX_CODES_PER_PHONE_PER_HOUR = 5;
const MAX_PHONES_PER_IP_PER_HOUR = 5;

const VERIFICATION_FIELDS = ["code", "expiresAt", "attempts", "sentCount", "windowStartedAt", "lastSentAt"]
    .map((field) => `+verification.${field}`)
    .join(" ");

const hash = (value) => crypto.createHash("sha256").update(value).digest("hex").slice(0, 32);

const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40);

// Приводимо українські номери до вигляду +380XXXXXXXXX
const normalizePhone = (phone) => {
    let digits = phone.replace(/\D/g, "");
    if (digits.length === 10 && digits.startsWith("0")) digits = `38${digits}`;
    if (digits.length === 11 && digits.startsWith("80")) digits = `3${digits}`;

    if (!/^380\d{9}$/.test(digits)) {
        throw new ApiError("Вкажіть український номер у форматі +380XXXXXXXXX", 400)
    }

    return `+${digits}`
};

class CampaignService {
    async findAll() {
        return await Campaign.find().sort({createdAt: -1})
    }

    async create(data) {
        try {
            const base = [slugify(data.name), slugify(data.promoCode)].filter(Boolean).join("-") || "promo";

            let slug;
            do {
                slug = `${base}-${crypto.randomBytes(2).toString("hex")}`
            } while (await Campaign.exists({slug}))

            return await Campaign.create({...data, slug})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async updateById(id, data) {
        return await Campaign.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        try {
            await Promise.all([
                CampaignScan.deleteMany({_campaignId: id}),
                CampaignLead.deleteMany({_campaignId: id}),
            ])
            await Campaign.deleteOne({_id: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    // Промокод не віддаємо, доки номер не підтверджено
    toPublic(campaign) {
        const {slug, title, description} = campaign;

        return {slug, title, description}
    }

    async findLeads(id) {
        return await CampaignLead.find({_campaignId: id}).sort({createdAt: -1})
    }

    async recordVisit(campaign, {visitorId, source}, fallbackKey) {
        try {
            const visitor = visitorId || hash(fallbackKey);

            const recentVisit = await CampaignScan.exists({
                _campaignId: campaign._id,
                visitorId: visitor,
                createdAt: {$gte: new Date(Date.now() - REPEAT_VISIT_WINDOW_MS)},
            });
            if (recentVisit) {
                return
            }

            const isNewVisitor = !(await CampaignScan.exists({_campaignId: campaign._id, visitorId: visitor}));

            await CampaignScan.create({_campaignId: campaign._id, visitorId: visitor, source})
            await Campaign.updateOne({_id: campaign._id}, {
                $inc: {
                    views: 1,
                    qrScans: source === "qr" ? 1 : 0,
                    uniqueVisitors: isNewVisitor ? 1 : 0,
                },
                $set: {lastVisitAt: new Date()},
            })
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async sendCode(campaign, {phone, visitorId, source}, ipKey) {
        try {
            const normalizedPhone = normalizePhone(phone);
            const ipHash = hash(ipKey);
            const now = Date.now();

            const phonesFromIp = await CampaignLead.countDocuments({
                "verification.ipHash": ipHash,
                "verification.lastSentAt": {$gte: new Date(now - HOUR_MS)},
                phone: {$ne: normalizedPhone},
            });
            if (phonesFromIp >= MAX_PHONES_PER_IP_PER_HOUR) {
                throw new ApiError("Забагато запитів. Спробуйте пізніше", 429)
            }

            const lead = await CampaignLead
                .findOne({_campaignId: campaign._id, phone: normalizedPhone})
                .select(VERIFICATION_FIELDS);
            const verification = lead?.verification || {};

            if (verification.lastSentAt && now - verification.lastSentAt < RESEND_COOLDOWN_MS) {
                throw new ApiError("Код уже надіслано. Повторно можна через хвилину", 429)
            }

            const isNewWindow = !verification.windowStartedAt || now - verification.windowStartedAt >= HOUR_MS;
            const sentCount = isNewWindow ? 0 : verification.sentCount;
            if (sentCount >= MAX_CODES_PER_PHONE_PER_HOUR) {
                throw new ApiError("Забагато запитів коду. Спробуйте за годину", 429)
            }

            const code = String(crypto.randomInt(1000, 10000));
            await smsService.send(now, normalizedPhone, `Ваш код підтвердження Prano:\n${code}`)

            await CampaignLead.updateOne(
                {_campaignId: campaign._id, phone: normalizedPhone},
                {
                    $set: {
                        "verification.code": code,
                        "verification.expiresAt": new Date(now + CODE_TTL_MS),
                        "verification.attempts": 0,
                        "verification.sentCount": sentCount + 1,
                        "verification.windowStartedAt": isNewWindow ? new Date(now) : verification.windowStartedAt,
                        "verification.lastSentAt": new Date(now),
                        "verification.ipHash": ipHash,
                    },
                    $setOnInsert: {source, visitorId: visitorId || ""},
                },
                {upsert: true},
            )

            return {phone: normalizedPhone}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async verifyCode(campaign, {phone, code}) {
        try {
            const normalizedPhone = normalizePhone(phone);

            const lead = await CampaignLead
                .findOne({_campaignId: campaign._id, phone: normalizedPhone})
                .select(VERIFICATION_FIELDS);
            const verification = lead?.verification;

            if (!verification?.code || verification.expiresAt < new Date()) {
                throw new ApiError("Код застарів. Надішліть новий", 400)
            }
            if (verification.attempts >= MAX_CODE_ATTEMPTS) {
                throw new ApiError("Забагато невдалих спроб. Надішліть новий код", 429)
            }
            if (verification.code !== code) {
                await CampaignLead.updateOne({_id: lead._id}, {$inc: {"verification.attempts": 1}})
                throw new ApiError("Невірний код", 400)
            }

            const isExistingUser = !!(await User.exists({phone: normalizedPhone}));
            await CampaignLead.updateOne(
                {_id: lead._id},
                {$unset: {"verification.code": "", "verification.expiresAt": ""}},
            )

            // Атомарно, щоб паралельні запити не порахували номер двічі
            const firstVerification = await CampaignLead.findOneAndUpdate(
                {_id: lead._id, verified: false},
                {verified: true, verifiedAt: new Date(), isExistingUser},
            );
            if (firstVerification) {
                await Campaign.updateOne({_id: campaign._id}, {$inc: {verifiedPhones: 1}})
            }

            const smsSent = await this.sendPromoSms(campaign, lead._id, normalizedPhone);

            return {promoCode: campaign.promoCode, smsSent}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    // Промокод надсилаємо в SMS один раз на номер. Збій SMS не заважає показати код на сторінці
    async sendPromoSms(campaign, leadId, phone) {
        const claimed = await CampaignLead.findOneAndUpdate(
            {_id: leadId, promoSmsSentAt: null},
            {promoSmsSentAt: new Date()},
        );
        if (!claimed) {
            return true
        }

        try {
            await smsService.send(
                Date.now(),
                phone,
                `Ваш промокод Prano: ${campaign.promoCode}\nНазвіть його при оформленні замовлення.`,
            )
            return true
        } catch (e) {
            console.error(`Promo SMS failed for campaign ${campaign.slug}:`, e.message)
            await CampaignLead.updateOne({_id: leadId}, {promoSmsSentAt: null})
            return false
        }
    }

    async getStats(id, days) {
        try {
            const from = new Date(Date.now() - days * 24 * HOUR_MS);
            const campaignId = new Types.ObjectId(id);
            const toDay = (field) => ({$dateToString: {format: "%Y-%m-%d", date: field, timezone: STATS_TIMEZONE}});

            const [scans, leads] = await Promise.all([
                CampaignScan.aggregate([
                    {$match: {_campaignId: campaignId, createdAt: {$gte: from}}},
                    {
                        $group: {
                            _id: toDay("$createdAt"),
                            qrScans: {$sum: {$cond: [{$eq: ["$source", "qr"]}, 1, 0]}},
                            views: {$sum: 1},
                            visitors: {$addToSet: "$visitorId"},
                        }
                    },
                    {$project: {qrScans: 1, views: 1, uniqueVisitors: {$size: "$visitors"}}},
                ]),
                CampaignLead.aggregate([
                    {$match: {_campaignId: campaignId, verifiedAt: {$gte: from}}},
                    {$group: {_id: toDay("$verifiedAt"), verifiedPhones: {$sum: 1}}},
                ]),
            ]);

            const byDate = {};
            const emptyDay = {qrScans: 0, views: 0, uniqueVisitors: 0, verifiedPhones: 0};
            [...scans, ...leads].forEach(({_id: date, ...values}) => {
                byDate[date] = {...emptyDay, ...byDate[date], ...values, date}
            });

            return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date))
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new CampaignService()
