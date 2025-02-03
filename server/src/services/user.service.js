const {User} = require("../models");

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

    async deleteById(id) {
        return await User.deleteOne({_id: id})
    }
}

module.exports = new UserService()