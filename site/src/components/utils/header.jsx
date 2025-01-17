const Header = () => {
    const buttonStyle = "px-4 py-2 mx-1 text-white hover:bg-sky-500 focus:outline-none";

    return (
        <nav className="bg-sky-400 h-16 flex items-center justify-center px-4">
      <span>
        <button className={buttonStyle}>Головна</button>
      </span>
            <span>
        <button className={buttonStyle}>Прання</button>
      </span>
            <span>
        <button className={buttonStyle}>Хімчистка</button>
      </span>
            <span>
        <button className={buttonStyle}>Контакти</button>
      </span>
            <span>
        <button className={buttonStyle}>Кабінет</button>
      </span>
        </nav>
    );
};

export {
    Header
}