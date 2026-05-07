const fs = require("fs");
const path = require("path");

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

      const newFilePath = path.join(directoryPath, file.filename);
      fs.renameSync(file.path, newFilePath);
      const imagePath = `${advert._id}/${file.filename}`;

      return await PriceAdvert.findByIdAndUpdate(
        advert._id,
        { image: imagePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  async deleteImage() {
    try {
      const advert = await PriceAdvert.findOne({});
      if (!advert) {
        return { image: null };
      }

      const directoryPath = path.join(
        __dirname,
        `../../images/priceAdvertImages/${advert._id}`
      );
      fs.rmSync(directoryPath, { recursive: true, force: true });

      return await PriceAdvert.findByIdAndUpdate(
        advert._id,
        { image: null },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

module.exports = new PriceAdvertService();
