import React from "react";
import { Phone, ArrowRight, Crown, Shield, Gem } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 40, 43, 0.8), rgba(47, 126, 153, 0.7)), url('https://images.pexels.com/photos/6766290/pexels-photo-6766290.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-Ndark/60 via-Nblue/40 to-Ndark/50 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 text-center">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-snug font-tinos">
            Преміум догляд за вашою{" "}
            <span className="bg-gradient-to-r from-Ngold via-primary-300 to-Ngold bg-clip-text text-transparent">
              брендовою колекцією
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-gray-200 mb-8 mx-auto max-w-3xl leading-relaxed font-manrope font-light">
            Наш пакет Premium пропонує ексклюзивний догляд спеціально для речей
            класу люкс, щоб зберегти їхню якість, посадку та престиж.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-gradient-to-r from-Ngold to-Ngold text-Ndark px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg flex items-center gap-3 shadow-2xl hover:shadow-Ngold/25 transition-all duration-300 font-manrope">
            <Phone className="w-5 h-5" />
            Замовити послугу
            <ArrowRight className="w-5 h-5" />
          </button>

          <button className="border-2 border-Ngold/70 text-Ngold px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg backdrop-blur-md bg-Nblue/10 hover:bg-Nblue/20 transition-all duration-300 font-manrope">
            Переглянути бренди
          </button>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-gray-300 text-sm font-manrope">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-Ngold" />
            <span>Сертифіковано для брендів</span>
          </div>

          <div className="hidden md:block w-px h-5 bg-gray-500"></div>

          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-Ngold" />
            <span>Захист вартості</span>
          </div>

          <div className="hidden md:block w-px h-5 bg-gray-500"></div>

          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-Ngold" />
            <span>Преміум матеріали</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        
      </div>
    </section>
  );
};

export default HeroSection;
