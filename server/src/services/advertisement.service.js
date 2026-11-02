const fs = require("fs");

const {Advertisement, AdvertisementView, TelegramBroadcast, TelegramUser} = require("../models");
const {ApiError} = require("../errors");
const path = require("path");
const crypto = require("crypto");
const axios = require("axios");

// Повторне відкриття тим самим відвідувачем протягом цього часу не рахуємо
const REPEAT_VIEW_WINDOW_MS = 30 * 1000;
const BROADCASTS_LIMIT = 20;

const hash = (value) => crypto.createHash("sha256").update(value).digest("hex").slice(0, 32);

class AdvertisementService {
    async findAll() {
        return await Advertisement.find()
    }

    async create(data, file) {
        try {
            const oldAdvertisement = await Advertisement.findOne({});
            // Нова пропозиція — статистика переглядів з нуля
            if (oldAdvertisement) {
                await AdvertisementView.deleteMany({_advertisementId: oldAdvertisement._id})
            }

            const createdAdvertisement = await Advertisement.findOneAndReplace({}, data, {
                upsert: true,
                returnNewDocument: true
            });

            if (!file) {
                return createdAdvertisement
            }

            if (oldAdvertisement && oldAdvertisement.image) {
                const oldFilePath = path.join(__dirname, `../../images/advertisementImages/${oldAdvertisement.image}`);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            const directoryPath = path.join(__dirname, `../../images/advertisementImages/${createdAdvertisement._id}`)
            fs.mkdirSync(directoryPath, {recursive: true})

            const newFilePath = path.join(directoryPath, file.filename)
            fs.renameSync(file.path, newFilePath)
            const imgPath = `${createdAdvertisement._id}/${file.filename}`

            return await Advertisement.findOneAndUpdate({_id: createdAdvertisement._id}, {image: imgPath}, {returnDocument: "after"})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        return await Advertisement.findById(id)
    }

    async updateById(id, data) {
        return await Advertisement.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        try {
            const imgPath = path.join(__dirname, `../../images/advertisementImages/${id}`)
            fs.rmSync(imgPath, {recursive: true, force: true})

            await Advertisement.deleteOne({_id: id})
            await AdvertisementView.deleteMany({_advertisementId: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async addImageToAdvertisement(id, file) {
        try {
            if (!file) {
                throw new ApiError("No images provided", 400)
            }

            const advertisement = await Advertisement.findById(id);
            if (advertisement.image && advertisement.image.length !== 0) {
                const imgPath = path.join(__dirname, `../../images/advertisementImages/${advertisement.image}`)
                fs.unlinkSync(imgPath)
            }

            const directoryPath = path.join(__dirname, `../../images/advertisementImages/${id}`)
            fs.mkdirSync(directoryPath, {recursive: true})

            const newFilePath = path.join(directoryPath, file.filename)
            fs.renameSync(file.path, newFilePath)
            const imgPath = `${id}/${file.filename}`

            return await Advertisement.findOneAndUpdate({_id: id}, {image: imgPath}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async deleteImageFromAdvertisement(id) {
        try {
            const imgPath = path.join(__dirname, `../../images/advertisementImages/${id}`)
            fs.rmSync(imgPath, {recursive: true, force: true})

            return await Advertisement.findOneAndUpdate({_id: id}, {image: ""}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async recordView(id, {visitorId}, fallbackKey) {
        try {
            const visitor = visitorId || hash(fallbackKey);

            const recentView = await AdvertisementView.exists({
                _advertisementId: id,
                visitorId: visitor,
                createdAt: {$gte: new Date(Date.now() - REPEAT_VIEW_WINDOW_MS)},
            });
            if (recentView) {
                return
            }

            const isNewViewer = !(await AdvertisementView.exists({_advertisementId: id, visitorId: visitor}));

            await AdvertisementView.create({_advertisementId: id, visitorId: visitor})
            await Advertisement.updateOne({_id: id}, {
                $inc: {views: 1, uniqueViewers: isNewViewer ? 1 : 0},
                $set: {lastViewAt: new Date()},
            })
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async sendMessage(id, userId) {
        const advertisementToSend = await Advertisement.findById(id);

        const broadcast = {
            _advertisementId: advertisementToSend._id,
            _userId: userId || null,
            title: advertisementToSend.title,
            withImage: Boolean(advertisementToSend.image),
        };
        const startedAt = Date.now();

        try {
            const {data} = await axios.post("http://tgbot:3333/send", advertisementToSend);
            const result = data && typeof data === "object" ? data : {};

            return await TelegramBroadcast.create({
                ...broadcast,
                status: "done",
                total: result.total || 0,
                sent: result.sent || 0,
                failed: result.failed || 0,
                blocked: result.blocked || 0,
                durationMs: Date.now() - startedAt,
            })
        } catch (e) {
            const status = axios.isAxiosError(e) ? e.response?.status || 500 : e.status;
            const message = (axios.isAxiosError(e) && e.response?.data?.message) || e.message;

            await TelegramBroadcast.create({
                ...broadcast,
                status: "error",
                error: message,
                durationMs: Date.now() - startedAt,
            }).catch(() => {})

            throw new ApiError(message, status);
        }
    }

    async getStats() {
        try {
            const [subscribers, advertisements, broadcasts, totals] = await Promise.all([
                TelegramUser.countDocuments({chatId: {$exists: true, $ne: null}}),
                Advertisement.find().select("title views uniqueViewers lastViewAt createdAt"),
                TelegramBroadcast.find()
                    .sort({createdAt: -1})
                    .limit(BROADCASTS_LIMIT)
                    .populate("_userId", "name email"),
                TelegramBroadcast.aggregate([
                    {
                        $group: {
                            _id: null,
                            broadcasts: {$sum: 1},
                            sent: {$sum: "$sent"},
                            failed: {$sum: "$failed"},
                            lastSentAt: {$max: "$createdAt"},
                        },
                    },
                    {$project: {_id: 0}},
                ]),
            ]);

            return {
                subscribers,
                advertisements,
                telegram: totals[0] || {broadcasts: 0, sent: 0, failed: 0, lastSentAt: null},
                broadcasts,
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new AdvertisementService()