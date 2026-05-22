const Joi = require("joi");

class AddressValidator {
  static name = Joi.string().min(2).max(120).trim();
  static phone = Joi.string().min(5).max(30).trim();
  static mapUrl = Joi.string().allow("").trim();
  static googleMapsUrl = Joi.string().allow("").trim();
  static schedule = Joi.object().pattern(Joi.string(), Joi.string());
  static sortOrder = Joi.number().integer().min(0);
  static showNewBadge = Joi.boolean();
  static isActive = Joi.boolean();

  static create = Joi.object({
    name: this.name.required(),
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
