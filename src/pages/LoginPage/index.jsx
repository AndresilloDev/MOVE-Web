import Header from "../../components/layout/Header";
import InputBox from "../../components/ui/InputBox";
import ButtonBox from "../../components/ui/ButtonBox";

export default function LoginPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 mt-[-10vh]">
            <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">
                Inicia sesión en <span className="font-bold">MOVE</span>
            </h1>

            <div className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md mt-6">
                <InputBox type="email" label="Correo electrónico" translateX="-1.25rem" />
                <InputBox type="password" label="Contraseña" translateX="-1rem" />
                <a href="/recover-account" className="text-sm text-black underline self-end">Olvidé mi Contraseña</a>
                <ButtonBox text="Inicia Sesión" width="100%" height="40px" onClick={() => console.log("Acción ejecutada")} />
            </div>
        </div>
    );
}
