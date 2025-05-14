const {QueryParser} = require("../utils");
const {Merchandise} = require("../models");
const {ApiError} = require("../errors");

class MerchandiseService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {page = 1, limit = 10, sortedBy = "order", ...searchObject} = queryObj;
            const skip = +limit * (+page - 1)

            const [merchandises, merchandisesTotalCount, merchandisesSearchCount] = await Promise.all([
                Merchandise.find(searchObject).sort(sortedBy).limit(+limit).skip(skip),
                Merchandise.countDocuments(),
                Merchandise.countDocuments(searchObject),
            ]);

            return {
                page: +page,
                perPage: +limit,
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
            const countDocuments = await Merchandise.countDocuments();

            const toCreate = {...data, order: countDocuments + 1}

            return await Merchandise.create(toCreate)
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
            await Merchandise.updateMany({order: {$gt: merchandise.order}}, {$inc: {order: -1}})

            await Merchandise.deleteOne({_id: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async changeOrder(id, newOrder) {
        try {
            const merchandise = await Merchandise.findById(id);

            const oldOrder = merchandise.order;

            if (newOrder > oldOrder) {
                await Merchandise.updateMany({order: {$gt: oldOrder, $lte: newOrder}}, {$inc: {order: -1}})
            } else if (newOrder < oldOrder) {
                await Merchandise.updateMany({order: {$gte: newOrder, $lt: oldOrder}}, {$inc: {order: 1}})
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