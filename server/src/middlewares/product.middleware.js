const {Product} = require("../models");
const {ApiError} = require("../errors");

class ProductMiddleware {
    isProductExist(idField) {
        return async (req, res, next) => {
            try {
                const product = await Product.findById(req.params[idField]);
                if (!product) {
                    throw new ApiError("Product not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new ProductMiddleware()