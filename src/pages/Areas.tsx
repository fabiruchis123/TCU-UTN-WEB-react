import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LeafEffect from '../components/LeafEffect';

interface ModalData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
  introHeading: string;
  introText: string;
  highlightTitle: string;
  tasks: string[];
  impactText: string;
}

const modals: Record<string, ModalData> = {
  modalITI: {
    id: 'modalITI',
    title: 'Ingeniería en TI',
    subtitle: 'Transforma datos en soluciones reales',
    image: '/images/iti-proyecto.jpg',
    icon: '💻',
    introHeading: '💻 Tu espacio está aquí',
    introText:
      'Si te gusta programar, crear sistemas o desarrollar páginas web, este proyecto es una oportunidad real para aplicar todo lo que sabes.',
    highlightTitle: '🚀 Vas a trabajar en:',
    tasks: [
      'Desarrollo web del proyecto',
      'Dashboards con datos reales',
      'Bases de datos y automatización',
      'Integración de sistemas',
    ],
    impactText: '💡 Aquí no haces tareas… creas soluciones que se usan de verdad.',
  },
  modalIGAE: {
    id: 'modalIGAE',
    title: 'Gestión Ambiental',
    subtitle: 'Impacto real en el entorno',
    image: '/images/igae-proyecto.jpg',
    icon: '🌱',
    introHeading: '🌱 Tu conocimiento importa',
    introText:
      'Si te apasiona el ambiente, aquí puedes generar impacto real en tu comunidad.',
    highlightTitle: '🌍 Vas a trabajar en:',
    tasks: [
      'Evaluación ambiental del arbolado',
      'Servicios ecosistémicos',
      'Conservación urbana',
      'Educación ambiental',
    ],
    impactText:
      '💡 Tus decisiones pueden mejorar la calidad de vida de toda una comunidad.',
  },
  modalSalud: {
    id: 'modalSalud',
    title: 'Salud Ocupacional',
    subtitle: 'Seguridad en cada acción',
    image: '/images/grupal.png',
    icon: '🦺',
    introHeading: '🦺 Tu rol es clave',
    introText:
      'Sin seguridad no hay proyecto. Aquí tu papel es fundamental.',
    highlightTitle: '⚠️ Vas a trabajar en:',
    tasks: [
      'Evaluación de riesgos',
      'Protocolos de seguridad',
      'Supervisión en campo',
      'Capacitación a estudiantes',
    ],
    impactText: '💡 Eres quien protege al equipo en cada actividad.',
  },
  modalEnergetica: {
    id: 'modalEnergetica',
    title: 'Ingeniería Energética',
    subtitle: 'Innovación desde el campo',
    image: '/images/nosotros1.jpg',
    icon: '⚡',
    introHeading: '⚡ Acción + innovación',
    introText:
      'Aquí es donde la teoría se vuelve práctica en el mundo real.',
    highlightTitle: '🔧 Vas a trabajar en:',
    tasks: [
      'Censo de árboles en campo',
      'Uso de herramientas tecnológicas',
      'Propuestas innovadoras',
      'Apoyo en levantamiento de datos',
    ],
    impactText: '💡 Tu carrera puede impulsar mejoras reales al proyecto.',
  },
  modalAgronomia: {
    id: 'modalAgronomia',
    title: 'Ingeniería Agronómica',
    subtitle: 'Conocimiento que da vida',
    image: '/images/imagen5.jpg',
    icon: '🌳',
    introHeading: '🌳 Eres el experto natural',
    introText:
      'Tu conocimiento es esencial para entender y cuidar el arbolado urbano.',
    highlightTitle: '🌿 Vas a trabajar en:',
    tasks: [
      'Identificación de especies',
      'Taxonomía y clasificación',
      'Manejo del arbolado urbano',
      'Evaluación biológica',
    ],
    impactText: '💡 Tú defines cómo se gestiona la vida verde de la ciudad.',
  },
};

export const Areas: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 15;
    const rotateY = (x - rect.width / 2) / -15;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
  };

  const openModal = (id: string) => {
    if (modals[id]) {
      setActiveModal(modals[id]);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <div className="container main-content">
            <section className="contenido margin-top">
              <h2 className="titulo primerTitulo">
                ¿Cómo puedes participar según tu carrera?
              </h2>

              <p className="text-center mb-4">
                🎓 Cada carrera aporta al proyecto desde diferentes enfoques. ¡Descubre tu rol!
              </p>

              <div className="row g-4">
                {/* ITI */}
                <div className="col-md-4 reveal">
                  <div
                    className="card-area"
                    onClick={() => openModal('modalITI')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-icon">💻</div>
                    <h4>Ingeniería en TI</h4>
                    <p>
                      Desarrollo web, dashboards, bases de datos e integración de sistemas.
                    </p>
                    <div className="card-hover">
                      <ul>
                        <li>• Desarrollo web</li>
                        <li>• Bases de datos</li>
                        <li>• Dashboards</li>
                        <li>• Automatización</li>
                      </ul>
                    </div>
                    <div className="explore-indicator">
                      <span>Explora más</span>
                      <div className="arrow"></div>
                    </div>
                  </div>
                </div>

                {/* Ambiental */}
                <div className="col-md-4 reveal">
                  <div
                    className="card-area"
                    onClick={() => openModal('modalIGAE')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-icon">🌱</div>
                    <h4>Gestión Ambiental</h4>
                    <p>
                      Evaluación ambiental y análisis de servicios ecosistémicos.
                    </p>
                    <div className="card-hover">
                      <ul>
                        <li>• Evaluación ambiental</li>
                        <li>• Sostenibilidad</li>
                        <li>• Conservación</li>
                        <li>• Educación ambiental</li>
                      </ul>
                    </div>
                    <div className="explore-indicator">
                      <span>Explora más</span>
                      <div className="arrow"></div>
                    </div>
                  </div>
                </div>

                {/* Energética */}
                <div className="col-md-4 reveal">
                  <div
                    className="card-area"
                    onClick={() => openModal('modalEnergetica')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-icon">⚡</div>
                    <h4>Ingeniería Energética</h4>
                    <p>
                      Trabajo de campo y propuestas tecnológicas innovadoras.
                    </p>
                    <div className="card-hover">
                      <ul>
                        <li>• Censo de árboles</li>
                        <li>• Uso de apps móviles</li>
                        <li>• Innovación tecnológica</li>
                        <li>• Apoyo en campo</li>
                      </ul>
                    </div>
                    <div className="explore-indicator">
                      <span>Explora más</span>
                      <div className="arrow"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-2 mt-3 justify-content-center gap-3">
                {/* Salud Ocupacional */}
                <div className="col-md-5 reveal">
                  <div
                    className="card-area"
                    onClick={() => openModal('modalSalud')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-icon">🦺</div>
                    <h4>Salud Ocupacional</h4>
                    <p>
                      Seguridad en campo y evaluación de riesgos.
                    </p>
                    <div className="card-hover">
                      <ul>
                        <li>• Evaluación de riesgos</li>
                        <li>• Protocolos de seguridad</li>
                        <li>• Supervisión</li>
                        <li>• Capacitación</li>
                      </ul>
                    </div>
                    <div className="explore-indicator">
                      <span>Explora más</span>
                      <div className="arrow"></div>
                    </div>
                  </div>
                </div>

                {/* Agronomía */}
                <div className="col-md-5 reveal">
                  <div
                    className="card-area"
                    onClick={() => openModal('modalAgronomia')}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-icon">🌳</div>
                    <h4>Ingeniería Agronómica</h4>
                    <p>
                      Identificación de especies y manejo del arbolado urbano.
                    </p>
                    <div className="card-hover">
                      <ul>
                        <li>• Taxonomía</li>
                        <li>• Clasificación</li>
                        <li>• Manejo de árboles</li>
                        <li>• Evaluación biológica</li>
                      </ul>
                    </div>
                    <div className="explore-indicator">
                      <span>Explora más</span>
                      <div className="arrow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Áreas de Trabajo del Proyecto */}
            <section className="contenido">
              <h2 className="titulo siguienteTitulo">
                Áreas de Trabajo del Proyecto
              </h2>

              <p>
                El proyecto de Gestión del Árbol Urbano permite a los estudiantes
                participar en diferentes áreas según sus habilidades e intereses.
                Cada área contribuye al desarrollo del censo, análisis y gestión
                de la información del arbolado urbano en la comunidad.
              </p>

              <div className="row">
                {/* Censo */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario">
                    <div className="card-body text-center">
                      <img src="/images/arbol-blue.png" alt="Censo de Árboles" className="formulario-icon" />
                      <h5 className="card-title">Censo de Árboles</h5>
                      <p className="card-text">
                        Registro en campo de árboles utilizando herramientas como
                        Survey123, incluyendo ubicación, características y estado.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Taxonomía */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario">
                    <div className="card-body text-center">
                      <img src="/images/hoja-blue.png" alt="Taxonomía" className="formulario-icon" />
                      <h5 className="card-title">Taxonomía</h5>
                      <p className="card-text">
                        Identificación y clasificación de especies mediante análisis
                        de datos y registros fotográficos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Base de datos */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario">
                    <div className="card-body text-center">
                      <img
                        src="/images/analisis-de-los-datos-blue.png"
                        alt="Base de Datos"
                        className="formulario-icon"
                      />
                      <h5 className="card-title">Base de Datos</h5>
                      <p className="card-text">
                        Gestión, limpieza y organización de la información recolectada
                        para su uso en sistemas del proyecto.
                      </p>
                    </div>
                  </div>
                </div>

                {/* App / SIG */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario">
                    <div className="card-body text-center">
                      <img
                        src="/images/evaluacion-de-riesgos-blue.png"
                        alt="Aplicaciones y SIG"
                        className="formulario-icon"
                      />
                      <h5 className="card-title">Aplicaciones y SIG</h5>
                      <p className="card-text">
                        Desarrollo y mejora de herramientas tecnológicas y sistemas
                        de información geográfica.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bioalfabetización */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario">
                    <div className="card-body text-center">
                      <img
                        src="/images/tareas-diarias-blue.png"
                        alt="Bioalfabetización"
                        className="formulario-icon"
                      />
                      <h5 className="card-title">Bioalfabetización</h5>
                      <p className="card-text">
                        Educación ambiental y trabajo con comunidades sobre el
                        manejo adecuado del arbolado urbano.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Control de calidad */}
                <div className="col-md-4 mb-4">
                  <div className="card card-formulario">
                    <div className="card-body text-center">
                      <img
                        src="/images/reporte-de-negocios-blue.png"
                        alt="Control de Calidad"
                        className="formulario-icon"
                      />
                      <h5 className="card-title">Control de Calidad</h5>
                      <p className="card-text">
                        Verificación y validación de los datos recolectados para
                        asegurar precisión en el proyecto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Modal Interactivo en React */}
      {activeModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}
          tabIndex={-1}
          role="dialog"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ position: 'relative' }}>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  zIndex: 10,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: '8px',
                }}
              ></button>

              <div className="modal-image">
                <img src={activeModal.image} alt={activeModal.title} />
                <div className="overlay-text">
                  <h3>{activeModal.title}</h3>
                  <p>{activeModal.subtitle}</p>
                </div>
              </div>

              <div className="modal-body">
                <h4 className="modal-title-custom">{activeModal.introHeading}</h4>

                <p className="modal-intro">{activeModal.introText}</p>

                <div className="modal-highlight">{activeModal.highlightTitle}</div>

                <ul className="modal-list">
                  {activeModal.tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>

                <div className="modal-impact">{activeModal.impactText}</div>

                <div className="text-center mt-3">
                  <Link
                    to="/contacto"
                    className="btn-participar"
                    onClick={closeModal}
                  >
                    Quiero participar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Areas;
