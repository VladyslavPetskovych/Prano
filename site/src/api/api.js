// src/api/api.js
import axios from "axios";

let storeRef = null;
export const attachStore = (store) => {
  storeRef = store;
};

// ====== Базові шляхи ======
const BASE_URL = "https://prano.group/api"; // напр.
const REFRESH_URL = `${BASE_URL}/auth/refresh`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, 
});

api.interceptors.request.use((config) => {
  const state = storeRef?.getState?.();
  const accessToken =
    state?.auth?.accessToken || localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `${accessToken}`;
  }
  return config;
});

// ======= RESPONSE: авто-рефреш =======
let isRefreshing = false;
let pendingQueue = []; // запити, що чекають нового access

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token) {
        config.headers.Authorization = `${token}`; // без Bearer
      }
      resolve(api(config));
    }
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    // Якщо це не 401, або ми вже пробували, або це сам /auth/refresh — віддати помилку
    if (
      status !== 401 ||
      original?._retry ||
      (original?.url && original.url.includes("/auth/refresh"))
    ) {
      throw error;
    }

    original._retry = true;

    // Якщо рефреш вже йде — кладемо в чергу
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject, config: original });
      });
    }

    isRefreshing = true;
    try {
      const state = storeRef?.getState?.();
      // const currentRefresh =
      //   state?.auth?.refreshToken || localStorage.getItem("refreshToken");
      const currentRefresh = localStorage.getItem("refreshToken");

      if (!currentRefresh) {
        // Немає refresh — чистимо стан і кидаємо
        storeRef?.dispatch?.({ type: "auth/logout" });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        throw error;
      }

      // Використовуємо прямий axios, щоб не попасти у наші ж інтерсептори
      const resp = await axios.post(REFRESH_URL, {
        refreshToken: currentRefresh,
      });

      const { accessToken: newAT, refreshToken: newRT } = resp.data || {};
      if (!newAT) throw new Error("No accessToken in refresh response");

      // Зберігаємо
      localStorage.setItem("accessToken", newAT);
      if (newRT) localStorage.setItem("refreshToken", newRT);

      // Оновлюємо Redux (підлаштуй під свої екшени)
      storeRef?.dispatch?.({
        type: "auth/login/fulfilled-like",
        payload: {
          accessToken: newAT,
          refreshToken: newRT || currentRefresh,
        },
      });

      // Розбудити чергу
      processQueue(null, newAT);

      // Повторити оригінальний
      original.headers.Authorization = `${newAT}`; // без Bearer
      return api(original);
    } catch (e) {
      // Завал refresh → розлогінити і відхилити всі очікуючі
      processQueue(e, null);
      storeRef?.dispatch?.({ type: "auth/logout" });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      throw e;
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
