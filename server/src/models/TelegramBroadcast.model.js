const {Schema, model} = require("mongoose");

// Журнал розсилок пропозицій у Телеграм
const telegramBroadcastSchema = new Schema(
    {
        _advertisementId: {
            type: Schema.Types.ObjectId,
            ref: "advertisement",
            required: true,
        },
        _userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            default: null,
        },
        // Знімок назви, бо пропозицію потім можуть змінити або видалити
        title: {
            type: String,
            required: true,
        },
        withImage: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["done", "error"],
            required: true,
        },
        error: {
            type: String,
            default: null,
        },
        total: {
            type: Number,
            default: 0,
        },
        sent: {
            type: Number,
            default: 0,
        },
        failed: {
            type: Number,
            default: 0,
        },
        blocked: {
            type: Number,
            default: 0,
        },
        durationMs: {
            type: Number,
            default: 0,
        },
    },
    {
        versionKey: false,
        timestamps: {createdAt: true, updatedAt: false},
    },
)

telegramBroadcastSchema.index({createdAt: -1})

module.exports = model("telegramBroadcast", telegramBroadcastSchema)
