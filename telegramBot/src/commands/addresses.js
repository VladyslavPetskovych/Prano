const axios = require("axios");
const bot = require("../bot");

const API_URL = "https://prano.group/api/addresses";

const formatSchedule = (schedule = {}) =>
  Object.entries(schedule)
    .map(([day, hours]) => `${day}: ${hours}`)
    .join("\n");

const buildLocationBlock = (address) => {
  const mapLink = address.googleMapsUrl || address.mapUrl;
  const title = address.name;

  let block = "";
  if (mapLink) {
    block += `🏢 <a href="${mapLink}">${title}</a>\n`;
  } else {
    block += `🏢 ${title}\n`;
  }

  if (address.phone) {
    const tel = address.phone.replace(/\s/g, "");
    block += `📞 <a href="tel:${tel}">${address.phone}</a>\n`;
  }

  const scheduleText = formatSchedule(address.schedule);
  if (scheduleText) {
    block += `${scheduleText}\n`;
  }

  return block;
};

module.exports = async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get(API_URL);
    const addresses = response.data?.data || [];

    if (!addresses.length) {
      await bot.sendMessage(chatId, "Адреси тимчасово недоступні.");
      return;
    }

    const blocks = addresses.map(buildLocationBlock).join("\n");
    const info = `<b>Пункти прийому:</b>\n\n${blocks.trim()}`;

    await bot.sendMessage(chatId, info, { parse_mode: "HTML" });
  } catch (err) {
    console.error("Failed to fetch addresses:", err.message);
    await bot.sendMessage(
      chatId,
      "Не вдалося завантажити адреси. Спробуйте пізніше."
    );
  }
};
