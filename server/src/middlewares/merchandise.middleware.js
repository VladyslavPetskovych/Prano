const {Merchandise} = require("../models");
const {ApiError} = require("../errors");

class MerchandiseMiddleware {
    isMerchandiseExist(idField) {
        return async (req, res, next) => {
            try {
                const merchandise = await Merchandise.findById(req.params[idField]);
                if (!merchandise) {
                    throw new ApiError("Merchandise not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new MerchandiseMiddleware()