import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const SensorChart = ({ 
  historicalData, 
  selectedSensor, 
  isDataLoading, 
  sensorColors, 
  getSensorUnit, 
  handleDateRangeReset 
}) => {
  return (
    <div className="h-80 w-full">
      {isDataLoading ? (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : historicalData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={historicalData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              tick={{fontSize: 12}} 
              angle={-45} 
              textAnchor="end"
              height={60}
            />
            <YAxis 
              label={{ 
                value: getSensorUnit(), 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
              domain={[0, selectedSensor.thresholds?.upper || 'auto']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                padding: '8px 12px'
              }}
              formatter={(value) => [`${value} ${getSensorUnit()}`, selectedSensor.sensorName]}
              labelFormatter={(label) => `Fecha: ${label}`}
            />
            <Legend />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={sensorColors[selectedSensor.sensorName.toLowerCase()] || "#2563EB"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={sensorColors[selectedSensor.sensorName.toLowerCase()] || "#2563EB"} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            
            {/* Linea de el umbral maximo */}
            {selectedSensor.thresholds?.upper !== undefined && (
              <ReferenceLine
                y={selectedSensor.thresholds.upper}
                label={{ 
                  value: `Máx: ${selectedSensor.thresholds.upper} ${getSensorUnit()}`,
                  position: 'insideTopRight',
                  fill: '#EF4444',
                  fontSize: 12
                }}
                stroke="#EF4444"
                strokeDasharray="3 3"
              />
            )}
            
            {/* Linea del umbral minino */}
            {selectedSensor.thresholds?.lower !== undefined && (
              <ReferenceLine
                y={selectedSensor.thresholds.lower}
                label={{ 
                  value: `Mín: ${selectedSensor.thresholds.lower} ${getSensorUnit()}`,
                  position: 'insideBottomRight',
                  fill: '#F59E0B',
                  fontSize: 12
                }}
                stroke="#F59E0B"
                strokeDasharray="3 3"
              />
            )}
            <Line
              name={selectedSensor.sensorName}
              type="monotone"
              dataKey="value"
              stroke={sensorColors[selectedSensor.sensorName.toLowerCase()] || "#2563EB"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              fillOpacity={0.2}
              fill="url(#colorValue)"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-2">No hay datos disponibles para el rango seleccionado</p>
          <button 
            onClick={handleDateRangeReset} 
            className="text-blue-600 text-sm hover:underline"
          >
            Ver últimas 24 horas
          </button>
        </div>
      )}
    </div>
  );
};

export default SensorChart;