const {productService} = require("../services");

class ProductController {
    async findAll(req, res, next) {
        try {
            const data = await productService.findAll(req.query);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const createdProduct = await productService.create(req.body);

            return res.json(createdProduct)
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {productId} = req.params;
            const product = await productService.findById(productId);

            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async updateById(req, res, next) {
        try {
            const {productId} = req.params;
            const updatedProduct = await productService.updateById(productId, req.body);

            return res.json(updatedProduct)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {productId} = req.params;
            await productService.deleteById(productId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()