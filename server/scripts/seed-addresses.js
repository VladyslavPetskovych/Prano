/**
 * One-time (or safe repeat) import of existing pickup addresses into MongoDB.
 *
 * Usage (from server/):
 *   npm run seed:addresses
 *
 * Uses DB_URL from server/.env (same as the API).
 * - If collection is empty: inserts 4 addresses + postomat + copies photos.
 * - If addresses exist but have no photos: copies photos from server/seed/contacts/.
 */
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configs } = require("../src/configs");
const { seedAddresses } = require("../src/utils/addressSeed.util");

const run = async () => {
  if (!configs.DB_URL) {
    console.error("DB_URL is not set in server/.env");
    process.exit(1);
  }

  console.log("Connecting to database...");
  await mongoose.connect(configs.DB_URL);

  const result = await seedAddresses({ attachImages: true });

  console.log("Address seed finished:");
  console.log(`  - new addresses inserted: ${result.created}`);
  console.log(`  - postomat created: ${result.postomatCreated}`);
  console.log(`  - total addresses in DB: ${result.total}`);

  await mongoose.disconnect();
  console.log("Done.");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
