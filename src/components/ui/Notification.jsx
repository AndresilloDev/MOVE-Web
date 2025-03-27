import { useState, useEffect } from "react";
import { Clear, CheckCircle, Error, Info, Warning } from "@mui/icons-material";

export const Notification = ({ open, severity, message, handleClose }) => {
    const [visible, setVisible] = useState(open);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        setVisible(open);
        if (open) {
            setProgress(100);
            const interval = setInterval(() => {
                setProgress((prev) => Math.max(prev - 2, 0));
            }, 100);

            const timer = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [open, handleClose]);

    const severityStyles = {
        success: "bg-white border border-green-400 text-black",
        error: "bg-white border border-red-400 text-black",
        info: "bg-white border border-blue-400 text-black",
        warning: "bg-white border border-yellow-400 text-black",
    };

    const progressBarStyles = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500",
    };

    const severityIcons = {
        success: <CheckCircle className="text-green-500 text-2xl" />,
        error: <Error className="text-red-500 text-2xl" />,
        info: <Info className="text-blue-500 text-2xl" />,
        warning: <Warning className="text-yellow-500 text-2xl" />,
    };

    return (
        <div
            className={`fixed bottom-5 right-5 z-50 p-4 rounded-xl shadow-lg flex flex-col transition-all duration-300 transform 
                ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"} 
                ${severityStyles[severity]}`}
            style={{ width: "350px", height: "80px" }}
        >
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center">
                    {severityIcons[severity]}
                    <div className="ml-3">
                        <p className="font-medium">{message}</p>
                    </div>
                </div>
                <button
                    onClick={() => setVisible(false)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <Clear />
                </button>
            </div>
            <div className="w-full h-1.5 mt-3 rounded-full overflow-hidden bg-gray-200">
                <div
                    className={`${progressBarStyles[severity]} h-full`}
                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                ></div>
            </div>
        </div>
    );
};
