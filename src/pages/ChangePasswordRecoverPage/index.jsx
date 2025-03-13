import React, { useState, useRef } from "react";
import ButtonBox from "../../components/ui/ButtonBox";

const ChangePasswordRecoverPage = () => {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (!/^[a-zA-Z0-9]?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen mt-[-10vh]">
            <div className="p-6 flex flex-col items-center w-96">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-black">Confirmar tu cuenta</h2>
                <div className="flex space-x-3 mb-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className={`h-12 w-12 text-center text-lg text-black bg-white border border-opacity-50 rounded-md outline-none transition duration-200 ${
                                code[index] ? "border-black" : "border-gray-300"
                            }`}
                            maxLength={1}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                        />
                    ))}
                </div>
                <ButtonBox text="Confirmar" width="50%" height="40px" onClick={() => console.log("Código ingresado:", code.join(""))} />
            </div>
        </div>
    );
};

export default ChangePasswordRecoverPage;
