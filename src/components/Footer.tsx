import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Globe,
  Trees,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tcu-footer footer-bottom" id="customfooter" role="contentinfo" aria-label="Pie de página institucional">
      {/* Barra de acento superior institucional */}
      <div className="tcu-footer-accent-bar" aria-hidden="true" />

      <div className="tcu-footer-container">
        <div className="tcu-footer-grid">
          {/* Columna 1: Identidad Institucional */}
          <div className="tcu-footer-col tcu-footer-brand-col">
            <div className="tcu-footer-logos">
              <img
                src="/images/logo-utn.png"
                alt="Universidad Técnica Nacional"
                className="tcu-footer-logo tcu-logo-utn"
                width="130"
                height="48"
                loading="lazy"
              />
              <img
                src="/images/Logotipo TCU blanco.png"
                alt="Trabajo Comunal Universitario TCU Guanacaste"
                className="tcu-footer-logo tcu-logo-tcu"
                width="140"
                height="44"
                loading="lazy"
              />
            </div>

            <div className="tcu-footer-badge">
              <Trees size={15} aria-hidden="true" />
              <span>TCU-102A · Recursos Arbóreos</span>
            </div>

            <p className="tcu-footer-description">
              Proyecto de Acción Social de la Universidad Técnica Nacional, Sede Guanacaste.
              Dedicado a la arboricultura comunitaria, diagnóstico del arbolado urbano y la gestión ambiental participativa.
            </p>

            <div className="tcu-footer-tagline">
              <ShieldCheck size={16} aria-hidden="true" className="text-accent" />
              <span>Sede Guanacaste · Acción Universitaria</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="tcu-footer-col">
            <h3 className="tcu-footer-heading">Enlaces Rápidos</h3>
            <ul className="tcu-footer-nav-list">
              <li>
                <Link to="/sigaru" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Sistema SIGARU</span>
                </Link>
              </li>
              <li>
                <Link to="/cartografia" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Cartografía Digital</span>
                </Link>
              </li>
              <li>
                <Link to="/taxonomia" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Taxonomía de Especies</span>
                </Link>
              </li>
              <li>
                <Link to="/normativa" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Normativa y Leyes</span>
                </Link>
              </li>
              <li>
                <Link to="/cuentas" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Cuentas y Documentos</span>
                </Link>
              </li>
              <li>
                <Link to="/pedidos" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Solicitudes TCU</span>
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="tcu-footer-link">
                  <ChevronRight size={14} aria-hidden="true" />
                  <span>Sobre Nosotros</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Atención */}
          <div className="tcu-footer-col">
            <h3 className="tcu-footer-heading">Contacto y Atención</h3>
            <ul className="tcu-footer-contact-list">
              <li>
                <Mail size={16} className="tcu-footer-icon" aria-hidden="true" />
                <div className="tcu-contact-body">
                  <span className="tcu-contact-label">Correo Oficial</span>
                  <a
                    href="mailto:arboricultura@utn.ac.cr"
                    className="tcu-footer-contact-link"
                    aria-label="Enviar correo a arboricultura@utn.ac.cr"
                  >
                    arboricultura@utn.ac.cr
                  </a>
                </div>
              </li>
              <li>
                <Phone size={16} className="tcu-footer-icon" aria-hidden="true" />
                <div className="tcu-contact-body">
                  <span className="tcu-contact-label">Teléfono Directo</span>
                  <a
                    href="tel:+50626683550"
                    className="tcu-footer-contact-link"
                    aria-label="Llamar al teléfono institucional +506 2668-3550"
                  >
                    +506 2668-3550
                  </a>
                </div>
              </li>
              <li>
                <MapPin size={16} className="tcu-footer-icon" aria-hidden="true" />
                <div className="tcu-contact-body">
                  <span className="tcu-contact-label">Sede Universitaria</span>
                  <span className="tcu-contact-text">
                    Sede Guanacaste, Cañas / Liberia, Costa Rica
                  </span>
                </div>
              </li>
              <li>
                <Clock size={16} className="tcu-footer-icon" aria-hidden="true" />
                <div className="tcu-contact-body">
                  <span className="tcu-contact-label">Horario de Atención</span>
                  <span className="tcu-contact-text">
                    Lunes a Viernes · 8:00 am - 4:30 pm
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Geolocalización */}
          <div className="tcu-footer-col">
            <h3 className="tcu-footer-heading">Geolocalización</h3>
            <div className="tcu-footer-map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.5514058214253!2d-85.08756072533592!3d10.430573389697935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9ffae9f090abdb%3A0x601e4130983c5ef2!2sUTN!5e1!3m2!1ses!2scr!4v1741070529697!5m2!1ses!2scr"
                className="tcu-footer-iframe"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Campus UTN Sede Guanacaste"
              />
            </div>
            <a
              href="https://maps.google.com/?q=UTN+Sede+Guanacaste"
              target="_blank"
              rel="noopener noreferrer"
              className="tcu-footer-map-action"
              aria-label="Abrir ubicación de UTN Sede Guanacaste en Google Maps (se abre en nueva pestaña)"
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Barra Inferior Copyright */}
      <div className="tcu-footer-copyright-bar">
        <div className="tcu-footer-copyright-container">
          <p className="tcu-copyright-text">
            © {currentYear} <strong>Universidad Técnica Nacional</strong> · TCU-102A Guanacaste. Todos los derechos reservados.
          </p>
          <div className="tcu-legal-links">
            <Link to="/normativa" className="tcu-legal-link">
              Marco Normativo
            </Link>
            <span className="tcu-legal-sep" aria-hidden="true">·</span>
            <Link to="/contacto" className="tcu-legal-link">
              Contacto y Mesa de Ayuda
            </Link>
            <span className="tcu-legal-sep" aria-hidden="true">·</span>
            <a
              href="https://www.utn.ac.cr"
              target="_blank"
              rel="noopener noreferrer"
              className="tcu-legal-link"
              aria-label="Visitar el portal oficial de la Universidad Técnica Nacional (se abre en nueva pestaña)"
            >
              <Globe size={13} aria-hidden="true" />
              <span>Portal UTN</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
