const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameFontSize: {
      type: Number,
      default: 16,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    mapUrl: {
      type: String,
      default: "",
      trim: true,
    },
    googleMapsUrl: {
      type: String,
      default: "",
      trim: true,
    },
    schedule: {
      type: Map,
      of: String,
      default: {},
    },
    images: {
      type: [String],
      default: [],
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    showNewBadge: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("pickup_address", addressSchema);
