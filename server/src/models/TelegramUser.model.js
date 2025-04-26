const {Schema, Types, model} = require("mongoose");

const User = require("./User.model");

const telegramUserSchema = new Schema(
    {
        _userId: {
            type: Types.ObjectId,
            required: true,
            ref: User,
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