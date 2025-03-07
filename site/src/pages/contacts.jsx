import React from "react";

const AboutUs = () => {
  return (
    <div className=" bg-black text-white ">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6">Наша історія</h2>
          <p className="text-gray-300 leading-relaxed">
            Пральня Prano відкрилася у 2015 році, маючи на меті забезпечити
            бізнес-клієнтів високоякісними послугами з прання та догляду за
            текстилем. Від самого початку ми зробили ставку на надійність,
            сучасні технології та бездоганний сервіс, що дозволило нам завоювати
            довіру провідних компаній.
            <br />
            <br />
            Серед наших постійних клієнтів — Royal Apart, Aristo hotel, Austrian
            hotel, Emily Resort, Sport Life, Leogrand та багато інших
            організацій, які цінують чистоту, якість та професійний підхід. Ми
            пишаємося тим, що вже багато років співпрацюємо з цими компаніями,
            забезпечуючи їм найкращий сервіс та довгострокове партнерство.
          </p>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6">Наше бачення</h2>
          <p className="text-gray-300 leading-relaxed">
            Prano прагне стати еталоном у сфері професійного догляду за
            текстилем. Ми використовуємо передові екологічні технології,
            безпечні миючі засоби та інноваційне обладнання, щоб гарантувати
            ідеальну чистоту та довговічність виробів наших клієнтів.
            <br />
            Ми віримо, що якісний сервіс — це не просто прання, а комплексний
            підхід, що включає індивідуальні рішення для кожного партнера. Наша
            місія — забезпечити бізнесу та готельно-ресторанному сектору
            бездоганну чистоту, надійність та турботу про кожну деталь.
          </p>
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-yellow-500 text-center mb-12">
          📍 Наші відділення і поштомати
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-300">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-yellow-500 hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-white">Відділення</h3>
            <p className="mt-2">Замарстинівська 30</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-yellow-500 hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-white">Поштомат</h3>
            <p className="mt-2">Богдана Хмельницького 37</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-yellow-500 hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-white">Відділення</h3>
            <p className="mt-2">Балабана 23</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d909.615881387787!2d24.026415534866796!3d49.84654919847564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add0ccfd9e63f%3A0xc15e4a8be7be479c!2sVesela%20St%2C%205%2C%20L'viv%2C%20L'vivs'ka%20oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1738653628602!5m2!1sen!2sua"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
        />
      </div>

      <AboutUs />
    </div>
  );
};

export default Contacts;
