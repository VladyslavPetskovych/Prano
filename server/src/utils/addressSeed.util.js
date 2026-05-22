const path = require("path");
const fs = require("fs");

const {
  DEFAULT_ADDRESSES,
  DEFAULT_POSTOMAT,
  ADDRESS_SEED_IMAGES,
  SEED_CONTACTS_DIR,
} = require("../constants/address.defaults");
const { Address, Postomat } = require("../models");

const copySeedImagesForAddress = (address) => {
  const fileNames = ADDRESS_SEED_IMAGES[address.name];
  if (!fileNames?.length) {
    return [];
  }

  const destDir = path.join(
    __dirname,
    `../../images/addressImages/${address._id}`
  );
  fs.mkdirSync(destDir, { recursive: true });

  const imagePaths = [];

  for (const fileName of fileNames) {
    const sourcePath = path.join(SEED_CONTACTS_DIR, fileName);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`[address-seed] Missing file: ${sourcePath}`);
      continue;
    }

    const destPath = path.join(destDir, fileName);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
    }

    imagePaths.push(`${address._id}/${fileName}`);
  }

  return imagePaths;
};

const seedAddresses = async ({ attachImages = true } = {}) => {
  let created = 0;

  const addressCount = await Address.countDocuments();
  if (addressCount === 0) {
    const inserted = await Address.insertMany(DEFAULT_ADDRESSES);
    created = inserted.length;

    if (attachImages) {
      for (const address of inserted) {
        const imagePaths = copySeedImagesForAddress(address);
        if (imagePaths.length) {
          await Address.updateOne({ _id: address._id }, { images: imagePaths });
        }
      }
    }
  } else if (attachImages) {
    const addresses = await Address.find();
    for (const address of addresses) {
      if (address.images?.length) continue;

      const imagePaths = copySeedImagesForAddress(address);
      if (imagePaths.length) {
        await Address.updateOne({ _id: address._id }, { images: imagePaths });
      }
    }
  }

  const postomatCount = await Postomat.countDocuments();
  let postomatCreated = false;
  if (postomatCount === 0) {
    await Postomat.create(DEFAULT_POSTOMAT);
    postomatCreated = true;
  }

  return { created, postomatCreated, total: await Address.countDocuments() };
};

module.exports = {
  seedAddresses,
  DEFAULT_ADDRESSES,
  DEFAULT_POSTOMAT,
};
