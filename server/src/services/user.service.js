const {User, Action} = require("../models");
const {UserEnum: {EUserStatus, EUserRole}} = require("../enums");
const {ApiError} = require("../errors");

class UserService {
    async findAll() {
        return await User.find()
    }

    async findById(id) {
        return await User.findById(id);
    }

    async updateById(id, data) {
        return await User.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"});
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