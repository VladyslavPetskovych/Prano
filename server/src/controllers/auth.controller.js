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

    async login(req, res, next) {
        try {
            const tokenPair = await authService.login(req.body, res.locals.user);

            return res.status(200).json({...tokenPair})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()