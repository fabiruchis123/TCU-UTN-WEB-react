export interface CantonZone {
  id: string;
  name: string;
  canton: string;
  distrito: string;
  region: string;
  lat: number;
  lng: number;
  crtm05: { x: number; y: number };
  description: string;
  areaKm2: number;
  population: number;
  greenAreaPerCapita: number; // m²/hab
  omsTarget: number; // 9.0 m²/hab
  canopyCoveragePercent: number; // %
  avgLST: number; // °C Superficie Terrestre (LST)
  heatIslandDelta: number; // °C diferencia con periurbano
  totalTreesSurveyed: number;
  healthDistribution: { good: number; regular: number; poor: number };
  electricConflictCount: number;
  electricConflictPercent: number;
  topSpecies: Array<{ common: string; scientific: string; count: number; native: boolean; status: string }>;
  quadrants: Array<{
    id: string;
    name: string;
    type: 'park' | 'avenue' | 'commercial' | 'residential' | 'institutional';
    x: number; // percentage in viewer 0-100
    y: number;
    w: number;
    h: number;
    canopyScore: number; // 0-100
    tempC: number;
    treesCount: number;
    riskSummary: 'Bajo' | 'Medio' | 'Alto';
  }>;
  sampleTrees: Array<{
    id: string;
    code: string;
    commonName: string;
    scientificName: string;
    family: string;
    x: number;
    y: number;
    heightM: number;
    dapCm: number;
    canopyRadiusM: number;
    health: 'Bueno' | 'Regular' | 'Crítico';
    riskLevel: 'Bajo' | 'Medio' | 'Alto';
    electricConflict: 'Ninguno' | 'Moderado' | 'Severo';
    isNative: boolean;
    shadowAreaM2: number;
    carbonCaptureKgYear: number;
    notes: string;
  }>;
  recommendations: string[];
}

export type MapMode = 'canopy' | 'thermal' | 'risk' | 'diversity';

export interface ThematicLayerInfo {
  mode: MapMode;
  name: string;
  shortDesc: string;
  fullDesc: string;
  metricLabel: string;
  colorScale: Array<{ color: string; label: string; range: string }>;
}

export interface DownloadableMap {
  id: string;
  title: string;
  category: 'Cobertura y Dosel' | 'Riesgo y Red Eléctrica' | 'Islas de Calor y Clima' | 'Biodiversidad Urbana' | 'Paquete GIS OpenData';
  canton: string;
  year: number;
  scale: string;
  format: 'GeoPDF (300 DPI)' | 'GeoTIFF Multiespectral' | 'Shapefile / GeoJSON ZIP';
  size: string;
  projection: string;
  previewColor: string;
  description: string;
  tags: string[];
}

export const CANTON_ZONES: CantonZone[] = [
  {
    id: 'liberia-centro',
    name: 'Liberia Centro - Casco Histórico y Eje Comercial',
    canton: 'Liberia',
    distrito: 'Liberia (Distrito 01)',
    region: 'Región Chorotega / ACG',
    lat: 10.6346,
    lng: -85.4407,
    crtm05: { x: 342650, y: 1176210 },
    description: 'Casco urbano central de Liberia ("Ciudad Blanca"). Se caracteriza por alta densidad de construcciones en adobe y concreto, avenidas con pavimentos continuos y un severo efecto de isla de calor en calles comerciales, compensado parcialmente por el Parque Central Mario Cañas Ruiz.',
    areaKm2: 4.8,
    population: 43200,
    greenAreaPerCapita: 4.2,
    omsTarget: 9.0,
    canopyCoveragePercent: 14.8,
    avgLST: 38.6,
    heatIslandDelta: 4.4,
    totalTreesSurveyed: 1420,
    healthDistribution: { good: 61, regular: 27, poor: 12 },
    electricConflictCount: 315,
    electricConflictPercent: 22.2,
    topSpecies: [
      { common: 'Roble Sabana', scientific: 'Tabebuia rosea', count: 324, native: true, status: 'Floración estacional abundante, dosel medio' },
      { common: 'Cortez Amarillo', scientific: 'Handroanthus ochraceus', count: 218, native: true, status: 'Especie nativa protegida de madera densa' },
      { common: 'Almendro de Río', scientific: 'Andira inermis', count: 185, native: true, status: 'Excelente sombra perenne en riberas' },
      { common: 'Malinche', scientific: 'Delonix regia', count: 162, native: false, status: 'Introducido, raíces superficiales en aceras' },
      { common: 'Neem', scientific: 'Azadirachta indica', count: 140, native: false, status: 'Exótico invasor, fácil propagación' }
    ],
    quadrants: [
      { id: 'q-lib-1', name: 'Parque Central Mario Cañas Ruiz', type: 'park', x: 42, y: 40, w: 20, h: 22, canopyScore: 82, tempC: 31.8, treesCount: 165, riskSummary: 'Bajo' },
      { id: 'q-lib-2', name: 'Avenida 25 de Julio (Eje Comercial)', type: 'avenue', x: 18, y: 38, w: 64, h: 8, canopyScore: 18, tempC: 41.2, treesCount: 42, riskSummary: 'Alto' },
      { id: 'q-lib-3', name: 'Barrio Condega / Calle Real', type: 'residential', x: 20, y: 15, w: 28, h: 22, canopyScore: 46, tempC: 35.4, treesCount: 110, riskSummary: 'Medio' },
      { id: 'q-lib-4', name: 'Sector Mercado Municipal y Terminal', type: 'commercial', x: 64, y: 55, w: 24, h: 25, canopyScore: 11, tempC: 42.6, treesCount: 18, riskSummary: 'Alto' },
      { id: 'q-lib-5', name: 'Campus UTN Liberia y Ribera Río', type: 'institutional', x: 15, y: 68, w: 32, h: 24, canopyScore: 74, tempC: 32.5, treesCount: 240, riskSummary: 'Bajo' }
    ],
    sampleTrees: [
      { id: 't-lib-01', code: 'LIB-0104', commonName: 'Guanacaste', scientificName: 'Enterolobium cyclocarpum', family: 'Fabaceae', x: 46, y: 48, heightM: 19.5, dapCm: 112, canopyRadiusM: 14.2, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 633, carbonCaptureKgYear: 142.5, notes: 'Árbol patrimonial emblemático en el cuadrante suroeste del parque.' },
      { id: 't-lib-02', code: 'LIB-0219', commonName: 'Cortez Amarillo', scientificName: 'Handroanthus ochraceus', family: 'Bignoniaceae', x: 55, y: 44, heightM: 14.0, dapCm: 58, canopyRadiusM: 6.8, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 145, carbonCaptureKgYear: 48.0, notes: 'Fuste recto en excelente condición sanitaria.' },
      { id: 't-lib-03', code: 'LIB-0342', commonName: 'Malinche', scientificName: 'Delonix regia', family: 'Fabaceae', x: 30, y: 41, heightM: 9.8, dapCm: 45, canopyRadiusM: 7.2, health: 'Regular', riskLevel: 'Alto', electricConflict: 'Severo', isNative: false, shadowAreaM2: 162, carbonCaptureKgYear: 28.3, notes: 'Ramas primarias en contacto directo con cableado de 13.2 kV; acera fracturada.' },
      { id: 't-lib-04', code: 'LIB-0415', commonName: 'Roble Sabana', scientificName: 'Tabebuia rosea', family: 'Bignoniaceae', x: 72, y: 41, heightM: 12.3, dapCm: 52, canopyRadiusM: 6.1, health: 'Bueno', riskLevel: 'Medio', electricConflict: 'Moderado', isNative: true, shadowAreaM2: 117, carbonCaptureKgYear: 39.1, notes: 'Podas asimétricas previas por cuadrilla eléctrica municipal.' },
      { id: 't-lib-05', code: 'LIB-0520', commonName: 'Almendro de Río', scientificName: 'Andira inermis', family: 'Fabaceae', x: 26, y: 24, heightM: 16.2, dapCm: 76, canopyRadiusM: 9.5, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 283, carbonCaptureKgYear: 78.4, notes: 'Gran generador de microclima fresco en corredor habitacional.' },
      { id: 't-lib-06', code: 'LIB-0608', commonName: 'Neem', scientificName: 'Azadirachta indica', family: 'Meliaceae', x: 78, y: 68, heightM: 8.5, dapCm: 38, canopyRadiusM: 5.0, health: 'Regular', riskLevel: 'Medio', electricConflict: 'Moderado', isNative: false, shadowAreaM2: 78, carbonCaptureKgYear: 21.0, notes: 'Invasor en sector mercado, requiere reemplazo gradual por nativas.' },
      { id: 't-lib-07', code: 'LIB-0731', commonName: 'Cenízaro', scientificName: 'Samanea saman', family: 'Fabaceae', x: 24, y: 79, heightM: 17.8, dapCm: 94, canopyRadiusM: 13.0, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 530, carbonCaptureKgYear: 118.0, notes: 'Zona ribera campus UTN, hábitat de iguanas y pericos frentirrojos.' },
      { id: 't-lib-08', code: 'LIB-0812', commonName: 'Laurel', scientificName: 'Cordia alliodora', family: 'Boraginaceae', x: 38, y: 72, heightM: 15.1, dapCm: 48, canopyRadiusM: 5.2, health: 'Crítico', riskLevel: 'Alto', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 85, carbonCaptureKgYear: 18.2, notes: 'Ataque severo de comején y pudrición de duramen con oquedad basal.' }
    ],
    recommendations: [
      'Implementar arbolado viario con especies de fuste vertical (Roble Sabana, Corteza Amarilla) en la Avenida 25 de Julio para amortiguar el pico térmico de 41 °C.',
      'Sustituir árboles exóticos en conflicto con cableado eléctrico por especies nativas de porte medio coordinado con Coopeguanacaste.',
      'Crear un corredor verde que conecte el Parque Mario Cañas con la ribera del Río Liberia hacia el Campus UTN.'
    ]
  },
  {
    id: 'canas-boulevard',
    name: 'Cañas Centro - Bulevar Principal y Cuadrícula',
    canton: 'Cañas',
    distrito: 'Cañas (Distrito 01)',
    region: 'Región Chorotega / ACAT',
    lat: 10.4312,
    lng: -85.0988,
    crtm05: { x: 380120, y: 1153680 },
    description: 'Cantón agroindustrial con alta radiación solar sobre la Carretera Interamericana Norte y centro cívico. Destaca el corredor verde de su bulevar central y la necesidad de sombra continua para peatones.',
    areaKm2: 2.9,
    population: 26500,
    greenAreaPerCapita: 5.8,
    omsTarget: 9.0,
    canopyCoveragePercent: 17.2,
    avgLST: 37.1,
    heatIslandDelta: 3.6,
    totalTreesSurveyed: 980,
    healthDistribution: { good: 68, regular: 21, poor: 11 },
    electricConflictCount: 184,
    electricConflictPercent: 18.8,
    topSpecies: [
      { common: 'Guácimo', scientific: 'Guazuma ulmifolia', count: 195, native: true, status: 'Resistente a sequías extremas de Guanacaste' },
      { common: 'Carao', scientific: 'Cassia grandis', count: 160, native: true, status: 'Floración rosada llamativa y vainas medicinales' },
      { common: 'Guachipelín', scientific: 'Diphysa americana', count: 142, native: true, status: 'Fijador de nitrógeno, copa mediana para aceras' },
      { common: 'Caoba', scientific: 'Swietenia macrophylla', count: 98, native: true, status: 'Especie maderable de alto valor ecológico' },
      { common: 'Ficus Benjamina', scientific: 'Ficus benjamina', count: 86, native: false, status: 'Exótico, daño agresivo a infraestructura de acueductos' }
    ],
    quadrants: [
      { id: 'q-can-1', name: 'Parque Central de Cañas', type: 'park', x: 45, y: 44, w: 22, h: 22, canopyScore: 78, tempC: 32.1, treesCount: 140, riskSummary: 'Bajo' },
      { id: 'q-can-2', name: 'Bulevar Peatonal y Eje Cívico', type: 'avenue', x: 15, y: 45, w: 70, h: 10, canopyScore: 42, tempC: 36.8, treesCount: 75, riskSummary: 'Medio' },
      { id: 'q-can-3', name: 'Acceso Interamericana Norte (Ruta 1)', type: 'commercial', x: 10, y: 18, w: 80, h: 16, canopyScore: 12, tempC: 42.0, treesCount: 38, riskSummary: 'Alto' },
      { id: 'q-can-4', name: 'Barrio San Martín Residencial', type: 'residential', x: 20, y: 64, w: 32, h: 24, canopyScore: 54, tempC: 34.2, treesCount: 135, riskSummary: 'Bajo' }
    ],
    sampleTrees: [
      { id: 't-can-01', code: 'CNS-0089', commonName: 'Guachipelín', scientificName: 'Diphysa americana', family: 'Fabaceae', x: 49, y: 48, heightM: 11.2, dapCm: 42, canopyRadiusM: 5.5, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 95, carbonCaptureKgYear: 32.4, notes: 'Ideal para arboricultura urbana por raíces no invasivas.' },
      { id: 't-can-02', code: 'CNS-0145', commonName: 'Carao', scientificName: 'Cassia grandis', family: 'Fabaceae', x: 58, y: 50, heightM: 15.6, dapCm: 68, canopyRadiusM: 8.4, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 221, carbonCaptureKgYear: 64.0, notes: 'Gran atractivo biológico para polinizadores nativos.' },
      { id: 't-can-03', code: 'CNS-0230', commonName: 'Ficus Benjamina', scientificName: 'Ficus benjamina', family: 'Moraceae', x: 32, y: 48, heightM: 10.0, dapCm: 56, canopyRadiusM: 7.0, health: 'Regular', riskLevel: 'Alto', electricConflict: 'Severo', isNative: false, shadowAreaM2: 153, carbonCaptureKgYear: 29.0, notes: 'Fuerte estrangulamiento de acera y ductos pluviales municipales.' },
      { id: 't-can-04', code: 'CNS-0312', commonName: 'Caoba', scientificName: 'Swietenia macrophylla', family: 'Meliaceae', x: 30, y: 72, heightM: 16.4, dapCm: 64, canopyRadiusM: 8.0, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 201, carbonCaptureKgYear: 72.1, notes: 'Espécimen vigoroso plantado en programa de reforestación comunal.' }
    ],
    recommendations: [
      'Retirar paulatinamente los Ficus invasores que provocan levantamiento de aceras y sustituirlos por Guachipelín y Ron-ron.',
      'Ampliar el dosel continuo del Bulevar Peatonal para generar una "isla de frescura" que reduzca 4 °C la sensación térmica.',
      'Monitoreo trimestral con la cuadrilla municipal de Cañas para despeje preventivo de tendidos de media tensión.'
    ]
  },
  {
    id: 'bagaces-parque',
    name: 'Bagaces Centro - Parque Central y Corredor Eólico',
    canton: 'Bagaces',
    distrito: 'Bagaces (Distrito 01)',
    region: 'Región Chorotega / ACAT',
    lat: 10.5284,
    lng: -85.2539,
    crtm05: { x: 363100, y: 1164500 },
    description: 'Zona de transición climática con vientos alisios secos y prolongados en época seca. Los árboles urbanos cumplen una función crítica como cortinas rompevientos y amortiguadores del polvo y calor extremo.',
    areaKm2: 2.1,
    population: 15200,
    greenAreaPerCapita: 6.1,
    omsTarget: 9.0,
    canopyCoveragePercent: 16.5,
    avgLST: 39.2,
    heatIslandDelta: 4.5,
    totalTreesSurveyed: 740,
    healthDistribution: { good: 64, regular: 24, poor: 12 },
    electricConflictCount: 132,
    electricConflictPercent: 17.8,
    topSpecies: [
      { common: 'Guanacaste', scientific: 'Enterolobium cyclocarpum', count: 148, native: true, status: 'Árbol nacional, máxima cobertura por copa' },
      { common: 'Ron-ron', scientific: 'Astronium graveolens', count: 112, native: true, status: 'Madera pesada, altísima resistencia mecánica al viento' },
      { common: 'Laurel', scientific: 'Cordia alliodora', count: 96, native: true, status: 'Fuste recto cilíndrico, madera noble' },
      { common: 'Guácimo', scientific: 'Guazuma ulmifolia', count: 85, native: true, status: 'Sombra densa y forraje estacional' }
    ],
    quadrants: [
      { id: 'q-bag-1', name: 'Parque Central de Bagaces y Templo', type: 'park', x: 44, y: 42, w: 24, h: 24, canopyScore: 84, tempC: 32.8, treesCount: 118, riskSummary: 'Bajo' },
      { id: 'q-bag-2', name: 'Corredor Viento Norte (Entrada Cantonal)', type: 'avenue', x: 46, y: 12, w: 14, h: 76, canopyScore: 28, tempC: 39.8, treesCount: 52, riskSummary: 'Medio' },
      { id: 'q-bag-3', name: 'Cuadrante Comercial y Mercado', type: 'commercial', x: 18, y: 40, w: 22, h: 28, canopyScore: 16, tempC: 42.4, treesCount: 22, riskSummary: 'Alto' }
    ],
    sampleTrees: [
      { id: 't-bag-01', code: 'BAG-0042', commonName: 'Guanacaste', scientificName: 'Enterolobium cyclocarpum', family: 'Fabaceae', x: 50, y: 50, heightM: 21.0, dapCm: 128, canopyRadiusM: 15.5, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 754, carbonCaptureKgYear: 168.0, notes: 'Ejemplar centenario que domina el parque central.' },
      { id: 't-bag-02', code: 'BAG-0118', commonName: 'Ron-ron', scientificName: 'Astronium graveolens', family: 'Anacardiaceae', x: 58, y: 46, heightM: 14.8, dapCm: 55, canopyRadiusM: 6.2, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 120, carbonCaptureKgYear: 51.2, notes: 'Estructura biomecánica excelente ante ráfagas de 70 km/h.' }
    ],
    recommendations: [
      'Priorizar árboles de madera densa como Ron-ron y Guachipelín en ejes viales expuestos a vientos alisios.',
      'Reforestar el perímetro del mercado municipal para atenuar temperaturas superficiales de 42 °C.',
      'Capacitar a personal del municipio en poda técnica con motosierra extensible para evitar desmoches agresivos.'
    ]
  },
  {
    id: 'santacruz-plazas',
    name: 'Santa Cruz - Casco Urbano y Plazas Cívicas',
    canton: 'Santa Cruz',
    distrito: 'Santa Cruz (Distrito 01)',
    region: 'Región Chorotega / ACAT',
    lat: 10.2605,
    lng: -85.5851,
    crtm05: { x: 326750, y: 1134900 },
    description: 'Cuna del folclore nacional, con plazas de toros tradicionales y calles amplias. Presenta déficit de sombra en zonas de tránsito peatonal durante las fiestas cívicas y actividades cotidianas.',
    areaKm2: 3.4,
    population: 28400,
    greenAreaPerCapita: 5.1,
    omsTarget: 9.0,
    canopyCoveragePercent: 18.0,
    avgLST: 37.8,
    heatIslandDelta: 3.9,
    totalTreesSurveyed: 1120,
    healthDistribution: { good: 63, regular: 25, poor: 12 },
    electricConflictCount: 248,
    electricConflictPercent: 22.1,
    topSpecies: [
      { common: 'Espavel', scientific: 'Anacardium excelsum', count: 210, native: true, status: 'Árbol gigante de copa densa y húmeda' },
      { common: 'Cedro Amargo', scientific: 'Cedrela odorata', count: 180, native: true, status: 'Especie en veda / lista roja UICN, alto valor' },
      { common: 'Pochote', scientific: 'Pachira quinata', count: 145, native: true, status: 'Tronco con espinas protectoras, caducifolio' },
      { common: 'Guanacaste', scientific: 'Enterolobium cyclocarpum', count: 120, native: true, status: 'Sombra masiva en plazoletas' }
    ],
    quadrants: [
      { id: 'q-sc-1', name: 'Plaza Los Mangos y Parque Bernabela Ramos', type: 'park', x: 40, y: 40, w: 26, h: 26, canopyScore: 80, tempC: 32.2, treesCount: 175, riskSummary: 'Bajo' },
      { id: 'q-sc-2', name: 'Plaza de Toros Típica y Entorno', type: 'commercial', x: 68, y: 35, w: 24, h: 24, canopyScore: 14, tempC: 41.5, treesCount: 26, riskSummary: 'Alto' },
      { id: 'q-sc-3', name: 'Calle Central y Comercio Santacruceño', type: 'avenue', x: 12, y: 42, w: 60, h: 8, canopyScore: 24, tempC: 38.5, treesCount: 48, riskSummary: 'Medio' }
    ],
    sampleTrees: [
      { id: 't-sc-01', code: 'SC-0120', commonName: 'Espavel', scientificName: 'Anacardium excelsum', family: 'Anacardiaceae', x: 48, y: 46, heightM: 22.4, dapCm: 118, canopyRadiusM: 14.0, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 615, carbonCaptureKgYear: 154.0, notes: 'Sombra continua para centenares de transeúntes.' },
      { id: 't-sc-02', code: 'SC-0245', commonName: 'Cedro Amargo', scientificName: 'Cedrela odorata', family: 'Meliaceae', x: 55, y: 52, heightM: 16.0, dapCm: 62, canopyRadiusM: 7.5, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 176, carbonCaptureKgYear: 68.3, notes: 'Individuo semillero de alto valor genético.' }
    ],
    recommendations: [
      'Implementar "techos verdes arbóreos" en la plaza cívica para protección de la población en eventos masivos.',
      'Sustituir árboles con ramas secas cercanas al tendido eléctrico de Coopeguanacaste.',
      'Promover la siembra de Cedro Amargo y Pochote en áreas residenciales para enriquecer la biodiversidad local.'
    ]
  },
  {
    id: 'nicoya-historico',
    name: 'Nicoya - Casco Colonial y Zona Azul',
    canton: 'Nicoya',
    distrito: 'Nicoya (Distrito 01)',
    region: 'Región Chorotega / ACAT',
    lat: 10.1444,
    lng: -85.4522,
    crtm05: { x: 341200, y: 1121900 },
    description: 'Cabecera de la Zona Azul mundial de longevidad de la Península de Nicoya. La relación de los habitantes con los árboles maduros y espacios públicos tiene un valor bio-cultural y de bienestar físico directo.',
    areaKm2: 3.1,
    population: 25000,
    greenAreaPerCapita: 6.9,
    omsTarget: 9.0,
    canopyCoveragePercent: 21.4,
    avgLST: 36.2,
    heatIslandDelta: 2.8,
    totalTreesSurveyed: 1280,
    healthDistribution: { good: 72, regular: 20, poor: 8 },
    electricConflictCount: 198,
    electricConflictPercent: 15.5,
    topSpecies: [
      { common: 'Tempisque', scientific: 'Sideroxylon capiri', count: 240, native: true, status: 'Especie insignia de la cuenca baja, gran longevidad' },
      { common: 'Cenízaro', scientific: 'Samanea saman', count: 195, native: true, status: 'Copa umbeliforme gigante, microclima excepcional' },
      { common: 'Caoba', scientific: 'Swietenia macrophylla', count: 160, native: true, status: 'Árbol forestal de sombra profunda' },
      { common: 'Roble Sabana', scientific: 'Tabebuia rosea', count: 145, native: true, status: 'Floración y estética urbana' }
    ],
    quadrants: [
      { id: 'q-nic-1', name: 'Parque Recaredo Briceño e Iglesia Colonial', type: 'park', x: 44, y: 44, w: 26, h: 26, canopyScore: 88, tempC: 31.4, treesCount: 190, riskSummary: 'Bajo' },
      { id: 'q-nic-2', name: 'Avenida Colonial y Paseo Turístico', type: 'avenue', x: 16, y: 45, w: 68, h: 9, canopyScore: 52, tempC: 34.6, treesCount: 88, riskSummary: 'Bajo' },
      { id: 'q-nic-3', name: 'Sector Comercio y Terminal de Autobuses', type: 'commercial', x: 62, y: 18, w: 26, h: 24, canopyScore: 19, tempC: 39.5, treesCount: 30, riskSummary: 'Medio' }
    ],
    sampleTrees: [
      { id: 't-nic-01', code: 'NIC-0015', commonName: 'Tempisque', scientificName: 'Sideroxylon capiri', family: 'Sapotaceae', x: 49, y: 48, heightM: 23.5, dapCm: 135, canopyRadiusM: 16.0, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 804, carbonCaptureKgYear: 182.0, notes: 'Árbol histórico centenario frente a la Iglesia Colonial de San Blas.' },
      { id: 't-nic-02', code: 'NIC-0082', commonName: 'Cenízaro', scientificName: 'Samanea saman', family: 'Fabaceae', x: 57, y: 53, heightM: 18.2, dapCm: 104, canopyRadiusM: 14.5, health: 'Bueno', riskLevel: 'Bajo', electricConflict: 'Ninguno', isNative: true, shadowAreaM2: 660, carbonCaptureKgYear: 138.5, notes: 'Follaje que pliega sus hojas durante la noche o lluvia.' }
    ],
    recommendations: [
      'Proteger legalmente los árboles centenarios de Tempisque como monumentos naturales del cantón.',
      'Extender la cobertura arbórea hacia el cuadrante de la terminal de autobuses para confort de adultos mayores.',
      'Integrar el inventario SIGARU con el plan de salud comunitaria y longevidad cantonal.'
    ]
  }
];

export const THEMATIC_LAYERS: ThematicLayerInfo[] = [
  {
    mode: 'canopy',
    name: 'Cobertura de Copa y NDVI',
    shortDesc: 'Densidad del dosel arbóreo y vegetación activa',
    fullDesc: 'Calculado mediante ortofotomosaicos con drones (GSD < 2.5 cm) y calibrado con el Índice de Vegetación de Diferencia Normalizada (NDVI) satelital Sentinel-2 MSI. Identifica zonas con déficit crítico de sombra natural en aceras y plazas.',
    metricLabel: '% Cobertura de Copa / NDVI',
    colorScale: [
      { color: '#15803d', label: 'Dosel Denso (NDVI > 0.65)', range: 'Copa > 70%' },
      { color: '#47c73b', label: 'Dosel Medio (NDVI 0.45 - 0.65)', range: 'Copa 40 - 70%' },
      { color: '#a3e635', label: 'Vegetación Dispersa (NDVI 0.25 - 0.45)', range: 'Copa 15 - 40%' },
      { color: '#facc15', label: 'Arbolado Aislado (NDVI 0.15 - 0.25)', range: 'Copa 5 - 15%' },
      { color: '#94a3b8', label: 'Suelo Sellado / Sin Vegetación (NDVI < 0.15)', range: 'Copa < 5%' }
    ]
  },
  {
    mode: 'thermal',
    name: 'Estrés Térmico e Islas de Calor (LST)',
    shortDesc: 'Temperatura superficial terrestre por teledetección infrarroja',
    fullDesc: 'Modelo de Temperatura de la Superficie Terrestre (LST) derivado de la banda térmica TIRS de Landsat 8/9 y calibrado con sensores térmicos in-situ. Muestra cómo el asfalto desprovisto de árboles alcanza más de 42 °C en Guanacaste, frente a microclimas de 31 °C bajo copas de Guanacastes o Tempisques.',
    metricLabel: 'Temperatura Superficial LST (°C)',
    colorScale: [
      { color: '#991b1b', label: 'Calor Extremo / Crítico (> 41 °C)', range: 'Pavimentos expuestos al sol' },
      { color: '#ea580c', label: 'Calor Alto (38 °C - 41 °C)', range: 'Calles con árboles escasos' },
      { color: '#eab308', label: 'Moderado (35 °C - 38 °C)', range: 'Zonas residenciales mixtas' },
      { color: '#84cc16', label: 'Confort Aceptable (33 °C - 35 °C)', range: 'Bulevares arbolados' },
      { color: '#059669', label: 'Isla de Frescor (< 33 °C)', range: 'Parques y arboledas maduras' }
    ]
  },
  {
    mode: 'risk',
    name: 'Riesgo y Conflicto Eléctrico',
    shortDesc: 'Interferencia con tendido eléctrico, fitosanidad y riesgo de caída',
    fullDesc: 'Georreferenciación de árboles que invaden la franja de servidumbre de líneas aéreas de media/baja tensión (13.2 kV y 24.9 kV), ramas con ramas secas, pudriciones básales y daños mecánicos en aceras o canalizaciones pluviales.',
    metricLabel: 'Nivel de Vulnerabilidad / Interferencia',
    colorScale: [
      { color: '#dc2626', label: 'Riesgo Alto / Conflicto Severo', range: 'Contacto directo 13.2 kV o daño estructural' },
      { color: '#f59e0b', label: 'Riesgo Medio / Conflicto Moderado', range: 'Proximidad < 1.5 m a cables, requiere poda' },
      { color: '#10b981', label: 'Riesgo Bajo / Sin Interferencia', range: 'Árbol sano con espacio aéreo libre' }
    ]
  },
  {
    mode: 'diversity',
    name: 'Diversidad Taxonómica y Origen',
    shortDesc: 'Especies nativas del bosque seco tropical vs introducidas',
    fullDesc: 'Mapeo ecológico que categoriza las especies censadas según su origen biogeográfico (especies nativas de Guanacaste vs exóticas introducidas) y su aporte a los corredores biológicos urbanos articulados con el SINAC.',
    metricLabel: 'Origen y Aporte Ecosistémico',
    colorScale: [
      { color: '#16a34a', label: 'Nativa de Bosque Seco Tropical', range: 'Guanacaste, Cortez, Ron-ron, Espavel' },
      { color: '#0284c7', label: 'Nativa Mesoamericana / Ribereña', range: 'Almendro de río, Carao, Cenízaro' },
      { color: '#d97706', label: 'Exótica Asimilada / No agresiva', range: 'Mango, Cítricos, Malinche' },
      { color: '#e11d48', label: 'Exótica Invasora / Problemática', range: 'Neem invasor, Ficus Benjamina en ductos' }
    ]
  }
];

export const CARTOGRAPHIC_METHODOLOGY = [
  {
    step: '01',
    title: 'Geodesia y GNSS RTK de Alta Precisión',
    description: 'Levantamiento geodésico submétrico mediante receptores Trimble R8 y Emlid Reach RS2 conectados a la red continua de estaciones del Registro Nacional y base local UTN Sede Guanacaste. Se garantiza precisión centimétrica horizontal en la proyección oficial de Costa Rica CRTM05 (EPSG: 5367).',
    tools: ['Trimble GNSS', 'Emlid Reach RTK', 'Datum CR05', 'EPSG:5367'],
    icon: 'Compass'
  },
  {
    step: '02',
    title: 'Fotogrametría Aérea con Drones (UAV)',
    description: 'Misiones de vuelo automatizadas con UAV DJI Mavic 3 Enterprise en cuadrículas cruzadas a 80 metros AGL. Generación de ortofotomosaicos con resolución espacial GSD inferior a 2.5 cm/píxel, Modelos Digitales de Superficie (DSM) y Modelos Digitales de Elevación (DEM) para aislar la altura y volumen de cada copa.',
    tools: ['DJI Mavic 3E', 'GSD < 2.5 cm', 'DSM & nDSM', 'Pix4D / WebODM'],
    icon: 'Layers'
  },
  {
    step: '03',
    title: 'Teledetección Satelital e Islas de Calor (LST)',
    description: 'Procesamiento en Google Earth Engine y QGIS de imágenes multiespectrales de las constelaciones Sentinel-2 MSI (resolución 10 m) y Landsat 8/9 OLI/TIRS (resolución 30 m/100 m térmico). Se calculan índices biofísicos NDVI, SAVI y la Temperatura de la Superficie Terrestre (LST) calibrada.',
    tools: ['Google Earth Engine', 'Sentinel-2 MSI', 'Landsat 8/9 TIRS', 'NDVI / SAVI / LST'],
    icon: 'Thermometer'
  },
  {
    step: '04',
    title: 'Censo Móvil en Terreno con Survey123 y SIGARU',
    description: 'Estudiantes del TCU y técnicos municipales registran en tabletas rugerizadas más de 25 variables por cada árbol: especie, DAP con cinta diamétrica, altura con hipsómetro Vertex IV, fitosanidad, daños en infraestructura y fotos con geolocalización vinculadas directamente a la base de datos PostgreSQL/PostGIS.',
    tools: ['ArcGIS Survey123', 'PostGIS', 'Hipsómetro Vertex', 'SIGARU Cloud'],
    icon: 'Trees'
  },
  {
    step: '05',
    title: 'Cooperación con SINAC y Gobiernos Locales',
    description: 'Articulación institucional con las Áreas de Conservación Arenal Tempisque (ACAT) y Guanacaste (ACG) del SINAC, así como con los departamentos de Gestión Ambiental de las municipalidades de Liberia, Cañas, Bagaces, Santa Cruz y Nicoya para que los mapas alimenten los Planes Reguladores Cantonales.',
    tools: ['SINAC - ACAT / ACG', 'Municipalidades Guanacaste', 'Corredores Biológicos', 'Planes Reguladores'],
    icon: 'ShieldCheck'
  }
];

export const DOWNLOADABLE_MAPS: DownloadableMap[] = [
  {
    id: 'map-liberia-canopy-2024',
    title: 'Atlas de Cobertura de Copa y Déficit Verde - Cantón de Liberia',
    category: 'Cobertura y Dosel',
    canton: 'Liberia',
    year: 2024,
    scale: '1:5,000',
    format: 'GeoPDF (300 DPI)',
    size: '48.6 MB',
    projection: 'CRTM05 (EPSG: 5367)',
    previewColor: '#15803d',
    description: 'Ortofotomosaico de alta resolución con delimitación poligonal del dosel arbóreo, zonificación por m² de área verde por habitante y comparativa contra el umbral de la OMS.',
    tags: ['Dosel', 'Liberia', 'OMS', 'NDVI', 'Alta Resolución']
  },
  {
    id: 'map-canas-electric-risk-2024',
    title: 'Mapa de Interferencia Árbol-Red Eléctrica y Riesgo Fitosanitario - Cañas',
    category: 'Riesgo y Red Eléctrica',
    canton: 'Cañas',
    year: 2024,
    scale: '1:2,500',
    format: 'GeoPDF (300 DPI)',
    size: '34.2 MB',
    projection: 'CRTM05 (EPSG: 5367)',
    previewColor: '#dc2626',
    description: 'Diagnóstico detallado de ramas en conflicto con líneas de 13.2 kV y 24.9 kV, puntos críticos de inclinación y árboles secos prioritarios para poda o sustitución.',
    tags: ['Red Eléctrica', 'Cañas', 'Peligro', 'Poda Preventiva']
  },
  {
    id: 'map-islas-calor-guanacaste',
    title: 'Cartografía de Islas de Calor Urbanas (LST) - Santa Cruz y Bagaces',
    category: 'Islas de Calor y Clima',
    canton: 'Santa Cruz / Bagaces',
    year: 2024,
    scale: '1:10,000',
    format: 'GeoTIFF Multiespectral',
    size: '62.4 MB',
    projection: 'CRTM05 (EPSG: 5367)',
    previewColor: '#ea580c',
    description: 'Ráster de temperatura radiativa superficial obtenido con Landsat 9 TIRS. Cuantifica el gradiente térmico de hasta +5 °C entre calles asfaltadas y áreas arboladas.',
    tags: ['LST', 'Térmico', 'Cambio Climático', 'Santa Cruz', 'Bagaces']
  },
  {
    id: 'map-nicoya-biodiversidad-2024',
    title: 'Corredores Biológicos Urbanos y Especies Clave - Nicoya Colonial',
    category: 'Biodiversidad Urbana',
    canton: 'Nicoya',
    year: 2024,
    scale: '1:5,000',
    format: 'GeoPDF (300 DPI)',
    size: '41.8 MB',
    projection: 'CRTM05 (EPSG: 5367)',
    previewColor: '#0284c7',
    description: 'Mapeo de árboles centenarios de Tempisque, Cenízaro y Guachipelín que conectan las microcuencas de Nicoya con la Zona Azul y reservas forestales del SINAC.',
    tags: ['Nicoya', 'Zona Azul', 'Tempisque', 'SINAC', 'Biodiversidad']
  },
  {
    id: 'map-sigaru-geopackage-opendata',
    title: 'Paquete de Datos Abiertos SIGARU Guanacaste (Capas Vectoriales Completas)',
    category: 'Paquete GIS OpenData',
    canton: 'Regional (5 Cantones)',
    year: 2024,
    scale: 'Multiescala (1:1,000 - 1:25,000)',
    format: 'Shapefile / GeoJSON ZIP',
    size: '115.0 MB',
    projection: 'CRTM05 (EPSG: 5367) y WGS84 (EPSG: 4326)',
    previewColor: '#47c73b',
    description: 'Archivos vectoriales con más de 5,500 árboles georreferenciados, polígonos de copas, cuadrantes urbanos y tabla de atributos fitosanitarios para QGIS, ArcGIS y Python.',
    tags: ['OpenData', 'Shapefile', 'GeoJSON', 'PostGIS', 'UTN Research']
  }
];
