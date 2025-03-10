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
            className={`bg-action-primary hover:bg-action-hover text-text-primary px-4 py-2 border border-lines cursor-pointer transition duration-300 ${className} rounded-${borderRadius}`}
            onClick={handleClick}
            style={{ width, height }}
        >
            {text}
        </button>
    );
};

export default ButtonBox;