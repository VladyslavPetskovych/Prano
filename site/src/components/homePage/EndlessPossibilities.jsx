import React from "react";

function EndlessPossibilities() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
         
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold mb-6">Безмежні можливості</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Ми розуміємо важливість чистого та доглянутого одягу і прагнемо
                        перевершити очікування клієнтів за допомогою наших рішень для прання
                        B2B та B2C.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center text-red-500">
                            <span className="mr-2">🧺</span>
                            <span className="text-black font-medium">Прання та сушка</span>
                        </li>
                        <li className="flex items-center text-red-500">
                            <span className="mr-2">✂️</span>
                            <span className="text-black font-medium">Ремонт та корекція</span>
                        </li>
                        <li className="flex items-center text-red-500">
                            <span className="mr-2">🧼</span>
                            <span className="text-black font-medium">Видалення плям</span>
                        </li>
                    </ul>
                </div>

                <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12 relative">
                    <div className="relative  h-[600px] md:h-[700px]">
                    
                        <img
                            src="//images.pexels.com/photos/5087727/pexels-photo-5087727.jpeg"
                            alt="Laundry Service"
                            className="rounded-lg shadow-lg object-cover w-[300px] h-[300px]  ml-0 mb-2 md:mx-4 lg:ml-36 "

                        />

                        {/* Second Image */}
                        <img
                            src="//images.pexels.com/photos/5661252/pexels-photo-5661252.jpeg"
                            alt="Laundry Service"
                            className="object-cover rounded-lg shadow-lg w-[300px] h-[300px] mr-10 lg:w-[400px] lg:h-[400px] "

                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EndlessPossibilities;
