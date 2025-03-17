import { useNavigate } from "react-router-dom";

const ElementCard = ({ item, type }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const routes = {
            buildings: `/classrooms/${item._id}`,
            classrooms: `/devices/${item._id}`,
            devices: `/device-details/${item._id}`
        };
        navigate(routes[type] || "/");
    };

    const renderContent = () => {
        switch (type) {
            case "buildings":
                return (
                    <>
                        <p><span className="font-['Helvetica-Bold']">Nombre:</span> {item.name}</p>
                        <p>Dispositivos registrados: {item.deviceCount}</p>
                        <p>Espacios registrados: {item.spaceCount}</p>
                    </>
                );
            case "classrooms":
                return (
                    <>
                        <p><span className="font-['Helvetica-Bold']">Aula:</span> {item.name}</p>
                        <p>Capacidad: {item.capacity}</p>
                        <p>Dispositivos: {item.deviceCount}</p>
                    </>
                );
            case "devices":
                return (
                    <>
                        <div className="flex space-x-4">
                            <div>
                                <span className="font-['Helvetica-Bold']">Dispositivo:</span> {item.name}
                            </div>
                        </div>
                        <div className="mt-2">
                            <div><span className="font-['Helvetica-Bold']">Aula:</span> {item.space ? item.space.name : 'Aula no disponible'}</div> {/* Nombre del aula */}
                            <div><span className="font-['Helvetica-Bold']">Docencia:</span> {item.building ? item.building.name : 'Edificio no disponible'}</div> {/* Nombre del edificio */}
                        </div>
                    </>
                );
            default:
                return <p>Información no disponible</p>;
        }
    };

    return (
        <div className="
            flex flex-1 flex-col items-start justify-start
            min-w-[320px] w-1/2 max-w-[600px]
            bg-white 
            text-black text-xl
            border rounded-lg border-secondary
            p-4
            cursor-pointer"
            onClick={handleClick}
        >
            {renderContent()}
        </div>
    );
};

export default ElementCard;