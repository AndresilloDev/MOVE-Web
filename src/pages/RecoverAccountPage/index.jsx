import InputBox from "../../components/ui/InputBox";
import ButtonBox from "../../components/ui/ButtonBox";

export default function RecoverAccountPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-8 mt-[-10vh]">
            <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">Recupera tu Cuenta</h1>

            <div className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md mt-6">
                <InputBox type="email" label="Correo electrónico" translateX="-1.25rem" />
                <a href="/login" className="text-sm text-black underline self-end">Ya tengo una cuenta</a>
                <ButtonBox text="Enviar Código" width="100%" height="40px" onClick={() => console.log("Acción ejecutada")} />
            </div>
        </div>
    );
}
