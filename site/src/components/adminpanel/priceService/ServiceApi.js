import axios from "axios";

const API_URL = "https://prano.group/api/products";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `${token}`, "Content-Type": "application/json" };
};

export const updateService = async (serviceId, updatedData) => {
  try {
    const payload = {
      title: updatedData.title,
      description: updatedData.description,
    };

    await axios.patch(`${API_URL}/${serviceId}`, payload, {
      headers: getAuthHeaders(),
    });

    return { success: true };
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
