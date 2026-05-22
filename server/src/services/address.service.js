const path = require("path");
const fs = require("fs");

const { Address, Postomat } = require("../models");
const { ApiError } = require("../errors");
const { seedAddresses } = require("../utils/addressSeed.util");

const formatAddress = (doc) => {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  obj.schedule =
    obj.schedule instanceof Map
      ? Object.fromEntries(obj.schedule)
      : obj.schedule || {};
  return obj;
};

class AddressService {
  async ensureDefaults() {
    await seedAddresses({ attachImages: true });
  }

  async findAll(includeInactive = false) {
    await this.ensureDefaults();

    const filter = includeInactive ? {} : { isActive: true };
    const addresses = await Address.find(filter).sort({ sortOrder: 1, createdAt: 1 });

    return {
      data: addresses.map(formatAddress),
    };
  }

  async create(data) {
    const created = await Address.create({ ...data });
    return formatAddress(created);
  }

  async findById(id) {
    const address = await Address.findById(id);
    return formatAddress(address);
  }

  async updateById(id, data) {
    const updated = await Address.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" }
    );
    return formatAddress(updated);
  }

  async deleteById(id) {
    const imgPath = path.join(__dirname, `../../images/addressImages/${id}`);
    fs.rmSync(imgPath, { recursive: true, force: true });
    await Address.deleteOne({ _id: id });
  }

  async addImages(id, files) {
    if (!files.length) {
      throw new ApiError("No images provided", 400);
    }

    const address = await Address.findById(id);
    if (!address) {
      throw new ApiError("Address not found", 404);
    }

    const directoryPath = path.join(
      __dirname,
      `../../images/addressImages/${id}`
    );
    fs.mkdirSync(directoryPath, { recursive: true });

    const imagePaths = files.map((file) => {
      const newFilePath = path.join(directoryPath, file.filename);
      fs.renameSync(file.path, newFilePath);
      return `${id}/${file.filename}`;
    });

    const updated = await Address.findOneAndUpdate(
      { _id: id },
      { images: [...address.images, ...imagePaths] },
      { returnDocument: "after" }
    );

    return formatAddress(updated);
  }

  async deleteImage(id, imagePath) {
    const address = await Address.findById(id);
    if (!address) {
      throw new ApiError("Address not found", 404);
    }

    if (!address.images.includes(imagePath)) {
      throw new ApiError("Image not found on this address", 404);
    }

    const filePath = path.join(
      __dirname,
      `../../images/addressImages/${imagePath}`
    );
    fs.rmSync(filePath, { force: true });

    const updated = await Address.findOneAndUpdate(
      { _id: id },
      { images: address.images.filter((img) => img !== imagePath) },
      { returnDocument: "after" }
    );

    return formatAddress(updated);
  }

  async getPostomat() {
    await this.ensureDefaults();
    const postomat = await Postomat.findOne().sort({ createdAt: 1 });
    return postomat;
  }

  async updatePostomat(data) {
    await this.ensureDefaults();
    const existing = await Postomat.findOne().sort({ createdAt: 1 });

    if (!existing) {
      return await Postomat.create({ ...data });
    }

    return await Postomat.findOneAndUpdate(
      { _id: existing._id },
      { ...data },
      { returnDocument: "after" }
    );
  }
}

module.exports = new AddressService();
