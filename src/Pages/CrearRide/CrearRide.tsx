import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios"; // Importar axios
import { useHistorial } from "../Context/HistorialContext"; // Importar el contexto
import "./CrearRide.css";

const locations = {
  "Universidad Tecnológica": [21.04966687410658, -86.84687016055352],
  "Plaza Las Américas": [21.14693396934119, -86.82236789178282],
  "Mercado 23": [21.168892924238012, -86.82726258623381],
  "Bonfil": [21.088043273148816, -86.84411226624552],
};

const CrearRide: React.FC = () => {
  const navigate = useNavigate();
  const { agregarViaje } = useHistorial(); // Usamos el contexto para agregar viajes al historial
  const [origin, setOrigin] = useState<string>("Universidad Tecnológica");
  const [destination, setDestination] = useState<string>("Plaza Las Américas");
  const [loading, setLoading] = useState<boolean>(false); // Para mostrar el estado de carga

  useEffect(() => {
    const map = L.map("map").setView(locations[origin], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.Routing.control({
      waypoints: [L.latLng(locations[origin]), L.latLng(locations[destination])],
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: "#0078ff", weight: 5, opacity: 0.7 }] },
      show: false,
    }).addTo(map);

    return () => map.remove();
  }, [origin, destination]);

  const handleSelectRide = async () => {
    setLoading(true); // Activar estado de carga

    const viajeSeleccionado = {
      origen: origin,
      destino: destination,
      fechaHora: new Date().toISOString(), // Usar la fecha actual
      precio: 50, // Precio estático, podrías calcularlo dinámicamente
    };

    try {
      // Enviar solicitud POST al backend
      const response = await axios.post("http://localhost:3000/rides", viajeSeleccionado);

      // Verificar la respuesta
      if (response.status === 201) {
        alert("Viaje creado exitosamente");

        // Agregar el viaje al historial usando el contexto
        agregarViaje({
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          user: "Juan Pérez", // Cambiar por el usuario logueado, si está disponible
          origin,
          destination,
          price: 50, // Este valor puede ser dinámico
        });

        // Redirigir a la página de detalles del viaje
        navigate("/detalles", { state: { origin, destination, price: 50 } });
      }
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      alert("Hubo un error al crear el viaje. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="search-ride-container">
      <div className="search-bar">
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
      <button
        onClick={handleSelectRide}
        disabled={loading} // Deshabilitar mientras carga
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Creando viaje..." : "Seleccionar Viaje"}
      </button>
    </div>
  );
};

export default CrearRide;
