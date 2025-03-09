import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBox from '../ui/ButtonBox';

const Header = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-header shadow-md w-full h-12 flex items-center justify-between p-10 px-22">
            <div className="logo">
                <img src="../../src/assets/logo.png" alt="MOVE" className="h-10 w-auto"/>
            </div>
            <div className="auth">  
                {!isLoggedIn && (
                    <ButtonBox text="Iniciar Sesión" to="/login" width="150px" height="40px" borderRadius="lg" />
                )}
            </div>
        </div>
    );
}

export default Header;
