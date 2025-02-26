const {postService} = require("../services");

class PostController {
    async findAll(req, res, next) {
        try {
            const data = await postService.findAllWithPagination(req.query);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const createdPost = await postService.create(req.body, req.files);

            return res.json(createdPost)
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

    async updateById(req, res, next) {
        try {
            const {postId} = req.params;
            const updatedPost = await postService.updateById(postId, req.body);

            return res.json(updatedPost)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {postId} = req.params;
            await postService.deleteById(postId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async addImages(req, res, next) {
        try {
            const {postId} = req.params;
            const updatedPost = await postService.addImagesToPost(postId, req.files);

            return res.json(updatedPost)
        } catch (e) {
            next(e)
        }
    }

    async deleteImage(req, res, next) {
        try {
            const {postId} = req.params;
            const {image} = req.body;
            const updatedPost = await postService.deleteImageFromPost(postId, image);

            return res.json(updatedPost)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController()