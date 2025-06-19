import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Будь ласка, введіть вашу електронну пошту.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://prano.group/api/auth/password/forgot", {
        email,
      });

      setMessage("Інструкції для відновлення паролю надіслано на вашу пошту.");
    } catch (err) {
      console.error("Помилка при відновленні паролю:", err);

      const rawMessage = err.response?.data?.message || "";

      const translatedMessage = (() => {
        if (rawMessage.includes("User not found")) {
          return "Користувача з таким email не знайдено.";
        }

        if (rawMessage.includes("Invalid email")) {
          return "Невірний формат email.";
        }

        return "Сталася помилка. Спробуйте ще раз.";
      })();

      setError(translatedMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Відновлення паролю
        </h2>

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
            type="email"
            placeholder="Ваша електронна пошта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Відправка..." : "Надіслати інструкцію"}
          </button>
        </form>
      </div>
    </div>
  );
}
