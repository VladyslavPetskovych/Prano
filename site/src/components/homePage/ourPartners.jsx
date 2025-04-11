import React from "react";

import aristo from "../../assets/ourPartners/aristo.png";
import austrian from "../../assets/ourPartners/austrian.png";
import royal from "../../assets/ourPartners/royal.jpg";
import emily from "../../assets/ourPartners/emily.png";
import sportlife from "../../assets/ourPartners/sportlife.png";

export const partners = [
  { id: 1, src: aristo, alt: "Aristo Partner Logo" },
  { id: 2, src: austrian, alt: "Austrian Partner Logo" },
  { id: 3, src: royal, alt: "Royal Partner Logo" },
  { id: 4, src: emily, alt: "emily Partner Logo" },
  { id: 5, src: sportlife, alt: "sportlife Partner Logo" },
  { id: 6, src: aristo, alt: "Aristo Partner Logo" },
  { id: 7, src: austrian, alt: "Austrian Partner Logo" },
  { id: 8, src: royal, alt: "Royal Partner Logo" },
  { id: 9, src: emily, alt: "emily Partner Logo" },
  { id: 10, src: sportlife, alt: "sportlife Partner Logo" },
];

function ImageBlock({ src, alt }) {
  return (
    <div className="w-36 flex-shrink-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-24 object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105"
      />
    </div>
  );
}

function OurPartners() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-gray-100 py-10">
      <h2 className="text-3xl  sm:text-4xl font-bold text-center mb-12 text-gray-800 relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue">
        Наші партнери
      </h2>

      <div className="relative w-full flex overflow-hidden">
        <div className="flex min-w-max animate-marquee  gap-x-8">
          {duplicatedPartners.map((partner, index) => (
            <ImageBlock key={index} src={partner.src} alt={partner.alt} />
          ))}
        </div>

        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-gray-100 to-transparent"></div>
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-100 to-transparent"></div>
      </div>
    </div>
  );
}

export default OurPartners;
