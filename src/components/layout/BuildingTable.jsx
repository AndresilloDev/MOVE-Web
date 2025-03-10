import BuildingCard from "./BuildingCard";

const BuildingTable = ({buildings}) => {
    return (
        <div className="flex flex-wrap justify-start gap-4 py-4">
            {buildings.map((building) => (
                <BuildingCard key={building._id} building={building} />
            ))}
        </div>
    );
}

export default BuildingTable