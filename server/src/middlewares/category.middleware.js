const {Category} = require("../models");
const {ApiError} = require("../errors");

class CategoryMiddleware {
    isCategoryExist(idField) {
        return async (req, res, next) => {
            try {
                const category = await Category.findById(req.params[idField]);
                if (!category) {
                    throw new ApiError("Category not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new CategoryMiddleware()