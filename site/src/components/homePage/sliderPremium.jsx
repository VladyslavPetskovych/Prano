import React from "react";

import log1 from "../../assets/brands/logo1.jpg";
import log2 from "../../assets/brands/logo2.png";
import log3 from "../../assets/brands/logo3.webp";
import log4 from "../../assets/brands/logo4.png";
import log5 from "../../assets/brands/logo5.jpg";
import log6 from "../../assets/brands/logo6.png";
import log7 from "../../assets/brands/logo7.png";
import log8 from "../../assets/brands/logo8.png";
import log9 from "../../assets/brands/logo9.png";
import log10 from "../../assets/brands/logo10.png";

const premiumPartners = [
  { id: 1, src: log1, alt: "log1" },
  { id: 2, src: log2, alt: "log2" },
  { id: 3, src: log3, alt: "log3" },
  { id: 4, src: log4, alt: "log4" },
  { id: 5, src: log5, alt: "log5" },
  { id: 6, src: log6, alt: "log6" },
  { id: 7, src: log7, alt: "log7" },
  { id: 8, src: log8, alt: "log8" },
  { id: 9, src: log9, alt: "log9" },
  { id: 10, src: log10, alt: "log10" },
];

const duplicatedPremiumPartners = [...premiumPartners, ...premiumPartners];

function VerticalImageBlock({ src, alt }) {
  return (
    <div className="h-20 flex-shrink-0 flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="h-full object-contain rounded-lg  transition-transform transform hover:scale-105"
      />
    </div>
  );
} 

function SliderPremium() {
  return (
    <div className="md:w-1/3  md:mt-0 mx-16 lg:mx-4 flex justify-center relative">
      <div className="relative flex flex-col md:flex-row gap-4">
        <div className="relative w-[350px] h-[250px] lg:w-[220px] lg:h-[300px] hover:scale-105 transition duration-300 overflow-hidden bg-gray-100 rounded-lg ">
          <div className="flex flex-col animate-marquee-vertical gap-y-6 py-4 px-2">
            {duplicatedPremiumPartners.map((partner, index) => (
              <VerticalImageBlock
                key={index}
                src={partner.src}
                alt={partner.alt}
              />
            ))}
          </div>

          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
}

export default SliderPremium;
