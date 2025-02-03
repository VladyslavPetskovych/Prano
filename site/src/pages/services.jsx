import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Services() {
  const { hash } = useLocation(); // Get hash from URL

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Наші Послуги</h1>

      <section id="cleaning" className="mb-8">
        <h2 className="text-xl font-semibold">Хімчистка</h2>
        <p>Опис послуги хімчистки...</p>
      </section>

      <section id="laundry" className="mb-8">
        <h2 className="text-xl font-semibold">Пральня</h2>
        <p>Опис послуги пральні...</p>
      </section>

      <section id="shoes-cleaning" className="mb-8">
        <h2 className="text-xl font-semibold">Чистка і реставрація взуття</h2>
        <p>Опис послуги чистки взуття...</p>
      </section>

      <section id="shoes-repair" className="mb-8">
        <h2 className="text-xl font-semibold">Ремонт взуття</h2>
        <p>Опис послуги ремонту взуття...</p>
      </section>
    </div>
  );
}

export default Services;
