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
      console.error("No token found in URL.");
      setMessage("Invalid activation link.");
      setLoading(false);
      return;
    }

    const activateAccount = async () => {
      try {
        console.log(
          "Sending request to:",
          `https://prano.group/api/auth/register/${token}`
        );

        const response = await axios.get(
          `https://prano.group/api/auth/register/${token}`
        );

        console.log("API Response:", response.data);
        setMessage(response.data.message || "Account activated successfully!");

        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error(
          "Activation error:",
          error.response?.data || error.message
        );
        setMessage(
          error.response?.data?.message ||
            "Activation failed. Please try again."
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
        <h2 className="text-2xl font-bold mb-4">Account Activation</h2>
        {loading ? (
          <p className="text-blue-500">Activating your account...</p>
        ) : (
          <p
            className={`text-lg ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
