const {Post} = require("../models");

class PostService {
    async findAll() {
        return await Post.find()
    }

    async create(data) {
        return await Post.create(data)
    }

    async findById(id) {
        return await Post.findById(id)
    }

    async updateById(id, data) {
        return await Post.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        return await Post.deleteOne({_id: id})
    }
}

module.exports = new PostService()