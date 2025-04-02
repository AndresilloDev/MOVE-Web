import { AuthContext } from "../../context/AuthContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import InputBox from "../../components/ui/InputBox";
import ButtonBox from "../../components/ui/ButtonBox";
import { useContext, useState } from "react";

export default function LoginPage() {
    const { handleLogin } = useContext(AuthContext);
    const { getError, getSuccess } = useNotification();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        if (!user || !password) {
            getError("Todos los campos son obligatorios");
            return;
        }

        try {
            await handleLogin(user, password); 
        } catch (error) {
            getError("Ocurrió un error al iniciar sesión");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 mt-[-10vh]">
            <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">
                Inicia sesión en <span className="font-bold">MOVE</span>
            </h1>

            <div className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md mt-6">
                <InputBox type="email" label="Usuario" translateX="-.7rem" setValue={setUser} inputClassName="bg-white" spanClassName="bg-white top-2.5"/>
                <InputBox type="password" label="Contraseña" translateX="-1rem" setValue={setPassword} inputClassName="bg-white" spanClassName="bg-white top-2.5"/>
                <a href="/recover-account" className="text-sm text-black underline self-end">Olvidé mi Contraseña</a>
                <ButtonBox text="Inicia Sesión" width="100%" height="40px" onClick={handleLoginClick}/>
            </div>
        </div>
    );
}
