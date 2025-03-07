const {User, Action} = require("../models");
const {UserEnum: {EUserStatus, EUserRole}} = require("../enums");
const {ApiError} = require("../errors");
const {QueryParser} = require("../utils");
const ccService = require("./cc.service");

class UserService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {page = 1, limit = 10, sortedBy = "createdAt", ...searchObject} = queryObj;
            const skip = +limit * (+page - 1)

            const [users, usersTotalCount, usersSearchCount] = await Promise.all([
                User.find(searchObject).sort(sortedBy).limit(+limit).skip(skip),
                User.countDocuments(),
                User.countDocuments(searchObject),
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

    async findById(id) {
        return await User.findById(id);
    }

    async updateById(id, data) {
        try {
            const updatedUser = await User.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"});
            if (updatedUser.status === EUserStatus.ACTIVE) {
                await ccService.updateCustomer(updatedUser.ccId, {
                    customerName: updatedUser.name,
                    customerTel: updatedUser.phone
                })
            }

            return updatedUser;
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async banById(id) {
        try {
            const userToBan = await User.findById(id);
            if (userToBan.role === EUserRole.ADMIN) {
                throw new ApiError("You can not ban another admin", 400)
            }

            await Promise.all([
                Action.deleteMany({_userId: id}),
                User.updateOne({_id: id}, {status: EUserStatus.BANNED})
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async setAdmin(id) {
        await User.updateOne({_id: id}, {role: EUserRole.ADMIN});
    }
}

module.exports = new UserService()