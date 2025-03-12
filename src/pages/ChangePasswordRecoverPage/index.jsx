import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ChangePasswordRecoverPage = () => {
    const [code, setCode] = useState(["", "", "", "", ""]);

    return (
        <div className="relative w-full min-h-screen bg-[radial-gradient(circle, #737373 10%, transparent 10%)]">
            <div className="absolute inset-0 bg-[url('/path/to/your/background-image.png')] bg-cover bg-center"></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center w-96">
                    <h2 className="text-xl font-bold mb-6 text-center text-black">Confirmar tu cuenta</h2>
                    <div className="flex space-x-2 mb-6">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                className="border border-gray-300 rounded-lg w-12 h-12 text-center"
                                maxLength={1}
                                type="text"
                                value={digit}
                                onChange={(e) => {
                                    const newCode = [...code];
                                    newCode[index] = e.target.value;
                                    setCode(newCode);
                                }}
                            />
                        ))}
                    </div>
                    <button
                        className="bg-action-primary hover:bg-action-hover text-black font-bold py-2 px-6 rounded-lg border border-gray-400 w-4/5"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordRecoverPage;