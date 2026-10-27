const {Schema, model} = require("mongoose");

const campaignSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        promoCode: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            default: "",
            trim: true,
        },
        description: {
            type: String,
            default: "",
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        // Відкриття сторінки через QR-код (посилання з ?src=qr)
        qrScans: {
            type: Number,
            default: 0,
        },
        // Усі відкриття сторінки (QR + пряме посилання)
        views: {
            type: Number,
            default: 0,
        },
        // Унікальні відвідувачі (за visitorId)
        uniqueVisitors: {
            type: Number,
            default: 0,
        },
        // Номери, які пройшли підтвердження через SMS
        verifiedPhones: {
            type: Number,
            default: 0,
        },
        lastVisitAt: {
            type: Date,
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

module.exports = model("campaign", campaignSchema)
