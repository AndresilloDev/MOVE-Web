import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBox from '../ui/ButtonBox';

const Header = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-header shadow-md w-full h-12 lg:h-16 flex items-center justify-between p-4 sm:p-6 lg:px-22">
            <div className="logo cursor-pointer" onClick={() => navigate("/")}>
                <img src="../../src/assets/logo.png" alt="MOVE" className="h-8 sm:h-10 w-auto"/>
            </div>

            <div className="auth">
                {!isLoggedIn && (
                    <ButtonBox 
                        text="Iniciar Sesión" 
                        to="/login" 
                        height="36px" 
                        smHeight="40px"
                        borderRadius="lg" 
                    />
                )}
            </div>
        </div>
    );
}

export default Header;