import React, { useState } from 'react';

const InputBox = ({ value, setValue, type, label, translateX = "-1.25rem", translateY = "-1.25rem", labelClassName = "", inputClassName = "", spanClassName = "" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(value !== '');

    const handleBlur = (e) => {
        setIsFocused(false);
        setIsFilled(e.target.value !== ''); 
    };

    return (
        <label className={`relative ${isFocused || isFilled ? 'focused' : ''} ${labelClassName}`} style={{ width: '100%' }}>
            <input
                type={type}
                value={value}
                placeholder={label}
                className={`h-10 w-full px-3 text-base text-black border-lines border-1 rounded-md border-opacity-50 outline-none focus:border-black placeholder-gray-300 placeholder-opacity-0 transition duration-200 ${inputClassName}`}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                onChange={(e) => setValue(e.target.value)}
            />
            <span
                className={`text-base text-black text-opacity-80 absolute left-3 px-2 transition duration-200 input-text ${spanClassName}`}
                style={isFocused || isFilled ? { color: '#000', transform: `translateY(${translateY}) translateX(${translateX}) scale(0.75)` } : {}}
            >
                {label}
            </span>
        </label>
    );
}

export default InputBox;