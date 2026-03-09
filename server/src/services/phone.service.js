const {Sms, User} = require("../models");
const smsService = require("./sms.service");
const {ApiError} = require("../errors");

class PhoneService {
    async sendSms(phone) {
        try {
            const smsCode = Math.floor(1000 + Math.random() * 9000)

            const smsId = Date.now()

            await Promise.all([
                Sms.create({smsId, phone, smsCode, verified: false}),
                smsService.send(smsId, phone, `Ваш код підтвердження:\n${smsCode}`)
            ])

            return {smsId}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async verifyPhone(smsId, code) {
        try {
            const record = await Sms.findOne({smsId});

            if (record.smsCode !== code) {
                throw new ApiError("Invalid code", 400);
            }

            record.verified = true;
            await record.save();

            const user = await User.findOne({phone : record.phone});
            const userRegisteredAlready = !!user;

            return {userRegisteredAlready}
        } catch (e) {
            throw new ApiError(e.message, e.status || 500);
        }
    }
}

module.exports = new PhoneService()