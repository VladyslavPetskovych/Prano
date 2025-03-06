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
        priceFrom: {
            type: Number,
            required: true,
        },
        priceTo: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("product", productSchema)