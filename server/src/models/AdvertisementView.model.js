const {Schema, model} = require("mongoose");

const advertisementViewSchema = new Schema(
    {
        _advertisementId: {
            type: Schema.Types.ObjectId,
            ref: "advertisement",
            required: true,
        },
        visitorId: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: {createdAt: true, updatedAt: false},
    },
)

advertisementViewSchema.index({_advertisementId: 1, visitorId: 1, createdAt: -1})

module.exports = model("advertisementView", advertisementViewSchema)
