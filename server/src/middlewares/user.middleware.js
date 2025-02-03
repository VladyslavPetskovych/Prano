const {User} = require("../models");
const {ApiError} = require("../errors");


class UserMiddleware {
    findAndThrowByReqBody(field) {
        return async (req, res, next) => {
            try {
                const user = await User.findOne({[field]: req.body[field]});

                if (user) {
                    throw new ApiError(`User with this ${field} already exist`, 409)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }

    isUserExistByReqBody(field) {
        return async (req, res, next) => {
            try {
                const user = await User.findOne({[field]: req.body[field]}).select("+password");
                if (!user) {
                    throw new ApiError("User not found", 404)
                }

                res.locals.user = user
                next()
            } catch (e) {
                next(e)
            }
        }
    }

    isUserExistByReqParams(field) {
        return async (req, res, next) => {
            try {
                const user = await User.findById(req.params[field]);
                if (!user) {
                    throw new ApiError("User not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new UserMiddleware()