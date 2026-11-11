import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeafEffect from '../components/LeafEffect';

const slides = [
  {
    image: '/images/Imagen1.jpg',
    title: 'La Gestión Integral del Árbol Urbano',
    text: 'Preservar y gestionar nuestros árboles urbanos es clave para la sostenibilidad.',
    btnText: 'Conoce más aquí',
  },
  {
    image: '/images/Imagen2.jpg',
    title: 'Beneficios del Arbolado Urbano',
    text: 'Los árboles urbanos reducen la contaminación y mejoran la calidad del aire.',
    btnText: 'Descubre más',
  },
  {
    image: '/images/Imagen6.jpg',
    title: 'Planificación y Cuidado',
    text: 'Una correcta planificación ayuda a mantener un entorno saludable.',
    btnText: 'Infórmate aquí',
  },
  {
    image: '/images/Imagen7.jpg',
    title: 'Importancia de los Espacios Verdes',
    text: 'Los parques y jardines urbanos fomentan el bienestar, reducen el estrés y mejoran la calidad de vida.',
    btnText: 'Infórmate aquí',
  },
];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Hero Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={currentSlide === index ? 'active' : ''}
              aria-current={currentSlide === index ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${currentSlide === index ? 'active' : ''}`}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="carousel-caption">
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
                <Link to="/nosotros" className="btn btn-warning btn-left">
                  {slide.btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <main>
        <div className="main-container">
          <section id="contenido-adicional" style={{ position: 'relative' }}>
            <LeafEffect />

            {/* Contenido Inicial */}
            <section className="contenido-inicial">
              <h2 className="titulo primerTitulo">
                ¿De qué trata el proyecto de Arbolado Urbano?
              </h2>
              <div className="descripcion-proyecto">
                <div>
                  <p>
                    🌿El propósito de este proyecto es funcionar como una
                    herramienta que potencie el desarrollo de un plan de manejo
                    integral del árbol urbano, mediante la articulación de la
                    participación ciudadana, las instituciones locales y la
                    universidad. Primeramente, se desarrollará un censo del árbol
                    urbano con el apoyo de herramientas de Sistema de Información
                    Geográfica, para la recopilación de datos de campo y el
                    seguimiento del manejo para cada árbol individual.🌿 <br />
                    <br />
                    🌿Seguidamente, se dispondrá de dicha información en tiempo
                    real y oportuno en un visor de acceso público. Los procesos y
                    herramientas que se construirán en este proyecto, se pondrán
                    al servicio de los gobiernos locales, para que sean estos
                    quienes se apropien del seguimiento del manejo del arbolado
                    urbano.🌿
                  </p>
                </div>
                <img src="/images/grupal.png" alt="Equipo TCU" />
              </div>
            </section>

            {/* Meta */}
            <section className="contenido">
              <h2 className="titulo siguienteTitulo">Nuestra Meta</h2>
              <div>
                <div>
                  <p>
                    🌿 Mejorar la gestión y conservación del arbolado urbano en
                    sitios públicos dentro del perímetro urbano, mediante la
                    implementación de tecnologías de información geográfica que
                    permita obtener información precisa y actualizada sobre el
                    estado del arbolado, su distribución y necesidades de
                    mantenimiento, para la toma de decisiones informadas por parte
                    de los gobiernos locales, en beneficio de la calidad de vida
                    de los habitantes y la sostenibilidad ambiental de la zona
                    urbana. 🌿
                  </p>
                </div>
              </div>
            </section>

            {/* Actividades desarrolladas por el estudiante (Accordion) */}
            <section className="contenido">
              <h2 className="titulo siguienteTitulo">
                Actividades desarrolladas por la persona estudiante
              </h2>
              <div className="accordion custom-accordion" id="accordionExample">
                {/* Item 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${openAccordion === 0 ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(0)}
                    >
                      📌 Diseño del Sistema de Información Geográfica
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${openAccordion === 0 ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          📝 Desarrollo y actualización de protocolos: salud
                          ocupacional, gestión del riesgo, procedimientos de campo.
                        </li>
                        <li>
                          📊 Actualización de base de datos: contactos
                          organizacionales, lista taxonómica de especies, otros.
                        </li>
                        <li>
                          📱 Análisis y/o desarrollo de herramientas: aplicaciones
                          móviles, herramientas de integración de bases de datos.
                        </li>
                        <li>
                          🛠️ Prototipado: elaboración de etiquetas para cada árbol
                          individual, construcción de herramientas de campo.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${openAccordion === 1 ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(1)}
                    >
                      🌱 Censo y evaluación de los árboles
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${openAccordion === 1 ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          📍 Registrar la geolocalización y características de cada
                          árbol.
                        </li>
                        <li>
                          📲 Uso de formularios digitales y aplicaciones móviles.
                        </li>
                        <li>
                          🌿 Verificación de especies con registros fotográficos y
                          bases de datos.
                        </li>
                        <li>
                          🗺️ Corrección de geolocalización en el sistema de
                          información geográfica.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${openAccordion === 2 ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(2)}
                    >
                      🖥️ Construcción de herramientas de visualización
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${openAccordion === 2 ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          🌍 Desarrollo de herramientas web de visualización de
                          datos.
                        </li>
                        <li>
                          🗺️ Construcción de cartografía institucional de la
                          cobertura arbórea cantonal.
                        </li>
                        <li>
                          📊 Desarrollo de un tablero de consulta de servicios
                          ecosistémicos.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${openAccordion === 3 ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(3)}
                    >
                      ✅ Evaluación de la calidad de la información
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${openAccordion === 3 ? 'show' : ''}`}
                  >
                    <div className="accordion-body">
                      <ul>
                        <li>
                          🔍 Monitoreo y verificación de la información
                          recopilada.
                        </li>
                        <li>
                          📌 Verificación de precisión en datos recolectados por
                          estudiantes.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Colaboradores */}
            <section className="contenido">
              <h3 className="titulo siguienteTitulo">Colaboradores</h3>
              <p className="descargar-texto">
                Estas son las instituciones que ya confían en nuestro proyecto y
                colaboran activamente con nosotros. Si compartes nuestra visión y
                quieres formar parte de esta iniciativa, estaremos encantados de
                sumar esfuerzos contigo. ¡Contáctanos y hagamos equipo!
              </p>

              <div className="container-fluid-logo">
                <div className="carousel-logos">
                  <div className="group">
                    <img src="/images/utn-logo-sin-fondo.png" alt="Logo UTN" className="logo" />
                    <img src="/images/acra-logo.png" alt="Logo ACRA" className="logo" />
                    <img src="/images/muni-canas-logo.png" alt="Municipalidad de Cañas" className="logo" />
                    <img src="/images/muni-liberia.png" alt="Municipalidad de Liberia" className="logo" />
                  </div>
                  <div className="group" aria-hidden="true">
                    <img src="/images/utn-logo-sin-fondo.png" alt="Logo UTN" className="logo" />
                    <img src="/images/acra-logo.png" alt="Logo ACRA" className="logo" />
                    <img src="/images/muni-canas-logo.png" alt="Municipalidad de Cañas" className="logo" />
                    <img src="/images/muni-liberia.png" alt="Municipalidad de Liberia" className="logo" />
                  </div>
                </div>
              </div>
              <Link to="/contacto" className="btn btn-primary descargar-btn">
                📧 Contactar
              </Link>
            </section>

            {/* Descarga PDF */}
            <section className="contenido">
              <h3 className="titulo siguienteTitulo">
                Consulta el resumen del proyecto
              </h3>
              <p className="descargar-texto">
                Para más detalles sobre el proyecto de arbolado urbano, descarga el
                documento oficial en PDF.
              </p>
              <a
                href="/docs/TCU-102A. Gestión integral del árbol urbano en mi comunidad.pdf"
                className="btn btn-primary descargar-btn"
                download
              >
                📥 Descargar PDF
              </a>
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
