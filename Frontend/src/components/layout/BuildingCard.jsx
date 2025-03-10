const BuildingCard = ({ building }) => {
    return (
        <>
            <div className="
                flex flex-1 flex-col items-start justify-start
                min-w-[320px] w-1/2 max-w-[600px]
                bg-white 
                text-black text-xl
                border rounded-lg  border-secondary
                p-4"
            >
                <div className= "flex flex-row">
                    <p className="mr-1 font-bold">Nombre: </p>
                    <h1 className="mb-2">{building.name}</h1>
                </div>
                <p>Dispositivos registrados: {building.deviceCount}</p>
                <p>Espacios registrados: {building.spaceCount}</p>
            </div>
        </>
    )
}

export default BuildingCard; 