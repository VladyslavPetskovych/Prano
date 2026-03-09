const {phoneService} = require("../services");

class PhoneController {
    async sendSms(req, res, next) {
        try {
            const data = await phoneService.sendSms(req.body.phone);

            return res.json(data)
        } catch (e) {
            next (e)
        }
    }

    async verifyPhone(req, res, next) {
        try {
            const {smsId, code} = req.body;

            const data =  await phoneService.verifyPhone(smsId, code)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PhoneController()