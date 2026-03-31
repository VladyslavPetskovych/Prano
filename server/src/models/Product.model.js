const {Schema, model} = require("mongoose");

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("product", productSchema)