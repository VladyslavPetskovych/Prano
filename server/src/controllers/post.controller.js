const path = require("path");
const fs = require("fs");

const {postService} = require("../services");
const {ApiError} = require("../errors");

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
            const createdPost = await postService.create(req.body);

            const imgPath = path.join(__dirname, `../../postImages/${createdPost._id}`)
            fs.mkdirSync(imgPath, {recursive: true})

            if (!req.files.length) {
                return res.json(createdPost)
            }

            const imagePaths = req.files.map(file => {
                const newFilePath = path.join(imgPath, file.filename)
                fs.renameSync(file.path, newFilePath)

                return `${createdPost._id}/${file.filename}`
            });

            const updatedPost = await postService.updateById(createdPost._id, {images: imagePaths});

            return res.json(updatedPost)
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
            const imgPath = path.join(__dirname, `../../postImages/${postId}`)
            fs.rmSync(imgPath, {recursive: true, force: true})
            await postService.deleteById(postId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async addImages(req, res, next) {
        try {
            const {postId} = req.params;
            const post = await postService.findById(postId);

            const imgPath = path.join(__dirname, `../../postImages/${post._id}`)
            fs.mkdirSync(imgPath, {recursive: true})

            if (!req.files.length) {
                throw new ApiError("No images provided", 400)
            }

            const imagePaths = req.files.map(file => {
                const newFilePath = path.join(imgPath, file.filename)
                fs.renameSync(file.path, newFilePath)

                return `${post._id}/${file.filename}`
            });

            const updatedPost = await postService.updateById(post._id, {$push: {images: imagePaths}});

            return res.json(updatedPost)
        } catch (e) {
            next(e)
        }
    }

    async deleteImage(req, res, next) {
        try {
            const {postId} = req.params;
            const {image} = req.body;

            const imgPath = path.join(__dirname, `../../postImages/${image}`)
            fs.rmSync(imgPath, {recursive: true, force: true})

            const updatedPost = await postService.updateById(postId, {$pull: {images: image}});

            return res.json(updatedPost)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController()