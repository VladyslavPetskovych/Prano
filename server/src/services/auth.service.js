const passwordService = require("./password.service");
const {User, Token} = require("../models");
const {ApiError} = require("../errors");
const tokenService = require("./token.service");

class AuthService {
    async register(data) {
        try {
            const hashedPassword = await passwordService.hash(data.password);

            await User.create({...data, password: hashedPassword})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async login(credentials, user) {
        try {
            const isMatched = await passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new ApiError("Invalid email or password", 401);
            }

            const tokenPair = tokenService.generateTokenPair({id: user._id});
            await Token.create({...tokenPair, _userId: user._id})

            return tokenPair
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new AuthService()