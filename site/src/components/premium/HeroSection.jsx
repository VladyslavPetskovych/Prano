import React from "react";
import { Phone, ArrowRight, Crown, Shield, Gem } from "lucide-react"; // Іконки — переконайся, що вони доступні

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 40, 43, 0.8), rgba(47, 126, 153, 0.7)), url('https://images.pexels.com/photos/6766290/pexels-photo-6766290.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Скляне затемнення */}
      <div className="absolute inset-0 bg-gradient-to-br from-Ndark/60 via-Nblue/40 to-Ndark/50 backdrop-blur-sm" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-tinos">
            Преміум догляд за вашою{" "}
            <span className="bg-gradient-to-r from-Ngold via-primary-300 to-Nblue bg-clip-text text-transparent">
              брендовою колекцією
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed font-manrope font-light">
            Наш пакет Premium пропонує ексклюзивний догляд спеціально для речей
            класу люкс, щоб зберегти їхню якість, посадку та престиж.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-gradient-to-r from-Ngold to-primary-300 text-Ndark px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-2xl hover:shadow-Ngold/25 transition-all duration-300 font-manrope">
            <Phone className="w-5 h-5" />
            Замовити послугу
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="border-2 border-Nblue/70 text-Nblue px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-md bg-Nblue/10 hover:bg-Nblue/20 transition-all duration-300 font-manrope">
            Переглянути бренди
          </button>
        </div>

        <div className="mt-12 flex justify-center items-center gap-8 text-gray-300">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-Ngold" />
            <span className="text-sm font-manrope">
              Сертифіковано для брендів
            </span>
          </div>
          <div className="w-px h-6 bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-Ngold" />
            <span className="text-sm font-manrope">Захист вартості</span>
          </div>
          <div className="w-px h-6 bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-Ngold" />
            <span className="text-sm font-manrope">Преміум матеріали</span>
          </div>
        </div>
      </div>

      {/* Індикатор прокрутки */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-Ngold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-Ngold/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
