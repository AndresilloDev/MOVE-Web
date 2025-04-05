export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row items-center min-h-screen w-full p-6 lg:px-12 lg:pb-24 overflow-hidden">
      {/* Sección de Texto */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center px-4 lg:pl-10 lg:pr-4 text-center lg:text-left">
        <h1 className="font-[UNCAGE-Bold] text-4xl sm:text-4xl lg:text-5xl font-bold mb-8">
          MONITOR DE VARIABLES DE ENTORNO
        </h1>
        <p className="font-helvetica text-base sm:text-lg font-normal mb-2">
          Bienvenido a <strong>MOVE</strong>, conectate y comienza a monitorear las variables de tu enorno.
        </p>
      </div>

      {/* Sección de Imagen */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6">
        <img
          src="../../src/assets/dashboard.png"
          alt="Monitor"
          className="max-w-full h-auto shadow-2xl rounded-2xl"
        />
      </div>
    </div>
  );
}