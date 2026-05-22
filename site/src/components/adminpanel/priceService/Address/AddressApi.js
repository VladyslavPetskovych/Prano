import axios from "axios";
import { apiUrl, getApiOrigin } from "../../../../config/apiOrigin";

const API_URL = apiUrl("/addresses");

const getAuthHeaders = (contentType = "application/json") => {
  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `${token}` };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }
  return headers;
};

export const fetchAddresses = async (includeInactive = true) => {
  const { data } = await axios.get(API_URL, {
    params: includeInactive ? { includeInactive: "true" } : {},
  });
  return data?.data || [];
};

export const createAddress = async (payload) => {
  const { data } = await axios.post(API_URL, payload, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateAddress = async (id, payload) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, payload, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const deleteAddress = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
};

export const uploadAddressImages = async (id, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const { data } = await axios.post(`${API_URL}/${id}/images`, formData, {
    headers: getAuthHeaders(null),
  });
  return data;
};

export const deleteAddressImage = async (id, imagePath) => {
  const { data } = await axios.delete(`${API_URL}/${id}/images`, {
    headers: getAuthHeaders(),
    data: { imagePath },
  });
  return data;
};

export const fetchPostomat = async () => {
  const { data } = await axios.get(`${API_URL}/postomat`);
  return data;
};

export const updatePostomat = async (payload) => {
  const { data } = await axios.put(`${API_URL}/postomat`, payload, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const getAddressImageUrl = (imagePath) => {
  if (!imagePath) return null;
  return `${getApiOrigin()}/api/addressImages/${imagePath}`;
};
