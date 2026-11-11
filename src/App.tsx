import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Areas from './pages/Areas';
import Tutoriales from './pages/Tutoriales';
import Cuentas from './pages/Cuentas';
import Informe from './pages/Informe';
import InformeFinal from './pages/InformeFinal';
import Contacto from './pages/Contacto';
import Sigaru from './pages/Sigaru';
import Cartografia from './pages/Cartografia';
import Normativa from './pages/Normativa';
import Taxonomia from './pages/Taxonomia';
import Pedidos from './pages/Pedidos';

// Helper to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="app-main-content" style={{ flex: 1, paddingTop: 'var(--navbar-height, 80px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/tutoriales" element={<Tutoriales />} />
            <Route path="/cuentas" element={<Cuentas />} />
            <Route path="/informe" element={<Informe />} />
            <Route path="/informe-final" element={<InformeFinal />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sigaru" element={<Sigaru />} />
            <Route path="/cartografia" element={<Cartografia />} />
            <Route path="/normativa" element={<Normativa />} />
            <Route path="/taxonomia" element={<Taxonomia />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
