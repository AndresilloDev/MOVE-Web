import React, {useState, useContext} from "react";
import ButtonBox from "../../components/ui/ButtonBox";
import InputBox from "../../components/ui/InputBox.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

const ChangePasswordRecoverPage = () => {
    const { handleChangePassword } = useContext(AuthContext);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 mt-[-10vh]">
            <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">
                Cambiar contraseña
            </h1>

            <div
                className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md mt-6">
                <InputBox type="password" label="Nueva Contraseña" translateX="-1rem" setValue={setNewPassword}
                          inputClassName="bg-secondary-background" spanClassName="bg-secondary-background top-2.5"/>
                <InputBox type="password" label="Confirmar Contraseña" translateX="-1rem" setValue={setConfirmPassword}
                          inputClassName="bg-secondary-background" spanClassName="bg-secondary-background top-2.5"/>
                <ButtonBox text="Actualizar contraseña" width="100%" height="40px" onClick={() => {{handleChangePassword(newPassword, confirmPassword)}}}/>
            </div>
        </div>
    );
};

export default ChangePasswordRecoverPage;
