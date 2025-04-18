const path = require("path");
const fs = require("fs");

const {Post} = require("../models");
const {ApiError} = require("../errors");
const {QueryParser} = require("../utils");

class PostService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {page = 1, limit = 10, sortedBy = "createdAt", ...searchObject} = queryObj;
            const skip = +limit * (+page - 1)

            const [posts, postsTotalCount, postsSearchCount] = await Promise.all([
                Post.find(searchObject).sort(sortedBy).limit(+limit).skip(skip),
                Post.countDocuments(),
                Post.countDocuments(searchObject),
            ]);

            return {
                page: +page,
                perPage: +limit,
                itemsCount: postsTotalCount,
                itemsFound: postsSearchCount,
                data: posts
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async create(data, files) {
        try {
            const createdPost = await Post.create(data);

            if (!files.length) {
                return createdPost
            }

            const directoryPath = path.join(__dirname, `../../images/postImages/${createdPost._id}`)
            fs.mkdirSync(directoryPath, {recursive: true})

            const imagePaths = files.map(file => {
                const newFilePath = path.join(directoryPath, file.filename)
                fs.renameSync(file.path, newFilePath)

                return `${createdPost._id}/${file.filename}`
            });

            return await Post.findOneAndUpdate({_id: createdPost._id}, {images: imagePaths}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        return await Post.findById(id)
    }

    async updateById(id, data) {
        return await Post.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        try {
            const imgPath = path.join(__dirname, `../../images/postImages/${id}`)
            fs.rmSync(imgPath, {recursive: true, force: true})

            await Post.deleteOne({_id: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async addImagesToPost(id, files) {
        try {
            if (!files.length) {
                throw new ApiError("No images provided", 400)
            }

            const imgPath = path.join(__dirname, `../../images/postImages/${id}`)
            fs.mkdirSync(imgPath, {recursive: true})

            const imagePaths = files.map(file => {
                const newFilePath = path.join(imgPath, file.filename)
                fs.renameSync(file.path, newFilePath)

                return `${id}/${file.filename}`
            });

            return await Post.findOneAndUpdate({_id: id}, {$push: {images: imagePaths}}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async deleteImageFromPost(id, filePath) {
        try {
            const imgPath = path.join(__dirname, `../../images/postImages/${filePath}`)
            fs.unlinkSync(imgPath)

            return await Post.findOneAndUpdate({_id: id}, {$pull: {images: filePath}}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new PostService()