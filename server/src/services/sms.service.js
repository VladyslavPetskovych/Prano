const {ApiError} = require("../errors");
const axiosService = require("./axios.service");

class SmsService {
    async send(smsId, phone, smsMessage) {
        try {
            const objectToSend = {
                data: [{
                    type: "sms",
                    id: smsId,
                    phone: phone,
                    sms_signature: "Prano",
                    sms_message: smsMessage
                }]
            }

            await axiosService.post("/", objectToSend)
        } catch (e) {
            if (e.isAxiosError && e.response) {
                throw new ApiError(
                    e.response.data?.message || e.message || "Request failed",
                    e.response.status
                );
            }

            throw new ApiError(e.message, e.status);
        }
    }
}

module.exports = new SmsService()