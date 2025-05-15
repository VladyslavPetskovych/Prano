// components/OrderHistory/utils.js

export const formatDate = (timestamp) => {
  if (!timestamp || timestamp === "0") return "—";
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString("uk-UA");
};

export const mapStatus = (status) => {
  switch (status) {
    case "0":
      return "Очікується";
    case "1":
      return "У процесі";
    case "2":
      return "Завершено";
    default:
      return "Невідомий";
  }
};
