export default function HomePage() {
    return (
      <div className="flex flex-col lg:flex-row items-center p-6 lg:p-16">
        {/* Sección de Texto */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-4 lg:pl-10 lg:pr-4 text-center lg:text-left">
          <h1 className="font-[UNCAGE-Bold] text-4xl sm:text-4xl lg:text-5xl font-bold mb-12 mt-8">
            MONITOR DE VARIABLES DE ENTORNO
          </h1>
          <p className="font-helvetica text-base sm:text-lg font-normal mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptas placeat numquam te.
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
  