const axiosService = require("./axios.service");
const {ccUrls: {urls}} = require("../constants");
const {ApiError} = require("../errors");

class CcService {
    async addCustomer(data) {
        try {
            return await axiosService.post(urls.customer.addCustomer, data)
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async getCustomer(id) {
        try {
            return await axiosService.post(urls.customer.getCustomer, {customerID: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async updateCustomer(id, data) {
        try {
            await axiosService.post(urls.customer.updateCustomer, {customerID: id, ...data})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async deleteCustomer(id) {
        try {
            return await axiosService.post(urls.customer.deleteCustomer, {customerID: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new CcService()