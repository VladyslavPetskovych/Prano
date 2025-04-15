const {model, Schema, Types} = require("mongoose");

const User = require("./User.model");

const oldPasswordSchema = new Schema(
    {
        password: {
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

module.exports = model("oldPassword", oldPasswordSchema)