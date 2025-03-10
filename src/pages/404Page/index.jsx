const NotFoundPage = () => {
    return (
      <div className="flex justify-center items-center flex-col">
        <h1 className="mt-32 sm:mt-10 text-8xl sm:text-9xl font-bold text-primary mb-3">404</h1>
        <p className="sm:text-2xl">Oops! La página que buscas no se ha encontrado</p>
        <a href="/" className="p-2 m-2 bg-white border border-action-primary rounded-lg text-primary">Volver al inicio</a>
        <img 
          src="/404.gif" 
          alt="Cat Wagging Tail" 
          className="mt-2 w-48 h-48 sm:w-96 sm:h-96" 
        />
      </div>
    );
}

export default NotFoundPage