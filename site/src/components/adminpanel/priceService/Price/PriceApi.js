// PriceApi.js
import axios from "axios";

const API_URL = "https://prano.group/api/merchandises";
const CATEGORY_URL = "https://prano.group/api/categories";

const getToken = () => localStorage.getItem("accessToken");

export const createMerchandise = async (data, token) => {
  console.log("Sending merchandise data:", data);

  return axios.post(`${API_URL}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token || getToken()}`,
    },
  });
};

export const updateMerchandise = async (id, data, token) => {
  // ✅ видаляємо secondPrice, якщо воно порожнє
  if (data.secondPrice === "" || data.secondPrice === null) {
    delete data.secondPrice;
  }

  console.log("📦 PATCH на бекенд:", id, JSON.stringify(data, null, 2));

  return axios.patch(`${API_URL}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token || getToken()}`,
    },
  });
};

export const updateMerchandiseOrder = async (id, order, token) => {
  console.log("📦 Payload to PATCH /order:", { order });

  return axios.patch(
    `https://prano.group/api/merchandises/${id}/order`,
    { order },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token || localStorage.getItem("accessToken")}`,
      },
    }
  );
};

export const deleteMerchandise = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `${token || getToken()}`,
    },
  });
};

export const getCategories = async (token) => {
  return axios.get(CATEGORY_URL, {
    headers: {
      Authorization: `${token || getToken()}`,
    },
  });
};
export const deleteCategory = async (id, token) => {
  return axios.delete(`${CATEGORY_URL}/${id}`, {
    headers: {
      Authorization: `${token || getToken()}`,
    },
  });
};

export const createCategory = async (title, token) => {
  console.log("request!!!!");

  return axios.post(
    CATEGORY_URL,
    { title },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token || getToken()}`,
      },
    }
  );
};
export const updateCategory = async (id, title, token) => {
  return axios.patch(
    `${CATEGORY_URL}/${id}`,
    { title },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token || getToken()}`,
      },
    }
  );
};
