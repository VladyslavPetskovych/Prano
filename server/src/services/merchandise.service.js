const {QueryParser} = require("../utils");
const {Merchandise, Category} = require("../models");
const {ApiError} = require("../errors");

class MerchandiseService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {sortedBy = "categoryId order", ...searchObject} = queryObj;

            const [merchandises, merchandisesTotalCount, merchandisesSearchCount] = await Promise.all([
                Merchandise.find(searchObject).sort(sortedBy),
                Merchandise.countDocuments(),
                Merchandise.countDocuments(searchObject),
            ]);

            return {
                itemsCount: merchandisesTotalCount,
                itemsFound: merchandisesSearchCount,
                data: merchandises
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async create(data) {
        try {
            const {categoryId, order} = data;
            const category = await Category.findById(categoryId);
            if (!category) {
                throw new ApiError("Category not found", 404)
            }

            if (order) {
                const conflict = await Merchandise.findOne({categoryId, order});

                if (conflict) {
                    await Merchandise.updateMany({categoryId, order: {$gte: order}}, {$inc: {order: 1}});
                }

                return await Merchandise.create(data);
            }

            const lastItem = await Merchandise.findOne({categoryId}).sort({order: -1}).select('order');

            const nextOrder = lastItem ? lastItem.order + 1 : 1;

            return await Merchandise.create({...data, order: nextOrder})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        return await Merchandise.findById(id)
    }

    async updateById(id, data) {
        return await Merchandise.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        try {
            const merchandise = await Merchandise.findById(id);

            await Promise.all([
                Merchandise.updateMany({
                    categoryId: merchandise.categoryId,
                    order: {$gt: merchandise.order}
                }, {$inc: {order: -1}}),
                Merchandise.deleteOne({_id: id})
            ])

        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async changeOrder(id, newOrder) {
        try {
            const merchandise = await Merchandise.findById(id);

            const categoryId = merchandise.categoryId;
            const oldOrder = merchandise.order;

            if (newOrder > oldOrder) {
                await Merchandise.updateMany({categoryId, order: {$gt: oldOrder, $lte: newOrder}}, {$inc: {order: -1}})
            } else if (newOrder < oldOrder) {
                await Merchandise.updateMany({categoryId, order: {$gte: newOrder, $lt: oldOrder}}, {$inc: {order: 1}})
            } else {
                return merchandise
            }

            merchandise.order = newOrder
            await merchandise.save()

            return merchandise
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new MerchandiseService()