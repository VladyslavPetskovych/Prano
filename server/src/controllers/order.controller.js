const {orderService} = require("../services");

class OrderController {
    async create(req, res, next) {
        try {
            await orderService.create(res.locals.tokenPayload.id, req.body)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()