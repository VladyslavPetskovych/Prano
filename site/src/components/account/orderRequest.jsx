import axios from "axios";

const OrderRequest = async (formData) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.post(
      "https://prano.group/api/orders",
      formData, 
      {
        headers: {
          Authorization: `${accessToken}`, 
          "Content-Type": "application/json", 
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error(
      "Error making order request:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default OrderRequest;
