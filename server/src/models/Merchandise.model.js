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
        },
        price: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator: v => typeof v === 'number' || typeof v === 'string',
                message: 'price must be a number or a string'
            }
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