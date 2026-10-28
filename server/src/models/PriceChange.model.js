const {Schema, model} = require("mongoose");

// Журнал застосованих файлів із data/price-changes. Файл застосовується лише один раз,
// а значення "до" і "після" лишаються як історія цін.
const priceChangeSchema = new Schema(
    {
        file: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: "",
        },
        operations: {
            type: [Schema.Types.Mixed],
            default: [],
        },
    },
    {
        versionKey: false,
        timestamps: true,
        collection: "priceChanges",
    },
)

module.exports = model("priceChange", priceChangeSchema)
