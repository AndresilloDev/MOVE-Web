import BuildingCard from "../cards/BuildingCard";
import { ElementsNotAvailable } from "../ElementsNotAvailable";

const BuildingsTable = ({ buildings = [], onDelete, onSave }) => {
    return (
        <div className="flex flex-wrap justify-start gap-4 py-4">
            {
                Array.isArray(buildings) && buildings.length > 0 ? (
                    buildings.map((building => (
                        <BuildingCard key={building._id} building={building} onDelete={onDelete} onSave={onSave} />
                    ))
            )) : (
                <ElementsNotAvailable element="edificios" />
            )}
        </div>
    );
};

export default BuildingsTable;