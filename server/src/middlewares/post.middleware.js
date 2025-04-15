const {Post} = require("../models");
const {ApiError} = require("../errors");

class PostMiddleware {
    isPostExist(idField) {
        return async (req, res, next) => {
            try {
                const post = await Post.findById(req.params[idField]);
                if (!post) {
                    throw new ApiError("Post not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new PostMiddleware()