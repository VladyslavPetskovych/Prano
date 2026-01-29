const axios = require("axios");

const {smsUrls: {baseURL}} = require("../constants");
const {ApiError} = require("../errors");
const {configs} = require("../configs");

const axiosService = axios.create({baseURL})

axiosService.interceptors.request.use(req => {
    req.data.auth = configs.SMS_API_KEY

    return req;
})
axiosService.interceptors.response.use(res => {
    if (res.data.error) {
        throw new ApiError(res.data.error, 400)
    }
    return res
})

module.exports = axiosService