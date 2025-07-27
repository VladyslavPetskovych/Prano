import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import comp1 from "../../assets/slider/comparasin.jpg";
import comp2 from "../../assets/slider/comparasin2.jpg";
import comp3 from "../../assets/slider/comparasin3.jpg";
import comp4 from "../../assets/slider/comparasin4.jpg";

const reviews = [
  {
    id: 1,
    text: "Дуже задоволена послугами цієї хімчистки! Мої речі виглядають як нові.",
    author: "Ольга Петрова",
    image: comp1,
  },
  {
    id: 2,
    text: "Чудовий сервіс! Здала свої улюблені чобітки, на яких були плями, і отримала їх у бездоганному стані.",
    author: "Андрій Мельник",
    image: comp2,
  },
  {
    id: 3,
    text: "Хімчистка перевершила всі мої очікування! Навіть складні забруднення вдалося повністю видалити.",
    author: "Марина Коваль",
    image: comp3,
  },
  {
    id: 4,
    text: "Дуже задоволена послугами цієї хімчистки! Мої речі виглядають як нові, жодної плями не залишилося.",
    author: "Ольга Петрова",
    image: comp4,
  },
];

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 z-40 right-2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
    onClick={onClick}
  >
    <FaArrowRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 z-40 left-2  transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
    onClick={onClick}
  >
    <FaArrowLeft size={24} />
  </button>
);

function ReviewsSlider() {
  const [sliderKey, setSliderKey] = useState(0);

  useEffect(() => {
    const handleResize = () => setSliderKey((prevKey) => prevKey + 1);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" flex flex-col  mt-8 pb-10  bg-white rounded-lg shadow-lg font-tinos">
      <h2 className="text-3xl text-center sm:text-4xl font-bold font-tinos   text-Ndark relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7">
        Відгуки наших клієнтів
      </h2>
      <Slider {...settings} key={sliderKey}>
        {reviews.map((review) => (
          <div key={review.id} className="px-16 text-center">
            <img
              src={review.image}
              alt={review.author}
              className="w-auto h-64 md:h-64 mx-auto rounded-lg shadow-md object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-800">
                "{review.text}"
              </p>
              {/* <span className="block mt-2 text-gray-600">
                - {review.author}
              </span> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewsSlider;
