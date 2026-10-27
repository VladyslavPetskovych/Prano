import axios from "axios";
import { apiUrl } from "../../../config/apiOrigin";
import { SITE_URL } from "../../utils/seo";

const API_URL = apiUrl("/campaigns");

const getAuthHeaders = () => ({
  Authorization: `${localStorage.getItem("accessToken")}`,
});

// Посилання, яке зашивається в QR-код. ?src=qr відрізняє сканування від звичайних переходів
export const getCampaignUrl = (slug, fromQr = false) =>
  `${SITE_URL}/promo/${slug}${fromQr ? "?src=qr" : ""}`;

export const fetchCampaigns = async () => {
  const { data } = await axios.get(API_URL, { headers: getAuthHeaders() });
  return data || [];
};

export const createCampaign = async (payload) => {
  const { data } = await axios.post(API_URL, payload, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const updateCampaign = async (id, payload) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, payload, {
    headers: getAuthHeaders(),
  });
  return data;
};

export const deleteCampaign = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};

export const fetchCampaignStats = async (id, days = 30) => {
  const { data } = await axios.get(`${API_URL}/${id}/stats`, {
    params: { days },
    headers: getAuthHeaders(),
  });
  return data || [];
};

export const fetchCampaignLeads = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}/leads`, {
    headers: getAuthHeaders(),
  });
  return data || [];
};

// Публічна частина
export const fetchCampaignPage = async (slug) => {
  const { data } = await axios.get(`${API_URL}/page/${encodeURIComponent(slug)}`);
  return data;
};

export const recordCampaignVisit = async (slug, payload) => {
  await axios.post(`${API_URL}/page/${encodeURIComponent(slug)}/visit`, payload);
};

export const sendCampaignCode = async (slug, payload) => {
  const { data } = await axios.post(
    `${API_URL}/page/${encodeURIComponent(slug)}/send-code`,
    payload
  );
  return data;
};

// Повертає { promoCode, smsSent }
export const verifyCampaignCode = async (slug, payload) => {
  const { data } = await axios.post(
    `${API_URL}/page/${encodeURIComponent(slug)}/verify`,
    payload
  );
  return data;
};
