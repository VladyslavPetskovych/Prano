import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServicesHero from "../components/services/ServicesHero";
import ServiceSection from "../components/services/ServiceSection";
import ServicesProcess from "../components/services/ServicesProcess";
import ServicesCta from "../components/services/ServicesCta";
import { SERVICES } from "../components/services/servicesData";

function Services() {
  const { hash } = useLocation();

  // Перехід за якорем з меню / футера / інших сторінок (зокрема старі якорі-аліаси)
  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="bg-[#F5EFE4]">
      <ServicesHero />

      <div className="space-y-16 py-14 md:space-y-24 md:py-20">
        {SERVICES.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}
        <ServicesProcess />
      </div>

      <ServicesCta />
    </div>
  );
}

export default Services;
