const {ApiError} = require("../errors");
const {UserEnum: {EUserStatus}} = require("../enums");
const {TelegramUser, User} = require("../models");
const {QueryParser} = require("../utils");

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

            return await User.findById(user._id)
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findUsers(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {page = 1, limit = 10, sortedBy = "createdAt", ...searchObject} = queryObj;
            const skip = +limit * (+page - 1)

            const [users, usersTotalCount, usersSearchCount] = await Promise.all([
                TelegramUser.find(searchObject).sort(sortedBy).limit(+limit).skip(skip),
                TelegramUser.countDocuments(),
                TelegramUser.countDocuments(searchObject),
            ])

            return {
                page: +page,
                perPage: +limit,
                itemsCount: usersTotalCount,
                itemsFound: usersSearchCount,
                data: users
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new TelegramService()