const jwt = require("jsonwebtoken");

const {configs} = require("../configs");
const {ApiError} = require("../errors");

class TokenService {
    generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN})
        const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN})

        return {
            accessToken,
            refreshToken
        }
    }

    checkAccessToken(token) {
        try {
            return jwt.verify(token, configs.JWT_ACCESS_SECRET)
        } catch (e) {
            throw new ApiError("Token not valid", 401)
        }
    }
}

module.exports = new TokenService()