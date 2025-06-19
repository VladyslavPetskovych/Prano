import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess({ delay = 25000 }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, delay]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-green-50 px-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
        Лист для підтвердження відправлено!
      </h1>
      <p className="text-lg text-green-800 mb-6 max-w-md">
        Ви будете автоматично перенаправлені на сторінку входу через кілька
        секунд.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
      >
        Перейти до логіну
      </button>
    </div>
  );
}
