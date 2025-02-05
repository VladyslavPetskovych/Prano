import back from "../../assets/home/back.jpg";


const TopBlock = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      {/* Темний оверлей */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Контент */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl p-5 font-geologica text-white">Прано</h1>
    
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Ми пропонуємо високоякісні послуги прання та хімчистки, які
          забезпечать чистоту та свіжість вашого одягу. Дбайливий підхід до
          кожної речі — ваш одяг у надійних руках.
        </p>
        <a
          href="#services"
          className="bg-goldenYellow text-white text-lg font-bold py-3 px-8 rounded-lg hover:bg-d3b768 transition"
        >
          Замовити послугу
        </a>
      </div>
    </div>
  );
};

export { TopBlock };
