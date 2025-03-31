import { useState, useEffect } from 'react';
import { 
  getDeviceSensors, 
  getAllSensorsDataInRange, 
  listenToSensorUpdates 
} from '../../api/sensorData.api';
import { getDevice } from '../../api/devices.api';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const SelectedDevicePage = () => {
    const { id: deviceId } = useParams();
    const navigate = useNavigate();
    const [sensors, setSensors] = useState([]);
    const [deviceInfo, setDeviceInfo] = useState({});
    const { getError } = useNotification();
    useEffect(() => {
      if (!deviceId) {
        getError('No device selected');
        return;
      }
  
      const fetchDeviceData = async () => {
        try {
          const [sensorsData, deviceData] = await Promise.all([
            getDeviceSensors(deviceId), 
            getDevice(deviceId)
          ]);
          setSensors(sensorsData);
          setDeviceInfo(deviceData);
        } catch (err) {
          console.error('Error fetching device data:', err);
          getError('Failed to load device information');
          navigate('/devices');
        }
      };
  
      fetchDeviceData(); // Llamada inicial
  
      // Configurar actualización automática cada 5 segundos
      const interval = setInterval(fetchDeviceData, 5000);
  
      return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
    }, [deviceId, navigate]);

  if (!deviceInfo.name) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading device information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{deviceInfo.name || 'Device Dashboard'}</h1>
      <div className="grid grid-cols-5 gap-4 mb-4">
        {sensors.map(sensor => (
          <SensorPanel key={sensor.sensorName} sensor={sensor} />
        ))}
      </div>
    </div>
  );
};

// Definir SensorPanel si no está en otro archivo
const SensorPanel = ({ sensor }) => (
  <div className="p-4 bg-gray-200 rounded-lg shadow">
    <h2 className="text-lg font-bold">{sensor.sensorName}</h2>
    <p>Último valor: {sensor.data?.[sensor.data.length - 1]?.value || 'N/A'}</p>
  </div>
);

export default SelectedDevicePage;