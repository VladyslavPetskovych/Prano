const {Schema, model} = require("mongoose");

const smsSchema = new Schema(
    {
        smsId: {
            type: Number,
            unique: true,
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
        verified: {
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("sms", smsSchema)