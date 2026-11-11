import React from 'react';
import LeafEffect from '../components/LeafEffect';

const videos = [
  {
    embedUrl: 'https://www.youtube.com/embed/B2HoKyUCcT0',
    watchUrl: 'https://www.youtube.com/watch?v=B2HoKyUCcT0',
    title: 'Vinculación Kobotoolbox a QGIS',
    description:
      'Aprende a conectar Kobotoolbox con QGIS para gestionar datos geoespaciales de manera eficiente. Este tutorial te guía paso a paso en el proceso de integración.',
  },
  {
    embedUrl: 'https://www.youtube.com/embed/udspImqFZXQ',
    watchUrl: 'https://www.youtube.com/watch?v=udspImqFZXQ',
    title: 'Uso de PlantNet en el Censo de Árbol Urbano',
    description:
      'Descubre cómo PlantNet puede ayudarte a identificar y censar árboles urbanos. Con esta herramienta, puedes mejorar el registro de especies en tu comunidad.',
  },
  {
    embedUrl: 'https://www.youtube.com/embed/Pz-Ucj0n32A?si=9DtmMnUBuSLMFWeQ',
    watchUrl: 'https://www.youtube.com/watch?v=Pz-Ucj0n32A',
    title: 'Uso de IA para actualización de datos taxonómicos',
    description:
      'Explora cómo la inteligencia artificial facilita la actualización de datos taxonómicos, optimizando la clasificación y el estudio de especies de manera automatizada.',
  },
  {
    embedUrl: 'https://www.youtube.com/embed/TxJQwOI1o54?si=UqpO3osBlg2a1aJm',
    watchUrl: 'https://www.youtube.com/watch?v=TxJQwOI1o54',
    title: 'SIGARU - Marco Jurídico',
    description:
      'Conoce el marco jurídico de SIGARU y su impacto en la gestión de recursos naturales. Este video ofrece una visión clave de las regulaciones vigentes.',
  },
];

export const Tutoriales: React.FC = () => {
  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <section className="productostotal margin-top">
            <section className="contenido">
              <div className="text-center">
                <h1 className="primer-contenido titulo primerTitulo">
                  Aprende paso a paso
                </h1>
                <div className="intro-text">
                  <p>
                    Descubre una colección completa de tutoriales prácticos que te
                    guiarán desde lo básico hasta técnicas avanzadas. Cada video
                    está cuidadosamente diseñado para ayudar a dominar nuevas
                    habilidades de manera efectiva.
                  </p>
                </div>
              </div>
            </section>
            <br />

            {/* Video Cards Grid */}
            <div className="row justify-content-center g-4">
              {videos.map((video, idx) => (
                <div key={idx} className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                  <div
                    className="card h-100 shadow-sm"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <iframe
                      className="card-img-top"
                      src={video.embedUrl}
                      title={video.title}
                      style={{ height: '180px', width: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="card-body d-flex flex-column justify-content-between p-3">
                      <div>
                        <h5 className="card-title" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                          {video.title}
                        </h5>
                        <p className="text-description" style={{ fontSize: '0.9rem', color: '#555' }}>
                          {video.description}
                        </p>
                      </div>
                      <a
                        href={video.watchUrl}
                        className="btn btn-primary mt-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#002f6f',
                          borderColor: '#002f6f',
                          minHeight: '44px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Ver en YouTube
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EPP / Herramientas de Seguridad */}
          <section className="productostotal mt-5">
            <section className="products">
              <div className="cartasProductos text-center">
                <h2 className="titulo siguienteTitulo">
                  Equipos y herramientas necesarias para el trabajo de campo
                </h2>
                <p style={{ maxWidth: '800px', margin: '0 auto 30px' }}>
                  Las medidas de seguridad protegen contra impactos, cortes y
                  exposición a elementos peligrosos, reduciendo el riesgo de
                  accidentes y lesiones. Garantizan un entorno de trabajo más
                  seguro y permiten realizar las tareas con mayor eficiencia y
                  confianza.
                </p>

                {/* Fila 1 */}
                <div className="all-products">
                  <div className="product">
                    <div className="overlay overlay-casco"></div>
                    <img src="/images/casco.png" alt="Casco de seguridad" className="imgs" />
                  </div>
                  <div className="product">
                    <div className="overlay overlay-lentes"></div>
                    <img src="/images/gafas.png" alt="Lentes de protección" className="imgs" />
                  </div>
                  <div className="product">
                    <div className="overlay overlay-tapones"></div>
                    <img src="/images/tapones.png" alt="Tapones auditivos" className="imgs" />
                  </div>
                </div>
              </div>

              {/* Fila 2 */}
              <div className="products mt-4">
                <div className="all-products">
                  <div className="product">
                    <div className="overlay overlay-guantes"></div>
                    <img src="/images/guantes.png" alt="Guantes de protección" className="imgs" />
                  </div>
                  <div className="product">
                    <div className="overlay overlay-chaleco"></div>
                    <img src="/images/chaleco.png" alt="Chaleco reflectivo" className="imgs" />
                  </div>
                  <div className="product">
                    <div className="overlay overlay-mangas"></div>
                    <img src="/images/mangas.png" alt="Mangas de protección" className="imgs" />
                  </div>
                </div>
              </div>

              {/* Fila 3 */}
              <div className="products mt-4">
                <div className="all-products">
                  <div className="product">
                    <div className="overlay overlay-botas"></div>
                    <img src="/images/botas.png" alt="Botas de seguridad" className="imgs" />
                  </div>
                  <div className="product">
                    <div className="overlay overlay-mascarilla"></div>
                    <img src="/images/mascarilla.png" alt="Mascarilla de protección" className="imgs" />
                  </div>
                  <div className="product">
                    <div className="overlay overlay-id"></div>
                    <img src="/images/identidad.png" alt="Carné de identificación" className="imgs" />
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default Tutoriales;
