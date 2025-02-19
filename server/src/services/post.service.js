const {Post} = require("../models");

class PostService {
    async findAll() {
        return await Post.find()
    }

    async findById(id) {
        return await Post.findById(id)
    }
}

module.exports = new PostService()