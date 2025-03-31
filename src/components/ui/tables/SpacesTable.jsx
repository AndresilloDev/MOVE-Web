import SpaceCard from "../cards/SpaceCard";
import { ElementsNotAvailable } from "../ElementsNotAvailable";

const SpacesTable = ({ spaces = [], onDelete, onSave }) => {
    return (
        <div className="flex flex-wrap justify-start gap-4 py-4">
            {Array.isArray(spaces) && spaces.length > 0 ? (
                spaces.map((space) => (
                    <SpaceCard key={space._id} space={space} onDelete={onDelete} onSave={onSave} />
                ))
            ) : (
                <ElementsNotAvailable element="espacios" />
            )}
        </div>
    );
};

export default SpacesTable;