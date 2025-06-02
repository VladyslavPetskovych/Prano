const {Schema, model, Types} = require("mongoose");
const Category = require("./Category.model");

const merchandiseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        secondPrice: {
            type: Number,
        },
        order: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: Types.ObjectId,
            required: true,
            ref: Category,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("merchandise", merchandiseSchema)