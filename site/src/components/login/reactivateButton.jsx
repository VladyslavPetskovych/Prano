import React, { useState } from "react";
import axios from "axios";

const ReactivateButton = ({ userId, accessToken }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReactivate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `https://prano.group/api/auth/reactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      console.log("Response from reactivation:", response); 
      setMessage("Ваш акаунт був активований. Перевірте свою пошту.");
    } catch (error) {
      console.error(
        "Reactivate error:",
        error.response || error.message || error
      );
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
      setMessage("Помилка при активації. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-4">
      {message && <p className="text-green-600 mb-2">{message}</p>}
      <button
        onClick={handleReactivate}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
      >
        {loading ? "Активуємо..." : "Активувати акаунт"}
      </button>
    </div>
  );
};

export default ReactivateButton;
