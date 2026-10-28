const {QueryParser} = require("../utils");
const {Merchandise, Category} = require("../models");
const {ApiError} = require("../errors");
const priceHistoryService = require("./priceHistory.service");

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

    async create(data, meta = {}) {
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

                const created = await Merchandise.create(data);
                await priceHistoryService.record({action: "create", after: created, meta})

                return created
            }

            const lastItem = await Merchandise.findOne({categoryId}).sort({order: -1}).select('order');

            const nextOrder = lastItem ? lastItem.order + 1 : 1;

            const created = await Merchandise.create({...data, order: nextOrder})
            await priceHistoryService.record({action: "create", after: created, meta})

            return created
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        return await Merchandise.findById(id)
    }

    async updateById(id, data, meta = {}) {
        const before = await Merchandise.findById(id).lean();
        const updated = await Merchandise.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
        await priceHistoryService.record({action: "update", before, after: updated, meta})

        return updated
    }

    async deleteById(id, meta = {}) {
        try {
            const merchandise = await Merchandise.findById(id);

            await Promise.all([
                Merchandise.updateMany({
                    categoryId: merchandise.categoryId,
                    order: {$gt: merchandise.order}
                }, {$inc: {order: -1}}),
                Merchandise.deleteOne({_id: id})
            ])
            await priceHistoryService.record({action: "delete", before: merchandise, meta})

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