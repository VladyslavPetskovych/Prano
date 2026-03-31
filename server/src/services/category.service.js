const {ApiError} = require("../errors");
const {Category, Merchandise} = require("../models");
const {QueryParser} = require("../utils");

class CategoryService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {sortedBy = "createdAt", ...searchObject} = queryObj;

            const [categoriesRaw, categoriesTotalCount, categoriesSearchCount] = await Promise.all([
                Category.find(searchObject),
                Category.countDocuments(),
                Category.countDocuments(searchObject)
            ]);

            const categories = [...categoriesRaw].sort((a, b) => {
                const ao = a.order != null ? a.order : Number.MAX_SAFE_INTEGER;
                const bo = b.order != null ? b.order : Number.MAX_SAFE_INTEGER;
                if (ao !== bo) return ao - bo;
                const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return at - bt;
            });

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
        let payload = {...data};
        if (payload.order == null) {
            const all = await Category.find().select("order").lean();
            const maxOrder = all.reduce((m, c) => Math.max(m, c.order ?? 0), 0);
            payload.order = maxOrder + 1;
        }
        return await Category.create(payload)
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