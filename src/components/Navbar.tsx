import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setProjectOpen(false);
    setStudentsOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}>
            <img id="logo-utn" src="/images/logo-utn.png" alt="Logo UTN" />
            <img id="logo-tcu" src="/images/Logotipo TCU blanco.png" alt="Logo TCU" />
          </Link>
        </div>

        <div
          className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          role="button"
          tabIndex={0}
          aria-label="Abrir menú de navegación"
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <ul className={`nav-list ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={location.pathname === '/' ? 'active-nav-link' : ''}
            >
              Inicio
            </Link>
          </li>

          <li
            className="sub-menu-phone"
            onMouseEnter={() => setProjectOpen(true)}
            onMouseLeave={() => setProjectOpen(false)}
          >
            <a
              href="#proyecto"
              onClick={(e) => {
                e.preventDefault();
                setProjectOpen((prev) => !prev);
              }}
            >
              Proyecto
            </a>
            <ul
              id="sub-menu-ul"
              className="sub-menu"
              style={{
                display: projectOpen ? 'block' : undefined,
                opacity: projectOpen ? 1 : undefined,
                visibility: projectOpen ? 'visible' : undefined,
              }}
            >
              <li>
                <Link to="/sigaru" onClick={handleLinkClick}>
                  Sigaru
                </Link>
              </li>
              <li>
                <Link to="/tutoriales" onClick={handleLinkClick}>
                  Capacitación
                </Link>
              </li>
              <li>
                <Link to="/cartografia" onClick={handleLinkClick}>
                  Cartografía
                </Link>
              </li>
              <li>
                <Link to="/normativa" onClick={handleLinkClick}>
                  Normativa
                </Link>
              </li>
              <li>
                <Link to="/taxonomia" onClick={handleLinkClick}>
                  Taxonomía
                </Link>
              </li>
            </ul>
          </li>

          <li
            className="sub-menu-phone"
            onMouseEnter={() => setStudentsOpen(true)}
            onMouseLeave={() => setStudentsOpen(false)}
          >
            <a
              href="#estudiantes"
              onClick={(e) => {
                e.preventDefault();
                setStudentsOpen((prev) => !prev);
              }}
            >
              Estudiantes
            </a>
            <ul
              id="sub-menu-ul"
              className="sub-menu"
              style={{
                display: studentsOpen ? 'block' : undefined,
                opacity: studentsOpen ? 1 : undefined,
                visibility: studentsOpen ? 'visible' : undefined,
              }}
            >
              <li>
                <Link to="/cuentas" onClick={handleLinkClick}>
                  Cuenta
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSegqGsI6QiB6x8ia3ti4WMJG3drLg2lw0n2jTUocH0RsgPqcA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                >
                  Bitácora
                </a>
              </li>
              <li>
                <Link to="/informe" onClick={handleLinkClick}>
                  Resumen de Horas
                </Link>
              </li>
              <li>
                <Link to="/informe-final" onClick={handleLinkClick}>
                  Informe Final
                </Link>
              </li>
              <li>
                <Link to="/pedidos" onClick={handleLinkClick}>
                  Solicitudes / Trámites
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/areas"
              onClick={handleLinkClick}
              className={location.pathname === '/areas' ? 'active-nav-link' : ''}
            >
              Áreas de trabajo
            </Link>
          </li>
          <li>
            <Link
              to="/nosotros"
              onClick={handleLinkClick}
              className={location.pathname === '/nosotros' ? 'active-nav-link' : ''}
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              onClick={handleLinkClick}
              className={location.pathname === '/contacto' ? 'active-nav-link' : ''}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
