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

    async sendSms(req, res, next) {
        try {
            const data = await orderService.sendSms(req.body.phone);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async verifyPhone(req, res, next) {
        try {
            const {smsId, code} = req.body;

            await orderService.verifyPhone(smsId, code);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async createBySms(req, res, next) {
        try {
            const {smsId, orderData} = req.body;

            await orderService.createBySms(smsId, orderData)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()