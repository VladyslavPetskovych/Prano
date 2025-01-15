import logo1 from "../../assets/home/logo1.webp";
import logo2 from "../../assets/home/logo2.webp";
import logo3 from "../../assets/home/logo3.webp";

function TopBlock() {
  return (
    <div className="bg-sky-300 h-96 w-screen  flex flex-col items-center justify-center ">
      <h1 className=" text-5xl m-5">Прано</h1>
      <div className="flex flex-row">
        <img src={logo1} alt="" className="w-48 object-contain mx-2" />
        <img src={logo2} alt="" className="w-48 object-contain mx-2" />
        <img src={logo3} alt="" className="w-48 object-contain mx-2" />
      </div>
    </div>
  );
}

export default TopBlock;
