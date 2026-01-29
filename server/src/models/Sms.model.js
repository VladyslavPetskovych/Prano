const {Schema, model} = require("mongoose");

const smsSchema = new Schema(
    {
        smsId: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        smsCode: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("sms", smsSchema)