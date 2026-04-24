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
            type: Schema.Types.Mixed,
            validate: {
                validator: v =>
                    v == null ||
                    v === "" ||
                    typeof v === "number" ||
                    typeof v === "string",
                message: "secondPrice must be a number or a string",
            },
        },
        discountPercent: {
            type: Number,
            enum: [0, 10, 15, 20, 30],
            default: 0,
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