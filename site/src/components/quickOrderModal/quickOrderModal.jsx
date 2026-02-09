import React, {useEffect, useState} from "react";
import axios from "axios";

const STEPS = {
    PHONE: 1, CODE: 2, ORDER: 3,
};

const QuickOrderModal = ({onClose}) => {
    const [step, setStep] = useState(STEPS.PHONE);
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [smsId, setSmsId] = useState(null);
    const [clothTypes, setClothTypes] = useState([])

    const [orderData, setOrderData] = useState({
        name: "", clothType: "", productType: "", note: "",
    });

    const sendPhone = async () => {
        try {
            // const response = await axios.post("http://localhost:3000/orders/quick", {phone});
            const response = await axios.post("https://prano.group/api/orders/quick", {phone});

            setSmsId(response.data.smsId);
            setStep(STEPS.CODE);
        } catch (error) {
            console.error(error);
        }
    };

    const confirmCode = async () => {
        try {
            // await axios.post("http://localhost:3000/orders/quick/confirm-code", {smsId, code});
            await axios.post("https://prano.group/api/orders/quick/confirm-code", {smsId, code});

            setStep(STEPS.ORDER);
        } catch (error) {
            console.error(error);
        }
    };

    const sendOrder = async () => {
        try {
            // await axios.post("http://localhost:3000/orders/quick/confirm", {smsId, orderData});
            await axios.post("https://prano.group/api/orders/quick/confirm", {smsId, code});

            alert("Замовлення надіслано!");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchMerchandises = async () => {
            try {
                const response = await axios.get("https://prano.group/api/merchandises");
                console.log("Merchandises:", response.data);

                // беремо саме масив data
                setClothTypes(response.data.data || []);
            } catch (error) {
                console.error("Помилка при завантаженні merchandises:", error);
            }
        };

        fetchMerchandises();
    }, []);


    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-md rounded-xl shadow-xl p-5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between mb-3">
                    <h3 className="text-lg font-semibold">Швидке замовлення</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                {step === STEPS.PHONE &&
                    <div className="flex flex-col gap-3">
                        <input
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Номер телефону"
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                        <button
                            className="w-full py-4 rounded-xl text-lg font-semibold transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={sendPhone}>
                            Надіслати код
                        </button>
                    </div>
                }

                {step === STEPS.CODE &&
                    <div className="flex flex-col gap-3">
                        <input
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Код з SMS"
                            value={code}
                            onChange={(e) => {
                                const onlyDigits = e.target.value.replace(/\D/g, "");
                                setCode(onlyDigits);
                            }}
                        />
                        <button
                            className="w-full py-4 rounded-xl text-lg font-semibold transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={confirmCode}>
                            Підтвердити
                        </button>
                    </div>
                }

                {step === STEPS.ORDER &&
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="name"
                            value={orderData.name}
                            onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                            placeholder="Ваше ім'я"
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                        <select
                            name="clothType"
                            value={orderData.clothType}
                            onChange={(e) => setOrderData({...orderData, clothType: e.target.value})}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        >
                            <option value="">Оберіть тип одягу</option>
                            {clothTypes.map((item) => (<option key={item._id} value={item.title}>
                                {item.title}
                            </option>))}
                        </select>
                        <select
                            name="productType"
                            value={orderData.productType}
                            onChange={(e) => setOrderData({...orderData, productType: e.target.value})}
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        >
                            <option value="">Оберіть тип послуги</option>
                            <option value="Хімчистка">Хімчистка</option>
                            <option value="Хімчистка">Прання</option>
                            <option value="Ремонт одягу">Чистка взуття</option>
                            <option value="Ремонт одягу">Реставрація взуття</option>
                            <option value="Прасування">Ремонт одягу</option>
                            <option value="Ремонт одягу">Реставрація сумок</option>
                        </select>
                        <textarea
                            name="note"
                            value={orderData.note}
                            onChange={(e) => setOrderData({...orderData, note: e.target.value})}
                            placeholder="Додаткові побажання"
                            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <button
                            className="w-full py-4 rounded-xl text-lg font-semibold transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
                            onClick={sendOrder}>
                            Оформити замовлення
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export {
    QuickOrderModal
}