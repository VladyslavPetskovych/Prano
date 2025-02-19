const {model, Schema} = require("mongoose");

const {UserEnum: {EUserStatus, EUserRole}} = require("../enums");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        status: {
            type: String,
            enum: EUserStatus,
            default: EUserStatus.INACTIVE,
        },
        role: {
            type: String,
            enum: EUserRole,
            default: EUserRole.USER,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("user", userSchema)