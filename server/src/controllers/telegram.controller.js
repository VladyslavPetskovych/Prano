const {telegramService, orderService} = require("../services");

class TelegramController {
    async login(req, res, next) {
        try {
            await telegramService.login(req.body, res.locals.user)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async findOrdersByChatId (req, res, next) {
        try {

            const orders = await orderService.findByUserId(res.locals.userId);

            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TelegramController()