const {User, Action} = require("../models");
const {UserEnum: {EUserStatus}} = require("../enums");

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
        await Promise.all([
            Action.deleteMany({_userId: id}),
            User.updateOne({_id: id}, {status: EUserStatus.BANNED})
        ])
    }
}

module.exports = new UserService()