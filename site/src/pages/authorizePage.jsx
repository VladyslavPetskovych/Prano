import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {login} from "../redux/authSlice.js";

const STEPS = {
    PHONE: 1, CODE: 2, NAME: 3,
};

const AuthorizePage = () => {
    const [step, setStep] = useState(STEPS.PHONE);
    const [phone, setPhone] = useState("+380");
    const [code, setCode] = useState("");
    const [smsId, setSmsId] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuth = async (name = null) => {
        try {
            setError("");

            const payload = {smsId};

            if (name) {
                payload.name = name;
            }

            const {data} = await axios.post("http://localhost:3000/auth", payload);
            // const {data} = await axios.post("https://prano.group/api/auth", payload);

            const {accessToken, refreshToken, userId} = data;
            if (userId) {
                dispatch(login({accessToken, refreshToken, userId}));

                navigate("/account");
            } else {
                setError("Щось пішло не так. Спробуйте ще раз.");
            }
        } catch (error) {
            console.error("Auth error:", error);

            setError("Помилка входу. Спробуйте пізніше.");
        }
    };

    const sendSms = async () => {
        try {
            setLoading(true);
            setError("");

            const {data} = await axios.post("http://localhost:3000/phone/send-sms", {phone});
            // const {data} = await axios.post("https://prano.group/api/phone/send-sms", {phone});

            setSmsId(data.smsId);
            setStep(STEPS.CODE);
        } catch (error) {
            console.error("Send sms error:", error);

            setError("Помилка відправки SMS");
        } finally {
            setLoading(false);
        }
    };

    const verifyCode = async () => {
        try {
            setLoading(true);
            setError("");

            const {data} = await axios.post("http://localhost:3000/phone/verify", {smsId, code: Number(code)});
            // const {data} = await axios.post("https://prano.group/api/phone/verify", {smsId, code: Number(code)});

            if (data.userRegisteredAlready === true) {
                await handleAuth();
            } else {
                setStep(STEPS.NAME);
            }
        } catch (error) {
            console.error("Code error:", error);

            setError("Невірний код");
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async () => {
        try {
            setLoading(true);
            setError("");

            await handleAuth(name);
        } catch (error) {
            console.error("Registration error:", error);

            setError("Помилка реєстрації");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4 py-10 min-h-[100dvh]">

            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl">

                <h2 className="text-2xl font-semibold mb-5 text-center"
                    style={{color: "#22282B"}}>
                    Авторизація
                </h2>

                {error &&
                    <p className="mb-3 text-sm text-red-500 text-center">
                        {error}
                    </p>
                }

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
                            disabled={!phone || phone === "+380" || loading}
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
                            disabled={!code || loading}
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

                {step === STEPS.NAME &&
                    <div className="flex flex-col gap-3">

                        <label
                            className="text-m font-medium"
                            style={{ color: "#22282B" }}
                        >
                            Введіть ваше імʼя
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Імʼя"
                            className="w-full p-4 border rounded-xl focus:outline-none"
                            style={{
                                borderColor: "#CEB27F"
                            }}
                        />

                        <button
                            onClick={registerUser}
                            disabled={!name || loading}
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
                            Завершити реєстрацію
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export {
    AuthorizePage
}