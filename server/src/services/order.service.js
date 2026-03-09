const {User, Order, Sms} = require("../models");
const emailService = require("./email.service");
const {EEmailActions} = require("../enums/email.enum");
const {configs} = require("../configs");
const {ApiError} = require("../errors");
const ccService = require("./cc.service");
const smsService = require("./sms.service");

class OrderService {
    async findByUserId(userId) {
        try {
            // const user = await User.findById(userId);

            // const {data} = await ccService.getOrdersByCustomerId(user.ccId);
            // return data.Orders

            return await Order.find({_userId: userId})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async create(userId, data, fromTelegram) {
        try {
            const user = await User.findById(userId);

            const context = {
                // cleanCloudId: user.ccId,
                nameOfUser: user.name,
                // emailOfUser: user.email,
                phoneOfUser: user.phone,
                fromTelegram,
                ...data,
            }

            await Promise.all([
                emailService.sendMail(configs.MANAGER_EMAIL, EEmailActions.ORDER_CREATED_MANAGER, context),
                // emailService.sendMail(user.email, EEmailActions.ORDER_CREATED_USER, context),
                Order.create({_userId: userId, ...data}),
                smsService.send(++smsId, phone, "Ваше замовлення успішно створено. Очікуйте зворотного зв\'язку!")
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async createBySms(smsId, orderData) {
        try {
            const {_id, phone} = await Sms.findOne({smsId})
            let user = await User.findOne({phone});

            if (!user) {
                user = await User.create({name: orderData.name, phone})
            }

            const context = {
                quickOrder: true,
                fromTelegram: false,
                phone,
                ...orderData,
            }

            await Promise.all([
                emailService.sendMail(configs.MANAGER_EMAIL, EEmailActions.ORDER_CREATED_MANAGER, context),
                Order.create({_userId: user._id, ...orderData, phone}),
                smsService.send(++smsId, phone, "Ваше замовлення успішно створено. Очікуйте зворотного зв\'язку!")
            ])

            await Sms.deleteOne({_id: _id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new OrderService()