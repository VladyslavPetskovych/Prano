import React from "react";
import FuzzyText from "../components/utils/FuzzyText";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-Ndark px-4">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.6}
        enableHover={true}
        fontSize="clamp(4rem, 20vw, 10rem)"
        color="#bfa66a"
      >
        404
      </FuzzyText>
      <h2 className="text-3xl font-semibold mt-6">Сторінку не знайдено</h2>
      <p className="text-lg mt-4 max-w-xl text-center">
        Йой! Такої сторінки не існує або вона була переміщена.
      </p>
    </div>
  );
}

export default NotFound;
