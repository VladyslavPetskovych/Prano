const {Schema, Types, model} = require("mongoose");

const {TokenEnum: {EActionTokenType}} = require("../enums");
const User = require("./User.model");

const actionSchema = new Schema(
    {
        actionToken: {
            type: String,
            required: true,
        },
        tokenType: {
            type: String,
            required: true,
            enum: EActionTokenType,
        },
        _userId: {
            type: Types.ObjectId,
            required: true,
            ref: User
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = model("action", actionSchema)