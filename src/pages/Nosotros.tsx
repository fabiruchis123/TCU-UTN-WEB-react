import React, { useState, useEffect } from 'react';
import LeafEffect from '../components/LeafEffect';

const teamPhotos = [
  { src: '/images/grupal.png', alt: 'Foto grupal del equipo TCU' },
  { src: '/images/nosotros1.jpg', alt: 'Actividades de campo TCU' },
  { src: '/images/nosotros2.jpg', alt: 'Trabajo con la comunidad' },
  { src: '/images/nosotros3.jpg', alt: 'Censo del árbol urbano' },
  { src: '/images/nosotros4.jpeg', alt: 'Capacitación del equipo' },
];

export const Nosotros: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamPhotos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
  };

  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <section className="contenido margin-top">
            <div className="text-center">
              <h1 className="primer-contenido titulo primerTitulo">
                ¿Quiénes somos?
              </h1>
              <div className="intro-text">
                <p>
                  "Gestión integral del árbol urbano en mi comunidad" es un
                  proyecto de acción social impulsado por la Universidad Técnica
                  Nacional, con el objetivo de mejorar la gestión y conservación
                  del arbolado urbano mediante el uso de tecnologías geoespaciales
                  y la participación ciudadana. <br />
                  <br />
                  Creemos en el poder de la colaboración entre comunidades,
                  gobiernos locales y la academia para fomentar ciudades más
                  verdes, sostenibles y resilientes.
                </p>
              </div>

              {/* Native Team Photo Carousel */}
              <div
                className="carousel slide mt-4"
                style={{
                  width: '100%',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                }}
              >
                <div className="carousel-indicators">
                  {teamPhotos.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={currentSlide === index ? 'active' : ''}
                      aria-current={currentSlide === index ? 'true' : undefined}
                      aria-label={`Foto ${index + 1}`}
                      onClick={() => setCurrentSlide(index)}
                    ></button>
                  ))}
                </div>

                <div className="carousel-inner" style={{ maxHeight: '520px' }}>
                  {teamPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${currentSlide === index ? 'active' : ''}`}
                    >
                      <img
                        src={photo.src}
                        className="d-block w-100"
                        alt={photo.alt}
                        style={{
                          maxHeight: '520px',
                          width: '100%',
                          objectFit: 'cover',
                        }}
                      />
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
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  onClick={nextSlide}
                  aria-label="Siguiente"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            </div>
          </section>

          <div className="cards">
            {/* Card 1 */}
            <div className="container-card background-card-2">
              <div className="card">
                <div className="content-section-card">
                  <div className="title-card">
                    <h1>Gestión Integral del Árbol Urbano en Mi Comunidad</h1>
                  </div>
                  <div className="content-card">
                    <p>
                      <br />
                      El propósito fundamental de este proyecto es ser una
                      herramienta que potencie el desarrollo de un plan de manejo
                      integral del árbol urbano, que van desde el diagnóstico,
                      desarrollo, implementación y evaluación, mediante la
                      articulación de la participación ciudadana, las
                      instituciones locales y la universidad.
                    </p>
                  </div>
                </div>
                <div className="image-section-card">
                  <img src="/images/Imagen2.jpg" alt="Árbol urbano" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="container-card background-card-1">
              <div className="card">
                <div className="content-section-card">
                  <div className="title-card">
                    <h1>
                      Algunos Beneficios que Recibirá la Universidad con el
                      Proyecto
                    </h1>
                  </div>
                  <div className="content-card">
                    <p>
                      <br />
                      Las personas estudiantes tendrán la oportunidad de poner en
                      práctica los conocimientos teóricos adquiridos en el proceso
                      de aprendizaje en las aulas, mediante un proyecto real.
                    </p>
                  </div>
                </div>
                <div className="image-section-card">
                  <img src="/images/imagen6.jpg" alt="Árbol urbano" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="container-card background-card-2">
              <div className="card">
                <div className="content-section-card">
                  <div className="title-card">
                    <h1>Mejora de la Reputación Institucional</h1>
                  </div>
                  <div className="content-card">
                    <p>
                      <br />
                      La incorporación de proyectos de TCU que abordan
                      problemáticas sociales y ambientales en la malla curricular
                      de la persona estudiante universitaria, demuestra el
                      compromiso de la universidad con el desarrollo sostenible y
                      la responsabilidad social.
                    </p>
                  </div>
                </div>
                <div className="image-section-card">
                  <img src="/images/imagen7.jpg" alt="Árbol urbano" />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="container-card background-card-1">
              <div className="card">
                <div className="content-section-card">
                  <div className="title-card">
                    <h1>Descripción del Problema</h1>
                  </div>
                  <div className="content-card">
                    <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
                      <br />
                      Los árboles utilizados para los procesos de arborización
                      urbana, generalmente no cumplen con los requerimientos desde
                      la fase de vivero y han sido plantados en ausencia de un
                      programa de mantenimiento continuo, los cuales pueden
                      representar un futuro riesgo para las personas e
                      infraestructura que los rodea. Generalmente, se utilizan
                      árboles producidos por programas de las entidades
                      gubernamentales, ONGs y viveros comerciales, los cuales son
                      producidos mayormente para la reforestación en fincas y
                      áreas de protección.
                    </p>
                  </div>
                </div>
                <div className="image-section-card">
                  <img src="/images/Imagen1.jpg" alt="Árbol urbano" />
                </div>
              </div>
            </div>
          </div>

          {/* Noticias */}
          <section className="contenido">
            <div className="text-center">
              <h1 className="titulo siguienteTitulo">
                Noticias sobre Gestión integral del árbol urbano en mi comunidad
              </h1>

              <div className="cards-noticias">
                <div className="card-noticia">
                  <img src="/images/noticia1.jpg" alt="Noticia 1" />
                  <div className="contenido-noticia">
                    <h2>
                      La UTN contribuye al fortalecimiento de la arboricultura
                      urbana en Costa Rica
                    </h2>
                    <p>
                      La Universidad Técnica Nacional (UTN) estuvo representada
                      por tres académicos de la sede de Atenas y Sede de
                      Guanacaste, quienes compartieron sus experiencias y
                      proyectos orientados a potenciar la arboricultura urbana en
                      el país.
                    </p>
                    <a
                      href="https://www.utn.ac.cr/utn-contribuye-fortalecimiento-arboricultura-urbana-costa-rica"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leer más
                    </a>
                  </div>
                </div>

                <div className="card-noticia">
                  <img src="/images/noticia2.jpeg" alt="Noticia 2" />
                  <div className="contenido-noticia">
                    <h2>
                      Funcionarios municipales de Guanacaste se capacitan en
                      gestión del árbol urbano con apoyo de la UTN
                    </h2>
                    <p>
                      Funcionarios de varias municipalidades de Guanacaste
                      participaron en una jornada de capacitación sobre la gestión
                      del árbol urbano. La actividad fue organizada en el marco
                      del TCU "Gestión del árbol urbano en mi comunidad".
                    </p>
                    <a
                      href="https://www.utn.ac.cr/funcionarios-municipales-guanacaste-capacitan-gestion-arbol-urbano-apoyo-utn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leer más
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Nosotros;
