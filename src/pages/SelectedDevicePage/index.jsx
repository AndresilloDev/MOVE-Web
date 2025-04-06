import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getDeviceSensors,
  getAllSensorDataInRange,
  listenToSensorUpdates
} from '../../api/sensorData.api';
import { getDevice, updateSensorThresholds } from '../../api/devices.api';
import { useNotification } from '../../context/NotificationContext';
import SensorCard from '../../components/ui/cards/SensorCard';
import SensorChart from '../../components/ui/SensorChart';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Loader } from "../../components/ui/Loader";
import ConfigSensorDialog from '../../components/ui/dialogs/ConfigSensorDialog';

// Cositas
const SENSOR_ORDER = ['temperature', 'humidity', 'co2', 'light', 'sound'];
const SENSOR_COLORS = {
  temperature: "#FF5733",
  humidity: "#33A1FF",
  co2: "#5733FF",
  light: "#FFD133",
  sound: "#33FF57"
};
const SENSOR_UNITS = {
  temperature: '°C',
  humidity: '%',
  co2: 'ppm',
  light: 'lux',
  sound: 'dB'
};
const UPDATE_INTERVAL = 5000; // 5 segundos

const SelectedDevicePage = () => {
  const { id: deviceId } = useParams();
  const navigate = useNavigate();
  const { getError, getSuccess } = useNotification();
  
  // Estados principales
  const [sensors, setSensors] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [openConfigDialog, setOpenConfigDialog] = useState({
    open: false,
    sensor: null
  });
  
  // Referencias para el slider
  const scrollContainerRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  // Ordenamos los sensores según orden
  const sortedSensors = useMemo(() => {
    if (!sensors.length) return [];
    
    return [...sensors].sort((a, b) => {
      const indexA = SENSOR_ORDER.indexOf(a.sensorName.toLowerCase());
      const indexB = SENSOR_ORDER.indexOf(b.sensorName.toLowerCase());
      return indexA - indexB;
    });
  }, [sensors]);

  // Inicializar el rango de fechas al entrar (últimas 24 horas)
  useEffect(() => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    setDateRange({
      endDate: toLocalMexicoDateTimeString(now),
      startDate: toLocalMexicoDateTimeString(yesterday)
    });
  }, []);

  // Función para reiniciar el rango de fechas a las últimas 24 horas
  const handleDateRangeReset = useCallback(() => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    setDateRange({
      endDate: toLocalMexicoDateTimeString(now),
      startDate: toLocalMexicoDateTimeString(yesterday)
    });
  }, []);

  // Obtener los datos del dispositivo y configurar actualizaciones en tiempo real
  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        // Obtener info del dispositivo
        const deviceResponse = await getDevice(deviceId);
        setDeviceInfo(deviceResponse.data);

        // Obtener sensores del dispositivo
        const sensorsResponse = await getDeviceSensors(deviceId);
        
        setSensors(prevSensors => {
          const newSensors = sensorsResponse.data;
          
          if (JSON.stringify(prevSensors) !== JSON.stringify(newSensors)) {
            if (!selectedSensor && newSensors.length > 0) {
              const tempSensor = newSensors.find(s => 
                s.sensorName.toLowerCase() === 'temperature'
              );
              setSelectedSensor(tempSensor || newSensors[0]);
            }
            return newSensors;
          }
          return prevSensors;
        });
        
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Error al cargar los datos del dispositivo:", err);
        getError('No se pudo cargar la información del dispositivo');
        navigate('/devices');
      }
    };

    // Carga inicial de datos
    fetchDeviceData();

    const updateInterval = setInterval(async () => {
      try {
        const sensorsResponse = await getDeviceSensors(deviceId);
        
        setSensors(prevSensors => {
          const newSensors = sensorsResponse.data;
          if (JSON.stringify(prevSensors) !== JSON.stringify(newSensors)) {
            return newSensors;
          }
          return prevSensors;
        });
        
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Error al actualizar datos de sensores:", err);
      }
    }, UPDATE_INTERVAL);

    // Listener de actualizaciones en tiempo real
    const unsubscribe = listenToSensorUpdates((data) => {
      if (data.deviceId === deviceId) {
        setSensors(prevSensors => {
          if (!prevSensors) return prevSensors;
          
          const updatedSensors = [...prevSensors];
          const sensorIndex = updatedSensors.findIndex(s => s.id === data.sensorId);
          
          if (sensorIndex !== -1) {
            updatedSensors[sensorIndex] = {
              ...updatedSensors[sensorIndex],
              lastReading: data.reading
            };
            return updatedSensors;
          }
          
          return prevSensors;
        });
        
        setLastUpdated(new Date());
      }
    });

    return () => {
      clearInterval(updateInterval);
      unsubscribe();
    };
  }, [deviceId, navigate, getError, selectedSensor]);

  // Obtenemos datos históricos cuando cambia el sensor o el rango de fechas
  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!selectedSensor || !dateRange.startDate || !dateRange.endDate) return;
      
      setLoading(true);
      
      try {
        // Convertimos las fechas locales a ISO
        const start = new Date(dateRange.startDate).toISOString();
        const end = new Date(dateRange.endDate).toISOString();
        
        const response = await getAllSensorDataInRange(deviceId, {
          start,
          end,
          sensorName: selectedSensor?.sensorName
        });
    
        if (response.data && response.data.length > 0) {
          const sensorData = response.data[0];
          
          if (sensorData && sensorData.data && sensorData.data.length > 0) {
            const formattedData = sensorData.data.map(item => ({
              time: new Date(item.time).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              }),
              timestamp: new Date(item.time),
              value: item.value,
              upper: selectedSensor.thresholds?.upper,
              lower: selectedSensor.thresholds?.lower
            }));
            
            formattedData.sort((a, b) => a.timestamp - b.timestamp);
            
            setHistoricalData(formattedData);
          } else {
            setHistoricalData([]);
          }
        } else {
          setHistoricalData([]);
        }
      } catch (err) {
        console.error("Error al cargar datos históricos:", err);
        getError('No se pudieron cargar los datos históricos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistoricalData();
  }, [selectedSensor, dateRange.startDate, dateRange.endDate, deviceId, getError]);

  // Control de navegación del slider
  useEffect(() => {
    const container = scrollContainerRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;
    
    if (!container || !leftArrow || !rightArrow) return;
    
    const checkOverflow = () => {
      const isOverflowing = container.scrollWidth > container.clientWidth;
      leftArrow.style.display = container.scrollLeft > 0 ? 'flex' : 'none';
      rightArrow.style.display = isOverflowing && container.scrollLeft < container.scrollWidth - container.clientWidth ? 'flex' : 'none';
    };
    
    checkOverflow();
    
    container.addEventListener('scroll', checkOverflow);
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      container.removeEventListener('scroll', checkOverflow);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [sortedSensors]);

  // Manejadores de eventos
  const handleSensorSelect = useCallback((sensor) => {
    setSelectedSensor(sensor);
  }, []);

  const handleDateChange = useCallback((field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const scrollSlider = useCallback((direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = 280;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  // Función para convertir Date a string en formato datetime-local (horario México)
  const toLocalMexicoDateTimeString = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
  };

  const formatDateTime = useCallback((date) => {
    return date.toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const getSensorUnit = useCallback(() => {
    if (!selectedSensor) return '';
    return SENSOR_UNITS[selectedSensor.sensorName.toLowerCase()] || '';
  }, [selectedSensor]);

  // Calcular los stats de los datos históricos
  const stats = useMemo(() => {
    if (!historicalData.length) return {};
    
    const values = historicalData.map(item => item.value);
    return {
      current: historicalData[historicalData.length - 1]?.value.toFixed(1),
      average: (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1),
      min: Math.min(...values).toFixed(1),
      max: Math.max(...values).toFixed(1)
    };
  }, [historicalData]);

  // Función para traducir nombres de sensores
  const getSensorDisplayName = useCallback((sensorName) => {
    const nameMap = {
      'temperature': 'Temperatura', 
      'humidity': 'Humedad', 
      'co2': 'CO₂', 
      'light': 'Luz', 
      'sound': 'Sonido'
    };
    
    return nameMap[sensorName.toLowerCase()] || sensorName;
  }, []);

  const handleUpdateThresholds = async (data) => {
    try {
        const response = await updateSensorThresholds(data);
        if (response.status !== 200) 
            throw new Error("Error al actualizar los umbrales del sensor");
          
        getSuccess("Umbrales actualizados correctamente");
        setOpenConfigDialog({ open: false, sensor: null });
    } catch (error) {
        console.error(error);
        getError("Error al actualizar umbrales");
    }
  };

  return (
    <>
      {loading && (
          <Loader />
      )}
  
      <div className={`container mx-auto px-4 py-6 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
            {deviceInfo.name || 'Panel de Control'}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Última actualización: {formatDateTime(lastUpdated)}</span>
            <span className="p-1 bg-blue-50 rounded-full">
              <RefreshCw size={16} className="text-blue-600" />
            </span>
          </div>
        </div>
  
        {/* Slider de sensores */}
        <div className="relative mb-8">
          <div className="relative">
            <button
              ref={leftArrowRef}
              onClick={() => scrollSlider('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ display: 'none' }}
            >
              <ChevronLeft size={20} />
            </button>
  
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto py-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 min-w-max px-8 items-center">
                {sortedSensors.map(sensor => (
                  <div key={sensor.id} className="flex-shrink-0">
                    <SensorCard 
                      sensor={sensor} 
                      isSelected={selectedSensor?._id === sensor._id}
                      onClick={() => handleSensorSelect(sensor)}
                      className="w-64 h-full"
                      onConfig={setOpenConfigDialog}
                    />
                  </div>
                ))}
              </div>
            </div>
  
            <button
              ref={rightArrowRef}
              onClick={() => scrollSlider('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
  
            <div className="absolute left-0 top-0 bg-gradient-to-r from-white to-transparent w-8 h-full pointer-events-none"></div>
            <div className="absolute right-0 top-0 bg-gradient-to-l from-white to-transparent w-8 h-full pointer-events-none"></div>
          </div>
        </div>
  
        {/* Sección de gráficos */}
        <div className="bg-white rounded-lg shadow-md p-6 mx-6 border border-gray-200 mb-50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedSensor 
                  ? `Histórico de ${getSensorDisplayName(selectedSensor.sensorName)}` 
                  : 'Selecciona un sensor'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Rango de fechas para visualizar datos
              </p>
            </div>
  
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col">
                <label htmlFor="start-date" className="text-sm text-gray-600 mb-1">Inicio:</label>
                <input
                  id="start-date"
                  type="datetime-local"
                  value={dateRange.startDate}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="end-date" className="text-sm text-gray-600 mb-1">Fin:</label>
                <input
                  id="end-date"
                  type="datetime-local"
                  value={dateRange.endDate}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
  
          {selectedSensor ? (
            <>
              <SensorChart
                historicalData={historicalData}
                selectedSensor={selectedSensor}
                loading={loading}
                sensorColors={SENSOR_COLORS}
                getSensorUnit={getSensorUnit}
                handleDateRangeReset={handleDateRangeReset}
              />
  
              {historicalData.length > 0 && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <p className="text-gray-500 text-sm mb-1">Valor Actual</p>
                      <p className="text-2xl font-bold" style={{ color: SENSOR_COLORS[selectedSensor.sensorName.toLowerCase()] || "#2563EB" }}>
                        {stats.current} <span className="text-sm font-normal text-gray-500">{getSensorUnit()}</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <p className="text-gray-500 text-sm mb-1">Promedio</p>
                      <p className="text-2xl font-bold text-gray-700">
                        {stats.average} <span className="text-sm font-normal text-gray-500">{getSensorUnit()}</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <p className="text-gray-500 text-sm mb-1">Mínimo</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {stats.min} <span className="text-sm font-normal text-gray-500">{getSensorUnit()}</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <p className="text-gray-500 text-sm mb-1">Máximo</p>
                      <p className="text-2xl font-bold text-red-500">
                        {stats.max} <span className="text-sm font-normal text-gray-500">{getSensorUnit()}</span>
                      </p>
                    </div>
                  </div>
  
                  {(selectedSensor.thresholds?.upper !== undefined || selectedSensor.thresholds?.lower !== undefined) && (
                    <div className="mt-6 p-4 rounded-lg border bg-blue-50 border-blue-200">
                      <h3 className="font-medium mb-2">Estado del sensor</h3>
                      <div className="space-y-2">
                        {selectedSensor.thresholds?.upper !== undefined && stats.current > selectedSensor.thresholds.upper && (
                          <p className="text-red-600 text-sm flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                            El valor actual está por encima del umbral máximo ({selectedSensor.thresholds.upper} {getSensorUnit()})
                          </p>
                        )}
                        {selectedSensor.thresholds?.lower !== undefined && stats.current < selectedSensor.thresholds.lower && (
                          <p className="text-amber-600 text-sm flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                            El valor actual está por debajo del umbral mínimo ({selectedSensor.thresholds.lower} {getSensorUnit()})
                          </p>
                        )}
                        {((selectedSensor.thresholds?.upper !== undefined && 
                          stats.current <= selectedSensor.thresholds.upper && 
                          (selectedSensor.thresholds?.lower === undefined || stats.current >= selectedSensor.thresholds.lower)) || 
                          (selectedSensor.thresholds?.upper === undefined && 
                          selectedSensor.thresholds?.lower !== undefined && 
                          stats.current >= selectedSensor.thresholds.lower)) && (
                          <p className="text-green-600 text-sm flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            El sensor está funcionando dentro de los límites normales
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">Selecciona un sensor para ver datos</p>
            </div>
          )}
  
          {selectedSensor && !historicalData.length && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-700 text-sm">
                No hay suficientes datos para este sensor en el rango seleccionado. Intenta ampliar el rango de tiempo o verifica la conexión del dispositivo.
              </p>
            </div>
          )}
        </div>
      </div>

      {openConfigDialog.open && (
        <ConfigSensorDialog 
          onClose={() => setOpenConfigDialog({open: false, sensor: null})} 
          sensor={openConfigDialog.sensor} 
          deviceId={deviceId}
          onSave={handleUpdateThresholds}
        />
      )}
    </>
  );
};

export default SelectedDevicePage;