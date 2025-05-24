const {ApiError} = require("../errors");
const {Category, Merchandise} = require("../models");
const {QueryParser} = require("../utils");

class CategoryService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {sortedBy = "createdAt", ...searchObject} = queryObj;

            const [categories, categoriesTotalCount, categoriesSearchCount] = await Promise.all([
                Category.find(searchObject).sort(sortedBy),
                Category.countDocuments(),
                Category.countDocuments(searchObject)
            ]);

            return {
                itemsCount: categoriesTotalCount,
                itemsFound: categoriesSearchCount,
                data: categories,
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async create(data) {
        return await Category.create(data)
    }

    async findById(id) {
        return await Category.findById(id)
    }

    async updateById(id, data) {
        return await Category.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        await Promise.all([
            Merchandise.deleteMany({categoryId: id}),
            Category.deleteOne({_id: id})
        ])
    }
}

module.exports = new CategoryService()