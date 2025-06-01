import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ActivateAccount() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      console.error("У URL відсутній токен.");
      setMessage("Недійсне посилання для активації.");
      setLoading(false);
      return;
    }

    const activateAccount = async () => {
      try {
        console.log(
          "Надсилання запиту до:",
          `https://prano.group/api/auth/register/${token}`
        );

        const response = await axios.post(
          `https://prano.group/api/auth/register/${token}`
        );

        console.log("Відповідь API:", response.data);
        setMessage(response.data.message || "Акаунт успішно активовано!");

        setTimeout(() => navigate("/login"), 9000);
      } catch (error) {
        console.error(
          "Помилка активації:",
          error.response?.data || error.message
        );
        setMessage(
          error.response?.data?.message ||
            "Не вдалося активувати акаунт. Спробуйте ще раз."
        );
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Активація акаунта</h2>
        {loading ? (
          <p className="text-blue-500">Активація акаунта...</p>
        ) : (
          <p
            className={`text-lg ${
              message.includes("успішно") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
