const {model, Schema, Types} = require("mongoose");

const User = require("./User.model");

const tokenSchema = new Schema(
    {
        accessToken: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        _userId: {
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("token", tokenSchema)