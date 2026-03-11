const {authService} = require("../services");

class AuthController {
    async authenticate(req, res, next) {
        try {
            const {smsId, name} = req.body;

            const payload = await authService.authenticate(smsId, name);

            return res.json(payload)
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
}

module.exports = new AuthController()