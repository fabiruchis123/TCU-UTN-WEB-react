export interface Survey123FormItem {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  url: string;
  deepLink: string;
  category: 'censo' | 'dasometria' | 'riesgo' | 'taxonomia' | 'gestion';
  badge: string;
  color: string;
  iconName: 'MapPin' | 'Ruler' | 'AlertTriangle' | 'Leaf' | 'FileText';
  description: string;
  brigadeRole: string;
  equipment: string[];
  keyFields: string[];
  fieldTips: string;
}

export const SURVEY123_FORMS: Survey123FormItem[] = [
  {
    id: 'datos-generales',
    code: 'TCU-S123-01',
    title: 'Datos Generales del Árbol Urbano',
    shortTitle: 'Datos Generales',
    subtitle: 'Georreferenciación cantonal, cuadrante urbano y emplazamiento vial',
    url: 'https://arcg.is/0aC0S8',
    deepLink: 'arcgis-survey123://?url=https://arcg.is/0aC0S8',
    category: 'censo',
    badge: 'Formulario 01 Oficial',
    color: '#234175',
    iconName: 'MapPin',
    description:
      'Registro primario de ubicación geográfica en campo mediante GNSS. Permite documentar cantón, distrito, cuadrante, tipo de vía (acera, parque central, bulevar, rotonda, servidumbre), ancho de acera, características del alcorque y toma de foto panorámica geolocalizada con acimut.',
    brigadeRole: 'Brigadista de Cartografía y Geoposicionamiento',
    equipment: [
      'Dispositivo móvil / Tablet con GPS de alta precisión',
      'Mira topográfica de 2 metros para escala fotográfica',
      'Brújula de mano / Sensor magnético calibrado',
      'Chaleco reflectante UTN y credencial institucional'
    ],
    keyFields: [
      'ID Único de Árbol (ej. LIB-2024-001)',
      'Cantón (Liberia, Cañas, Bagaces, Santa Cruz, Nicoya)',
      'Coordenadas Proyectadas CRTM05 (EPSG: 5367) y WGS84',
      'Tipología de emplazamiento urbano (Acera / Bulevar / Parque)',
      'Estado del pavimento circundante y daño alcorque',
      'Fotografía panorámica del entorno y fuste'
    ],
    fieldTips:
      'Esperar precisión satelital menor a 3.0 m antes de capturar el punto GNSS. Tomar la foto panorámica a 5 metros de distancia con vista norte.'
  },
  {
    id: 'dendrometria',
    code: 'TCU-S123-02',
    title: 'Dendro-metría y Biometría Forestal',
    shortTitle: 'Dendro-metría',
    subtitle: 'Medición dasométrica: DAP, altura total y proyección de copa',
    url: 'https://arcg.is/bLanO',
    deepLink: 'arcgis-survey123://?url=https://arcg.is/bLanO',
    category: 'dasometria',
    badge: 'Formulario 02 Oficial',
    color: '#059669',
    iconName: 'Ruler',
    description:
      'Levantamiento de variables métricas forestales directas e indirectas: Diámetro a la Altura del Pecho (DAP a 1.30 m) con cinta diamétrica calibrada, altura total y de fuste limpio con hipsómetro/clinómetro, radio de proyección de copa ortogonal (Norte-Sur / Este-Oeste) e inclinación troncal.',
    brigadeRole: 'Brigadista Forestal y Medición Dasométrica',
    equipment: [
      'Cinta diamétrica forestal calibrada en cm/mm',
      'Clinómetro óptico Suunto o telémetro láser',
      'Cinta métrica de fibra de vidrio de 30 metros',
      'Jalón de referencia para altura de fuste limpio'
    ],
    keyFields: [
      'DAP - Diámetro a 1.30m del suelo (cm)',
      'Número de fustes o bifurcaciones basales',
      'Altura total del ejemplar (metros)',
      'Altura a la base de la primera rama viva (m)',
      'Diámetro de copa en eje Norte-Sur (m)',
      'Diámetro de copa en eje Este-Oeste (m)',
      'Inclinación de tronco (° grados) y orientación de caída'
    ],
    fieldTips:
      'Si el árbol está en pendiente, medir el DAP en el lado superior del terreno a 1.30 m. Para copas asimétricas, medir los cuatro radios cardinales.'
  },
  {
    id: 'evaluacion-riesgo',
    code: 'TCU-S123-03',
    title: 'Evaluación Básica de Riesgo y Fitosanidad',
    shortTitle: 'Evaluación de Riesgo',
    subtitle: 'Protocolo fitosanitario, cavidades, raíces y conflicto eléctrico TRAQ',
    url: 'https://arcg.is/i0L5r',
    deepLink: 'arcgis-survey123://?url=https://arcg.is/i0L5r',
    category: 'riesgo',
    badge: 'Formulario 03 Oficial',
    color: '#dc2626',
    iconName: 'AlertTriangle',
    description:
      'Evaluación estructural y de salud fitosanitaria basada en el estándar internacional TRAQ (Tree Risk Assessment Qualification) de la ISA. Identificación de plagas, hongos xilófagos, muérdago, pudriciones radiculares, ramas secas con probabilidad de desprendimiento y conflicto de proximidad con líneas eléctricas de media tensión (13.2 kV / 24.9 kV).',
    brigadeRole: 'Brigadista Especialista en Sanidad y Riesgo Urbano',
    equipment: [
      'Mazo de goma no destructivo para detección acústica de oquedades',
      'Distanciómetro láser para distancia a líneas vivas',
      'Espejo de inspección telescópico para horquillas altas',
      'Binoculares de 8x42 para inspección de copa alta'
    ],
    keyFields: [
      'Condición fitosanitaria general (Excelente / Buena / Regular / Crítica)',
      'Presencia de hongos xilófagos o pudrición basal activa',
      'Cavidades en fuste (% estimado de madera residual intacta)',
      'Ramas secas de gran calibre sobre blancos peatonales/vehiculares',
      'Conflicto con tendido eléctrico aéreo (Ninguno / Moderado / Severo)',
      'Probabilidad de fallo estructural (Improbable / Posible / Probable / Inminente)',
      'Categoría de riesgo final y acción correctiva inmediata'
    ],
    fieldTips:
      'Mantener distancia de seguridad reglamentaria de al menos 3 metros de líneas de media tensión (13.2 kV). Registrar el blanco o diana bajo la copa.'
  },
  {
    id: 'especies',
    code: 'TCU-S123-04',
    title: 'Identificación Botánica de Especies',
    shortTitle: 'Especies',
    subtitle: 'Taxonomía del Bosque Seco Guanacasteco y flora introducida',
    url: 'https://arcg.is/18C0ii',
    deepLink: 'arcgis-survey123://?url=https://arcg.is/18C0ii',
    category: 'taxonomia',
    badge: 'Formulario 04 Oficial',
    color: '#16a34a',
    iconName: 'Leaf',
    description:
      'Determinación taxonómica rigurosa de las especies de la Región Chorotega. Diferenciación de especies nativas emblemáticas (Guanacaste, Cañafístula, Pochote, Guayacán Real, Ron-Ron, Espavel, Tempisque, Madroño, Roble Sabana) vs. especies exóticas (Neem, Ficus benjamina, Casuarina), fenología y valor biológico.',
    brigadeRole: 'Brigadista Botánico y Taxónomo de Campo',
    equipment: [
      'Guía ilustrada de árboles del Bosque Seco Tropical (SINAC/UTN)',
      'Lupa cuentahílos de 10x y 20x para nervaduras y glándulas foliares',
      'Tijera telescópica de poda para colecta dendrológica de hojas/frutos',
      'Bolsas herméticas para muestras de herbario'
    ],
    keyFields: [
      'Nombre Común en Guanacaste',
      'Nombre Científico y Familia Botánica (Fabaceae, Bignoniaceae, etc.)',
      'Origen Biogeográfico (Nativo de Costa Rica / Exótico Introducido)',
      'Estado Fenológico (Foliación activa, Floración, Fructificación, Defoliación)',
      'Aporte al Corredor Biológico Urbano (refugio avifauna, polinizadores)',
      'Fotografía de detalle de hoja, corteza y flor/fruto'
    ],
    fieldTips:
      'Revisar filotaxis (hojas alternas vs. opuestas) y presencia de exudados (látex, savia transparente o resina) para confirmar la familia botánica.'
  },
  {
    id: 'informe-final',
    code: 'TCU-S123-05',
    title: 'Informe Final y Validación de Cuadrante',
    shortTitle: 'Informe Final',
    subtitle: 'Consolidación de censo de brigada, QA/QC y reporte TCU-102A',
    url: 'https://arcg.is/z9Snz3',
    deepLink: 'arcgis-survey123://?url=https://arcg.is/z9Snz3',
    category: 'gestion',
    badge: 'Cierre Institucional',
    color: '#475569',
    iconName: 'FileText',
    description:
      'Formulario institucional de cierre y verificación de calidad de datos para brigadas del TCU-102A. Permite la carga del resumen de cuadrante, validación cruzada con el tutor universitario, registro de horas de servicio comunitario y firma de entrega a la municipalidad.',
    brigadeRole: 'Coordinador de Brigada / Tutor Universitario UTN',
    equipment: [
      'Laptop / Tablet institucional con acceso al portal SIGARU',
      'Firma digital o verificación de identidad institucional',
      'Acta de validación de cuadrante firmado por la Unidad Ambiental'
    ],
    keyFields: [
      'Código de Brigada y Nombres de Estudiantes Participantes',
      'Cantón, Distrito y Polígono de Cuadrante validado',
      'Total de Árboles Censados y Georreferenciados en la Jornada',
      'Horas de Servicio Comunitario acumuladas por brigadista',
      'Validación de QA/QC de datos por el docente tutor'
    ],
    fieldTips:
      'Comprobar que todos los registros de los formularios 01 al 04 estén sincronizados en ArcGIS Online antes de enviar el informe final de cuadrante.'
  }
];

export interface PipelineStep {
  step: string;
  phase: string;
  title: string;
  actor: string;
  technology: string;
  description: string;
  metrics: string;
}

export const SURVEY123_PIPELINE: PipelineStep[] = [
  {
    step: '01',
    phase: 'Captura en Campo',
    title: 'Levantamiento GNSS Offline en Brigadas',
    actor: 'Estudiantes TCU-102A UTN',
    technology: 'ArcGIS Survey123 Mobile App + GNSS',
    description:
      'Las brigadas recorren los cuadrantes de Liberia, Cañas, Bagaces, Santa Cruz y Nicoya con la app Survey123. Los formularios funcionan 100% offline, almacenando coordenadas submétricas, mediciones dasométricas y fotos de alta resolución en la memoria local del dispositivo.',
    metrics: '± 1.5 a 3.0 m precisión satelital'
  },
  {
    step: '02',
    phase: 'Sincronización Nube',
    title: 'Transmisión Segura a ArcGIS Online',
    actor: 'Red Celular / Wi-Fi Sede UTN',
    technology: 'ArcGIS Feature Service REST API (HTTPS/TLS 1.3)',
    description:
      'Al detectar conectividad 4G/5G o Wi-Fi en la sede de la UTN Guanacaste, Survey123 sincroniza automáticamente los lotes de registros. Cada árbol se almacena en capas de entidades geoespaciales (Feature Layers) con control de versiones y auditoría de usuario.',
    metrics: 'Sincronización bidireccional instantánea'
  },
  {
    step: '03',
    phase: 'Geoprocesamiento QA/QC',
    title: 'Validación Automatizada y Cruce de Capas',
    actor: 'Motor GIS SIGARU / UTN',
    technology: 'Python ArcPy / GDAL / Proyección CRTM05 (EPSG: 5367)',
    description:
      'Un pipeline automatizado proyecta las coordenadas a la cuadrícula geodésica nacional CRTM05, cruza los puntos con la capa de tendido eléctrico de Coopeguanacaste/ICE, calcula el índice TRAQ de riesgo y recalcula el área de sombra y biomasa acumulada.',
    metrics: '100% verificación topológica'
  },
  {
    step: '04',
    phase: 'Visualización y Análisis',
    title: 'Alimentación de Cartografía y Dashboards',
    actor: 'Plataforma Web TCU-102A',
    technology: 'React 18 + Vector Map SVG + ArcGIS WebMaps',
    description:
      'Los datos enriquecidos se publican inmediatamente en los visores temáticos de Cartografía y SIGARU: dosel urbano, islas de calor (LST), conflictos de red eléctrica y déficit verde por habitante según los parámetros de la OMS.',
    metrics: 'Actualización dinámica en tiempo real'
  },
  {
    step: '05',
    phase: 'Acción Territorial',
    title: 'Decisiones Municipales y Planes de Manejo',
    actor: 'Alcaldías, Unidades Ambientales y SINAC',
    technology: 'Planes Reguladores Cantonales + Órdenes de Poda',
    description:
      'Las municipalidades guanacastecas y el SINAC (ACAT/ACG) descargan las capas cartográficas oficiales, emiten órdenes de intervención preventiva para árboles en riesgo y diseñan corredores biológicos urbanos basados en evidencia científica.',
    metrics: '5 cantones con insumos cartográficos'
  }
];
