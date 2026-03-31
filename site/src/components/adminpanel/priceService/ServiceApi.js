import axios from "axios";
import { apiUrl } from "../../../config/apiOrigin";

const API_URL = apiUrl("/products");

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `${token}`, "Content-Type": "application/json" };
};

export const updateService = async (serviceId, updatedData) => {
  try {
    const payload = {};
    if (updatedData.title !== undefined) payload.title = updatedData.title;
    if (updatedData.description !== undefined)
      payload.description = updatedData.description;

    const { data } = await axios.patch(`${API_URL}/${serviceId}`, payload, {
      headers: getAuthHeaders(),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error updating service:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Помилка при оновленні послуги!",
    };
  }
};

export const deleteService = async (serviceId) => {
  try {
    await axios.delete(`${API_URL}/${serviceId}`, {
      headers: getAuthHeaders(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting service:", error);
    return { success: false, message: "Помилка при видаленні послуги!" };
  }
};
