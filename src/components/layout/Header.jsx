import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBox from '../ui/ButtonBox';
import { User } from 'lucide-react';
import { ProfileDialog } from '../ui/dialogs/ProfileDialog';
import logo from '../../assets/logo.png';


const Header = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const [openProfileDialog, setOpenProfileDialog] = React.useState(false);

    return (
        <>
            <div className="bg-header shadow-md w-full h-12 lg:h-16 flex items-center justify-between p-4 sm:p-6 lg:px-22">
                <div className="logo cursor-pointer" onClick={() => navigate("/")}>
                    <img src={logo} alt="MOVE" className="h-8 sm:h-10 w-auto"/>
                </div>

                <div className="auth">
                    {!isLoggedIn ? (
                        <ButtonBox 
                            text="Iniciar Sesión" 
                            to="/login" 
                            height="40px" 
                            borderRadius="lg" 
                        />
                    ) : (
                        <div className="p-2 bg-action-primary rounded-full cursor-pointer" onClick={() => {setOpenProfileDialog(true)}}>
                            <User />
                        </div>
                    )}
                </div>
            </div>
            { openProfileDialog && <ProfileDialog setOpenProfileDialog={setOpenProfileDialog} /> }
        </>
    );
}

export default Header;