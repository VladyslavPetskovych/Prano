const {model, Schema} = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("post", postSchema)