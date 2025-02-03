const {model, Schema} = require("mongoose");

const {userEnum} = require("../enums");

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        age: {
            type: Number,
            min: [1, "Minimum value for age is 1"],
            max: [100, "Maximum value for age is 100"]
        },
        gender: {
            type: String,
            enum: userEnum.EGenders,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

module.exports = model("user", userSchema)