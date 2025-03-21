import React, { useState } from 'react';

const InputBox = ({ setValue, type, label, translateX = "-1.25rem" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleBlur = (e) => {
        setIsFocused(false);
        setIsFilled(e.target.value !== '');
    };

    return (
        <label className={`relative ${isFocused || isFilled ? 'focused' : ''}`} style={{ width: '100%'}}>
            <input
                type={type}
                placeholder={label}
                className='h-10 w-full px-3 text-base text-black bg-white border-lines border-1 rounded-md border-opacity-50 outline-none focus:border-black placeholder-gray-300 placeholder-opacity-0 transition duration-200'
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                onChange={(e) => setValue(e.target.value)}
            />
            <span
                className='text-base text-black text-opacity-80 bg-white absolute left-3 top-2.5 px-2 transition duration-200 input-text'
                style={isFocused || isFilled ? { color: '#000', transform: `translateY(-1.25rem) translateX(${translateX}) scale(0.75)` } : {}}
            >
                {label}
            </span>
        </label>
    );
}

export default InputBox;