const {Schema, model} = require("mongoose");

const campaignScanSchema = new Schema(
    {
        _campaignId: {
            type: Schema.Types.ObjectId,
            ref: "campaign",
            required: true,
        },
        visitorId: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            enum: ["qr", "link"],
            default: "link",
        },
    },
    {
        versionKey: false,
        timestamps: {createdAt: true, updatedAt: false},
    },
)

campaignScanSchema.index({_campaignId: 1, visitorId: 1, createdAt: -1})
campaignScanSchema.index({_campaignId: 1, createdAt: -1})

module.exports = model("campaignScan", campaignScanSchema)
