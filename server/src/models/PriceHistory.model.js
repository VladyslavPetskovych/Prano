const {Schema, model} = require("mongoose");

// Кожна зміна позиції прайсу: що було і що стало. Назви позиції й категорії зберігаємо
// копією, щоб історія лишалась зрозумілою навіть після видалення чи перейменування.
const priceHistorySchema = new Schema(
    {
        _merchandiseId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            default: null,
        },
        category: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: ["create", "update", "delete"],
            required: true,
        },
        changes: {
            type: [new Schema({field: String, from: Schema.Types.Mixed, to: Schema.Types.Mixed}, {_id: false})],
            default: [],
        },
        // "admin" — зміна з адмінки, "file:<назва>" — з data/price-changes
        source: {
            type: String,
            default: "admin",
        },
        _userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            default: null,
        },
    },
    {
        versionKey: false,
        timestamps: {createdAt: true, updatedAt: false},
        collection: "priceHistory",
    },
)

priceHistorySchema.index({createdAt: -1})
priceHistorySchema.index({_merchandiseId: 1, createdAt: -1})

module.exports = model("priceHistory", priceHistorySchema)
