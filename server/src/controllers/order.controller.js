const {orderService} = require("../services");

class OrderController {
    async findByUserId(req, res, next) {
        try {
            const orders = await orderService.findByUserId(req.params.userId);

            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            await orderService.create(res.locals.tokenPayload.id, req.body, false)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()