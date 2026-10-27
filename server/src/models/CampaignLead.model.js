const {Schema, model} = require("mongoose");

// Номер телефону, залишений на сторінці кампанії. Одна кампанія — один запис на номер.
const campaignLeadSchema = new Schema(
    {
        _campaignId: {
            type: Schema.Types.ObjectId,
            ref: "campaign",
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        // Звідки прийшла людина: сканування QR чи звичайне посилання
        source: {
            type: String,
            enum: ["qr", "link"],
            default: "link",
        },
        visitorId: {
            type: String,
            default: "",
        },
        verified: {
            type: Boolean,
            default: false,
        },
        verifiedAt: {
            type: Date,
            default: null,
        },
        // Номер уже був зареєстрований на сайті на момент підтвердження
        isExistingUser: {
            type: Boolean,
            default: false,
        },
        promoSmsSentAt: {
            type: Date,
            default: null,
        },
        verification: {
            code: {type: String, select: false},
            expiresAt: {type: Date, select: false},
            attempts: {type: Number, default: 0, select: false},
            sentCount: {type: Number, default: 0, select: false},
            windowStartedAt: {type: Date, select: false},
            lastSentAt: {type: Date, select: false},
            ipHash: {type: String, select: false},
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
)

campaignLeadSchema.index({_campaignId: 1, phone: 1}, {unique: true})
campaignLeadSchema.index({_campaignId: 1, verifiedAt: -1})
campaignLeadSchema.index({"verification.ipHash": 1, "verification.lastSentAt": -1})

module.exports = model("campaignLead", campaignLeadSchema)
