import InputBox from "../../components/ui/InputBox";
import ButtonBox from "../../components/ui/ButtonBox";
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext, useState} from "react";

export default function RecoverAccountPage() {
    const { handleRecoverPassword } = useContext(AuthContext);
    const [user, setUser] = useState("");
    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 mt-[-10vh]">
            <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">Recupera tu Cuenta</h1>

            <div className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md mt-6">
                <InputBox type="email" label="Correo electrónico" translateX="-1.25rem" setValue={setUser} />
                <a href="/login" className="text-sm text-black underline self-end">Ya tengo una cuenta</a>
                <ButtonBox text="Enviar Código" width="100%" height="40px" onClick={() => handleRecoverPassword(user)} />
            </div>
        </div>
    );
}
