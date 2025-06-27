const {Schema, Types, model} = require("mongoose");

const telegramUserSchema = new Schema(
    {
        _userId: {
            type: Types.ObjectId,
            required: true,
            unique: true
        },
        chatId: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("telegramUser", telegramUserSchema)