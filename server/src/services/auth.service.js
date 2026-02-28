const {User, Token, Sms} = require("../models");
const {ApiError} = require("../errors");
const tokenService = require("./token.service");

class AuthService {
    async authenticate(smsId, name = null) {
        try {
            const record = await Sms.findOne({smsId});

            let user = await User.findOne({phone: record.phone});

            if (!user) {
                if (!name) {
                    throw new ApiError("Name is required for new users", 400)
                }

                user = await User.create({name, phone: record.phone});
            }

            const tokenPair = tokenService.generateTokenPair({id: user._id});

            await Promise.all([
                Token.create({...tokenPair, _userId: user._id}),
                Sms.deleteOne({_id: record._id})
            ])

            return {userId: user._id, ...tokenPair}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async refresh(oldTokenPair, tokenPayload) {
        try {
            const tokenPair = tokenService.generateTokenPair(tokenPayload);

            await Promise.all([
                Token.deleteOne({_id: oldTokenPair._id}),
                Token.create({...tokenPair, _userId: tokenPayload.id})
            ])

            return {userId: tokenPayload.id, ...tokenPair}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new AuthService()