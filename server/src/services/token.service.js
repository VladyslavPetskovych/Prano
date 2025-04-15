const jwt = require("jsonwebtoken");

const {configs} = require("../configs");
const {ApiError} = require("../errors");
const {TokenEnum: {ETokenType, EActionTokenType}} = require("../enums");

class TokenService {
    generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN})
        const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN})

        return {
            accessToken,
            refreshToken
        }
    }

    checkToken(token, type) {
        try {
            let secret;

            switch (type) {
                case ETokenType.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET
                    break
                case ETokenType.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET
                    break
            }

            return jwt.verify(token, secret)
        } catch (e) {
            throw new ApiError("Token not valid or expired", 401)
        }
    }

    generateActionToken(payload, type) {
        let secret, expiresIn;

        switch (type) {
            case EActionTokenType.ACTIVATE:
                secret = configs.JWT_ACTIVATE_SECRET
                expiresIn = configs.JWT_ACTIVATE_EXPIRES_IN
                break
            case EActionTokenType.FORGOT_PASSWORD:
                secret = configs.JWT_FORGOT_SECRET
                expiresIn = configs.JWT_FORGOT_EXPIRES_IN
                break
        }

        return jwt.sign(payload, secret, {expiresIn})
    }

    checkActionToken(token, type) {
        try {
            let secret;

            switch (type) {
                case EActionTokenType.ACTIVATE:
                    secret = configs.JWT_ACTIVATE_SECRET
                    break
                case EActionTokenType.FORGOT_PASSWORD:
                    secret = configs.JWT_FORGOT_SECRET
                    break
            }

            return jwt.verify(token, secret)
        } catch (e) {
            throw new ApiError("Token not valid or expired", 401)
        }
    }
}

module.exports = new TokenService()