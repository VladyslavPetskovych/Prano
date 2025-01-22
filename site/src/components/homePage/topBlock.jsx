import logo1 from "../../assets/home/logo1.webp";

const TopBlock = () => {
    return (
        <div className="bg-slate-300 h-screen w-full  flex flex-col items-center justify-center ">
            <h1 className=" text-5xl p-5">Прано</h1>
            <div className="flex flex-row">
                <img src={logo1} alt="" className="w-48 object-contain mx-2"/>
            </div>
        </div>
    );
};

export {
    TopBlock
}
