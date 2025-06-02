const {telegramService, orderService, userService} = require("../services");

class TelegramController {
    async login(req, res, next) {
        try {
            const user = await telegramService.login(req.body, res.locals.user);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async findUser(req, res, next) {
        try {
            const user = await userService.findById(res.locals.userId);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async findOrders(req, res, next) {
        try {
            const orders = await orderService.findByUserId(res.locals.userId);

            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async findUsers(req, res, next) {
        try {
            const user = await telegramService.findUsers(req.query);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TelegramController()