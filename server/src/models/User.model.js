const {model, Schema} = require("mongoose");

const {UserEnum: {EUserStatus, EUserRole}} = require("../enums");

const userSchema = new Schema(
    {
        ccId: {
            type: Number,
            default: null,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
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
            required: false,
            select: false,
        },
        status: {
            type: String,
            enum: EUserStatus,
            default: EUserStatus.ACTIVE,
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