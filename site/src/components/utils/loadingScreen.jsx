import CatLogo from "../../assets/logo/CatLogoDark.svg";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] transition-none">
      <div className="w-20 h-20 border-8 border-Nblue border-t-transparent rounded-full animate-spin mb-4"></div>
      <img className="w-48" src={CatLogo} alt="logo" />
    </div>
  );
};

export default LoadingScreen;
