import React from 'react';
import LeafEffect from '../components/LeafEffect';

export const Informe: React.FC = () => {
  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <div className="container">
            <section className="contenido margin-top">
              <div className="text-center">
                <h1 className="primer-contenido titulo primerTitulo">
                  Resumen de Actividades y Horas Acumuladas en el TCU
                </h1>
                <div className="intro-text">
                  <p>
                    Esta pantalla muestra el registro de horas del estudiante en
                    el curso de TCU, incluyendo labores académicas y trabajo con
                    la comunidad. Presenta un resumen total de horas, estadísticas
                    visuales y un listado detallado de actividades con fechas,
                    duración y evidencias. También indica la cantidad de registros
                    denegados.
                    <br />
                    <br />
                    En dispositivos con pantalla pequeña, activa la rotación para
                    mejorar la vista del tablero.
                  </p>
                </div>
              </div>
            </section>
            <br />

            <div className="container-inf">
              <div className="content-inf">
                <iframe
                  width="100%"
                  height="900"
                  src="https://lookerstudio.google.com/embed/reporting/1fZ-U_98tD6w6zGGXWzKQ4k4bsWurJfKT/page/vVvQB"
                  title="Resumen de Horas TCU - Looker Studio"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Informe;
