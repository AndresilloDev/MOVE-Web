import ElementCard from "./ElementCard";

const CardsTable = ({ items, type, onDelete }) => {
    return (
        <div className="flex flex-wrap justify-start gap-4 py-4">
            {items.map((item) => (
                <ElementCard key={item._id} item={item} type={type} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default CardsTable;