import { useState, useEffect } from "react";
import CatLogo from "../../assets/logo/CatLogoDark.svg";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
     
      <div className="w-20 h-20 border-8 border-Nblue border-t-transparent rounded-full animate-spin"></div>
      <img className="w-48 " src={CatLogo} alt="log" />
    </div>
  );
};

export default LoadingScreen;
