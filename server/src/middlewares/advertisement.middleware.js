const {Advertisement} = require("../models");
const {ApiError} = require("../errors");

class AdvertisementMiddleware {
    isAdvertisementExist(idField) {
        return async (req, res, next) => {
            try {
                const advertisement = await Advertisement.findById(req.params[idField]);
                if (!advertisement) {
                    throw new ApiError("Advertisement not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new AdvertisementMiddleware()