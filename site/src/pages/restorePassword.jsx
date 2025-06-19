import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RestorePassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Будь ласка, заповніть усі поля.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }

    if (password.length < 8) {
      setError("Пароль має бути щонайменше 8 символів.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `https://prano.group/api/auth/password/restore/${token}`,
        {
          password,
        }
      );

      setMessage("Пароль успішно змінено. Зараз ви будете перенаправлені.");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      console.error("Restore password error:", err);
      setError(
        err.response?.data?.message || "Сталася помилка. Спробуйте ще раз."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Зміна паролю</h2>

        {message && (
          <p className="text-center text-green-600 font-medium mb-4">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Новий пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Підтвердьте пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Збереження..." : "Змінити пароль"}
          </button>
        </form>
      </div>
    </div>
  );
}
