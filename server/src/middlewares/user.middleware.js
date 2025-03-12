const {User} = require("../models");
const {ApiError} = require("../errors");
const {UserEnum: {EUserRole}} = require("../enums");
const {EUserStatus} = require("../enums/user.enum");


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

    isUserExistByReqParams(idField) {
        return async (req, res, next) => {
            try {
                const user = await User.findById(req.params[idField]);
                if (!user) {
                    throw new ApiError("User not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }

    checkUserRights(idField = null) {
        return async (req, res, next) => {
            try {
                const {id: userId} = res.locals.tokenPayload;
                const user = await User.findById(userId);

                if (user.role === EUserRole.ADMIN) {
                    return next()
                }

                if (idField && userId === req.params[idField]) {
                    return next()
                }

                throw new ApiError("User has no rights to view this", 403)
            } catch (e) {
                next(e)
            }
        }
    }

    async isUserInactive(req, res, next) {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user.status === EUserStatus.ACTIVE) {
                throw new ApiError("User already has been activated", 400)
            } else if (user.status === EUserStatus.BANNED) {
                throw new ApiError("Can not activate banned user", 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    }

    async isUserActive(req, res, next) {
        try {
            const {id: userId} = res.locals.tokenPayload;
            const user = await User.findById(userId);
            if (user.status !== EUserStatus.ACTIVE) {
                throw new ApiError("User is not active", 400)
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserMiddleware()