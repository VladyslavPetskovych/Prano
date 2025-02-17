const {authService} = require("../services");

class AuthController {
    async register(req, res, next) {
        try {
            await authService.register(req.body)

            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const {id: userId} = res.locals.tokenPayload;
            await authService.activate(userId)

            return res.sendStatus(201)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const payload = await authService.login(req.body, res.locals.user);

            return res.status(200).json(payload)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const payload = await authService.refresh(res.locals.oldTokenPair, res.locals.tokenPayload);

            return res.status(200).json(payload)
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req, res, next) {
        try {
            const {id: userId} = res.locals.tokenPayload;
            await authService.changePassword(req.body, userId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async forgotPassword(req, res, next) {
        try {
            const user = res.locals.user;
            await authService.forgotPassword(user)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async setForgotPassword(req, res, next) {
        try {
            const {password} = req.body;
            const {id: userId} = res.locals.tokenPayload;

            await authService.setForgotPassword(password, userId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()