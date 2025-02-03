const {ApiError} = require("../errors");
const {tokenService} = require("../services");
const {Token} = require("../models");

class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");

            if(!accessToken) {
                throw new ApiError("No access token", 401)
            }

            const payload = tokenService.checkAccessToken(accessToken)

            const entity = await Token.findOne({accessToken});
            if(!entity) {
                throw new ApiError("Access token is not valid", 401)
            }

            res.locals.tokenPayload = payload

            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthMiddleware()