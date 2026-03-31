const {Schema, model} = require("mongoose");

const categorySchema = new Schema(
    {
        title: {
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
);

module.exports = model("category", categorySchema)