// src/data/pedidosData.ts
// TCU-102A: Gestión Integral del Árbol Urbano en mi Comunidad (UTN Sede Guanacaste)

export type TipoSolicitud = 'adopcion' | 'inspeccion' | 'herramientas';

export type EstadoSolicitud = 'recibida' | 'evaluacion' | 'aprobada' | 'programada' | 'completada';

export interface EspecieNativa {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  tipoEspacio: 'acera_angosta' | 'acera_media' | 'parque_amplio';
  espacioRecomendadoTexto: string;
  alturaMax: string;
  tipoRaiz: string;
  floracion: string;
  descripcion: string;
  imagen: string;
  beneficios: string[];
}

export interface EquipoHerramienta {
  id: string;
  nombre: string;
  categoria: 'epp' | 'medicion' | 'poda';
  descripcion: string;
  stockDisponible: number;
  imagen?: string;
  iconoNombre: string;
  especificaciones: string;
}

export interface Solicitud {
  id: string;
  fechaRegistro: string;
  tipo: TipoSolicitud;
  solicitante: {
    nombre: string;
    cedula: string;
    telefono: string;
    correo: string;
    organizacion?: string;
    esEstudiante?: boolean;
    carnetUTN?: string;
    carrera?: string;
  };
  ubicacion: {
    canton: string;
    distrito: string;
    direccionExacta: string;
    puntoReferencia?: string;
    coordenadas?: string;
    tipoEspacio?: string;
  };
  detalles: {
    justificacion: string;
    // Donación / Adopción
    especiesSolicitadas?: { especieId: string; cantidad: number }[];
    cantidadTotalArboles?: number;
    compromisoRiego?: boolean;
    // Inspección Técnica
    nivelUrgencia?: 'normal' | 'moderado' | 'critico';
    tipoRiesgo?: string[];
    descripcionArbol?: string;
    fotoEvidenciaUrl?: string;
    // Herramientas / EPP Estudiantil
    equiposSolicitados?: { equipoId: string; cantidad: number }[];
    fechaUsoEstimada?: string;
    fechaDevolucionEstimada?: string;
    brigadaOProyecto?: string;
  };
  estado: EstadoSolicitud;
  historialEstados: {
    estado: EstadoSolicitud;
    fecha: string;
    titulo: string;
    descripcion: string;
    responsable: string;
  }[];
  observacionesTecnicas?: string;
}

export const CANTONES_GUANACASTE: Record<string, string[]> = {
  Liberia: ['Liberia', 'Cañas Dulces', 'Mayorga', 'Nacascolo', 'Curubandé'],
  Cañas: ['Cañas', 'Palmira', 'San Miguel', 'Bebedero', 'Porozó'],
  Nicoya: ['Nicoya', 'Mansión', 'San Antonio', 'Quebrada Honda', 'Sámara', 'Nósara', 'Belén de Nosarita'],
  'Santa Cruz': ['Santa Cruz', 'Bolsón', 'Veintisiete de Abril', 'Tempisque', 'Cartagena', 'Cuajiniquil', 'Diriá', 'Cabo Velas', 'Tamarindo'],
  Bagaces: ['Bagaces', 'La Fortuna', 'Mogote', 'Río Naranjo'],
  Carrillo: ['Filadelfia', 'Palmira', 'Sardinal', 'Belén'],
  Abangares: ['Las Juntas', 'Sierra', 'San Juan', 'Colorado'],
  Tilarán: ['Tilarán', 'Quebrada Grande', 'Tronadora', 'Santa Rosa', 'Líbano', 'Tierras Morenas', 'Arenal', 'Cabeceras'],
  Nandayure: ['Carmona', 'Santa Rita', 'Zapotal', 'San Pablo', 'Porvenir', 'Bejuco'],
  'La Cruz': ['La Cruz', 'Santa Cecilia', 'La Garita', 'Santa Elena'],
  Hojancha: ['Hojancha', 'Monte Romo', 'Puerto Carrillo', 'Huacas', 'Matambú']
};

export const ESPECIES_NATIVAS: EspecieNativa[] = [
  {
    id: 'esp-guachipelin',
    nombreComun: 'Guachipelín',
    nombreCientifico: 'Diphysa americana',
    tipoEspacio: 'acera_angosta',
    espacioRecomendadoTexto: 'Aceras angostas (<1.8m), antejardines y servidumbres urbanas',
    alturaMax: '6 - 9 metros',
    tipoRaiz: 'Pivotante profunda (No rompe pavimentos ni tuberías)',
    floracion: 'Amarilla abundante en estación seca (Enero - Marzo)',
    descripcion: 'Especie nativa preferida para arborización vial en Guanacaste. No genera interferencia agresiva con cables secundarios y atrae abejas meliponas.',
    imagen: '/images/hoja.png',
    beneficios: ['Apta para aceras estrechas', 'Fijadora de nitrógeno', 'Bajo requerimiento hídrico', 'Madera densa no quebradiza']
  },
  {
    id: 'esp-cortez-amarillo',
    nombreComun: 'Cortez Amarillo',
    nombreCientifico: 'Handroanthus ochraceus',
    tipoEspacio: 'acera_media',
    espacioRecomendadoTexto: 'Aceras medianas (>2.0m), separadores viales y plazas',
    alturaMax: '10 - 15 metros',
    tipoRaiz: 'Profunda y concentrada, excelente anclaje',
    floracion: 'Espectacular manto dorado masivo y sincrónico (Marzo - Abril)',
    descripcion: 'Símbolo del bosque seco tropical guanacasteco. Ofrece sombra caducifolia estacional y embellece radicalmente el paisaje comunitario.',
    imagen: '/images/flor.svg',
    beneficios: ['Floración emblemática', 'Resistente a sequías prolongadas', 'Sombra estacional', 'Gran valor paisajístico']
  },
  {
    id: 'esp-roble-sabana',
    nombreComun: 'Roble de Sabana',
    nombreCientifico: 'Tabebuia rosea',
    tipoEspacio: 'acera_media',
    espacioRecomendadoTexto: 'Aceras amplias (>2.5m), bulevares y centros educativos',
    alturaMax: '12 - 18 metros',
    tipoRaiz: 'Extensa con fuste recto y corteza fisurada',
    floracion: 'Floración rosada a lila pastel de gran cobertura (Febrero - Mayo)',
    descripcion: 'Árbol clásico de la bajura guanacasteca. Provee néctar para polinizadores y hojarasca que regenera suelos urbanos degradados.',
    imagen: '/images/arbol.png',
    beneficios: ['Copa equilibrada', 'Alta captación de partículas PM10', 'Refugio para aves urbanas', 'Crecimiento rápido']
  },
  {
    id: 'esp-guanacaste',
    nombreComun: 'Árbol de Guanacaste',
    nombreCientifico: 'Enterolobium cyclocarpum',
    tipoEspacio: 'parque_amplio',
    espacioRecomendadoTexto: 'Parques comunales, plazas de deportes y campus universitarios (>10m de retiro)',
    alturaMax: '20 - 30 metros',
    tipoRaiz: 'Muy amplia y robusta con contrafuertes (requiere suelo abierto)',
    floracion: 'Blanca esfumada en motas de algodón (Marzo - Mayo)',
    descripcion: 'Árbol Nacional de Costa Rica. Su inmensa copa aparasolada puede brindar hasta 40 metros de sombra continua, mitigando islas de calor.',
    imagen: '/images/arbol-icono.ico',
    beneficios: ['Símbolo patrio y cultural', 'Máxima mitigación térmica (-4°C bajo copa)', 'Captura masiva de CO2', 'Frutos forrajeros']
  },
  {
    id: 'esp-cenizaro',
    nombreComun: 'Cenízaro',
    nombreCientifico: 'Samanea saman',
    tipoEspacio: 'parque_amplio',
    espacioRecomendadoTexto: 'Zonas recreativas, rotondas grandes y reservas comunales',
    alturaMax: '18 - 25 metros',
    tipoRaiz: 'Superficial extendida, óptima para retención hídrica',
    floracion: 'Rosada y blanca en pompones plumosos',
    descripcion: 'Follaje que pliega sus hojas durante la noche o lluvia. Crea microclimas frescos únicos y protege fuentes de agua.',
    imagen: '/images/hoja.svg',
    beneficios: ['Enorme microclima fresco', 'Cierre foliar nocturno', 'Gran longevidad (+100 años)', 'Sombra generosa']
  },
  {
    id: 'esp-guayacan-real',
    nombreComun: 'Guayacán Real',
    nombreCientifico: 'Guaiacum sanctum',
    tipoEspacio: 'acera_angosta',
    espacioRecomendadoTexto: 'Espacios reducidos, rocallas urbanas y rotondas',
    alturaMax: '5 - 8 metros',
    tipoRaiz: 'Compacta y dócil con aceras',
    floracion: 'Azul violáceo intensa, hojas perennes de verde brillante',
    descripcion: 'Especie en veda y peligro crítico adaptada a suelos calizos y calor extremo. Deporte compacto y belleza excepcional para conservación.',
    imagen: '/images/flor.svg',
    beneficios: ['Especie protegida prioritaria', 'Crecimiento compacto y limpio', 'Siempreverde', 'Tolerancia extrema a sequía']
  }
];

export const EQUIPOS_DISPONIBLES: EquipoHerramienta[] = [
  {
    id: 'eq-casco',
    nombre: 'Casco Forestal de Seguridad con Barbiquejo',
    categoria: 'epp',
    descripcion: 'Protección dieléctrica Tipo I Clase E, con ajuste ratchet y suspensión de 4 puntos.',
    stockDisponible: 18,
    imagen: '/images/casco.png',
    iconoNombre: 'HardHat',
    especificaciones: 'Norma ANSI/ISEA Z89.1-2014. Color blanco y naranja de alta visibilidad.'
  },
  {
    id: 'eq-chaleco',
    nombre: 'Chaleco Reflectivo de Campo TCU',
    categoria: 'epp',
    descripcion: 'Chaleco brigadista con cintas reflectivas 3M de 2 pulgadas, bolsillos para libreta y GPS.',
    stockDisponible: 24,
    imagen: '/images/chaleco.png',
    iconoNombre: 'ShieldCheck',
    especificaciones: 'Clase 2 ANSI/ISEA 107-2020. Logotipos bordados UTN y TCU-102A.'
  },
  {
    id: 'eq-lentes',
    nombre: 'Lentes de Seguridad Anti-Impacto y UV',
    categoria: 'epp',
    descripcion: 'Protección ocular contra esquirlas, ramas y radiación UV directa durante inspecciones.',
    stockDisponible: 22,
    imagen: '/images/gafas.png',
    iconoNombre: 'Glasses',
    especificaciones: 'ANSI Z87.1 con recubrimiento anti-empañante.'
  },
  {
    id: 'eq-guantes',
    nombre: 'Guantes de Descarne y Antideslizantes',
    categoria: 'epp',
    descripcion: 'Guantes mixtos de flor de cuero y palma sintética para manipulación de muestras y podas.',
    stockDisponible: 16,
    imagen: '/images/guantes.png',
    iconoNombre: 'HandMetal',
    especificaciones: 'Resistencia a abrasión y punzonamiento Nivel 3.'
  },
  {
    id: 'eq-botas',
    nombre: 'Botas de Campo Caña Alta',
    categoria: 'epp',
    descripcion: 'Calzado reforzado con suela antideslizante para terrenos irregulares y rondas de inspección.',
    stockDisponible: 12,
    imagen: '/images/botas.png',
    iconoNombre: 'Footprints',
    especificaciones: 'Cuero hidrófugo con puntera de policarbonato.'
  },
  {
    id: 'eq-cinta-dap',
    nombre: 'Cinta Diamétrica Forestal (DAP 5m)',
    categoria: 'medicion',
    descripcion: 'Cinta métrica especial con escala de diámetro en pi para medir DAP de troncos y fustes.',
    stockDisponible: 8,
    iconoNombre: 'Ruler',
    especificaciones: 'Fibra de vidrio flexible irrompible con gancho de anclaje de corteza.'
  },
  {
    id: 'eq-distanciometro',
    nombre: 'Distanciómetro Láser / Clinómetro Digital',
    categoria: 'medicion',
    descripcion: 'Equipo de precisión para calcular la altura total del árbol, altura de copa e inclinación.',
    stockDisponible: 5,
    iconoNombre: 'Compass',
    especificaciones: 'Alcance 100m, precisión ±1.5mm, cálculo de pendiente en grados y %.'
  },
  {
    id: 'eq-tijeron',
    nombre: 'Tijerón Telescópico de Poda Sanitaria',
    categoria: 'poda',
    descripcion: 'Pértiga extensible hasta 3.8m con cuchilla de corte bypass y serrucho curvado.',
    stockDisponible: 6,
    iconoNombre: 'Scissors',
    especificaciones: 'Corte limpio hasta 35mm de diámetro, aleación de acero SK5 templado.'
  }
];

export const SOLICITUDES_INICIALES: Solicitud[] = [
  {
    id: 'TCU-REQ-2026-4821',
    fechaRegistro: '2026-03-08T09:30:00Z',
    tipo: 'inspeccion',
    solicitante: {
      nombre: 'María Elena Salazar Briceño',
      cedula: '5-0248-0912',
      telefono: '8841-2940',
      correo: 'msalazar_liberia@gmail.com',
      organizacion: 'Asociación de Desarrollo Integral Liberia Centro'
    },
    ubicacion: {
      canton: 'Liberia',
      distrito: 'Liberia',
      direccionExacta: 'Del Parque Central de Liberia, 175 metros norte frente a Escuela Ascensión Esquivel',
      puntoReferencia: 'Costado este de la plazoleta',
      coordenadas: '10.6342° N, 85.4371° O',
      tipoEspacio: 'Acera peatonal y calle pública'
    },
    detalles: {
      justificacion: 'Árbol maduro de Laurel de la India con rama mayor de aproximadamente 35cm de diámetro fracturada y apoyada en cables de telecomunicaciones y trifásicos.',
      nivelUrgencia: 'critico',
      tipoRiesgo: ['Riesgo inminente de caída de rama', 'Contacto con tendido eléctrico', 'Riesgo peatonal sobre acera escolar'],
      descripcionArbol: 'Ficus sp. de unos 14 metros de altura con cavidad basal visible.',
      fotoEvidenciaUrl: '/images/arb1.jpeg'
    },
    estado: 'evaluacion',
    historialEstados: [
      {
        estado: 'recibida',
        fecha: '2026-03-08 09:30',
        titulo: 'Solicitud Registrada en Plataforma',
        descripcion: 'Ingreso formal del reporte comunal. Se genera el expediente digital.',
        responsable: 'Mesa de Entrada TCU-102A'
      },
      {
        estado: 'evaluacion',
        fecha: '2026-03-09 14:15',
        titulo: 'Asignación a Brigada Forestal',
        descripcion: 'Expediente asignado al Prof. Tutor Forestal y estudiantes de IGAE para valoración con ficha ISA (International Society of Arboriculture).',
        responsable: 'Ing. Carlos Mendoza (Tutor TCU UTN)'
      }
    ],
    observacionesTecnicas: 'Se coordinó enlace preventivo con cuadrilla de alumbrado público municipal y COOPEGUANACASTE para visita conjunta.'
  },
  {
    id: 'TCU-REQ-2026-3091',
    fechaRegistro: '2026-03-05T11:20:00Z',
    tipo: 'adopcion',
    solicitante: {
      nombre: 'Prof. Gerardo Alvarado Morales',
      cedula: '5-0189-0344',
      telefono: '8712-4099',
      correo: 'galvaradom@mep.go.cr',
      organizacion: 'Comité Ambiental Escuela San Caetano'
    },
    ubicacion: {
      canton: 'Cañas',
      distrito: 'Cañas',
      direccionExacta: 'Barrio Las Palmas, instalaciones de la Escuela San Caetano',
      puntoReferencia: 'Zona verde perimetral frente a la cancha de fútbol comunal',
      tipoEspacio: 'Área verde institucional y acera perimetral'
    },
    detalles: {
      justificacion: 'Proyecto escolar "Sombra y Vida para Nuestra Niñez". Deseamos crear un corredor biológico y barrera de viento para mitigar el polvo y calor en aulas.',
      cantidadTotalArboles: 12,
      especiesSolicitadas: [
        { especieId: 'esp-guachipelin', cantidad: 6 },
        { especieId: 'esp-cortez-amarillo', cantidad: 4 },
        { especieId: 'esp-roble-sabana', cantidad: 2 }
      ],
      compromisoRiego: true
    },
    estado: 'aprobada',
    historialEstados: [
      {
        estado: 'recibida',
        fecha: '2026-03-05 11:20',
        titulo: 'Solicitud de Donación Recibida',
        descripcion: 'Registro de solicitud de 12 árboles para plantel educativo.',
        responsable: 'Plataforma Web TCU'
      },
      {
        estado: 'evaluacion',
        fecha: '2026-03-06 10:00',
        titulo: 'Revisión de Espacio y Especies',
        descripcion: 'Validación técnica agronómica. Las especies solicitadas son 100% compatibles con la amplitud de la acera perimetral.',
        responsable: 'Dra. Laura Vega (Coordinación TCU)'
      },
      {
        estado: 'aprobada',
        fecha: '2026-03-07 16:30',
        titulo: 'Aprobación y Reserva en Vivero UTN',
        descripcion: 'Reserva confirmada en el Vivero Forestal de la UTN Cañas. Listo para jornada comunitaria.',
        responsable: 'Unidad de Vivero UTN'
      }
    ],
    observacionesTecnicas: 'Se programará entrega y capacitación de siembra con estudiantes del TCU la semana del 22 de marzo.'
  },
  {
    id: 'TCU-REQ-2026-2184',
    fechaRegistro: '2026-03-02T08:00:00Z',
    tipo: 'herramientas',
    solicitante: {
      nombre: 'Valeria Solano Pizarro',
      cedula: '5-0422-0761',
      telefono: '6019-3388',
      correo: 'vsolanop_est@utn.ac.cr',
      esEstudiante: true,
      carnetUTN: 'UTN-2023-01948',
      carrera: 'Ingeniería en Gestión Ambiental (IGAE)',
      organizacion: 'Brigada Alfa TCU-102A'
    },
    ubicacion: {
      canton: 'Nicoya',
      distrito: 'Nicoya',
      direccionExacta: 'Casco Urbano de Nicoya, sector Barrio La Granja y Parque Recaredo Briceño',
      puntoReferencia: 'Edificio Municipal y alrededores'
    },
    detalles: {
      justificacion: 'Jornada intensiva de inventario dasométrico y toma de puntos GPS para el sistema SIGARU.',
      equiposSolicitados: [
        { equipoId: 'eq-casco', cantidad: 4 },
        { equipoId: 'eq-chaleco', cantidad: 4 },
        { equipoId: 'eq-cinta-dap', cantidad: 2 },
        { equipoId: 'eq-distanciometro', cantidad: 1 },
        { equipoId: 'eq-lentes', cantidad: 4 }
      ],
      fechaUsoEstimada: '2026-03-14',
      fechaDevolucionEstimada: '2026-03-16',
      brigadaOProyecto: 'Brigada Alfa Nicoya - Inventario SIGARU Fase 2'
    },
    estado: 'programada',
    historialEstados: [
      {
        estado: 'recibida',
        fecha: '2026-03-02 08:00',
        titulo: 'Solicitud de Equipos Recibida',
        descripcion: 'Registro de préstamo de instrumental y EPP para gira técnica.',
        responsable: 'Módulo Logístico Estudiantil'
      },
      {
        estado: 'evaluacion',
        fecha: '2026-03-02 11:30',
        titulo: 'Verificación de Inventario en Bodega',
        descripcion: 'Se valida existencia y calibración del distanciómetro láser y cintas DAP.',
        responsable: 'Encargado de Laboratorio UTN'
      },
      {
        estado: 'aprobada',
        fecha: '2026-03-03 09:15',
        titulo: 'Préstamo Aprobado',
        descripcion: 'Autorizado con seguro estudiantil UTN vigente.',
        responsable: 'Coordinación TCU-102A'
      },
      {
        estado: 'programada',
        fecha: '2026-03-04 15:00',
        titulo: 'Equipo Preparado para Retiro',
        descripcion: 'Kits embalados y rotulados en cubículo de proyectos UTN Sede Guanacaste.',
        responsable: 'Logística TCU'
      }
    ],
    observacionesTecnicas: 'Recordar llevar las baterías recargables tipo AA para el equipo láser.'
  },
  {
    id: 'TCU-REQ-2026-1042',
    fechaRegistro: '2026-02-18T10:00:00Z',
    tipo: 'adopcion',
    solicitante: {
      nombre: 'Don Joaquín Villegas Castro',
      cedula: '5-0130-0582',
      telefono: '8302-9911',
      correo: 'jvillegas@coopeguanacaste.com',
      organizacion: 'Comité de Vecinos Barrio Santa Inés'
    },
    ubicacion: {
      canton: 'Santa Cruz',
      distrito: 'Santa Cruz',
      direccionExacta: 'Barrio Santa Inés, calle 3 avenidas 4 y 6',
      puntoReferencia: '300 metros sur del Polideportivo'
    },
    detalles: {
      justificacion: 'Reforestación de acera comunal tras renovación de tuberías de Acueductos y Alcantarillados.',
      cantidadTotalArboles: 6,
      especiesSolicitadas: [
        { especieId: 'esp-guachipelin', cantidad: 6 }
      ],
      compromisoRiego: true
    },
    estado: 'completada',
    historialEstados: [
      {
        estado: 'recibida',
        fecha: '2026-02-18 10:00',
        titulo: 'Recepción de Solicitud',
        descripcion: 'Ingreso de solicitud vecinal.',
        responsable: 'Web TCU'
      },
      {
        estado: 'evaluacion',
        fecha: '2026-02-19 14:00',
        titulo: 'Inspección de Aceras',
        descripcion: 'Se confirma ancho de acera de 1.60m, compatible con Guachipelín.',
        responsable: 'Estudiantes TCU Brigada Santa Cruz'
      },
      {
        estado: 'aprobada',
        fecha: '2026-02-20 11:00',
        titulo: 'Entrega Aprobada',
        descripcion: 'Asignación de arbolitos en bolsa biodegradable de vivero.',
        responsable: 'Vivero UTN'
      },
      {
        estado: 'programada',
        fecha: '2026-02-23 08:30',
        titulo: 'Taller de Siembra y Plantación',
        descripcion: 'Actividad comunitaria realizada con presencia de vecinos.',
        responsable: 'Brigada TCU-102A'
      },
      {
        estado: 'completada',
        fecha: '2026-02-24 16:00',
        titulo: 'Entrega Exitosa y Ficha de Monitoreo',
        descripcion: 'Árboles plantados con hidrogel y tutores de bambú. Ficha firmada.',
        responsable: 'Coordinación TCU'
      }
    ],
    observacionesTecnicas: 'Monitoreo de prendimiento programado para 45 días posteriores.'
  }
];

// Helper functions for LocalStorage
const STORAGE_KEY = 'tcu_solicitudes_pedidos';

export function obtenerTodasLasSolicitudes(): Solicitud[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SOLICITUDES_INICIALES));
      return SOLICITUDES_INICIALES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SOLICITUDES_INICIALES;
  } catch (err) {
    console.error('Error al leer solicitudes de localStorage:', err);
    return SOLICITUDES_INICIALES;
  }
}

export function guardarNuevaSolicitud(solicitud: Solicitud): void {
  try {
    const actuales = obtenerTodasLasSolicitudes();
    const actualizadas = [solicitud, ...actuales];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizadas));
  } catch (err) {
    console.error('Error al guardar solicitud en localStorage:', err);
  }
}

export function buscarSolicitudPorCodigo(codigo: string): Solicitud | undefined {
  const normalizado = codigo.trim().toUpperCase();
  const solicitudes = obtenerTodasLasSolicitudes();
  return solicitudes.find(s => s.id.toUpperCase() === normalizado);
}

export function generarNuevoCodigo(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const anio = new Date().getFullYear();
  return `TCU-REQ-${anio}-${randomNum}`;
}
