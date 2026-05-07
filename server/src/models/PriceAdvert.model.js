const { Schema, model } = require("mongoose");

const priceAdvertSchema = new Schema(
  {
    image: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("price_advert", priceAdvertSchema);
