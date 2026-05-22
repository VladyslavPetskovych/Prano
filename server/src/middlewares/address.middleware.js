const { Address } = require("../models");
const { ApiError } = require("../errors");

class AddressMiddleware {
  isAddressExist(idField) {
    return async (req, res, next) => {
      try {
        const address = await Address.findById(req.params[idField]);
        if (!address) {
          throw new ApiError("Address not found", 404);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

module.exports = new AddressMiddleware();
