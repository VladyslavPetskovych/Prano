const {ApiError} = require("../errors");
const {tokenService, telegramService} = require("../services");
const {Token, Action, TelegramUser} = require("../models");
const {TokenEnum: {ETokenType}} = require("../enums");

class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");

            if (!accessToken) {
                throw new ApiError("No access token", 401)
            }

            const payload = tokenService.checkToken(accessToken, ETokenType.ACCESS)

            const entity = await Token.findOne({accessToken});
            if (!entity) {
                throw new ApiError("Access token is not valid", 401)
            }

            res.locals.tokenPayload = {id: payload.id}

            next()
        } catch (e) {
            next(e)
        }
    }

    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");

            if (!refreshToken) {
                throw new ApiError("No refresh token", 401)
            }

            const payload = tokenService.checkToken(refreshToken, ETokenType.REFRESH)

            const entity = await Token.findOne({refreshToken});
            if (!entity) {
                throw new ApiError("Refresh token is not valid", 401)
            }

            res.locals.oldTokenPair = entity
            res.locals.tokenPayload = {id: payload.id}

            next()
        } catch (e) {
            next(e)
        }
    }

    checkActionToken(tokenType) {
        return async (req, res, next) => {
            try {
                const actionToken = req.params.token

                if (!actionToken) {
                    throw new ApiError("Token is not provided", 400)
                }

                const payload = tokenService.checkActionToken(actionToken, tokenType)

                const entity = await Action.findOne({actionToken});
                if (!entity) {
                    throw new ApiError("Action token is not valid", 401)
                }

                res.locals.token = entity
                res.locals.tokenPayload = {id: payload.id}

                next()
            } catch (e) {
                next(e)
            }
        }
    }

    async checkChatId(req, res, next) {
        try {
            const chatId = req.get("Authorization");

            if (!chatId) {
                throw new ApiError("No chat id", 401)
            }

            const entity = await TelegramUser.findOne({chatId: chatId});
            if (!entity) {
                throw new ApiError("Chat id not valid", 401)
            }

            res.locals.userId = entity._userId

            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthMiddleware()