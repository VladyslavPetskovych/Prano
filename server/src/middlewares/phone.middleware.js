const {Sms} = require("../models");
const {ApiError} = require("../errors");

class PhoneMiddleware {
    async isSmsRecordExist(req, res, next) {
        try {
            const {smsId} = req.body;

            const record = await Sms.findOne({smsId});

            if (!record) {
                throw new ApiError("Session expired", 400);
            }

            next()
        } catch (e) {
            next(e)
        }
    }

    async isSmsRecordVerified(req, res, next) {
        try {
            const {smsId} = req.body;

            const record = await Sms.findOne({smsId});

            if (!record.verified) {
                throw new ApiError("Phone not verified", 400);
            }

            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PhoneMiddleware()