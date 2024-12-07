import React, { useEffect } from 'react';
import { useHistorial } from '../Context/HistorialContext'; // Importamos el hook del contexto

const HistorialViaje: React.FC = () => {
  const { viajes } = useHistorial(); // Accedemos al historial de viajes

  useEffect(() => {
    // Este hook se ejecuta cuando el componente se monta
    console.log('Historial de viajes:', viajes);
  }, [viajes]);

  return (
    <div className="historial-viaje">
      <h1>Historial de Viajes</h1>
      <div className="viajes-lista">
        {viajes.length === 0 ? (
          <p>No has realizado viajes aún.</p>
        ) : (
          viajes.map((viaje, index) => (
            <div key={index} className="viaje-card">
              <h2>Viaje {index + 1}</h2>
              <p><strong>Fecha:</strong> {viaje.date}</p>
              <p><strong>Hora:</strong> {viaje.time}</p>
              <p><strong>Usuario:</strong> {viaje.user}</p>
              <p><strong>Origen:</strong> {viaje.origin}</p>
              <p><strong>Destino:</strong> {viaje.destination}</p>
              <p><strong>Precio:</strong> ${viaje.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorialViaje;
