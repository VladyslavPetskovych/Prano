import React from "react";

const STEPS = [
  {
    title: "Приймання",
    text: "Залиште речі в пункті прийому у Львові чи Стрию або надішліть через поштомат Нової пошти.",
  },
  {
    title: "Огляд технолога",
    text: "Перевіряємо маркування, тканину й стан виробу та підбираємо безпечний метод.",
  },
  {
    title: "Чистка або ремонт",
    text: "Виводимо плями, чистимо, реставруємо — окремо від інших замовлень.",
  },
  {
    title: "Видача",
    text: "Відпарюємо, прасуємо й акуратно пакуємо — річ готова до носіння.",
  },
];

function ServicesProcess() {
  return (
    <section
      aria-labelledby="process-title"
      className="mx-auto max-w-6xl px-5 md:px-8"
    >
      <p className="font-manrope text-sm text-[#8C6D35]">Як ми працюємо</p>
      <h2
        id="process-title"
        className="mt-2 font-playfair text-3xl font-normal text-Ndark md:text-4xl"
      >
        Чотири кроки до бездоганної речі
      </h2>

      <div className="mt-8 grid gap-8 font-manrope sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ title, text }) => (
          <div key={title}>
            <h3 className="font-semibold text-Ndark">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-logoGray">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesProcess;
