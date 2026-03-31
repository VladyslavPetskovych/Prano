import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {login} from "../../redux/authSlice.js";

const STEPS = {
    PHONE: 1, CODE: 2, ORDER: 3,
};

const QuickOrderModal = ({onClose}) => {
    const [step, setStep] = useState(STEPS.PHONE);
    const [phone, setPhone] = useState("+380");
    const [code, setCode] = useState("");
    const [smsId, setSmsId] = useState(null);
    const [clothTypes, setClothTypes] = useState([])

    const [orderData, setOrderData] = useState({
        name: "", clothType: "", productType: "", note: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendSms = async () => {
        try {
            // const response = await axios.post("http://localhost:3000/phone/send-sms", {phone});
            const response = await axios.post("/api/phone/send-sms", {phone});

            setSmsId(response.data.smsId);
            setStep(STEPS.CODE);
        } catch (error) {
            console.error(error);
        }
    };

    const verifyCode = async () => {
        try {
            // const {data} = await axios.post("http://localhost:3000/phone/verify", {smsId, code});
            const {data} = await axios.post("/api/phone/verify", {smsId, code});

            const {userRegisteredAlready} = data;

            if (userRegisteredAlready) {

                // const {data} = await axios.post("http://localhost:3000/auth", {smsId});
                const {data} = await axios.post("/api/auth", {smsId});

                const {accessToken, refreshToken, userId} = data;

                if (userId) {
                    dispatch(login({accessToken, refreshToken, userId}));
                    navigate("/account");
                } else {
                    console.error("Щось пішло не так. Спробуйте ще раз.");
                }

                return;
            }

            setStep(STEPS.ORDER);
        } catch (error) {
            console.error(error);
        }
    };

    const sendOrder = async () => {
        try {
            // await axios.post("http://localhost:3000/orders/quick/confirm", {smsId, orderData});
            await axios.post("/api/orders/quick/confirm", {smsId, orderData});

            alert("Замовлення надіслано!");
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchMerchandises = async () => {
            try {
                const response = await axios.get("/api/merchandises");
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
                className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between mb-5">
                    <h3 className="text-2xl font-semibold">Швидке замовлення</h3>
                    <button onClick={onClose}>✕</button>
                </div>

                {step === STEPS.PHONE &&
                    <div className="flex flex-col gap-3">
                        <label
                            className="text-m font-medium"
                            style={{ color: "#22282B" }}
                        >
                            Введіть ваш номер телефону
                        </label>

                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                                let value = e.target.value;
                                value = value.replace(/[^\d+]/g, '');
                                if (value.indexOf('+') !== 0 && value.indexOf('+') !== -1) {
                                    value = value.replace(/\+/g, '');
                                }
                                setPhone(value);
                            }}
                            placeholder="Номер телефону"
                            className="w-full p-4 border rounded-xl focus:outline-none"
                            style={{
                                borderColor: "#CEB27F"
                            }}
                            required
                        />
                        <button
                            onClick={sendSms}
                            disabled={!phone || phone.length !== 13}
                            className="
                                w-full py-4 rounded-xl text-lg font-semibold text-white
                                bg-Ndark
                                transition duration-300

                                hover:bg-[#c4a75c]

                                disabled:bg-gray-400
                                disabled:hover:bg-gray-400
                                disabled:cursor-not-allowed
                                disabled:opacity-80
                            "
                        >
                            Надіслати код
                        </button>
                    </div>
                }

                {step === STEPS.CODE &&
                    <div className="flex flex-col gap-3">
                        <label
                            className="text-m font-medium"
                            style={{ color: "#22282B" }}
                        >
                            Введіть код, який ви отримали в SMS
                        </label>

                        <input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value.replace(/\D/g, ""))
                            }
                            placeholder="Код з SMS"
                            className="w-full p-4 border rounded-xl focus:outline-none"
                            style={{
                                borderColor: "#CEB27F"
                            }}
                        />
                        <button
                            onClick={verifyCode}
                            disabled={!code}
                            className="
                                w-full py-4 rounded-xl text-lg font-semibold text-white
                                bg-Ndark
                                transition duration-300

                                hover:bg-[#c4a75c]

                                disabled:bg-gray-400
                                disabled:hover:bg-gray-400
                                disabled:cursor-not-allowed
                                disabled:opacity-80
                            "
                        >
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
                            className="w-full p-4 border rounded-xl focus:outline-none"
                            style={{
                                borderColor: "#CEB27F"
                            }}
                            required
                        />
                        <select
                            name="clothType"
                            value={orderData.clothType}
                            onChange={(e) => setOrderData({...orderData, clothType: e.target.value})}
                            className="w-full p-4 border rounded-xl focus:outline-none"
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
                            className="w-full p-4 border rounded-xl focus:outline-none"
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
                            className="w-full p-4 border rounded-xl focus:outline-none"
                        />
                        <button
                            onClick={sendOrder}
                            disabled={orderData.name === "" || orderData.clothType === "" || orderData.productType === ""}
                            className="
                                w-full py-4 rounded-xl text-lg font-semibold text-white
                                bg-Ndark
                                transition duration-300

                                hover:bg-[#c4a75c]

                                disabled:bg-gray-400
                                disabled:hover:bg-gray-400
                                disabled:cursor-not-allowed
                                disabled:opacity-80
                            "
                        >
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