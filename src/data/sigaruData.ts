export interface TreePoint {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  familia: string;
  canton: 'Liberia' | 'Cañas' | 'Bagaces' | 'Santa Cruz' | 'Nicoya';
  ubicacionDetalle: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  mapPos: {
    x: number; // percentage in viewer (0-100)
    y: number; // percentage in viewer (0-100)
  };
  dap: number; // Diámetro a la Altura del Pecho (cm)
  altura: number; // Altura total (m)
  coberturaCopa: number; // Diámetro de copa (m)
  estadoFitosanitario: 'Bueno' | 'Regular' | 'Crítico';
  riesgoTRAQ: 'Bajo' | 'Moderado' | 'Alto' | 'Extremo';
  conflicto: string;
  recomendacion: string;
  fechaCenso: string;
  censoPor: string;
  patrimonial: boolean;
  serviciosEcosistemicos: {
    sombraM2: number;
    capturaCarbonoKgAno: number;
    retencionAguaLitrosAno: number;
  };
  imagen: string;
}

export interface SigaruKpi {
  totalArboles: number;
  especiesRegistradas: number;
  coberturaSombraM2: number;
  capturaCarbonoTonAno: number;
  saludBuenoPct: number;
  saludRegularPct: number;
  saludCriticoPct: number;
  podasProgramadas: number;
  cantonesCubiertos: number;
}

export interface SigaruLayer {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
  icono: string;
  activoDefault: boolean;
}

export interface TechStep {
  fase: number;
  titulo: string;
  herramientas: string[];
  descripcion: string;
  detalles: string[];
  icono: string;
}

export interface ResourceDownload {
  id: string;
  titulo: string;
  formato: string;
  tamano: string;
  categoria: 'Datos Geoespaciales' | 'Manuales y Metodología' | 'Guías Técnicas';
  descripcion: string;
  enlace: string;
  badge: string;
}

export interface MunicipalPartner {
  canton: string;
  nombreEntidad: string;
  logo: string;
  arbolesCensados: number;
  prioridadActual: string;
  contacto: string;
}

export const SIGARU_KPIS: SigaruKpi = {
  totalArboles: 3450,
  especiesRegistradas: 68,
  coberturaSombraM2: 185400,
  capturaCarbonoTonAno: 320,
  saludBuenoPct: 64,
  saludRegularPct: 26,
  saludCriticoPct: 10,
  podasProgramadas: 142,
  cantonesCubiertos: 5
};

export const SIGARU_LAYERS: SigaruLayer[] = [
  {
    id: 'arboles',
    nombre: 'Árboles Georreferenciados',
    descripcion: 'Puntos de inventario individual con diagnóstico fitosanitario.',
    color: '#47c73b',
    icono: 'TreePine',
    activoDefault: true
  },
  {
    id: 'parques',
    nombre: 'Parques y Espacios Verdes',
    descripcion: 'Polígonos de zonas verdes urbanas y plazas comunales.',
    color: '#10b981',
    icono: 'Trees',
    activoDefault: true
  },
  {
    id: 'infraestructura',
    nombre: 'Red Eléctrica y Tendido',
    descripcion: 'Trazado de líneas de distribución eléctrica y servidumbres.',
    color: '#f59e0b',
    icono: 'Zap',
    activoDefault: true
  },
  {
    id: 'sombra',
    nombre: 'Cobertura de Sombra (Dosel)',
    descripcion: 'Buffers térmicos y amortiguamiento de calor ambiental.',
    color: '#3b82f6',
    icono: 'Layers',
    activoDefault: false
  },
  {
    id: 'alertas',
    nombre: 'Puntos Críticos de Riesgo',
    descripcion: 'Ejemplares que requieren poda o intervención inmediata.',
    color: '#ef4444',
    icono: 'AlertTriangle',
    activoDefault: true
  }
];

export const ARBOLES_SIGARU: TreePoint[] = [
  {
    id: 'CR-GUA-LIB-001',
    nombreComun: 'Árbol de Guanacaste',
    nombreCientifico: 'Enterolobium cyclocarpum',
    familia: 'Fabaceae',
    canton: 'Liberia',
    ubicacionDetalle: 'Costado Norte del Parque Central Héctor Zúñiga Rovira',
    coordenadas: { lat: 10.6346, lng: -85.4377 },
    mapPos: { x: 38, y: 32 },
    dap: 135,
    altura: 23,
    coberturaCopa: 31,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Amplio alcorque perimetral con suelo permeable.',
    recomendacion: 'Mantenimiento preventivo bianual y aclareo ligero de ramas secas en copa periférica. Monitorear anclaje radicular.',
    fechaCenso: '12 de Febrero, 2024',
    censoPor: 'Brigada TCU-102A UTN (Agronomía e ITI)',
    patrimonial: true,
    serviciosEcosistemicos: {
      sombraM2: 754,
      capturaCarbonoKgAno: 185,
      retencionAguaLitrosAno: 4200
    },
    imagen: '/images/arb1.jpeg'
  },
  {
    id: 'CR-GUA-LIB-002',
    nombreComun: 'Cortez Amarillo',
    nombreCientifico: 'Handroanthus chrysanthus',
    familia: 'Bignoniaceae',
    canton: 'Liberia',
    ubicacionDetalle: 'Avenida 25 de Julio, frente al Museo de Guanacaste',
    coordenadas: { lat: 10.6318, lng: -85.4391 },
    mapPos: { x: 42, y: 46 },
    dap: 48,
    altura: 12,
    coberturaCopa: 11,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Próximo a tendido secundario trenzado, sin contacto actual.',
    recomendacion: 'Poda de formación y elevación de copa a 3.5 metros sobre el carril vehicular.',
    fechaCenso: '14 de Febrero, 2024',
    censoPor: 'Estudiantes TCU-102A UTN Guanacaste',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 95,
      capturaCarbonoKgAno: 42,
      retencionAguaLitrosAno: 890
    },
    imagen: '/images/arb2.jpeg'
  },
  {
    id: 'CR-GUA-LIB-003',
    nombreComun: 'Malinche',
    nombreCientifico: 'Delonix regia',
    familia: 'Fabaceae',
    canton: 'Liberia',
    ubicacionDetalle: 'Calle Real, 150m al Sur del Parque Central',
    coordenadas: { lat: 10.6285, lng: -85.4365 },
    mapPos: { x: 48, y: 58 },
    dap: 62,
    altura: 10,
    coberturaCopa: 14,
    estadoFitosanitario: 'Crítico',
    riesgoTRAQ: 'Alto',
    conflicto: 'Rama codominante fracturada con desgarro expuesto rozando línea trifásica.',
    recomendacion: 'Poda técnica de reducción de copa urgente por cuadrilla especializada de Coopeguanacaste/Muni. Evaluar desmoche de emergencia sin derribo total.',
    fechaCenso: '22 de Marzo, 2024',
    censoPor: 'Ingeniería Energética & Agronomía TCU UTN',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 154,
      capturaCarbonoKgAno: 58,
      retencionAguaLitrosAno: 1100
    },
    imagen: '/images/arb3.jpeg'
  },
  {
    id: 'CR-GUA-CAN-001',
    nombreComun: 'Cenízaro',
    nombreCientifico: 'Samanea saman',
    familia: 'Fabaceae',
    canton: 'Cañas',
    ubicacionDetalle: 'Parque Central de Cañas, sector Este cerca del kiosco',
    coordenadas: { lat: 10.4312, lng: -85.0935 },
    mapPos: { x: 68, y: 64 },
    dap: 112,
    altura: 18,
    coberturaCopa: 27,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Raíces superficiales protegidas con césped.',
    recomendacion: 'Inspección anual por tomografía sónica preventiva en bifurcación principal.',
    fechaCenso: '05 de Marzo, 2024',
    censoPor: 'Brigada Cañas TCU-102A UTN Sede Guanacaste',
    patrimonial: true,
    serviciosEcosistemicos: {
      sombraM2: 572,
      capturaCarbonoKgAno: 160,
      retencionAguaLitrosAno: 3600
    },
    imagen: '/images/Imagen1.jpg'
  },
  {
    id: 'CR-GUA-CAN-002',
    nombreComun: 'Roble Sabana',
    nombreCientifico: 'Tabebuia rosea',
    familia: 'Bignoniaceae',
    canton: 'Cañas',
    ubicacionDetalle: 'Entrada al Campus UTN Sede Guanacaste (Cañas)',
    coordenadas: { lat: 10.4305, lng: -85.0875 },
    mapPos: { x: 74, y: 52 },
    dap: 54,
    altura: 15,
    coberturaCopa: 13,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Excelente floración estacional y sanidad del cambium.',
    recomendacion: 'Fertilización orgánica foliar posfloración y riego de auxilio en época seca intensa.',
    fechaCenso: '10 de Enero, 2024',
    censoPor: 'Equipo Docente y Estudiantes TCU UTN',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 132,
      capturaCarbonoKgAno: 64,
      retencionAguaLitrosAno: 1250
    },
    imagen: '/images/imagen4.jpg'
  },
  {
    id: 'CR-GUA-CAN-003',
    nombreComun: 'Laurel',
    nombreCientifico: 'Cordia alliodora',
    familia: 'Boraginaceae',
    canton: 'Cañas',
    ubicacionDetalle: 'Barrio Las Palmas, acera comunal frente a Escuela',
    coordenadas: { lat: 10.4338, lng: -85.0962 },
    mapPos: { x: 62, y: 72 },
    dap: 41,
    altura: 14,
    coberturaCopa: 8,
    estadoFitosanitario: 'Regular',
    riesgoTRAQ: 'Moderado',
    conflicto: 'Levantamiento de losa de acera en 4cm por raíz lateral superficial.',
    recomendacion: 'Instalación de barrera antirraíz perimetral y apertura de alcorque ampliado con rejilla permeable.',
    fechaCenso: '18 de Marzo, 2024',
    censoPor: 'Unidad de Gestión Ambiental Muni Cañas & TCU UTN',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 50,
      capturaCarbonoKgAno: 38,
      retencionAguaLitrosAno: 720
    },
    imagen: '/images/Imagen3.jpg'
  },
  {
    id: 'CR-GUA-BAG-001',
    nombreComun: 'Guayacán Real',
    nombreCientifico: 'Guaiacum sanctum',
    familia: 'Zygophyllaceae',
    canton: 'Bagaces',
    ubicacionDetalle: 'Parque Pedro Pérez Zeledón de Bagaces, jardín central',
    coordenadas: { lat: 10.5312, lng: -85.2575 },
    mapPos: { x: 54, y: 44 },
    dap: 36,
    altura: 8,
    coberturaCopa: 7,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Especie nativa en veda nacional de lento crecimiento.',
    recomendacion: 'Rotulación interpretativa ambiental como especie amenazada protegida por CITES y SINAC.',
    fechaCenso: '02 de Febrero, 2024',
    censoPor: 'Brigada de Investigación Forestal TCU-102A',
    patrimonial: true,
    serviciosEcosistemicos: {
      sombraM2: 38,
      capturaCarbonoKgAno: 29,
      retencionAguaLitrosAno: 450
    },
    imagen: '/images/imagen5.jpg'
  },
  {
    id: 'CR-GUA-BAG-002',
    nombreComun: 'Pochote',
    nombreCientifico: 'Pachira quinata',
    familia: 'Malvaceae',
    canton: 'Bagaces',
    ubicacionDetalle: 'Calle del Comercio, salida hacia Montenegro',
    coordenadas: { lat: 10.5284, lng: -85.2599 },
    mapPos: { x: 50, y: 50 },
    dap: 68,
    altura: 16,
    coberturaCopa: 12,
    estadoFitosanitario: 'Regular',
    riesgoTRAQ: 'Moderado',
    conflicto: 'Ramas bajas sobre gálibo vehicular de carga pesada.',
    recomendacion: 'Poda de despeje de gálibo a 4.5m según estándar ANSI A300 para prevenir choques de camiones.',
    fechaCenso: '08 de Febrero, 2024',
    censoPor: 'Estudiantes TCU-102A Bagaces',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 113,
      capturaCarbonoKgAno: 75,
      retencionAguaLitrosAno: 1300
    },
    imagen: '/images/imagen6.jpg'
  },
  {
    id: 'CR-GUA-BAG-003',
    nombreComun: 'Espavel',
    nombreCientifico: 'Anacardium excelsum',
    familia: 'Anacardiaceae',
    canton: 'Bagaces',
    ubicacionDetalle: 'Ribera del Río Bagaces en borde urbano',
    coordenadas: { lat: 10.5361, lng: -85.2542 },
    mapPos: { x: 58, y: 38 },
    dap: 95,
    altura: 21,
    coberturaCopa: 20,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Estabiliza el talud fluvial contra erosión en crecidas.',
    recomendacion: 'Protección absoluta de la zona de ribera según Ley Forestal 7575.',
    fechaCenso: '15 de Febrero, 2024',
    censoPor: 'Brigada IGAE / TCU UTN Guanacaste',
    patrimonial: true,
    serviciosEcosistemicos: {
      sombraM2: 314,
      capturaCarbonoKgAno: 140,
      retencionAguaLitrosAno: 3100
    },
    imagen: '/images/imagen7.jpg'
  },
  {
    id: 'CR-GUA-STC-001',
    nombreComun: 'Flor Blanca',
    nombreCientifico: 'Plumeria rubra',
    familia: 'Apocynaceae',
    canton: 'Santa Cruz',
    ubicacionDetalle: 'Plaza Bernabela Ramos de Santa Cruz',
    coordenadas: { lat: 10.2625, lng: -85.5841 },
    mapPos: { x: 22, y: 74 },
    dap: 28,
    altura: 6,
    coberturaCopa: 6,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Árbol simbólico del folclore santacruceño.',
    recomendacion: 'Mantenimiento de orla floral y deshierbe manual alrededor del fuste.',
    fechaCenso: '19 de Enero, 2024',
    censoPor: 'Estudiantes TCU UTN Santa Cruz',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 28,
      capturaCarbonoKgAno: 18,
      retencionAguaLitrosAno: 380
    },
    imagen: '/images/imagen8.JPG'
  },
  {
    id: 'CR-GUA-STC-002',
    nombreComun: 'Caoba del Pacífico',
    nombreCientifico: 'Swietenia humilis',
    familia: 'Meliaceae',
    canton: 'Santa Cruz',
    ubicacionDetalle: 'Boulevard de la Cultura, frente a la Iglesia Colonial',
    coordenadas: { lat: 10.2608, lng: -85.5863 },
    mapPos: { x: 18, y: 68 },
    dap: 72,
    altura: 16,
    coberturaCopa: 15,
    estadoFitosanitario: 'Regular',
    riesgoTRAQ: 'Moderado',
    conflicto: 'Ataque localizado de barrenador de yemas (Hypsipyla grandella) en ramas secundarias.',
    recomendacion: 'Tratamiento fitosanitario biológico no contaminante y aclareo de ramas secas.',
    fechaCenso: '26 de Febrero, 2024',
    censoPor: 'Unidad de Agronomía TCU-102A',
    patrimonial: true,
    serviciosEcosistemicos: {
      sombraM2: 176,
      capturaCarbonoKgAno: 82,
      retencionAguaLitrosAno: 1450
    },
    imagen: '/images/imagen10.jpg'
  },
  {
    id: 'CR-GUA-STC-003',
    nombreComun: 'Guanacaste Blanco',
    nombreCientifico: 'Albizia niopoides',
    familia: 'Fabaceae',
    canton: 'Santa Cruz',
    ubicacionDetalle: 'Barrio Buenos Aires, cruce a Santa Bárbara',
    coordenadas: { lat: 10.2581, lng: -85.5819 },
    mapPos: { x: 26, y: 82 },
    dap: 88,
    altura: 19,
    coberturaCopa: 18,
    estadoFitosanitario: 'Crítico',
    riesgoTRAQ: 'Extremo',
    conflicto: 'Pudrición masiva en la inserción del fuste con hongo xilófago y marcado pandeo hacia la vivienda vecina.',
    recomendacion: 'Derribo técnico controlado de emergencia justificado según dictamen TRAQ Nivel 2. Reemplazo por 3 ejemplares de Roble Sabana según normativa de compensación.',
    fechaCenso: '04 de Marzo, 2024',
    censoPor: 'Comité Técnico de Arbolado UTN & Municipalidad Santa Cruz',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 254,
      capturaCarbonoKgAno: 98,
      retencionAguaLitrosAno: 1900
    },
    imagen: '/images/arb3.jpeg'
  },
  {
    id: 'CR-GUA-NIC-001',
    nombreComun: 'Sotacaballo',
    nombreCientifico: 'Zygia longifolia',
    familia: 'Fabaceae',
    canton: 'Nicoya',
    ubicacionDetalle: 'Parque Recaredo Briceño de Nicoya, sector sur',
    coordenadas: { lat: 10.1447, lng: -85.4526 },
    mapPos: { x: 34, y: 88 },
    dap: 58,
    altura: 13,
    coberturaCopa: 14,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Ninguno. Genera microclima fresco y hábitat para colibríes y mariposas.',
    recomendacion: 'Monitoreo preventivo de termiteros y limpieza de enredaderas parásitas.',
    fechaCenso: '11 de Marzo, 2024',
    censoPor: 'Brigada de Acción Social TCU UTN',
    patrimonial: true,
    serviciosEcosistemicos: {
      sombraM2: 154,
      capturaCarbonoKgAno: 60,
      retencionAguaLitrosAno: 1650
    },
    imagen: '/images/Imagen2.jpg'
  },
  {
    id: 'CR-GUA-NIC-002',
    nombreComun: 'Carao',
    nombreCientifico: 'Cassia grandis',
    familia: 'Fabaceae',
    canton: 'Nicoya',
    ubicacionDetalle: 'Bulevar de Acceso al Hospital La Anexión',
    coordenadas: { lat: 10.1489, lng: -85.4510 },
    mapPos: { x: 40, y: 80 },
    dap: 52,
    altura: 15,
    coberturaCopa: 12,
    estadoFitosanitario: 'Bueno',
    riesgoTRAQ: 'Bajo',
    conflicto: 'Fruto leñoso grande puede ensuciar la calzada en meses secos.',
    recomendacion: 'Barrido coordinado en época de fructificación y poda de limpieza de ramas bajas.',
    fechaCenso: '16 de Marzo, 2024',
    censoPor: 'Estudiantes TCU-102A Nicoya',
    patrimonial: false,
    serviciosEcosistemicos: {
      sombraM2: 113,
      capturaCarbonoKgAno: 52,
      retencionAguaLitrosAno: 980
    },
    imagen: '/images/arb2.jpeg'
  }
];

export const TECH_STEPS: TechStep[] = [
  {
    fase: 1,
    titulo: 'Levantamiento en Campo y GNSS Diferencial',
    herramientas: ['Survey123 for ArcGIS', 'KoboToolbox', 'Receptores GNSS Bluetooth Submétricos'],
    descripcion: 'Las personas estudiantes del TCU-102A recorren avenidas, parques y aceras equipadas con tablets y receptores GNSS para geoposicionar cada árbol con precisión milimétrica.',
    detalles: [
      'Registro de coordenadas exactas latitud/longitud en formato WGS84 y CR05.',
      'Medición de variables dasométricas: DAP con cinta diamétrica y altura con hipsómetro.',
      'Inspección visual del fuste, raíces, anclaje y cercanía a líneas de alta/media tensión.'
    ],
    icono: 'Smartphone'
  },
  {
    fase: 2,
    titulo: 'Validación Taxonómica y Evaluación de Riesgo TRAQ',
    herramientas: ['PlantNet AI', 'Manual TRAQ (ISA)', 'Supervisión Botánica UTN'],
    descripcion: 'Verificación botánica de la especie (nativa o introducida) y aplicación de la matriz de evaluación del riesgo estandarizada por la International Society of Arboriculture (ISA).',
    detalles: [
      'Identificación botánica de género, especie y familia asistida por algoritmos taxonómicos.',
      'Cálculo de la probabilidad de falla y calificación de blancos vulnerables (peatones, viviendas, redes).',
      'Clasificación fitosanitaria en semáforo: Sano (Verde), Mantenimiento (Amarillo), Crítico (Rojo).'
    ],
    icono: 'ShieldCheck'
  },
  {
    fase: 3,
    titulo: 'Geoprocesamiento y Modelado Espacial en QGIS / ArcGIS',
    herramientas: ['QGIS Desktop', 'ArcGIS Online', 'Python GDAL / GeoPandas'],
    descripcion: 'Depuración y estructuración de capas vectoriales, cálculo de buffers de riesgo eléctrico y modelado bioclimático de la sombra proyectada contra islas de calor.',
    detalles: [
      'Generación de capas poligonales de dosel arbóreo y estimación de cobertura de sombra en m².',
      'Cálculo de índices de absorción de CO₂ y retención de aguas pluviales por árbol.',
      'Intersección espacial con la red de cableado eléctrico y vías cantonales para alertas tempranas.'
    ],
    icono: 'Layers'
  },
  {
    fase: 4,
    titulo: 'Integración en el Visor SIGARU y Gestión Municipal',
    herramientas: ['SIGARU WebGIS Platform', 'APIs Geoespaciales', 'Ventanilla Municipal'],
    descripcion: 'Puesta en marcha de la información para los técnicos municipales y el público, facilitando la toma de decisiones basada en datos científicos.',
    detalles: [
      'Emisión automatizada de órdenes de poda técnica a cuadrillas bajo estándar ANSI A300.',
      'Priorización de inversiones comunales en reforestación con especies nativas adaptadas al calor seco.',
      'Acceso abierto y transparente a las capas geoespaciales para la ciudadanía y academia.'
    ],
    icono: 'Database'
  }
];

export const MUNICIPAL_PARTNERS: MunicipalPartner[] = [
  {
    canton: 'Municipalidad de Cañas',
    nombreEntidad: 'Unidad de Gestión Ambiental y Parques',
    logo: '/images/muni-canas-logo.png',
    arbolesCensados: 1120,
    prioridadActual: 'Inventario del casco central y corredor hacia el Campus UTN',
    contacto: 'gestionambiental@canas.go.cr'
  },
  {
    canton: 'Municipalidad de Liberia',
    nombreEntidad: 'Departamento de Ornato y Vías Públicas',
    logo: '/images/muni-liberia.png',
    arbolesCensados: 1350,
    prioridadActual: 'Mitigación de riesgo en Calle Real y arbolado del Parque Héctor Zúñiga',
    contacto: 'ornato@munilib.go.cr'
  },
  {
    canton: 'Municipalidad de Bagaces',
    nombreEntidad: 'Gestión Ambiental y Servicios Municipales',
    logo: '/images/logo-utn.png',
    arbolesCensados: 540,
    prioridadActual: 'Protección de especies nativas en veda y mitigación térmica en aceras',
    contacto: 'ambiental@bagaces.go.cr'
  },
  {
    canton: 'Municipalidad de Santa Cruz',
    nombreEntidad: 'Dirección de Desarrollo Urbano y Sostenibilidad',
    logo: '/images/logo-utn.png',
    arbolesCensados: 440,
    prioridadActual: 'Censo de árboles en plazas tradicionales y prevención de desplomes',
    contacto: 'ambiente@santacruz.go.cr'
  }
];

export const RESOURCE_DOWNLOADS: ResourceDownload[] = [
  {
    id: 'res-shp-guanacaste',
    titulo: 'Capa Shapefile: Inventario Arbolado Guanacaste 2024',
    formato: 'SHP (ZIP)',
    tamano: '14.2 MB',
    categoria: 'Datos Geoespaciales',
    descripcion: 'Archivo vectorial con puntos de árboles censados, atributos dasométricos, estado fitosanitario y coordenadas CR05/WGS84.',
    enlace: '#',
    badge: 'Capa Abierta'
  },
  {
    id: 'res-geojson-visor',
    titulo: 'Dataset GeoJSON SIGARU: Árboles y Polígonos de Parques',
    formato: 'GEOJSON',
    tamano: '6.8 MB',
    categoria: 'Datos Geoespaciales',
    descripcion: 'Formato estándar ligero ideal para visualizadores web, Leaflet, Mapbox y análisis rápido con Python y QGIS.',
    enlace: '#',
    badge: 'Interoperable'
  },
  {
    id: 'res-manual-survey123',
    titulo: 'Manual de Campo: Levantamiento con Survey123 y GNSS',
    formato: 'PDF',
    tamano: '4.5 MB',
    categoria: 'Manuales y Metodología',
    descripcion: 'Guía paso a paso elaborada por docentes UTN para la captura estandarizada de variables del árbol urbano en Guanacaste.',
    enlace: '#',
    badge: 'Metodología TCU'
  },
  {
    id: 'res-protocolo-traq',
    titulo: 'Protocolo de Evaluación Visual de Riesgo TRAQ-UTN',
    formato: 'PDF',
    tamano: '3.1 MB',
    categoria: 'Manuales y Metodología',
    descripcion: 'Adaptación del estándar de la International Society of Arboriculture para el contexto bioclimático del bosque seco tropical.',
    enlace: '#',
    badge: 'Norma Técnica'
  },
  {
    id: 'res-catalogo-especies',
    titulo: 'Catálogo de Especies Nativas Recomendadas para Aceras',
    formato: 'PDF',
    tamano: '8.3 MB',
    categoria: 'Guías Técnicas',
    descripcion: 'Fichas botánicas con porte, sistema radicular, requerimientos hídricos y beneficios de sombra para comunidades calurosas.',
    enlace: '#',
    badge: 'Guía Botánica'
  },
  {
    id: 'res-diccionario-datos',
    titulo: 'Diccionario de Atributos Catastrales SIGARU v2.1',
    formato: 'XLSX',
    tamano: '850 KB',
    categoria: 'Guías Técnicas',
    descripcion: 'Definición de tablas, campos, dominios y rangos estandarizados para la base de datos geoespacial cantonal.',
    enlace: '#',
    badge: 'Estructura BD'
  }
];
