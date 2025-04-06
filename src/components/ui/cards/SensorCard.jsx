import React from 'react';
import { GaugeComponent } from 'react-gauge-component';
import { Bell, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const SensorCard = ({ sensor, thresholds, className, isSelected, onClick, onConfig }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const deviceId = location.pathname.split('/')[2];

  // Obtener el último valor del sensor
  const latestValue = sensor?.data?.[sensor?.data?.length - 1]?.value ?? 0;

  // Obtener los umbrales (del sensor o pasados explícitamente)
  const { lower, upper } = thresholds || sensor?.thresholds || {};

  // Definir rangos min/max para cada tipo de sensor
  const sensorRanges = {
    'temperature': { min: 0, max: 50 },
    'humidity': { min: 0, max: 100 },
    'co2': { min: 0, max: 3000 },
    'light': { min: 0, max: 3000 },
    'sound': { min: 0, max: 420 }
  };

  // Obtener el rango para este tipo de sensor (o usar valores por defecto)
  const sensorType = sensor?.sensorName?.toLowerCase() || '';
  const { min = 0, max = 100 } = sensorRanges[sensorType] || {};

  // Determinar el color del gauge basado en thresholds
  const getValueColor = () => {
    if (lower !== undefined && upper !== undefined) {
      if (latestValue < lower || latestValue > upper) return '#e74c3c'; // Rojo si está fuera de rango
      return '#2ecc71'; // Verde si está en rango óptimo
    } else if (upper !== undefined) {
      return latestValue > upper ? '#e74c3c' : '#2ecc71';
    } else if (lower !== undefined) {
      return latestValue < lower ? '#e74c3c' : '#2ecc71';
    }
    return '#2ecc71'; // Verde por defecto si no hay umbrales
  };

  // Configurar los arcos en base a los thresholds y al rango del sensor
  const configureArcs = () => {
    // Si no hay umbrales, usar un arco simple verde
    if (lower === undefined && upper === undefined) {
      return {
        colorArray: ['#2ecc71'],
        subArcs: [{ limit: max, color: '#2ecc71' }]
      };
    }

    // Si solo hay umbral superior
    if (lower === undefined && upper !== undefined) {
      return {
        colorArray: ['#2ecc71', '#e74c3c'],
        subArcs: [
          { limit: upper, color: '#2ecc71' },
          { limit: max, color: '#e74c3c' }
        ]
      };
    }

    // Si solo hay umbral inferior
    if (lower !== undefined && upper === undefined) {
      return {
        colorArray: ['#e74c3c', '#2ecc71'],
        subArcs: [
          { limit: lower, color: '#e74c3c' },
          { limit: max, color: '#2ecc71' }
        ]
      };
    }

    // Si hay ambos umbrales
    return {
      colorArray: ['#e74c3c', '#2ecc71', '#e74c3c'],
      subArcs: [
        { limit: lower, color: '#e74c3c' },
        { limit: upper, color: '#2ecc71' },
        { limit: max, color: '#e74c3c' }
      ]
    };
  };

  const arcConfig = configureArcs();

  // Mapa de traducciones para nombres de sensores
  const sensorNameTranslations = {
    'light': 'Luz',
    'humidity': 'Humedad',
    'temperature': 'Temperatura',
    'co2': 'CO₂',
    'sound': 'Sonido'
  };

  // Obtener nombre traducido
  const translatedName = sensorNameTranslations[sensorType] || sensor?.sensorName || '';

  // Unidades para cada tipo de sensor
  const sensorUnits = {
    'temperature': '°C',
    'humidity': '%',
    'light': 'lux',
    'co2': 'ppm',
    'sound': 'dB'
  };

  // Obtener la unidad para este sensor
  const unit = sensorUnits[sensorType] || '';

  // Determinar el estado del sensor
  const getSensorStatus = () => {
    if (lower !== undefined && upper !== undefined) {
      if (latestValue < lower || latestValue > upper) return 'Umbral superado';
    } else if (upper !== undefined && latestValue > upper) {
      return 'Umbral superado';
    } else if (lower !== undefined && latestValue < lower) {
      return 'Umbral superado';
    }
    return 'Normal';
  };

  const sensorStatus = getSensorStatus();

  return (
    <div 
      className={`
        bg-white rounded-lg p-4 border transition-all duration-300 
        ${isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-2 text-left text-gray-800">{translatedName}</h2>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Notificaciones"
            onClick={() => navigate('/notifications?deviceId=' + deviceId+"&sensorType="+sensor.sensorName)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Configuración"
            onClick={() => {
              onConfig({open: true, sensor: sensor});
            }}
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <GaugeComponent
          type="semicircle"
          id={`gauge-${sensor?.id || Math.random().toString(36).substr(2, 9)}`}
          value={latestValue}
          minValue={min}
          maxValue={max}
          arc={{
            colorArray: arcConfig.colorArray,
            padding: 0.02,
            subArcs: arcConfig.subArcs,
            width: 0.3
          }}
          pointer={{
            type: "blob",
            width: 22,
            strokeWidth: 0,
            color: "red",
            baseColor: "#4d4d4d",
            animate: false,
            
          }}
          labels={{
            valueLabel: {
              formatTextValue: value => `${Number(value).toFixed(1)} ${unit}`,
              style: { 
                fontSize: "24px", 
                fontFamily: "sans-serif",
                fill: getValueColor(),
              },
              hide: true
            }
          }}        
          style={{ width: "100%" }}
        />
        
        {/* Valor del sensor centrado */}
        <div className="relative text-md font-semibold text-gray-800 justify-center" style={{ zIndex: 10 }}>
          {`${Number(latestValue).toFixed(1)} ${unit}`}
        </div>

        {/* Mostrar umbrales solo si existen */}
        {(lower !== undefined || upper !== undefined) && (
          <div className="text-xs text-gray-500 mt-2 w-full flex justify-between px-4">
            {lower !== undefined && <span>Min: {lower} {unit}</span>}
            <span className="opacity-0">|</span>
            {upper !== undefined && <span>Max: {upper} {unit}</span>}
          </div>
        )}
        
        {/* Indicador de estado */}
        <div className="mt-3 text-sm font-medium">
          <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${
              sensorStatus === 'Normal' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            <span className={`h-2 w-2 rounded-full mr-1 ${
              sensorStatus === 'Normal' ? 'bg-green-400' : 'bg-red-400'
            }`}></span>
            {sensorStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;