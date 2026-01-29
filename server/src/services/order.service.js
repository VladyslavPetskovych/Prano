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
            const user = await User.findById(userId);

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
                emailOfUser: user.email,
                phoneOfUser: user.phone,
                fromTelegram,
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

    async checkPhone(phone) {
        try {
            const smsCode = Math.floor(1000 + Math.random() * 9000)

            const smsId = Date.now()

            await Promise.all([
                Sms.create({smsId, phone, smsCode}),
                smsService.send(smsId, phone, `Ваш код підтвердження:\n${smsCode}`)
            ])

            return {smsId}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async createBySms(smsId, code, orderData) {
        try {
            const record = await Sms.findOne({smsId});

            if (!record) {
                throw new ApiError("Code expired or not found", 400);
            }

            if (record.smsCode !== code) {
                throw new ApiError("Invalid code", 400);
            }

            await Sms.deleteOne({_id: record._id})

            const context = {
                quickOrder: true,
                fromTelegram: false,
                phone: record.phone,
                ...orderData,
            }

            await Promise.all([
                emailService.sendMail(configs.MANAGER_EMAIL, EEmailActions.ORDER_CREATED_MANAGER, context),
                smsService.send(++smsId, record.phone, "Ваше замовлення успішно створено. Очікуйте зворотного зв\'язку!")
            ])
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new OrderService()