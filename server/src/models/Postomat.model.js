const { Schema, model } = require("mongoose");

const postomatSchema = new Schema(
  {
    postomat: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    receiver: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("postomat_setting", postomatSchema);
