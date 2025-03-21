import React, { useState, useEffect } from "react";
import instagram from "../assets/landing/inst.png";
import water from "../assets/landing/water.jpg";
import Footer from "../components/utils/footer";
import Contact from "../components/contactPage/contact";
import NovaPost from "../components/landingPage/novaPost";
import Receiption from "../components/landingPage/reception";

const LandingPage = () => {
  const targetDate = new Date("2025-05-20T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00:00:00";
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${days}д ${hours}г ${minutes}хв ${seconds}с`;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 to-gray-900 text-white text-center font-geologica">
        <div
          className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: `url(${water})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 max-w-lg p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/10 text-white text-center">
            <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-lg">
              Пральня Prano скоро відкриється!
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              Ми працюємо над тим, щоб зробити прання ще зручнішим для вас.
              Скоро відкриття – слідкуйте за новинами!
            </p>
            <div className="text-3xl font-semibold bg-gray-800 px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-gray-700">
              {formatTime(timeLeft)}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Не пропустіть! Офіційний старт – <strong>20 травня 2025</strong>.
            </p>

            <div className="flex flex-col items-center text-center mt-6">
              <p className="text-lg font-semibold text-gray-300">
                Підписуйтесь на нас
              </p>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700 transition duration-300"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full  -mt-12 ">
          <Contact />
        </div>
        <p className="p-10 text-3xl font-bold text-yellow-500 text-center -mt-16">
          Наші можливості
        </p>
        <NovaPost />
        <Receiption />
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
