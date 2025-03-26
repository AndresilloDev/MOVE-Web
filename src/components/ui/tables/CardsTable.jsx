import ElementCard from "../cards/ElementCard";

const CardsTable = ({ items = [], type, onDelete, onSave }) => {
    return (
        <div className="flex flex-wrap justify-start gap-4 py-4">
            {Array.isArray(items) && items.length > 0 ? (
                items.map((item) => (
                    <ElementCard key={item._id} item={item} type={type} onDelete={onDelete} onSave={onSave} />
                ))
            ) : (
                <p className="text-gray-500">No hay elementos disponibles.</p>
            )}
        </div>
    );
};

export default CardsTable;