import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Global Styles from TCU UTN
import './styles/principal.css';
import './styles/nav-footer-style.css';
import './styles/petalos-style.css';
import './styles/contacto.css';
import './styles/cuentas.css';
import './styles/nosotros.css';
import './styles/informe.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
