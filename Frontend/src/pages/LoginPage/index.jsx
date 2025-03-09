import Header from "../../components/layout/Header";
import InputBox from "../../components/ui/InputBox";
import ButtonBox from "../../components/ui/ButtonBox";

export default function LoginPage() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <Header isLoggedIn={false} />
            
            <div className="flex flex-col justify-center items-center h-5/6 space-y-6 px-4 sm:px-8">
                <h1 className="text-3xl font-semibold text-black text-center sm:text-4xl">Inicia sesión en <span className="font-bold">MOVE</span></h1>
                
                <div className="flex flex-col space-y-4 justify-center items-center w-full max-w-xs sm:max-w-md lg:max-w-2md">
                    <InputBox type="email" label="Correo electrónico" translateX="-1.25rem" />
                    <InputBox type="password" label="Contraseña" translateX="-1rem"/>
                    <a href="#" className="text-sm text-black underline self-end">Olvide mi Contraseña</a>
                    <ButtonBox text="Inicia Sesión" width="100%" height="40px" onClick={() => console.log("Acción ejecutada")} />
                </div>
            </div>
        </div>
    );
}