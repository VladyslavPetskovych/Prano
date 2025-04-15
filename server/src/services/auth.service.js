const passwordService = require("./password.service");
const {User, Token, OldPassword, Action} = require("../models");
const {ApiError} = require("../errors");
const tokenService = require("./token.service");
const emailService = require("./email.service");
const {EmailEnum: {EEmailActions}, TokenEnum: {EActionTokenType}, UserEnum: {EUserStatus}} = require("../enums");
const ccService = require("./cc.service");

class AuthService {
    async register(data) {
        try {
            const hashedPassword = await passwordService.hash(data.password);

            const user = await User.create({...data, password: hashedPassword});

            const actionToken = tokenService.generateActionToken({id: user._id}, EActionTokenType.ACTIVATE);

            await Promise.all([
                Action.create({actionToken, tokenType: EActionTokenType.ACTIVATE, _userId: user._id}),
                emailService.sendMail(data.email, EEmailActions.WELCOME, {name: data.name, actionToken})
            ])

        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async activate(userId) {
        try {
            const user = await User.findById(userId);
            const {data} = await ccService.addCustomer({customerName: user.name, customerTel: user.phone, customerEmail: user.email});

            await Promise.all([
                User.updateOne({_id: userId}, {status: EUserStatus.ACTIVE, ccId: data.CustomerID}),
                Action.deleteMany({_userId: userId, tokenType: EActionTokenType.ACTIVATE}),
            ]);

            const tokenPair = tokenService.generateTokenPair({id: user._id});
            await Token.create({...tokenPair, _userId: user._id})

            return {userId: user._id, ...tokenPair}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async login(credentials, user) {
        try {
            if (user.status === EUserStatus.INACTIVE) {
                throw new ApiError("User not activated", 403)
            }

            const isMatched = await passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new ApiError("Invalid email or password", 401);
            }

            const tokenPair = tokenService.generateTokenPair({id: user._id});
            await Token.create({...tokenPair, _userId: user._id})

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

    async changePassword(data, userId) {
        try {
            const user = await User.findById(userId).select("+password");

            const isMatched = await passwordService.compare(data.oldPassword, user.password);
            if (!isMatched) {
                throw new ApiError("Wrong old password", 400);
            }

            const oldPasswords = await OldPassword.find({_userId: userId}).lean();
            oldPasswords.push({password: user.password})
            await Promise.all(
                oldPasswords.map(async ({password: hash}) => {
                    const isMatched = await passwordService.compare(data.newPassword, hash);

                    if (isMatched) {
                        throw new ApiError("Password already used before", 400)
                    }
                })
            )

            const newHashedPassword = await passwordService.hash(data.newPassword);

            await Promise.all([
                OldPassword.create({password: user.password, _userId: userId}),
                User.updateOne({_id: userId}, {password: newHashedPassword}),
                Token.deleteMany({_userId: userId}),
                emailService.sendMail(user.email, EEmailActions.PASSWORD_CHANGED, {name: user.name})
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async forgotPassword(user) {
        try {
            const actionToken = tokenService.generateActionToken({id: user._id}, EActionTokenType.FORGOT_PASSWORD);

            await Promise.all([
                Action.create({actionToken, tokenType: EActionTokenType.FORGOT_PASSWORD, _userId: user._id}),
                emailService.sendMail(user.email, EEmailActions.FORGOT_PASSWORD, {actionToken})
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async setForgotPassword(password, userId) {
        try {
            const user = await User.findById(userId).select("+password")

            const oldPasswords = await OldPassword.find({_userId: userId}).lean();
            oldPasswords.push({password: user.password})
            await Promise.all(
                oldPasswords.map(async ({password: hash}) => {
                    const isMatched = await passwordService.compare(password, hash);

                    if (isMatched) {
                        throw new ApiError("Password already used before", 400)
                    }
                })
            )

            const hashedPassword = await passwordService.hash(password);

            await Promise.all([
                OldPassword.create({password: user.password, _userId: userId}),
                User.updateOne({_id: userId}, {password: hashedPassword}),
                Action.deleteMany({_userId: userId, tokenType: EActionTokenType.FORGOT_PASSWORD}),
                Token.deleteMany({_userId: userId}),
                emailService.sendMail(user.email, EEmailActions.PASSWORD_CHANGED, {name: user.name})
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async reactivate(email) {
        try {
            const user = await User.findOne({email: email});
            const actionToken = tokenService.generateActionToken({id: user._id}, EActionTokenType.ACTIVATE);

            await Promise.all([
                Action.create({actionToken, tokenType: EActionTokenType.ACTIVATE, _userId: user._id}),
                emailService.sendMail(data.email, EEmailActions.WELCOME, {name: data.name, actionToken})
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new AuthService()