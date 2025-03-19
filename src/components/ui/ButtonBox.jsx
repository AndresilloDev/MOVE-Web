import { useNavigate } from "react-router-dom";

const ButtonBox = ({ text, onClick, to, className = "", width = "auto", height = "auto", borderRadius = "md" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <button 
            className={`bg-action-primary hover:bg-action-hover duration-300 text-text-primary px-4 py-2 border border-lines cursor-pointer ${className} rounded-${borderRadius}`}
            onClick={handleClick}
            style={{ width, height }}
        >
            {text}
        </button>
    );
};

export default ButtonBox;