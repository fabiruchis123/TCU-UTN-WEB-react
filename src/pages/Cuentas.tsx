import React, { useState } from 'react';
import { QrCode, Smartphone } from 'lucide-react';
import LeafEffect from '../components/LeafEffect';
import { Survey123Modal } from '../components/Survey123Modal';

export const Cuentas: React.FC = () => {
  const [activeSurveyModalId, setActiveSurveyModalId] = useState<string | null>(null);

  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <div className="container main-content">
            <section className="contenido margin-top">
              <h1 className="section-title titulo primerTitulo">Kit del Estudiante</h1>

              <div className="intro-text">
                <p>
                  Encuentra aquí todos los recursos necesarios para tu curso: las
                  aplicaciones requeridas, formularios de práctica y materiales
                  complementarios.
                </p>
                <p>
                  Todo organizado para que puedas enfocarte en tu aprendizaje.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card-custom h-100">
                    <div className="card-custom1">
                      <h2 className="section-title">Cuentas y Formularios</h2>
                      <br />
                      <div>
                        <h4>¿Cómo solicito mi cuenta de ArcGIS o KoboToolbox?</h4>
                        <br />
                        <p>
                          En caso de no tener una cuenta, favor comunicarse con el
                          tutor asignado.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card-custom h-100">
                    <h2 className="section-title">ArcGIS Survey123</h2>
                    <div className="text-center my-3">
                      <a
                        href="https://survey123.arcgis.com/?signin=true"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="large-icon"
                          src="/images/Survey123-icon.png"
                          alt="ArcGIS Survey123 icon"
                          style={{ maxWidth: '120px', transition: 'transform 0.3s' }}
                        />
                      </a>
                    </div>

                    <div className="toolbox-section mt-4">
                      <h2 className="section-title">KoboToolbox</h2>

                      <div className="text-center my-3">
                        <a
                          href="https://kf.arboricultura.utn.ac.cr/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            className="large-icon"
                            src="/images/kobotoolbox-icon.png"
                            alt="KoboToolbox icon"
                            style={{ maxWidth: '120px', transition: 'transform 0.3s' }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="container">
            <section className="contenido">
              <h2 className="titulo siguienteTitulo">
                Formularios de gestión del árbol urbano
              </h2>
              <p>
                Estos formularios de Survey123 te permiten recopilar y gestionar
                información de manera eficiente. Cada opción está diseñada para
                facilitar el registro de datos específicos, asegurando precisión y
                accesibilidad. ¡Selecciona el formulario que necesites y comienza a
                capturar información fácilmente!
              </p>
              <br />
              <div className="row">
                {/* Datos Generales */}
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/analisis-de-los-datos-blue.png"
                          alt="Datos Generales icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Datos Generales</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                        <a
                          href="https://arcg.is/0aC0S8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark mt-2"
                        >
                          Acceder Web
                        </a>
                        <button
                          type="button"
                          className="survey-qr-btn"
                          onClick={() => setActiveSurveyModalId('datos-generales')}
                          aria-label="Abrir código QR de Survey123 para formulario Datos Generales"
                        >
                          <QrCode size={15} aria-hidden="true" />
                          <span>QR Móvil / App</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dendro-metría */}
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/arbol-blue.png"
                          alt="Dendrometria icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Dendro-metría</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                        <a
                          href="https://arcg.is/bLanO"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark mt-2"
                        >
                          Acceder Web
                        </a>
                        <button
                          type="button"
                          className="survey-qr-btn"
                          onClick={() => setActiveSurveyModalId('dendrometria')}
                          aria-label="Abrir código QR de Survey123 para formulario Dendrometría"
                        >
                          <QrCode size={15} aria-hidden="true" />
                          <span>QR Móvil / App</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evaluación Básica */}
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/evaluacion-de-riesgos-blue.png"
                          alt="Evaluacion Basica icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Evaluación Básica</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                        <a
                          href="https://arcg.is/i0L5r"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark mt-2"
                        >
                          Acceder Web
                        </a>
                        <button
                          type="button"
                          className="survey-qr-btn"
                          onClick={() => setActiveSurveyModalId('evaluacion-riesgo')}
                          aria-label="Abrir código QR de Survey123 para formulario Evaluación Básica de Riesgo"
                        >
                          <QrCode size={15} aria-hidden="true" />
                          <span>QR Móvil / App</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Especies */}
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/hoja-blue.png"
                          alt="Especies icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Especies</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                        <a
                          href="https://arcg.is/18C0ii"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark mt-2"
                        >
                          Acceder Web
                        </a>
                        <button
                          type="button"
                          className="survey-qr-btn"
                          onClick={() => setActiveSurveyModalId('especies')}
                          aria-label="Abrir código QR de Survey123 para formulario Especies"
                        >
                          <QrCode size={15} aria-hidden="true" />
                          <span>QR Móvil / App</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="contenido">
              <h2 className="titulo siguienteTitulo">
                Formularios de gestión del TCU
              </h2>
              <p>
                Estos documentos permiten organizar, registrar y dar seguimiento a
                actividades dentro de programas de acción social. Facilitan la
                planificación, evaluación de resultados y gestión de tiempos,
                asegurando el cumplimiento de objetivos y la transparencia en el
                desarrollo de los proyectos.
              </p>
              <br />
              <div className="row">
                {/* Informe Final */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/reporte-de-negocios-blue.png"
                          alt="Informe Final icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Informe Final</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                        <a
                          href="https://arcg.is/z9Snz3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark mt-2"
                        >
                          Acceder Web
                        </a>
                        <button
                          type="button"
                          className="survey-qr-btn"
                          onClick={() => setActiveSurveyModalId('informe-final')}
                          aria-label="Abrir código QR de Survey123 para formulario Entrega de Informe Final"
                        >
                          <QrCode size={15} aria-hidden="true" />
                          <span>QR Móvil / App</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan De Trabajo */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/tareas-diarias-blue.png"
                          alt="Plan De Trabajo icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Plan De Trabajo</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <a
                        href="#plan-trabajo"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('El enlace al formulario del Plan de Trabajo será proporcionado por tu tutor.');
                        }}
                        className="btn btn-dark mt-2"
                      >
                        Acceder
                      </a>
                    </div>
                  </div>
                </div>

                {/* Solicitud De Prórroga */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario h-100">
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <img
                          src="/images/posponer-blue.png"
                          alt="Solicitud De Prórroga icon"
                          className="formulario-icon"
                        />
                        <h5 className="card-title mt-2">Solicitud De Prórroga</h5>
                        <p className="card-text">
                          Si quieres acceder a este formulario presiona el botón de abajo.
                        </p>
                      </div>
                      <a
                        href="#prorroga"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('El formulario de Solicitud de Prórroga está disponible a través de la coordinación del TCU.');
                        }}
                        className="btn btn-dark mt-2"
                      >
                        Acceder
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Modal Interactivo de Survey123 (Censo en Campo, Códigos QR y App Móvil) */}
      <Survey123Modal
        isOpen={Boolean(activeSurveyModalId)}
        onClose={() => setActiveSurveyModalId(null)}
        initialFormId={activeSurveyModalId || 'datos-generales'}
      />
    </>
  );
};

export default Cuentas;
