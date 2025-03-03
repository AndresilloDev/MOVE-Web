import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-header shadow-md w-full h-12 flex items-center justify-between p-10 px-22">
            <div className="logo">
                <img src="../../src/assets/logo.png" alt="MOVE" className="h-full" />
            </div>
            <div className="auth">
                {!isLoggedIn && (
                    <button 
                        className="bg-action-primary hover:bg-action-hover text-text-primary px-4 py-2 rounded-md border border-lines cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Iniciar Sesión
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header;
