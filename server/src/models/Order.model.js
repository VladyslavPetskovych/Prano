const {model, Schema, Types} = require("mongoose");

const User = require("./User.model");
const Product = require("./Product.model");

const orderSchema = new Schema(
    {
        _userId: {
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
        // TODO Розкоментити, якщо буде типи послуг будуть з бека тягнутись
        // _productId: {
        //     type: Types.ObjectId,
        //     required: true,
        //     ref: Product,
        // },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        clothType: {
            type: String,
            required: true,
        },
        // TODO Видалити, якщо буде типи послуг будуть з бека тягнутись
        productType: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("order", orderSchema)
