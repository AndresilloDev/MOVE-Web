import SettingIcon from '../assets/settings.svg'
import NotificationIcon from '../assets/notification.svg'
import NotificationAlertIcon from '../assets/notification_alert.svg'
import { useState } from 'react'

const SensorCard = ({/*sensor*/}) => {
    /* Siendo sensor: */
    let sensor = {
        nombre: "Temperatura", 
        actual:24,
        /* Opcionales, suponer valores genericos de no estar: */
        umbral_inf:18,
        umbral_sup:34,
        lim_inf:0,
        lim_sup:100
    }

    const umbralExceeded =  (sensor.umbral_sup && sensor.actual > sensor.umbral_sup) ||
                            (sensor.umbral_inf && sensor.actual < sensor.umbral_inf) 

    let [isUmbralExceeded, setIsUmbralExceeded] = useState(umbralExceeded);

    const getFormattedValue = (sensor) => {
        switch (sensor.nombre) {
            case "Temperatura":
                return `${sensor.actual}°C`;
            case "Humedad":
                return `${sensor.actual}%`;
            case "Co2":
                return `${sensor.actual}%`;
            case "Ruido":
                return `${sensor.actual}dB`;
            default:
                return `${sensor.actual}`;
        }
    };

    const actualValue = getFormattedValue(sensor)

    return (
        <>
            <div className="w-64 border rounded-2xl h-34 bg-secondary-background p-2">
                <div 
                    className="flex flex-row justify-between"
                    >
                    <h1 className="">{sensor.nombre}</h1>
                    <div 
                        className="flex flex-row"
                        >
                        <img src={SettingIcon} alt="Settings"
                            className="w-10 h-5"
                        />
                        <img 
                            src={isUmbralExceeded ? NotificationAlertIcon : NotificationIcon} 
                            alt={isUmbralExceeded ? "Alert" : "Notification"}
                            className="w-5 h-5"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        
                    </div>
                    <h2>{actualValue}</h2>
                    <h2>Actual</h2>
                </div>
            </div>
        </>
    )
}

export default SensorCard;