const {categoryService} = require("../services");

class CategoryController {
    async findAll(req, res, next) {
        try {
            const data = await categoryService.findAll(req.query);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const createdCategory = await categoryService.create(req.body);

            return res.json(createdCategory)
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {categoryId} = req.params;
            const category = await categoryService.findById(categoryId);

            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async updateById(req, res, next) {
        try {
            const {categoryId} = req.params;
            const updatedCategory = await categoryService.updateById(categoryId);

            return res.json(updatedCategory)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {categoryId} = req.params;
            await categoryService.deleteById(categoryId);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()