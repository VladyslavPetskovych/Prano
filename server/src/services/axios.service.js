const axios = require("axios");

const {ccUrls: {baseURL}} = require("../constants");
const {configs} = require("../configs");
const {ApiError} = require("../errors");

const axiosService = axios.create({baseURL})

axiosService.interceptors.request.use(req => {
    req.data.api_token = configs.CC_API_KEY

    return req
})
axiosService.interceptors.response.use(res => {
    if (res.data.Error) {
        throw new ApiError(res.data.Error, 400)
    }
    return res
})

module.exports = axiosService