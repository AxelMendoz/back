import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Registrar from "./Pages/Registrar/Registrar";
import CrearRide from "./Pages/CrearRide/CrearRide";
import Sidebar from "./Pages/Dashboard/Dashboard";
import QuienesSomos from "./Pages/QuienesSomos/QuienesSomos";
import HistorialViaje from "./Pages/HistorialViaje/HistorialViaje";
import DetallesViaje from "./Pages/DetallesViaje/DetallesViaje"; // Página de detalles
import { HistorialProvider } from "./Pages/Context/HistorialContext"; // Proveedor del historial

function AppContent() {
  const location = useLocation();

  // Ocultar Header y Footer en rutas específicas (por ejemplo, dashboard)
  const hideHeaderFooter = location.pathname === "/dash";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/registrar"
          element={<Registrar onRegister={(data) => console.log("Datos de registro:", data)} />}
        />
        <Route path="/crear-ride" element={<CrearRide />} />
        <Route path="/dash" element={<Sidebar />} />
        <Route path="/historial-viajes" element={<HistorialViaje />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/detalles" element={<DetallesViaje />} /> {/* Nueva ruta */}
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <HistorialProvider> {/* Envuelve la aplicación con el HistorialProvider */}
        <AppContent />
      </HistorialProvider>
    </Router>
  );
};

export default App;
