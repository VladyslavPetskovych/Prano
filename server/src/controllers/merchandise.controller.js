const {merchandiseService} = require("../services");

class MerchandiseController {
    async findAll(req, res, next) {
        try {
            const data = await merchandiseService.findAll(req.query);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const createdMerchandise = await merchandiseService.create(req.body);

            return res.json(createdMerchandise)
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {merchandiseId} = req.params;
            const merchandise = await merchandiseService.findById(merchandiseId);

            return res.json(merchandise)
        } catch (e) {
            next(e)
        }
    }

    async updateById(req, res, next) {
        try {
            const {merchandiseId} = req.params;
            const updatedMerchandise = await merchandiseService.updateById(merchandiseId, req.body);

            return res.json(updatedMerchandise)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {merchandiseId} = req.params;
            await merchandiseService.deleteById(merchandiseId);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async changeOrder(req, res, next) {
        try {
            const {merchandiseId} = req.params;
            const updatedMerchandise = await merchandiseService.changeOrder(merchandiseId, req.body.order);

            return res.json(updatedMerchandise)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new MerchandiseController()