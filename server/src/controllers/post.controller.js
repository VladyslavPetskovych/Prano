const {postService} = require("../services");

class PostController {
    async findAll(req, res, next) {
        try {
            const posts = await postService.findAll();

            return res.json(posts)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {postId} = req.params;
            const post = await postService.findById(postId);

            return res.json(post)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController()