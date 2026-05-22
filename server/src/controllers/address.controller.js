const { addressService } = require("../services");

class AddressController {
  async findAll(req, res, next) {
    try {
      const includeInactive = req.query.includeInactive === "true";
      const data = await addressService.findAll(includeInactive);
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const created = await addressService.create(req.body);
      return res.json(created);
    } catch (e) {
      next(e);
    }
  }

  async findById(req, res, next) {
    try {
      const { addressId } = req.params;
      const address = await addressService.findById(addressId);
      return res.json(address);
    } catch (e) {
      next(e);
    }
  }

  async updateById(req, res, next) {
    try {
      const { addressId } = req.params;
      const updated = await addressService.updateById(addressId, req.body);
      return res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const { addressId } = req.params;
      await addressService.deleteById(addressId);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  async addImages(req, res, next) {
    try {
      const { addressId } = req.params;
      const updated = await addressService.addImages(
        addressId,
        req.files || []
      );
      return res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async deleteImage(req, res, next) {
    try {
      const { addressId } = req.params;
      const updated = await addressService.deleteImage(
        addressId,
        req.body.imagePath
      );
      return res.json(updated);
    } catch (e) {
      next(e);
    }
  }

  async getPostomat(req, res, next) {
    try {
      const postomat = await addressService.getPostomat();
      return res.json(postomat);
    } catch (e) {
      next(e);
    }
  }

  async updatePostomat(req, res, next) {
    try {
      const postomat = await addressService.updatePostomat(req.body);
      return res.json(postomat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AddressController();
