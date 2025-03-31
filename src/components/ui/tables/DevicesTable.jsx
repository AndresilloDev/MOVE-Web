import DeviceCard from "../cards/DeviceCard";
import { ElementsNotAvailable } from "../ElementsNotAvailable";


const DevicesTable = ({ devices = [], onDelete, onSave }) => {
    return (
        <div className="flex flex-wrap justify-start gap-4 py-4">
            {Array.isArray(devices) && devices.length > 0 ? (
                devices.map((device) => (
                    <DeviceCard key={device._id} device={device} onDelete={onDelete} onSave={onSave} />
                ))
            ) : (
                <ElementsNotAvailable element="dispositivos" />
            )}
        </div>
    );
};

export default DevicesTable;