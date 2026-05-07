const { priceAdvertService } = require("../services");

class PriceAdvertController {
  async getCurrent(req, res, next) {
    try {
      const advert = await priceAdvertService.getCurrent();
      return res.json(advert);
    } catch (e) {
      next(e);
    }
  }

  async uploadImage(req, res, next) {
    try {
      const advert = await priceAdvertService.uploadImage(req.file);
      return res.json(advert);
    } catch (e) {
      next(e);
    }
  }

  async deleteImage(req, res, next) {
    try {
      const advert = await priceAdvertService.deleteImage();
      return res.json(advert);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PriceAdvertController();
