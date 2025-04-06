import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const ButtonBox = ({ 
    text, 
    onClick, 
    to, 
    className = "", 
    width = "auto", 
    height = "auto", 
    borderRadius = "md",
    // Nuevo prop para controlar el comportamiento
    loadingType = "none", // 'none' | 'redirect' | 'modal' (default: 'none')
    // Tiempo mínimo para modales (ms)
    minLoadingTime = 1000 
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        const startTime = Date.now();

        try {
            if (to) {
                await Promise.resolve(); // Pequeño delay para que se vea el loader
                navigate(to);
            } else if (onClick) {
                await Promise.resolve(onClick());
            }
        } catch (error) {
            console.error("Button action failed:", error);
        } finally {
            if (loadingType === "modal") {
                // Calculamos el tiempo restante para cumplir con el mínimo
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
                
                setTimeout(() => {
                    setIsLoading(false);
                }, remainingTime);
            } else if (loadingType === "redirect") {
                // No hacemos nada, el loader se ocultará al cambiar de página
            } else {
                setIsLoading(false);
            }
        }
    };

    return (
        <button 
            className={`
                bg-action-primary hover:bg-action-hover 
                transition-all duration-200 text-text-primary 
                px-4 py-2 border border-lines 
                ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${className} rounded-${borderRadius}
                flex items-center justify-center gap-2
                min-w-[100px] relative
                disabled:opacity-70
            `}
            onClick={handleClick}
            style={{ width, height }}
            disabled={isLoading}
        >
            <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {text}
            </span>
            
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5" />
                </div>
            )}
        </button>
    );
};

export default ButtonBox;