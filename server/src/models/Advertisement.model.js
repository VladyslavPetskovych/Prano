const {Schema, model} = require("mongoose");

const advertisementSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

module.exports = model("advertisement", advertisementSchema)