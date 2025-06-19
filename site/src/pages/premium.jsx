import React from "react";
import Weasel from "../assets/videos/loopWeaselVideo.mp4";
import HeroSection from "../components/premium/HeroSection";

function Premium() {
  return (
    <div className="min-h-screen bg-Ndark pt-28 sm:pt-32 font-tinos text-white">
      <HeroSection />

      {/* Відео блок */}
      <section className="relative min-h-[90vh] w-full overflow-hidden">
        <video
          src={Weasel}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Напівпрозорий контейнер для тексту */}
        <div className="relative z-10 flex items-center justify-center min-h-[90vh] bg-black/40 px-4">
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg text-white text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Prano Premium — сервіс поза стандартами
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-manrope font-light text-gray-100">
              Індивідуальний догляд для брендових, ексклюзивних, вінтажних чи
              просто улюблених речей. Ми ретельно досліджуємо тканину, крій і
              стан кожного виробу, щоб підібрати найефективніший та безпечний
              метод очищення або реставрації.
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              Працюємо з одягом і аксесуарами Dior, Prada, Chanel, Hermès, Louis
              Vuitton, Gucci та багатьма іншими. Нам не важлива етикетка —
              важлива ваша довіра. Повертаємо речам вигляд і відчуття "як
              нових".
            </p>
            <p>Улюблене варто зберігати.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Premium;
