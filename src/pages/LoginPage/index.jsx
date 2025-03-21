import { login } from "../../api/auth.api.js";
import InputBox from "../../components/ui/InputBox";
import ButtonBox from "../../components/ui/ButtonBox";
import {useState} from "react";


export default function LoginPage() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); // Estado de error

    const handleSubmit = async () => {
        try {
            const response = await login(user, password);

            if (response.status === 200) {
                console.log(response);
            } else if (response.status === 401) {
                setError(true);
            }

        } catch (err) {
            console.log('Error en la conexión:', err);
            setError(true);
        }

    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 mt-[-10vh]">
            <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">
                Inicia sesión en <span className="font-bold">MOVE</span>
            </h1>

            <div className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md mt-6">
                <InputBox type="email" label="Correo electrónico" translateX="-1.25rem" setValue={setUser} />
                <InputBox type="password" label="Contraseña" translateX="-1rem" setValue={setPassword} />
                <a href="/recover-account" className="text-sm text-black underline self-end">Olvidé mi Contraseña</a>
                <ButtonBox text="Inicia Sesión" width="100%" height="40px" onClick={handleSubmit} />
            </div>
        </div>
    );
}
