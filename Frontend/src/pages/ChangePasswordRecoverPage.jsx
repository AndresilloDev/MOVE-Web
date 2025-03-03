import React, { useState } from "react";

const ChangePasswordRecoverPage = () => {
    const [code, setCode] = useState(["", "", "", "", ""]);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('../assets/bg.png')" }}>
            <div className="mt-20 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center w-96">
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
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg border border-gray-400 w-4/5"
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordRecoverPage;
