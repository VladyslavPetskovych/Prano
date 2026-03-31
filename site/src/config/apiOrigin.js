/**
 * Базовий хост API (без /api).
 * Локально: у `.env` задайте VITE_API_ORIGIN=http://localhost:3000
 * Інакше запити йдуть на продакшен.
 */
export function getApiOrigin() {
  return (import.meta.env.VITE_API_ORIGIN || "https://prano.group").replace(
    /\/$/,
    ""
  );
}

/** @param {string} path шлях після /api, напр. "/products" */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${getApiOrigin()}/api${p}`;
}
