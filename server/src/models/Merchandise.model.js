const {Schema, model} = require("mongoose");

const merchandiseSchema = new Schema(
    {
        title: {
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
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("merchandise", merchandiseSchema)