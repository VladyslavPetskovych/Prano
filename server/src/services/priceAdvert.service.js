const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const { PriceAdvert } = require("../models");
const { ApiError } = require("../errors");

class PriceAdvertService {
  async getCurrent() {
    return (await PriceAdvert.findOne({})) || { image: null };
  }

  async uploadImage(file) {
    try {
      if (!file) {
        throw new ApiError("No image provided", 400);
      }

      const current = await PriceAdvert.findOne({});
      const advert = await PriceAdvert.findOneAndUpdate(
        {},
        {},
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (current?.image) {
        const oldFilePath = path.join(
          __dirname,
          `../../images/priceAdvertImages/${current.image}`
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      const directoryPath = path.join(
        __dirname,
        `../../images/priceAdvertImages/${advert._id}`
      );
      fs.mkdirSync(directoryPath, { recursive: true });

      const optimizedFileName = `price-advert-${Date.now()}.webp`;
      const optimizedFilePath = path.join(directoryPath, optimizedFileName);

      await sharp(file.path)
        .rotate()
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toFile(optimizedFilePath);

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      const imagePath = `${advert._id}/${optimizedFileName}`;

      return await PriceAdvert.findByIdAndUpdate(
        advert._id,
        { image: imagePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status || 500);
    }
  }

  async deleteImage() {
    try {
      const advert = await PriceAdvert.findOne({});
      if (!advert) {
        return { image: null };
      }

      if (advert.image) {
        const imageFilePath = path.join(
          __dirname,
          `../../images/priceAdvertImages/${advert.image}`
        );
        if (fs.existsSync(imageFilePath)) {
          fs.unlinkSync(imageFilePath);
        }
      }

      const directoryPath = path.join(
        __dirname,
        `../../images/priceAdvertImages/${advert._id}`
      );
      if (fs.existsSync(directoryPath)) {
        fs.rmSync(directoryPath, { recursive: true, force: true });
      }

      return await PriceAdvert.findByIdAndUpdate(
        advert._id,
        { image: null },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status || 500);
    }
  }
}

module.exports = new PriceAdvertService();
