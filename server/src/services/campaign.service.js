const crypto = require("crypto");
const {Types} = require("mongoose");

const {Campaign, CampaignScan} = require("../models");
const {ApiError} = require("../errors");

// Повторне відкриття тим самим відвідувачем протягом цього часу не рахуємо (оновлення сторінки, подвійне сканування)
const REPEAT_VISIT_WINDOW_MS = 30 * 1000;
const STATS_TIMEZONE = "Europe/Kyiv";

const slugify = (value) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40);

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
            await CampaignScan.deleteMany({_campaignId: id})
            await Campaign.deleteOne({_id: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    toPublic(campaign) {
        const {slug, promoCode, title, description} = campaign;

        return {slug, promoCode, title, description}
    }

    async recordVisit(campaign, {visitorId, source}, fallbackKey) {
        try {
            const visitor = visitorId || crypto.createHash("sha256").update(fallbackKey).digest("hex").slice(0, 32);

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

    async getStats(id, days) {
        try {
            const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

            return await CampaignScan.aggregate([
                {$match: {_campaignId: new Types.ObjectId(id), createdAt: {$gte: from}}},
                {
                    $group: {
                        _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt", timezone: STATS_TIMEZONE}},
                        qrScans: {$sum: {$cond: [{$eq: ["$source", "qr"]}, 1, 0]}},
                        views: {$sum: 1},
                        visitors: {$addToSet: "$visitorId"},
                    }
                },
                {$project: {_id: 0, date: "$_id", qrScans: 1, views: 1, uniqueVisitors: {$size: "$visitors"}}},
                {$sort: {date: 1}},
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new CampaignService()
