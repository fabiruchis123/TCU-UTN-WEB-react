import React from 'react';
import LeafEffect from '../components/LeafEffect';

export const InformeFinal: React.FC = () => {
  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <section className="contenido margin-top">
            <h1 className="primer-contenido titulo primerTitulo">
              Instrucciones para la Elaboración del Informe Final
            </h1>
            <p>
              Este informe está dirigido a estudiantes que han completado el TCU y
              cuentan con la aprobación del académico encargado del proyecto.
              <br />
              <br />
              Los requisitos son:
            </p>
            <div className="caja-lista">
              <ul>
                <li>Haber cumplido con las 150 horas del TCU.</li>
                <li>
                  Haber alcanzado las metas establecidas en el plan de trabajo.
                </li>
              </ul>
            </div>

            <br />
            <p>
              En el siguiente proceso usted completará un formulario de tipo
              encuesta, que a través de la herramienta de Survey123 y una
              plantilla existente, le permitirá generar un informe en formato PDF.
            </p>
          </section>

          <section className="contenido">
            <h1 className="titulo siguienteTitulo">
              Para la elaboración del informe Final siga los siguientes pasos
            </h1>

            <div className="caja-lista">
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li className="mb-3">
                  <strong>1.</strong> Iniciar sesión en Survey123 desde la
                  aplicación Survey123 en su dispositivo móvil, o bien, en su
                  computadora mediante la aplicación descargable en Microsoft
                  Store. Utilice su usuario y contraseña de ArcGIS.
                </li>
                <li className="mb-3">
                  <strong>2.</strong> Completar el formulario
                  TCUAU-InformeFinalEstudiante. Puede acceder al formulario
                  directamente mediante el siguiente enlace:{' '}
                  <a
                    href="https://arcg.is/z9Snz3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://arcg.is/z9Snz3
                  </a>
                  .
                </li>
                <li className="mb-3">
                  <strong>3.</strong> Una vez completado el formulario, ingrese
                  al navegador web de su preferencia al siguiente enlace:{' '}
                  <a
                    href="https://survey123.arcgis.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://survey123.arcgis.com
                  </a>
                  . Utilice su usuario y contraseña de ArcGIS.
                </li>
                <li className="mb-3">
                  <strong>4.</strong> Seleccionar con el mouse la línea de
                  registro del informe para exportar. La línea del registro se
                  resaltará en color celeste.
                </li>
                <li className="mb-3">
                  <strong>5.</strong> Dar clic en el menú <em>informe</em> en la
                  parte superior de la ventana de Survey123. Se desplegará una
                  ventana emergente en la cual deberá completar la siguiente
                  información:
                  <ul className="mt-2 ms-4" style={{ listStyleType: 'circle' }}>
                    <li className="mb-2">
                      <strong>5.1.</strong> Elegir los registros a incluir:{' '}
                      <em>Solo registros seleccionados</em>.
                    </li>
                    <li className="mb-2">
                      <strong>5.2.</strong> Seleccionar una plantilla: dejar la
                      plantilla por defecto{' '}
                      <code>TCUAU-InformeFinalEstudiante-Survey123-20240809.docx</code>.
                    </li>
                    <li className="mb-2">
                      <strong>5.3.</strong> Configuración de salida: en el Nombre
                      de informe suprimir el nombre por defecto y pegar la
                      siguiente estructura:
                      <div className="p-2 my-2 bg-light rounded text-dark font-monospace">
                        {`\${id_estudiante}-IF. \${nombre_estudiante}`}
                      </div>
                    </li>
                    <li className="mb-2">
                      <strong>5.4.</strong> Formato: Seleccionar{' '}
                      <em>Formato de documento portátil (.pdf)</em>.
                    </li>
                  </ul>
                </li>
                <li className="mb-3">
                  <strong>6.</strong> Dar clic en <em>Generar</em>. Esperar que se
                  genere el documento en PDF y subirlo en el espacio
                  correspondiente del Campus Virtual.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default InformeFinal;
