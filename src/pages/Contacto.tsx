import React, { useState } from 'react';
import LeafEffect from '../components/LeafEffect';
import { sanitizeText, sanitizeEmail, isValidEmail } from '../utils/security';

const contactCards = [
  {
    image: '/images/facebook.png',
    title: 'Facebook',
    text: 'En nuestra página de Facebook encontrarás más sobre el TCU de Gestión del Árbol Urbano.',
    url: 'https://www.facebook.com/arboladourbanocrgu/',
    external: true,
  },
  {
    image: '/images/gmail.png',
    title: 'GMAIL',
    text: 'Si prefieres escribirnos, puedes enviarnos un correo electrónico a la dirección oficial del proyecto.',
    url: 'mailto:arboricultura@utn.ac.cr',
    external: false,
  },
  {
    image: '/images/whatsapp.png',
    title: 'Teléfono',
    text: 'Puedes comunicarte directamente con el personal encargado del TCU mediante este número.',
    url: 'https://wa.link/arbo1j',
    external: true,
  },
];

export const Contacto: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    presupuesto: '',
    correo: '',
    mensaje: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, contactCards.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Sanitización y validación estricta en el cliente
    const cleanedNombre = sanitizeText(formData.nombre, 100);
    const cleanedPresupuesto = sanitizeText(formData.presupuesto, 100);
    const cleanedCorreo = sanitizeEmail(formData.correo);
    const cleanedMensaje = sanitizeText(formData.mensaje, 2000);

    if (!cleanedNombre || !cleanedCorreo || !cleanedMensaje) {
      setFormError('Por favor completa todos los campos requeridos con información válida.');
      return;
    }

    if (!isValidEmail(cleanedCorreo)) {
      setFormError('Por favor ingresa un correo electrónico con formato válido.');
      return;
    }

    // Actualizar con datos higienizados
    setFormData({
      nombre: cleanedNombre,
      presupuesto: cleanedPresupuesto,
      correo: cleanedCorreo,
      mensaje: cleanedMensaje,
    });

    setFormSubmitted(true);
  };

  return (
    <>
      <LeafEffect />
      <main>
        <div className="main-container">
          <section className="contenido margin-top">
            <div className="text-center">
              <h1 className="primer-contenido titulo primerTitulo">Contáctanos</h1>
              <p>
                Te invitamos a conectarte con nosotros a través de nuestros canales
                oficiales. Aquí encontrarás nuestras redes sociales y medios de
                contacto para el TCU.
              </p>
            </div>
          </section>

          {/* Social Carousel */}
          <div className="caja-carousel">
            <div className="carousel-section">
              <div className="multi-card-carousel">
                <div
                  className="carousel-track"
                  id="carouselTrack"
                  style={{
                    transform: `translateX(-${currentSlide * 33.333}%)`,
                    transition: 'transform 0.4s ease-in-out',
                  }}
                >
                  {contactCards.map((card, idx) => (
                    <div className="carousel-card" key={idx}>
                      <img src={card.image} alt={card.title} />
                      <h3 className="mt-2">{card.title}</h3>
                      <p>{card.text}</p>
                      <a
                        href={card.url}
                        target={card.external ? '_blank' : undefined}
                        rel={card.external ? 'noopener noreferrer' : undefined}
                        className="btn btn-warning mt-auto"
                      >
                        Más Información
                      </a>
                    </div>
                  ))}
                </div>

                <div className="carousel-controls">
                  <button
                    className="carousel-control prev"
                    onClick={prevSlide}
                    aria-label="Anterior"
                  >
                    &#10094;
                  </button>
                  <button
                    className="carousel-control next"
                    onClick={nextSlide}
                    aria-label="Siguiente"
                  >
                    &#10095;
                  </button>
                </div>

                <div className="carousel-indicators">
                  {contactCards.map((_, idx) => (
                    <span
                      key={idx}
                      className={`carousel-indicator ${currentSlide === idx ? 'active' : ''}`}
                      onClick={() => goToSlide(idx)}
                      role="button"
                      tabIndex={0}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <section className="contenido mt-5">
            <div className="text-center">
              <h1 className="titulo siguienteTitulo">Envíanos tu mensaje</h1>
              <p>
                Completa el formulario con tu información y tu mensaje. Una vez
                enviado, llegará directamente a nuestro correo para ser atendido lo
                más pronto posible.
              </p>
            </div>
          </section>

          <div className="form-container">
            <div className="contact-form">
              <h2 className="titulo">Contáctanos</h2>

              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}

              {formSubmitted ? (
                <div className="alert alert-success text-center p-4">
                  <h4>¡Mensaje enviado con éxito!</h4>
                  <p>
                    Gracias por ponerte en contacto con el TCU de Gestión del
                    Árbol Urbano. Te responderemos a la brevedad.
                  </p>
                  <button
                    type="button"
                    className="btn btn-dark mt-2"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        nombre: '',
                        presupuesto: '',
                        correo: '',
                        mensaje: '',
                      });
                    }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="presupuesto">Propósito</label>
                    <input
                      type="text"
                      id="presupuesto"
                      name="presupuesto"
                      className="form-control"
                      value={formData.presupuesto}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      className="form-control"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      className="form-control"
                      rows={5}
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-enviar">
                    Enviar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contacto;
