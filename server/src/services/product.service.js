const {ApiError} = require("../errors");
const {QueryParser} = require("../utils");
const {Product} = require("../models");

class ProductService {
    async findAll(query) {
        try {
            const queryObj = QueryParser.parse(query);

            const {sortedBy: _sortedBy, ...searchObject} = queryObj;

            const [productsRaw, productsTotalCount, productsSearchCount] = await Promise.all([
                Product.find(searchObject),
                Product.countDocuments(),
                Product.countDocuments(searchObject),
            ]);

            const products = [...productsRaw].sort((a, b) => {
                const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return at - bt;
            });

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
        return await Product.create({...data})
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