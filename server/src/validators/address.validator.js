const Joi = require("joi");

// Якщо вставили весь <iframe ...>, беремо лише значення src
const extractIframeSrc = (value) => {
  const match = value.match(/<iframe[^>]*\ssrc\s*=\s*["']([^"']+)["']/i);
  return match ? match[1].replace(/&amp;/g, "&").trim() : value;
};

class AddressValidator {
  static name = Joi.string().min(2).max(120).trim();
  static nameFontSize = Joi.number().min(10).max(40);
  static phone = Joi.string().min(5).max(30).trim();
  static mapUrl = Joi.string()
    .allow("")
    .trim()
    .custom((value) => extractIframeSrc(value));
  static googleMapsUrl = Joi.string().allow("").trim();
  static schedule = Joi.object().pattern(Joi.string(), Joi.string());
  static sortOrder = Joi.number().integer().min(0);
  static showNewBadge = Joi.boolean();
  static isActive = Joi.boolean();

  static create = Joi.object({
    name: this.name.required(),
    nameFontSize: this.nameFontSize,
    phone: this.phone.required(),
    mapUrl: this.mapUrl,
    googleMapsUrl: this.googleMapsUrl,
    schedule: this.schedule,
    sortOrder: this.sortOrder,
    showNewBadge: this.showNewBadge,
    isActive: this.isActive,
  });

  static update = Joi.object({
    name: this.name,
    nameFontSize: this.nameFontSize,
    phone: this.phone,
    mapUrl: this.mapUrl,
    googleMapsUrl: this.googleMapsUrl,
    schedule: this.schedule,
    sortOrder: this.sortOrder,
    showNewBadge: this.showNewBadge,
    isActive: this.isActive,
  }).min(1);

  static deleteImage = Joi.object({
    imagePath: Joi.string().required(),
  });

  static postomatUpdate = Joi.object({
    postomat: Joi.string().max(50).trim(),
    city: Joi.string().max(80).trim(),
    phone: Joi.string().max(30).trim(),
    receiver: Joi.string().max(200).trim(),
  }).min(1);
}

module.exports = AddressValidator;
