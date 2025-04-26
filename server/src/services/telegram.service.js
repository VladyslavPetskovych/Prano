const {ApiError} = require("../errors");
const {UserEnum: {EUserStatus}} = require("../enums");
const {TelegramUser} = require("../models");

class TelegramService {
    async login(credentials, user) {
        try {
            if (user.status === EUserStatus.INACTIVE) {
                throw new ApiError("User not activated", 403)
            }

            const entity = await TelegramUser.findOne({_userId: user._id});
            if (entity) {
                await TelegramUser.findOneAndUpdate({_userId: user._id}, {chatId: credentials.chatId})
            } else {
                await TelegramUser.create({chatId: credentials.chatId, _userId: user.id})
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new TelegramService()