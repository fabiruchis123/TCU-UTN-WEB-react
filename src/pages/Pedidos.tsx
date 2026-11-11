// src/pages/Pedidos.tsx
// Módulo de Gestión de Solicitudes y Logística Comunitaria - TCU-102A UTN Guanacaste

import React, { useState, useEffect } from 'react';
import '../styles/pedidos.css';
import {
  TipoSolicitud,
  Solicitud,
  CANTONES_GUANACASTE,
  ESPECIES_NATIVAS,
  EQUIPOS_DISPONIBLES,
  obtenerTodasLasSolicitudes,
  guardarNuevaSolicitud,
  buscarSolicitudPorCodigo,
  generarNuevoCodigo
} from '../data/pedidosData';
import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeAlphaNumeric,
  isValidEmail
} from '../utils/security';
import {
  Trees,
  Sprout,
  AlertTriangle,
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Copy,
  Check,
  UploadCloud,
  X,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  Building,
  Filter,
  ArrowRight,
  HardHat,
  ShieldCheck,
  RefreshCw,
  FileText
} from 'lucide-react';

export const Pedidos: React.FC = () => {
  // Pestaña activa general: 'nueva' | 'consultar' | 'catalogo'
  const [tabPrincipal, setTabPrincipal] = useState<'nueva' | 'consultar' | 'catalogo'>('nueva');

  // Tipo de solicitud activa: 'adopcion' | 'inspeccion' | 'herramientas'
  const [tipoActivo, setTipoActivo] = useState<TipoSolicitud>('adopcion');

  // Estado del Formulario
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [canton, setCanton] = useState('Liberia');
  const [distrito, setDistrito] = useState(CANTONES_GUANACASTE['Liberia'][0]);
  const [direccionExacta, setDireccionExacta] = useState('');
  const [puntoReferencia, setPuntoReferencia] = useState('');
  const [justificacion, setJustificacion] = useState('');

  // Específicos para Adopción
  const [tipoEspacio, setTipoEspacio] = useState('Acera residencial');
  const [especiesSeleccionadas, setEspeciesSeleccionadas] = useState<Record<string, number>>({
    'esp-guachipelin': 2,
    'esp-cortez-amarillo': 1
  });
  const [compromisoRiego, setCompromisoRiego] = useState(true);

  // Específicos para Inspección Técnica
  const [nivelUrgencia, setNivelUrgencia] = useState<'normal' | 'moderado' | 'critico'>('moderado');
  const [riesgosSeleccionados, setRiesgosSeleccionados] = useState<string[]>([
    'Riesgo de caída de ramas sobre vía peatonal'
  ]);
  const [descripcionArbol, setDescripcionArbol] = useState('');
  const [fotoEvidencia, setFotoEvidencia] = useState<string | null>(null);

  // Específicos para Préstamo de Herramientas (Estudiantes TCU)
  const [carnetUTN, setCarnetUTN] = useState('');
  const [carreraUTN, setCarreraUTN] = useState('Ingeniería en Gestión Ambiental');
  const [nombreBrigada, setNombreBrigada] = useState('');
  const [fechaUso, setFechaUso] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [equiposSeleccionados, setEquiposSeleccionados] = useState<Record<string, number>>({
    'eq-casco': 2,
    'eq-chaleco': 2,
    'eq-cinta-dap': 1
  });

  // Validaciones
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal de confirmación con código generado
  const [solicitudCreada, setSolicitudCreada] = useState<Solicitud | null>(null);
  const [copiado, setCopiado] = useState(false);

  // Estado del Rastreador / Buscador
  const [codigoBusqueda, setCodigoBusqueda] = useState('');
  const [solicitudEncontrada, setSolicitudEncontrada] = useState<Solicitud | null>(null);
  const [busquedaError, setBusquedaError] = useState<string | null>(null);

  // Catálogo: Filtro de especies
  const [filtroEspacioCatalogo, setFiltroEspacioCatalogo] = useState<string>('todos');

  // Actualizar distritos cuando cambia el cantón
  const handleCantonChange = (nuevoCanton: string) => {
    setCanton(nuevoCanton);
    if (CANTONES_GUANACASTE[nuevoCanton] && CANTONES_GUANACASTE[nuevoCanton].length > 0) {
      setDistrito(CANTONES_GUANACASTE[nuevoCanton][0]);
    }
  };

  // Manejo de cantidades de especies
  const actualizarCantidadEspecie = (especieId: string, delta: number) => {
    setEspeciesSeleccionadas(prev => {
      const actual = prev[especieId] || 0;
      const nuevo = Math.max(0, actual + delta);
      const copia = { ...prev };
      if (nuevo === 0) {
        delete copia[especieId];
      } else {
        copia[especieId] = nuevo;
      }
      return copia;
    });
  };

  // Manejo de cantidades de equipos
  const actualizarCantidadEquipo = (equipoId: string, delta: number) => {
    setEquiposSeleccionados(prev => {
      const actual = prev[equipoId] || 0;
      const nuevo = Math.max(0, actual + delta);
      const copia = { ...prev };
      if (nuevo === 0) {
        delete copia[equipoId];
      } else {
        copia[equipoId] = nuevo;
      }
      return copia;
    });
  };

  // Manejo de riesgos seleccionados
  const toggleRiesgo = (riesgo: string) => {
    setRiesgosSeleccionados(prev =>
      prev.includes(riesgo) ? prev.filter(r => r !== riesgo) : [...prev, riesgo]
    );
  };

  // Carga simulada de archivo/foto con validación de tipo y tamaño de seguridad
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Verificación de tipo MIME (solo imágenes)
      if (!file.type.startsWith('image/')) {
        alert('Por razones de seguridad, solo se admiten archivos de imagen (JPEG, PNG, WebP).');
        return;
      }
      // Límite de tamaño máximo: 5 MB
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo supera el tamaño máximo permitido de 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setFotoEvidencia(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Validar y enviar formulario con sanitización completa
  const handleEnviarSolicitud = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: Record<string, string> = {};

    const cleanNombre = sanitizeText(nombre, 100);
    const cleanTelefono = sanitizePhone(telefono);
    const cleanCorreo = sanitizeEmail(correo);
    const cleanDireccion = sanitizeText(direccionExacta, 300);
    const cleanJustificacion = sanitizeText(justificacion, 2000);
    const cleanCedula = sanitizeAlphaNumeric(cedula, 30);
    const cleanOrg = sanitizeText(organizacion, 150);
    const cleanPuntoRef = sanitizeText(puntoReferencia, 300);
    const cleanCarnet = sanitizeAlphaNumeric(carnetUTN, 30);
    const cleanCarrera = sanitizeText(carreraUTN, 100);
    const cleanDescArbol = sanitizeText(descripcionArbol, 1000);
    const cleanBrigada = sanitizeText(nombreBrigada, 150);

    if (!cleanNombre) nuevosErrores.nombre = 'El nombre completo es requerido';
    if (!cleanTelefono) nuevosErrores.telefono = 'El teléfono de contacto es requerido';
    if (!cleanCorreo || !isValidEmail(cleanCorreo)) nuevosErrores.correo = 'Ingrese un correo electrónico válido';
    if (!cleanDireccion) nuevosErrores.direccionExacta = 'Indique la dirección exacta o punto de referencia';
    if (!cleanJustificacion) nuevosErrores.justificacion = 'Por favor detalle el motivo o justificación de su solicitud';

    if (tipoActivo === 'adopcion') {
      const totalArboles = Object.values(especiesSeleccionadas).reduce((a, b) => a + b, 0);
      if (totalArboles <= 0) {
        nuevosErrores.especies = 'Debe seleccionar al menos 1 árbol nativo';
      }
    } else if (tipoActivo === 'inspeccion') {
      if (riesgosSeleccionados.length === 0) {
        nuevosErrores.riesgos = 'Seleccione al menos un factor de riesgo o afección del árbol';
      }
    } else if (tipoActivo === 'herramientas') {
      if (!cleanCarnet) nuevosErrores.carnetUTN = 'El carnet estudiantil UTN es requerido';
      const totalEquipos = Object.values(equiposSeleccionados).reduce((a, b) => a + b, 0);
      if (totalEquipos <= 0) {
        nuevosErrores.equipos = 'Debe seleccionar al menos un equipo de campo o EPP';
      }
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    setErrores({});
    setIsSubmitting(true);

    // Simular guardado y generación de código
    setTimeout(() => {
      const nuevoId = generarNuevoCodigo();
      const fechaActualIso = new Date().toISOString();
      const fechaLegible = new Date().toLocaleString('es-CR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      let tipoNombre = 'Donación de Árboles';
      if (tipoActivo === 'inspeccion') tipoNombre = 'Inspección de Árbol Urbano';
      if (tipoActivo === 'herramientas') tipoNombre = 'Préstamo de EPP/Equipos';

      const nueva: Solicitud = {
        id: nuevoId,
        fechaRegistro: fechaActualIso,
        tipo: tipoActivo,
        solicitante: {
          nombre: cleanNombre,
          cedula: cleanCedula || 'No especificada',
          telefono: cleanTelefono,
          correo: cleanCorreo,
          organizacion: cleanOrg || (tipoActivo === 'herramientas' ? 'Estudiante UTN' : 'Vecino Guanacaste'),
          esEstudiante: tipoActivo === 'herramientas',
          carnetUTN: tipoActivo === 'herramientas' ? cleanCarnet : undefined,
          carrera: tipoActivo === 'herramientas' ? cleanCarrera : undefined
        },
        ubicacion: {
          canton,
          distrito,
          direccionExacta: cleanDireccion,
          puntoReferencia: cleanPuntoRef || undefined,
          tipoEspacio: tipoEspacio || undefined
        },
        detalles: {
          justificacion: cleanJustificacion,
          ...(tipoActivo === 'adopcion' && {
            cantidadTotalArboles: Object.values(especiesSeleccionadas).reduce((a, b) => a + b, 0),
            especiesSolicitadas: Object.entries(especiesSeleccionadas).map(([especieId, cantidad]) => ({
              especieId,
              cantidad
            })),
            compromisoRiego
          }),
          ...(tipoActivo === 'inspeccion' && {
            nivelUrgencia,
            tipoRiesgo: riesgosSeleccionados,
            descripcionArbol: cleanDescArbol || 'Árbol en vía pública para valoración',
            fotoEvidenciaUrl: fotoEvidencia || undefined
          }),
          ...(tipoActivo === 'herramientas' && {
            equiposSolicitados: Object.entries(equiposSeleccionados).map(([equipoId, cantidad]) => ({
              equipoId,
              cantidad
            })),
            fechaUsoEstimada: fechaUso || 'Próxima gira',
            fechaDevolucionEstimada: fechaDevolucion || 'Al concluir brigada',
            brigadaOProyecto: cleanBrigada || 'Brigada de Campo TCU-102A'
          })
        },
        estado: 'recibida',
        historialEstados: [
          {
            estado: 'recibida',
            fecha: fechaLegible,
            titulo: `Solicitud de ${tipoNombre} Registrada`,
            descripcion: 'Expediente digital creado exitosamente. En espera de revisión técnica por tutores de la UTN.',
            responsable: 'Mesa de Entradas TCU-102A'
          }
        ],
        observacionesTecnicas: 'Expediente formalmente ingresado en la plataforma virtual del TCU-102A.'
      };

      guardarNuevaSolicitud(nueva);
      setSolicitudCreada(nueva);
      setIsSubmitting(false);

      // Limpiar campos principales
      setJustificacion('');
      setDireccionExacta('');
      setPuntoReferencia('');
      setFotoEvidencia(null);
    }, 700);
  };

  // Copiar código al portapapeles
  const handleCopiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  // Buscar expediente por código con sanitización
  const handleBuscarCodigo = (codigoABuscar?: string) => {
    const rawCod = (codigoABuscar || codigoBusqueda).trim();
    const cod = sanitizeAlphaNumeric(rawCod, 50).toUpperCase();
    if (!cod) {
      setBusquedaError('Por favor ingrese un código de solicitud válido (ej. TCU-REQ-2026-4821)');
      setSolicitudEncontrada(null);
      return;
    }

    const resultado = buscarSolicitudPorCodigo(cod);
    if (resultado) {
      setSolicitudEncontrada(resultado);
      setBusquedaError(null);
      setCodigoBusqueda(resultado.id);
    } else {
      setSolicitudEncontrada(null);
      setBusquedaError(`No se encontró ninguna solicitud registrada con el código "${cod}". Verifique los dígitos.`);
    }
  };

  // Cargar una solicitud de ejemplo en el buscador
  const cargarCodigoEjemplo = (codigo: string) => {
    setCodigoBusqueda(codigo);
    handleBuscarCodigo(codigo);
  };

  // Inicializar búsqueda si se hace click en "Ver en rastreador" desde el modal
  const irARastrearCreada = () => {
    if (solicitudCreada) {
      setTabPrincipal('consultar');
      setCodigoBusqueda(solicitudCreada.id);
      setSolicitudEncontrada(solicitudCreada);
      setBusquedaError(null);
      setSolicitudCreada(null);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  // Ayudante de badges de estado
  const renderBadgeEstado = (estado: string) => {
    switch (estado) {
      case 'recibida':
        return <span className="status-badge-lg recibida"><Clock size={16} /> Recibida</span>;
      case 'evaluacion':
        return <span className="status-badge-lg evaluacion"><AlertTriangle size={16} /> En Evaluación Técnica</span>;
      case 'aprobada':
        return <span className="status-badge-lg aprobada"><CheckCircle2 size={16} /> Aprobada</span>;
      case 'programada':
        return <span className="status-badge-lg programada"><Calendar size={16} /> Programada</span>;
      case 'completada':
        return <span className="status-badge-lg completada"><CheckCircle2 size={16} /> Completada</span>;
      default:
        return <span className="status-badge-lg">{estado}</span>;
    }
  };

  // Ayudante de stepper
  const getStepStatus = (stepEstado: string, currentEstado: string) => {
    const orden = ['recibida', 'evaluacion', 'aprobada', 'programada', 'completada'];
    const idxStep = orden.indexOf(stepEstado);
    const idxCurrent = orden.indexOf(currentEstado);

    if (idxStep < idxCurrent) return 'completed';
    if (idxStep === idxCurrent) return 'current';
    return '';
  };

  // Especies filtradas para catálogo
  const especiesFiltradas = ESPECIES_NATIVAS.filter(esp => {
    if (filtroEspacioCatalogo === 'todos') return true;
    return esp.tipoEspacio === filtroEspacioCatalogo;
  });

  return (
    <div className="pedidos-page-wrapper">
      {/* ------------------------------------------------------------------
          Contenedor Hero Clásico del Proyecto TCU (.info + .imagen img flotante)
          ------------------------------------------------------------------ */}
      <section className="info" aria-label="Portal de Solicitudes y Logística Comunitaria">
        <div className="imagen">
          <img
            src="/images/arbol.png"
            alt="Árbol Urbano UTN Guanacaste"
            onError={(e) => {
              // Respaldo visual en caso de ruta
              const target = e.target as HTMLImageElement;
              target.src = '/images/flor.svg';
            }}
          />
        </div>
        <div className="textos">
          <span className="badge-tcu">TCU-102A • UTN Sede Guanacaste</span>
          <h1>Solicitudes Comunitarias y Logística Forestal</h1>
          <p>
            Plataforma oficial para la donación y adopción de árboles nativos, reporte técnico de árboles con riesgo en vías públicas y préstamo de equipo de protección personal (EPP) e instrumental para brigadas estudiantiles en toda la provincia de Guanacaste.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              className="btn-tcu-primary"
              onClick={() => {
                setTabPrincipal('nueva');
                window.scrollTo({ top: 460, behavior: 'smooth' });
              }}
            >
              <Sprout size={18} /> Iniciar Nueva Solicitud
            </button>
            <button
              className="btn-secondary-tcu"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 22px' }}
              onClick={() => {
                setTabPrincipal('consultar');
                window.scrollTo({ top: 460, behavior: 'smooth' });
              }}
            >
              <Search size={18} /> Consultar Estado
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          Pestañas Principales de Navegación
          ------------------------------------------------------------------ */}
      <main className="pedidos-main-container">
        <div className="tcu-nav-tabs">
          <button
            className={`tcu-tab-btn ${tabPrincipal === 'nueva' ? 'active' : ''}`}
            onClick={() => setTabPrincipal('nueva')}
          >
            <FileText size={18} /> 1. Radicar Nueva Solicitud
          </button>
          <button
            className={`tcu-tab-btn ${tabPrincipal === 'consultar' ? 'active' : ''}`}
            onClick={() => setTabPrincipal('consultar')}
          >
            <Search size={18} /> 2. Rastrear Expediente
          </button>
          <button
            className={`tcu-tab-btn ${tabPrincipal === 'catalogo' ? 'active' : ''}`}
            onClick={() => setTabPrincipal('catalogo')}
          >
            <Trees size={18} /> 3. Catálogo de Especies & EPP
          </button>
        </div>

        {/* ================================================================
            PESTAÑA 1: RADICAR NUEVA SOLICITUD
            ================================================================ */}
        {tabPrincipal === 'nueva' && (
          <div>
            {/* Selector de Tipo de Solicitud */}
            <div className="request-type-grid">
              {/* Opción 1: Adopción / Donación */}
              <div
                className={`request-type-card ${tipoActivo === 'adopcion' ? 'selected' : ''}`}
                onClick={() => setTipoActivo('adopcion')}
              >
                <div className="type-card-header">
                  <div className="type-icon-wrapper">
                    <Sprout size={28} />
                  </div>
                  <div>
                    <h3>Adopción de Árboles</h3>
                    <span className="type-tag">Comunidades & Escuelas</span>
                  </div>
                </div>
                <p>
                  Para vecinos, comités comunales y centros educativos que deseen plantar árboles nativos adaptados al clima seco (Guachipelín, Cortez Amarillo, Roble Sabana) en aceras o parques.
                </p>
                <small style={{ color: '#15803d', fontWeight: 600 }}>
                  🌱 Incluye asesoría técnica y abono orgánico del vivero UTN.
                </small>
              </div>

              {/* Opción 2: Inspección y Riesgo */}
              <div
                className={`request-type-card ${tipoActivo === 'inspeccion' ? 'selected' : ''}`}
                onClick={() => setTipoActivo('inspeccion')}
              >
                <div className="type-card-header">
                  <div className="type-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
                    <AlertTriangle size={28} />
                  </div>
                  <div>
                    <h3>Inspección Técnica</h3>
                    <span className="type-tag" style={{ color: '#b45309' }}>Vía Pública y Riesgos</span>
                  </div>
                </div>
                <p>
                  Reporte de árboles en vías públicas con ramas secas, peligro de desprendimiento, interferencia con tendido eléctrico o afección fito-sanitaria para dictamen técnico.
                </p>
                <small style={{ color: '#b45309', fontWeight: 600 }}>
                  ⚠️ Evaluación conjunta con Municipalidades y COOPEGUANACASTE.
                </small>
              </div>

              {/* Opción 3: Equipos y Herramientas */}
              <div
                className={`request-type-card ${tipoActivo === 'herramientas' ? 'selected' : ''}`}
                onClick={() => setTipoActivo('herramientas')}
              >
                <div className="type-card-header">
                  <div className="type-icon-wrapper" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                    <Wrench size={28} />
                  </div>
                  <div>
                    <h3>Préstamo de EPP</h3>
                    <span className="type-tag" style={{ color: '#0369a1' }}>Estudiantes TCU</span>
                  </div>
                </div>
                <p>
                  Reserva y retiro de Equipos de Protección Personal (cascos, chalecos reflectivos, guantes) y herramientas dasométricas (cinta DAP, distanciómetro láser) para brigadas de campo.
                </p>
                <small style={{ color: '#0369a1', fontWeight: 600 }}>
                  🛡️ Exclusivo para matriculados en TCU-102A de la UTN.
                </small>
              </div>
            </div>

            {/* FORMULARIO */}
            <form className="solicitud-card" onSubmit={handleEnviarSolicitud}>
              {/* Sección 1: Datos del Solicitante */}
              <div className="form-section-title">
                <User size={22} />
                <span>1. Datos del Solicitante o Responsable</span>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>
                    Nombre y Apellidos Completos <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control-tcu ${errores.nombre ? 'has-error' : ''}`}
                    placeholder="Ej. María Fernanda Fonseca Ramos"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  {errores.nombre && <span className="form-error-text">{errores.nombre}</span>}
                </div>

                <div className="form-group">
                  <label>Cédula de Identidad o DIMEX</label>
                  <input
                    type="text"
                    className="form-control-tcu"
                    placeholder="Ej. 5-0321-0845"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>
                    Teléfono Celular / WhatsApp <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control-tcu ${errores.telefono ? 'has-error' : ''}`}
                    placeholder="Ej. 8834-5678"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                  {errores.telefono && <span className="form-error-text">{errores.telefono}</span>}
                </div>

                <div className="form-group">
                  <label>
                    Correo Electrónico <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control-tcu ${errores.correo ? 'has-error' : ''}`}
                    placeholder="ejemplo@correo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  {errores.correo && <span className="form-error-text">{errores.correo}</span>}
                </div>

                <div className="form-group">
                  <label>Comité, Escuela o Institución</label>
                  <input
                    type="text"
                    className="form-control-tcu"
                    placeholder="Ej. Escuela Las Palmas / Comité Barrio San Martín"
                    value={organizacion}
                    onChange={(e) => setOrganizacion(e.target.value)}
                  />
                </div>
              </div>

              {/* Campos Estudiantiles si es préstamo de herramientas */}
              {tipoActivo === 'herramientas' && (
                <div style={{ background: '#f0f9ff', padding: '18px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #bae6fd' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0369a1', fontWeight: 700, marginBottom: '12px' }}>
                    <HardHat size={18} /> Validación Académica UTN Sede Guanacaste
                  </div>
                  <div className="form-row-3">
                    <div className="form-group">
                      <label>
                        Carnet Estudiantil UTN <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control-tcu ${errores.carnetUTN ? 'has-error' : ''}`}
                        placeholder="Ej. UTN-2024-03829"
                        value={carnetUTN}
                        onChange={(e) => setCarnetUTN(e.target.value)}
                      />
                      {errores.carnetUTN && <span className="form-error-text">{errores.carnetUTN}</span>}
                    </div>

                    <div className="form-group">
                      <label>Carrera Universitaria</label>
                      <select
                        className="form-control-tcu"
                        value={carreraUTN}
                        onChange={(e) => setCarreraUTN(e.target.value)}
                      >
                        <option value="Ingeniería en Gestión Ambiental">Ingeniería en Gestión Ambiental (IGAE)</option>
                        <option value="Ingeniería en Agronomía">Ingeniería en Agronomía</option>
                        <option value="Ingeniería en Tecnologías de Información">Ing. en Tecnologías de Información (ITI)</option>
                        <option value="Ingeniería en Energías Renovables">Ing. en Energías Renovables (IER)</option>
                        <option value="Administración y Gestión de Recursos">Administración y Gestión de Recursos</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Nombre de la Brigada o Gira</label>
                      <input
                        type="text"
                        className="form-control-tcu"
                        placeholder="Ej. Brigada Liberia - Fase Muestreo"
                        value={nombreBrigada}
                        onChange={(e) => setNombreBrigada(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sección 2: Ubicación en Guanacaste */}
              <div className="form-section-title">
                <MapPin size={22} />
                <span>2. Ubicación en la Provincia de Guanacaste</span>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Cantón de Guanacaste <span className="required">*</span></label>
                  <select
                    className="form-control-tcu"
                    value={canton}
                    onChange={(e) => handleCantonChange(e.target.value)}
                  >
                    {Object.keys(CANTONES_GUANACASTE).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Distrito <span className="required">*</span></label>
                  <select
                    className="form-control-tcu"
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                  >
                    {(CANTONES_GUANACASTE[canton] || []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>
                    Dirección Exacta o Coordenadas <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control-tcu ${errores.direccionExacta ? 'has-error' : ''}`}
                    placeholder="Ej. Del Parque Central 250m este, frente al abastecedor Los Ángeles"
                    value={direccionExacta}
                    onChange={(e) => setDireccionExacta(e.target.value)}
                  />
                  {errores.direccionExacta && <span className="form-error-text">{errores.direccionExacta}</span>}
                </div>

                <div className="form-group">
                  <label>Punto de Referencia Conocido</label>
                  <input
                    type="text"
                    className="form-control-tcu"
                    placeholder="Ej. Costado norte de la iglesia católica / diagonal a la escuela"
                    value={puntoReferencia}
                    onChange={(e) => setPuntoReferencia(e.target.value)}
                  />
                </div>
              </div>

              {/* Sección 3: Detalles específicos según el tipo */}
              {tipoActivo === 'adopcion' && (
                <>
                  <div className="form-section-title">
                    <Sprout size={22} />
                    <span>3. Selección de Especies Nativas y Espacio Disponible</span>
                  </div>

                  <div className="form-group">
                    <label>Tipo de Espacio para la Siembra</label>
                    <select
                      className="form-control-tcu"
                      value={tipoEspacio}
                      onChange={(e) => setTipoEspacio(e.target.value)}
                    >
                      <option value="Acera residencial angosta (<1.8m)">Acera residencial angosta (&lt;1.8m)</option>
                      <option value="Acera amplia / Bulevar (>2.5m)">Acera amplia / Bulevar (&gt;2.5m)</option>
                      <option value="Parque comunal o Plaza deportiva">Parque comunal o Plaza deportiva</option>
                      <option value="Plantel escolar o colegio público">Plantel escolar o colegio público</option>
                      <option value="Zona de recarga o ribera de quebrada">Zona de protección o ribera de quebrada</option>
                      <option value="Antejardín comunitario">Antejardín comunitario</option>
                    </select>
                  </div>

                  <div style={{ marginTop: '14px', marginBottom: '8px' }}>
                    <label style={{ fontWeight: 600 }}>Seleccione la cantidad de cada especie requerida:</label>
                    {errores.especies && <span className="form-error-text">{errores.especies}</span>}
                  </div>

                  <div className="species-selector-grid">
                    {ESPECIES_NATIVAS.map((especie) => {
                      const cantidad = especiesSeleccionadas[especie.id] || 0;
                      return (
                        <div
                          key={especie.id}
                          className={`species-select-card ${cantidad > 0 ? 'selected' : ''}`}
                        >
                          <div className="species-card-head">
                            <img
                              src={especie.imagen}
                              alt={especie.nombreComun}
                              className="species-mini-icon"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/flor.svg';
                              }}
                            />
                            <div className="species-title-box">
                              <h4>{especie.nombreComun}</h4>
                              <small>{especie.nombreCientifico}</small>
                            </div>
                          </div>

                          <div className="species-card-body">
                            <span
                              className={`species-badge ${
                                especie.tipoEspacio === 'acera_angosta'
                                  ? 'angosta'
                                  : especie.tipoEspacio === 'acera_media'
                                  ? 'media'
                                  : 'parque'
                              }`}
                            >
                              {especie.espacioRecomendadoTexto}
                            </span>
                            <p>{especie.descripcion}</p>
                          </div>

                          <div className="counter-controls">
                            <span style={{ fontSize: '0.85rem', color: '#475569' }}>Unidades:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button
                                type="button"
                                className="counter-btn"
                                onClick={() => actualizarCantidadEspecie(especie.id, -1)}
                                disabled={cantidad === 0}
                              >
                                -
                              </button>
                              <span className="counter-value">{cantidad}</span>
                              <button
                                type="button"
                                className="counter-btn"
                                onClick={() => actualizarCantidadEspecie(especie.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={compromisoRiego}
                        onChange={(e) => setCompromisoRiego(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: '#47c73b' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                        <strong>Compromiso de Cuido Comunitario:</strong> Me comprometo a regar y proteger los árboles durante los primeros dos veranos secos (noviembre a abril) para garantizar su prendimiento.
                      </span>
                    </label>
                  </div>
                </>
              )}

              {tipoActivo === 'inspeccion' && (
                <>
                  <div className="form-section-title">
                    <AlertTriangle size={22} style={{ color: '#d97706' }} />
                    <span>3. Valoración Inicial y Factores de Riesgo</span>
                  </div>

                  <div className="form-group">
                    <label>Nivel de Urgencia Estimado</label>
                    <div className="urgency-options">
                      <div
                        className={`urgency-pill normal ${nivelUrgencia === 'normal' ? 'active' : ''}`}
                        onClick={() => setNivelUrgencia('normal')}
                      >
                        🟢 Normal (Poda preventiva)
                      </div>
                      <div
                        className={`urgency-pill moderado ${nivelUrgencia === 'moderado' ? 'active' : ''}`}
                        onClick={() => setNivelUrgencia('moderado')}
                      >
                        🟡 Moderado (Riesgo en vientos)
                      </div>
                      <div
                        className={`urgency-pill critico ${nivelUrgencia === 'critico' ? 'active' : ''}`}
                        onClick={() => setNivelUrgencia('critico')}
                      >
                        🔴 Crítico (Riesgo inminente de caída)
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Condiciones y Factores de Riesgo Observados <span className="required">*</span></label>
                    {errores.riesgos && <span className="form-error-text">{errores.riesgos}</span>}
                    <div className="risk-checkbox-grid">
                      {[
                        'Riesgo de caída de ramas sobre vía peatonal',
                        'Cercanía o contacto con cableado eléctrico de alta/baja tensión',
                        'Tronco con fisuras, inclinación severa o pudrición basal',
                        'Raíces levantando aceras, cordones de caño o tuberías',
                        'Presencia de termitas, comején o plagas perforadoras',
                        'Árbol seco / muerto en pie',
                        'Obstrucción visual de señalización vial o intersección'
                      ].map((riesgo) => (
                        <div
                          key={riesgo}
                          className="risk-check-item"
                          onClick={() => toggleRiesgo(riesgo)}
                        >
                          <input
                            type="checkbox"
                            checked={riesgosSeleccionados.includes(riesgo)}
                            onChange={() => {}} // Manejado por onClick del contenedor
                            style={{ accentColor: '#47c73b' }}
                          />
                          <span>{riesgo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Descripción del Árbol (Especie aproximada, altura, edad estimada)</label>
                    <input
                      type="text"
                      className="form-control-tcu"
                      placeholder="Ej. Árbol de Ficus grande de unos 12 metros, copa frondosa sobre calle pública"
                      value={descripcionArbol}
                      onChange={(e) => setDescripcionArbol(e.target.value)}
                    />
                  </div>

                  {/* Carga de fotografía */}
                  <div className="form-group">
                    <label>Fotografía o Evidencia Visual del Árbol / Riesgo</label>
                    <div className="photo-dropzone">
                      <input
                        type="file"
                        accept="image/*"
                        id="foto-arbol-input"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="foto-arbol-input" style={{ cursor: 'pointer', margin: 0 }}>
                        <UploadCloud size={36} style={{ color: '#47c73b', margin: '0 auto 8px auto' }} />
                        <div style={{ fontWeight: 600, color: '#234175' }}>Haga clic para subir una foto</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Formatos JPG, PNG (máx. 10MB)</div>
                      </label>
                    </div>

                    {fotoEvidencia && (
                      <div className="photo-preview-wrapper">
                        <img src={fotoEvidencia} alt="Evidencia árbol" className="photo-preview-img" />
                        <button
                          type="button"
                          className="remove-photo-btn"
                          onClick={() => setFotoEvidencia(null)}
                          title="Eliminar foto"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {tipoActivo === 'herramientas' && (
                <>
                  <div className="form-section-title">
                    <Wrench size={22} style={{ color: '#0284c7' }} />
                    <span>3. Instrumental Dasométrico y EPP Solicitado</span>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Fecha de Retiro / Gira de Campo</label>
                      <input
                        type="date"
                        className="form-control-tcu"
                        value={fechaUso}
                        onChange={(e) => setFechaUso(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha Estimada de Devolución a Bodega UTN</label>
                      <input
                        type="date"
                        className="form-control-tcu"
                        value={fechaDevolucion}
                        onChange={(e) => setFechaDevolucion(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '10px', marginBottom: '8px' }}>
                    <label style={{ fontWeight: 600 }}>Seleccione los equipos requeridos:</label>
                    {errores.equipos && <span className="form-error-text">{errores.equipos}</span>}
                  </div>

                  <div className="equipment-selector-grid">
                    {EQUIPOS_DISPONIBLES.map((eq) => {
                      const cantidad = equiposSeleccionados[eq.id] || 0;
                      return (
                        <div
                          key={eq.id}
                          className={`equipment-select-card ${cantidad > 0 ? 'selected' : ''}`}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#234175', margin: 0 }}>
                                {eq.nombre}
                              </h4>
                              <span className="stock-pill">Disp: {eq.stockDisponible}</span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '6px 0 10px 0', lineHeight: 1.4 }}>
                              {eq.descripcion}
                            </p>
                            <small style={{ color: '#0369a1', fontSize: '0.75rem', display: 'block' }}>
                              {eq.especificaciones}
                            </small>
                          </div>

                          <div className="counter-controls">
                            <span style={{ fontSize: '0.85rem', color: '#475569' }}>Solicitados:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button
                                type="button"
                                className="counter-btn"
                                onClick={() => actualizarCantidadEquipo(eq.id, -1)}
                                disabled={cantidad === 0}
                              >
                                -
                              </button>
                              <span className="counter-value">{cantidad}</span>
                              <button
                                type="button"
                                className="counter-btn"
                                onClick={() => actualizarCantidadEquipo(eq.id, 1)}
                                disabled={cantidad >= eq.stockDisponible}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Justificación General */}
              <div className="form-group" style={{ marginTop: '24px' }}>
                <label>
                  Justificación y Objetivos de la Solicitud <span className="required">*</span>
                </label>
                <textarea
                  rows={4}
                  className={`form-control-tcu ${errores.justificacion ? 'has-error' : ''}`}
                  placeholder="Detalle el beneficio comunitario, la urgencia de la poda o las actividades que llevará a cabo la brigada..."
                  value={justificacion}
                  onChange={(e) => setJustificacion(e.target.value)}
                />
                {errores.justificacion && <span className="form-error-text">{errores.justificacion}</span>}
              </div>

              {/* Botón de Envío */}
              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
                <button
                  type="submit"
                  className="btn-tcu-primary"
                  disabled={isSubmitting}
                  style={{ minWidth: '220px', justifyContent: 'center' }}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" /> Procesando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> Enviar Solicitud Formal
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================
            PESTAÑA 2: CONSULTAR ESTADO Y EXPEDIENTES
            ================================================================ */}
        {tabPrincipal === 'consultar' && (
          <div>
            <div className="tracker-search-box">
              <h2 style={{ fontSize: '1.4rem', color: '#234175', fontWeight: 800, margin: 0 }}>
                Consulta y Seguimiento de Expedientes TCU
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
                Ingrese el código de radicación proporcionado al momento de su solicitud para verificar el estado de evaluación agronómica, acuerdos municipales y programación de visitas.
              </p>

              <div className="search-input-group">
                <input
                  type="text"
                  className="form-control-tcu"
                  placeholder="Ej. TCU-REQ-2026-4821"
                  value={codigoBusqueda}
                  onChange={(e) => setCodigoBusqueda(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBuscarCodigo();
                  }}
                />
                <button
                  type="button"
                  className="btn-tcu-primary"
                  onClick={() => handleBuscarCodigo()}
                >
                  <Search size={18} /> Buscar Expediente
                </button>
              </div>

              {busquedaError && (
                <div style={{ marginTop: '12px', color: '#dc2626', fontSize: '0.9rem', fontWeight: 500 }}>
                  ⚠️ {busquedaError}
                </div>
              )}

              {/* Códigos de ejemplo interactivos */}
              <div className="sample-codes-bar">
                <span>Expedientes de prueba registrados en Guanacaste:</span>
                <span
                  className="sample-code-chip"
                  onClick={() => cargarCodigoEjemplo('TCU-REQ-2026-4821')}
                >
                  TCU-REQ-2026-4821 (Liberia • Riesgo Ficus)
                </span>
                <span
                  className="sample-code-chip"
                  onClick={() => cargarCodigoEjemplo('TCU-REQ-2026-3091')}
                >
                  TCU-REQ-2026-3091 (Cañas • Donación Escuela)
                </span>
                <span
                  className="sample-code-chip"
                  onClick={() => cargarCodigoEjemplo('TCU-REQ-2026-2184')}
                >
                  TCU-REQ-2026-2184 (Nicoya • Préstamo EPP)
                </span>
                <span
                  className="sample-code-chip"
                  onClick={() => cargarCodigoEjemplo('TCU-REQ-2026-1042')}
                >
                  TCU-REQ-2026-1042 (Santa Cruz • Completada)
                </span>
              </div>
            </div>

            {/* EXPEDIENTE ENCONTRADO */}
            {solicitudEncontrada && (
              <div className="expediente-result-card">
                <div className="expediente-header">
                  <div>
                    <div className="expediente-code-badge">
                      <FileText size={20} /> {solicitudEncontrada.id}
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.9 }}>
                      Registrada el{' '}
                      {new Date(solicitudEncontrada.fechaRegistro).toLocaleDateString('es-CR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  <div>
                    {renderBadgeEstado(solicitudEncontrada.estado)}
                  </div>
                </div>

                <div className="expediente-body">
                  {/* Stepper de Progreso */}
                  <div className="timeline-stepper">
                    <div className={`step-node ${getStepStatus('recibida', solicitudEncontrada.estado)}`}>
                      <div className="step-icon-circle">1</div>
                      <span className="step-title">Recibida</span>
                    </div>

                    <div className={`step-node ${getStepStatus('evaluacion', solicitudEncontrada.estado)}`}>
                      <div className="step-icon-circle">2</div>
                      <span className="step-title">Evaluación Técnica</span>
                    </div>

                    <div className={`step-node ${getStepStatus('aprobada', solicitudEncontrada.estado)}`}>
                      <div className="step-icon-circle">3</div>
                      <span className="step-title">Aprobada</span>
                    </div>

                    <div className={`step-node ${getStepStatus('programada', solicitudEncontrada.estado)}`}>
                      <div className="step-icon-circle">4</div>
                      <span className="step-title">Programada</span>
                    </div>

                    <div className={`step-node ${getStepStatus('completada', solicitudEncontrada.estado)}`}>
                      <div className="step-icon-circle">5</div>
                      <span className="step-title">Completada</span>
                    </div>
                  </div>

                  {/* Resumen en 2 columnas */}
                  <div className="expediente-grid-info">
                    <div>
                      <div className="info-item">
                        <div className="info-item-label">Solicitante</div>
                        <div className="info-item-value">{solicitudEncontrada.solicitante.nombre}</div>
                      </div>

                      <div className="info-item">
                        <div className="info-item-label">Contacto</div>
                        <div className="info-item-value">
                          {solicitudEncontrada.solicitante.telefono} • {solicitudEncontrada.solicitante.correo}
                        </div>
                      </div>

                      <div className="info-item">
                        <div className="info-item-label">Organización / Entidad</div>
                        <div className="info-item-value">
                          {solicitudEncontrada.solicitante.organizacion || 'Particular'}
                        </div>
                      </div>

                      {solicitudEncontrada.solicitante.carnetUTN && (
                        <div className="info-item">
                          <div className="info-item-label">Carnet UTN y Carrera</div>
                          <div className="info-item-value">
                            {solicitudEncontrada.solicitante.carnetUTN} ({solicitudEncontrada.solicitante.carrera})
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="info-item">
                        <div className="info-item-label">Cantón y Distrito</div>
                        <div className="info-item-value">
                          {solicitudEncontrada.ubicacion.canton}, {solicitudEncontrada.ubicacion.distrito}
                        </div>
                      </div>

                      <div className="info-item">
                        <div className="info-item-label">Dirección Exacta</div>
                        <div className="info-item-value">{solicitudEncontrada.ubicacion.direccionExacta}</div>
                      </div>

                      {solicitudEncontrada.ubicacion.puntoReferencia && (
                        <div className="info-item">
                          <div className="info-item-label">Punto de Referencia</div>
                          <div className="info-item-value">{solicitudEncontrada.ubicacion.puntoReferencia}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detalles específicos del tipo */}
                  <div style={{ marginTop: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
                    <h4 style={{ color: '#234175', margin: '0 0 10px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                      Detalles de la Gestión
                    </h4>
                    <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                      <strong>Motivo / Justificación:</strong> {solicitudEncontrada.detalles.justificacion}
                    </p>

                    {/* Donación */}
                    {solicitudEncontrada.tipo === 'adopcion' && solicitudEncontrada.detalles.especiesSolicitadas && (
                      <div>
                        <strong>Árboles Nativos Asignados:</strong>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
                          {solicitudEncontrada.detalles.especiesSolicitadas.map((item, idx) => {
                            const esp = ESPECIES_NATIVAS.find(e => e.id === item.especieId);
                            return (
                              <span key={idx} style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                                🌳 {item.cantidad}x {esp ? esp.nombreComun : item.especieId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Inspección */}
                    {solicitudEncontrada.tipo === 'inspeccion' && (
                      <div>
                        {solicitudEncontrada.detalles.nivelUrgencia && (
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Nivel de Urgencia: </strong>
                            <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                              {solicitudEncontrada.detalles.nivelUrgencia}
                            </span>
                          </div>
                        )}
                        {solicitudEncontrada.detalles.tipoRiesgo && (
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Factores Diagnosticados:</strong>
                            <ul style={{ margin: '6px 0 0 20px', fontSize: '0.88rem', color: '#475569' }}>
                              {solicitudEncontrada.detalles.tipoRiesgo.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {solicitudEncontrada.detalles.fotoEvidenciaUrl && (
                          <div style={{ marginTop: '12px' }}>
                            <strong>Evidencia Fotográfica:</strong>
                            <div style={{ marginTop: '6px' }}>
                              <img
                                src={solicitudEncontrada.detalles.fotoEvidenciaUrl}
                                alt="Evidencia de inspección"
                                style={{ maxHeight: '160px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Herramientas */}
                    {solicitudEncontrada.tipo === 'herramientas' && solicitudEncontrada.detalles.equiposSolicitados && (
                      <div>
                        <strong>Equipos y EPP Asignados:</strong>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
                          {solicitudEncontrada.detalles.equiposSolicitados.map((item, idx) => {
                            const eq = EQUIPOS_DISPONIBLES.find(e => e.id === item.equipoId);
                            return (
                              <span key={idx} style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                                🛠️ {item.cantidad}x {eq ? eq.nombre : item.equipoId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {solicitudEncontrada.observacionesTecnicas && (
                      <div style={{ marginTop: '14px', background: '#f8fafc', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #47c73b' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#234175', textTransform: 'uppercase', display: 'block' }}>
                          Nota Técnica TCU-UTN:
                        </span>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#334155' }}>
                          {solicitudEncontrada.observacionesTecnicas}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Historial Cronológico de Movimientos */}
                  <div className="history-feed">
                    <h4 style={{ color: '#234175', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
                      Bitácora de Trazabilidad y Dictámenes
                    </h4>

                    {solicitudEncontrada.historialEstados.map((h, i) => (
                      <div key={i} className="history-entry">
                        <div className="history-dot">
                          <CheckCircle2 size={18} />
                        </div>
                        <div className="history-content">
                          <div className="history-meta">
                            <span className="history-title">{h.titulo}</span>
                            <span className="history-time">{h.fecha}</span>
                          </div>
                          <p className="history-desc">{h.descripcion}</p>
                          <span className="history-author">Responsable: {h.responsable}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            PESTAÑA 3: CATÁLOGO DE ESPECIES NATIVAS & EQUIPOS
            ================================================================ */}
        {tabPrincipal === 'catalogo' && (
          <div>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#234175', fontWeight: 800, margin: '0 0 8px 0' }}>
                Guía Técnica de Especies Nativas de Guanacaste
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 16px 0' }}>
                Conozca las especies ideales según el ancho de acera, tipo de suelo y disponibilidad hídrica en la provincia. Cumpliendo las recomendaciones forestales evitamos el colapso de pavimentos y tendidos eléctricos.
              </p>

              <div className="catalog-filter-bar">
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569', alignSelf: 'center' }}>
                  Filtrar por Espacio:
                </span>
                <button
                  className={`catalog-pill-btn ${filtroEspacioCatalogo === 'todos' ? 'active' : ''}`}
                  onClick={() => setFiltroEspacioCatalogo('todos')}
                >
                  Todas las Especies ({ESPECIES_NATIVAS.length})
                </button>
                <button
                  className={`catalog-pill-btn ${filtroEspacioCatalogo === 'acera_angosta' ? 'active' : ''}`}
                  onClick={() => setFiltroEspacioCatalogo('acera_angosta')}
                >
                  Aceras Angostas (&lt;1.8m)
                </button>
                <button
                  className={`catalog-pill-btn ${filtroEspacioCatalogo === 'acera_media' ? 'active' : ''}`}
                  onClick={() => setFiltroEspacioCatalogo('acera_media')}
                >
                  Aceras Medianas (&gt;2.0m)
                </button>
                <button
                  className={`catalog-pill-btn ${filtroEspacioCatalogo === 'parque_amplio' ? 'active' : ''}`}
                  onClick={() => setFiltroEspacioCatalogo('parque_amplio')}
                >
                  Parques y Plazas Abiertas
                </button>
              </div>
            </div>

            {/* Grid de Especies */}
            <div className="catalog-card-grid">
              {especiesFiltradas.map((esp) => (
                <div key={esp.id} className="catalog-item-card">
                  <div className="catalog-item-card-header">
                    <img
                      src={esp.imagen}
                      alt={esp.nombreComun}
                      style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/flor.svg';
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#234175', margin: 0, fontWeight: 700 }}>
                        {esp.nombreComun}
                      </h3>
                      <span style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#64748b' }}>
                        {esp.nombreCientifico}
                      </span>
                    </div>
                  </div>

                  <div className="catalog-item-card-body">
                    <div style={{ marginBottom: '10px' }}>
                      <span
                        className={`species-badge ${
                          esp.tipoEspacio === 'acera_angosta'
                            ? 'angosta'
                            : esp.tipoEspacio === 'acera_media'
                            ? 'media'
                            : 'parque'
                        }`}
                      >
                        {esp.espacioRecomendadoTexto}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '12px' }}>
                      {esp.descripcion}
                    </p>

                    <div style={{ fontSize: '0.84rem', color: '#334155', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Altura Máxima:</strong> {esp.alturaMax}
                      </div>
                      <div style={{ marginBottom: '4px' }}>
                        <strong>Tipo de Raíz:</strong> {esp.tipoRaiz}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Floración:</strong> {esp.floracion}
                      </div>
                    </div>

                    <div className="benefit-tag-list">
                      {esp.beneficios.map((b, i) => (
                        <span key={i} className="benefit-tag">✓ {b}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn-tcu-primary"
                      style={{ padding: '8px 16px', fontSize: '0.88rem' }}
                      onClick={() => {
                        setTipoActivo('adopcion');
                        setEspeciesSeleccionadas({ [esp.id]: 2 });
                        setTabPrincipal('nueva');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                    >
                      <Sprout size={15} /> Solicitar esta Especie
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Catálogo de Instrumental & EPP */}
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', marginTop: '40px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HardHat size={26} style={{ color: '#0369a1' }} />
                <h2 style={{ fontSize: '1.4rem', color: '#234175', fontWeight: 800, margin: 0 }}>
                  Equipos de Protección Personal (EPP) e Instrumental Forestal
                </h2>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
                Normativas de seguridad ocupacional para cuadrillas de campo del TCU-102A y brigadas comunitarias.
              </p>
            </div>

            <div className="catalog-card-grid">
              {EQUIPOS_DISPONIBLES.map((eq) => (
                <div key={eq.id} className="catalog-item-card">
                  <div className="catalog-item-card-header">
                    {eq.imagen ? (
                      <img
                        src={eq.imagen}
                        alt={eq.nombre}
                        style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/chaleco.png';
                        }}
                      />
                    ) : (
                      <div className="type-icon-wrapper" style={{ width: '44px', height: '44px' }}>
                        <Wrench size={22} />
                      </div>
                    )}
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: '#234175', margin: 0, fontWeight: 700 }}>
                        {eq.nombre}
                      </h3>
                      <span className="stock-pill" style={{ marginTop: '4px', display: 'inline-block' }}>
                        Stock en Pañol UTN: {eq.stockDisponible} unid.
                      </span>
                    </div>
                  </div>

                  <div className="catalog-item-card-body">
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '12px' }}>
                      {eq.descripcion}
                    </p>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', color: '#0369a1' }}>
                      <strong>Norma / Estándar:</strong> {eq.especificaciones}
                    </div>
                  </div>

                  <div style={{ padding: '14px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
                    <button
                      type="button"
                      className="btn-tcu-primary"
                      style={{ padding: '8px 16px', fontSize: '0.88rem', background: '#0284c7' }}
                      onClick={() => {
                        setTipoActivo('herramientas');
                        setEquiposSeleccionados({ [eq.id]: 1 });
                        setTabPrincipal('nueva');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                    >
                      <Wrench size={15} /> Solicitar Préstamo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================================================================
          MODAL DE ÉXITO TRAS GENERAR SOLICITUD
          ================================================================ */}
      {solicitudCreada && (
        <div className="tcu-modal-backdrop" onClick={() => setSolicitudCreada(null)}>
          <div className="tcu-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-success-icon">
              <CheckCircle2 size={44} />
            </div>

            <h2 style={{ fontSize: '1.6rem', color: '#234175', fontWeight: 800, margin: '0 0 10px 0' }}>
              ¡Solicitud Registrada con Éxito!
            </h2>
            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Su expediente ha sido incorporado al sistema de gestión comunitaria del TCU-102A de la Universidad Técnica Nacional.
            </p>

            <div className="modal-code-box">
              <div>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#15803d', fontWeight: 700 }}>
                  Código Único de Seguimiento
                </div>
                <div className="modal-code-value">{solicitudCreada.id}</div>
              </div>

              <button
                type="button"
                className="btn-secondary-tcu"
                style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={() => handleCopiarCodigo(solicitudCreada.id)}
              >
                {copiado ? <Check size={16} style={{ color: '#16a34a' }} /> : <Copy size={16} />}
                {copiado ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#64748b', textAlign: 'left', background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
              ℹ️ Conserve este código para dar seguimiento al estado de su solicitud. Un tutor del TCU revisará su caso y se comunicará al teléfono <strong>{solicitudCreada.solicitante.telefono}</strong>.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary-tcu"
                onClick={() => setSolicitudCreada(null)}
              >
                Cerrar y Nueva Solicitud
              </button>
              <button
                type="button"
                className="btn-tcu-primary"
                onClick={irARastrearCreada}
              >
                <Search size={16} /> Rastrear Mi Solicitud Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
