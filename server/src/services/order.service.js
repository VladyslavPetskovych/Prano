const {User, Order} = require("../models");
const emailService = require("./email.service");
const {EEmailActions} = require("../enums/email.enum");
const {configs} = require("../configs");
const {ApiError} = require("../errors");
const ccService = require("./cc.service");

class OrderService {
    async findByUserId(userId) {
        try {
            const user = await User.findById(userId);

            const {data} = await ccService.getOrdersByCustomerId(user.ccId);
            return data.Orders
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async create(userId, data) {
        try {
            const user = await User.findById(userId);

            const context = {
                cleanCloudId: user.ccId,
                nameOfUser: user.name,
                emailOfUser: user.email,
                phoneOfUser: user.phone,
                ...data,
            }

            await Promise.all([
                emailService.sendMail(configs.MANAGER_EMAIL, EEmailActions.ORDER_CREATED_MANAGER, context),
                emailService.sendMail(user.email, EEmailActions.ORDER_CREATED_USER, context),
                Order.create({_userId: userId, ...data})
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new OrderService()