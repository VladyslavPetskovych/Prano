const {ApiError} = require("../errors");
const {QueryParser} = require("../utils");
const {Product} = require("../models");

class ProductService {
    async findAll() {
        return await Product.find()
    }

    async findAllWithPagination(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {sortedBy = "createdAt", ...searchObject} = queryObj;

            const [products, productsTotalCount, productsSearchCount] = await Promise.all([
                Product.find(searchObject).sort(sortedBy),
                Product.countDocuments(),
                Product.countDocuments(searchObject),
            ]);

            return {
                itemsCount: productsTotalCount,
                itemsFound: productsSearchCount,
                data: products,
            }
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async create(data) {
        return await Product.create(data)
    }

    async findById(id) {
        return await Product.findById(id)
    }

    async updateById(id, data) {
        return await Product.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        await Product.deleteOne({_id: id})
    }
}

module.exports = new ProductService()