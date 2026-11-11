export interface DistanciamientoMinimo {
  aceras: string;
  tuberias: string;
  cableadoAereo: string;
  edificaciones: string;
}

export interface GuiaPlantacion {
  tamanoHoyada: string;
  sustratoRecomendado: string;
  riegoInicial: string;
  podaRecomendacion: string;
}

export interface ClasificacionTaxonomica {
  reino: string;
  division: string;
  clase: string;
  orden: string;
  familia: string;
  genero: string;
  especie: string;
}

export interface EspecieArborea {
  id: string;
  nombreComun: string;
  otrosNombres: string[];
  nombreCientifico: string;
  sinonimos?: string[];
  taxonomia: ClasificacionTaxonomica;
  origen: 'Nativo' | 'Introducido / Naturalizado';
  porte: 'Pequeño (< 6m)' | 'Mediano (6-15m)' | 'Grande (> 15m)';
  alturaMaxima: string;
  diametroCopa: string;
  formaCopa: string;
  aptitudUrbana: 'Apto aceras angostas' | 'Bulevares y avenidas' | 'Solo parques y áreas abiertas';
  floracionEpoca: 'Época seca (verano)' | 'Época lluviosa' | 'Todo el año';
  floracionMeses: string;
  colorFlor: string;
  follaje: 'Caducifolio (pierde hojas)' | 'Perennifolio (siempre verde)' | 'Semicaducifolio';
  tipoRaiz: 'Profunda / Pivotante' | 'Superficial / Extendida' | 'Media no agresiva';
  requerimientoRiego: 'Bajo (Alta resistencia a sequía)' | 'Moderado' | 'Frecuente en establecimiento';
  requerimientoLuz: 'Pleno sol' | 'Semisombra / Pleno sol';
  tasaCrecimiento: 'Lento' | 'Medio' | 'Rápido';
  amenazaConservacion: 'Preocupación Menor' | 'Vulnerable' | 'En Peligro' | 'Protegido en Costa Rica';
  beneficiosEcosistemicos: string[];
  serviciosUrbanos: string[];
  faunaAsociada: string[];
  distanciamientoMinimo: DistanciamientoMinimo;
  guiaPlantacion: GuiaPlantacion;
  curiosidadesEtnobotanicas: string;
  imagenUrl: string;
  imagenCredito?: string;
}

export const ESPECIES_ARBOREAS: EspecieArborea[] = [
  {
    id: 'arbol-guanacaste',
    nombreComun: 'Árbol de Guanacaste',
    otrosNombres: ['Orejero', 'Parota', 'Carocaro'],
    nombreCientifico: 'Enterolobium cyclocarpum',
    sinonimos: ['Mimosa cyclocarpa'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Fabales',
      familia: 'Fabaceae',
      genero: 'Enterolobium',
      especie: 'E. cyclocarpum'
    },
    origen: 'Nativo',
    porte: 'Grande (> 15m)',
    alturaMaxima: '25 a 35 metros',
    diametroCopa: '30 a 50 metros (muy amplia, tipo sombrilla)',
    formaCopa: 'Aparasolada / Semiesférica amplia',
    aptitudUrbana: 'Solo parques y áreas abiertas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Enero a Abril',
    colorFlor: 'Blanco crema en pompones globosos',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Superficial / Extendida',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Rápido',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Árbol Nacional de Costa Rica (decreto ejecutivo de 1959)',
      'Fijador biológico de nitrógeno en el suelo por simbiosis radicular',
      'Gran sumidero y acumulador de biomasa de carbono atmosférico',
      'Refugio térmico crucial reduciendo hasta 5°C la temperatura ambiente bajo su dosel'
    ],
    serviciosUrbanos: [
      'Sombra bioclimática inigualable para parques centrales y campus',
      'Control de erosión en llanuras aluviales',
      'Valor identitario y paisajístico icónico guanacasteco'
    ],
    faunaAsociada: ['Monos aulladores (congos)', 'Lapas rojas', 'Garrobos', 'Abejas silvestres meliponas'],
    distanciamientoMinimo: {
      aceras: 'No apto para aceras urbanas (< 15 m de cualquier calzada)',
      tuberias: 'Mínimo 15 metros de tuberías primarias de agua o drenaje',
      cableadoAereo: 'No plantar bajo tendido eléctrico (mínimo 12 m de margen)',
      edificaciones: 'Mínimo 15 a 20 metros de cimientos y estructuras construidas'
    },
    guiaPlantacion: {
      tamanoHoyada: '80 x 80 x 80 cm, descompactando fondo',
      sustratoRecomendado: 'Tierra negra mezclada con compost al 30% y arena para drenaje rápido',
      riegoInicial: '2 veces por semana durante los primeros dos años secos; luego autosuficiente',
      podaRecomendacion: 'Poda formativa de fuste único los primeros 3 años; evitar cortes severos en ramas maduras'
    },
    curiosidadesEtnobotanicas: 'Sus frutos curvos asemejan orejas humanas (de ahí la etimología náhuatl "quauhnacaztli": árbol de orejas). En Guanacaste, los frutos secos se utilizaban tradicionalmente como sustituto de jabón debido a sus saponinas.',
    imagenUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Bosque seco tropical - Banco UTN'
  },
  {
    id: 'cortez-amarillo',
    nombreComun: 'Cortez Amarillo',
    otrosNombres: ['Guayacán Amarillo', 'Araguaney'],
    nombreCientifico: 'Handroanthus ochraceus',
    sinonimos: ['Tabebuia chrysantha', 'Tabebuia ochracea'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Lamiales',
      familia: 'Bignoniaceae',
      genero: 'Handroanthus',
      especie: 'H. ochraceus'
    },
    origen: 'Nativo',
    porte: 'Mediano (6-15m)',
    alturaMaxima: '10 a 18 metros',
    diametroCopa: '6 a 10 metros',
    formaCopa: 'Piramidal a redondeada',
    aptitudUrbana: 'Bulevares y avenidas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Febrero a Mayo (sincronizada masiva tras pequeñas lluvias)',
    colorFlor: 'Amarillo dorado vibrante',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Profunda / Pivotante',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Medio',
    amenazaConservacion: 'Protegido en Costa Rica',
    beneficiosEcosistemicos: [
      'Floración masiva que provee néctar crítico para enjambres de abejas nativas al final de la sequía',
      'Excelente resistencia a vientos alisios guanacastecos sin riesgo de desprendimiento',
      'Sistema radicular pivotante que respeta pavimentos y aceras'
    ],
    serviciosUrbanos: [
      'Atracción turística y embellecimiento paisajístico urbano inigualable',
      'Apto para camellones centrales y bulevares urbanos anchos',
      'Mínimo desecho de ramas secas'
    ],
    faunaAsociada: ['Colibríes', 'Abejas euglosinas y meliponinos', 'Mariposas diurnas', 'Pericos zapoyolitos'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 2.5 metros desde el bordillo',
      tuberias: 'Mínimo 3 metros de redes subterráneas',
      cableadoAereo: '4 metros de tolerancia; tolera podas de gálibo controladas',
      edificaciones: 'Mínimo 4 a 5 metros de fachadas'
    },
    guiaPlantacion: {
      tamanoHoyada: '60 x 60 x 60 cm',
      sustratoRecomendado: 'Suelo arcilloso-arenoso bien oxigenado con materia orgánica madura',
      riegoInicial: 'Riego semanal moderado durante el primer verano seco',
      podaRecomendacion: 'Poda de elevación de copa para permitir el paso peatonal y vehicular libre a 3 metros'
    },
    curiosidadesEtnobotanicas: 'Madera extremadamente densa e imputrescible, históricamente valorada en construcciones coloniales. Su floración suele durar entre 4 y 7 días, tapizando el suelo urbano de una alfombra dorada.',
    imagenUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Floración estacional Handroanthus'
  },
  {
    id: 'roble-sabana',
    nombreComun: 'Roble Sabana',
    otrosNombres: ['Guayacán Rosado', 'Apamate', 'Roble de San Juan'],
    nombreCientifico: 'Handroanthus roseus',
    sinonimos: ['Tabebuia rosea'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Lamiales',
      familia: 'Bignoniaceae',
      genero: 'Handroanthus',
      especie: 'H. roseus'
    },
    origen: 'Nativo',
    porte: 'Grande (> 15m)',
    alturaMaxima: '15 a 25 metros',
    diametroCopa: '8 a 14 metros',
    formaCopa: 'Estratificada / Globosa amplia',
    aptitudUrbana: 'Bulevares y avenidas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Enero a Abril',
    colorFlor: 'Rosado suave a lila y blanco en garganta',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Media no agresiva',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Rápido',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Espectacular atracción de fauna polinizadora en el periodo de mayor escasez de flores',
      'Madera elástica que soporta vendavales y ráfagas estacionales',
      'Gran capacidad de enfriamiento urbano y reducción de partículas suspendidas'
    ],
    serviciosUrbanos: [
      'Árbol ornamental por excelencia en bulevares costarricenses',
      'Sombra intermedia y floración que eleva la plusvalía barrial',
      'No genera resinas ni sustancias pegajosas perjudiciales para vehículos'
    ],
    faunaAsociada: ['Colibríes colirrufos', 'Orioles', 'Abejas solitarias', 'Yigüirros (ave nacional)'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 3 metros de ancho de franja verde',
      tuberias: 'Mínimo 4 metros de tuberías principales',
      cableadoAereo: 'Mínimo 5 metros; requiere plan de poda si se ubica bajo tendido',
      edificaciones: 'Mínimo 6 metros de muros estructurales'
    },
    guiaPlantacion: {
      tamanoHoyada: '70 x 70 x 70 cm con tutorado firme',
      sustratoRecomendado: 'Suelos franco-arcillosos o francos bien drenados',
      riegoInicial: 'Riego quincenal en estación seca durante los dos primeros años',
      podaRecomendacion: 'Poda de formación en ramas bajas antes de que alcancen 5 cm de grosor'
    },
    curiosidadesEtnobotanicas: 'Conocido como el "cerezo japonés de los trópicos" por su profusa floración rosada que cubre totalmente las ramas mientras el árbol carece de hojas.',
    imagenUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Roble Sabana en flor'
  },
  {
    id: 'guacimo',
    nombreComun: 'Guácimo',
    otrosNombres: ['Guácima', 'Caulote', 'Tapaculo'],
    nombreCientifico: 'Guazuma ulmifolia',
    sinonimos: ['Theobroma guazuma'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Malvales',
      familia: 'Malvaceae',
      genero: 'Guazuma',
      especie: 'G. ulmifolia'
    },
    origen: 'Nativo',
    porte: 'Mediano (6-15m)',
    alturaMaxima: '8 a 15 metros',
    diametroCopa: '6 a 12 metros',
    formaCopa: 'Irregular a globosa densa',
    aptitudUrbana: 'Apto aceras angostas',
    floracionEpoca: 'Época lluviosa',
    floracionMeses: 'Mayo a Octubre',
    colorFlor: 'Pequeñas amarillo-verdosas o blanquecinas muy fragantes',
    follaje: 'Semicaducifolio',
    tipoRaiz: 'Media no agresiva',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Rápido',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Extraordinaria resistencia a la sequía prolongada y suelos degradados o compactados',
      'Frutos aromáticos tipo cápsula verrugosa ricos en azúcares consumidos por aves y mamíferos',
      'Gran densidad foliar que actúa como barrera acústica y pantalla contra polvo'
    ],
    serviciosUrbanos: [
      'Apto para aceras medianas y parques barriales gracias a sus raíces poco agresivas',
      'Bajo costo de mantenimiento y casi nula necesidad de fertilización artificial',
      'Regulación microclimática eficiente en islas de calor pavimentadas'
    ],
    faunaAsociada: ['Murciélagos frugívoros', 'Pizotes', 'Ardillas chiras', 'Chachalacas'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 1.8 metros de acera libre',
      tuberias: 'Mínimo 2.5 metros',
      cableadoAereo: '3 metros; soporta podas de direccionamiento',
      edificaciones: 'Mínimo 4 metros de infraestructura'
    },
    guiaPlantacion: {
      tamanoHoyada: '50 x 50 x 50 cm',
      sustratoRecomendado: 'Tolera suelos arcillosos pesados y alcalinos típicos de Guanacaste',
      riegoInicial: 'Riego semanal el primer semestre, luego no requiere irrigación complementaria',
      podaRecomendacion: 'Eliminación de chupones basales para consolidar un único fuste cilíndrico'
    },
    curiosidadesEtnobotanicas: 'La corteza macerada produce una baba mucilaginosa rica en taninos usada ancestralmente para clarificar el jugo de caña en trapiches y en medicina tradicional como emoliente.',
    imagenUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Especie nativa bosque seco'
  },
  {
    id: 'cenizaro',
    nombreComun: 'Cenízaro',
    otrosNombres: ['Árbol de la lluvia', 'Samán', 'Campano'],
    nombreCientifico: 'Samanea saman',
    sinonimos: ['Albizia saman', 'Pithecellobium saman'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Fabales',
      familia: 'Fabaceae',
      genero: 'Samanea',
      especie: 'S. saman'
    },
    origen: 'Nativo',
    porte: 'Grande (> 15m)',
    alturaMaxima: '20 a 30 metros',
    diametroCopa: '35 a 60 metros',
    formaCopa: 'Umbeliforme gigante (forma de domo)',
    aptitudUrbana: 'Solo parques y áreas abiertas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Febrero a Mayo',
    colorFlor: 'Rosado con blanco en cabezuelas plumosas llamativas',
    follaje: 'Semicaducifolio',
    tipoRaiz: 'Superficial / Extendida',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Medio',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Copa monumental capaz de cobijar hectáreas enteras, albergando epífitas y orquídeas nativas',
      'Hojas que se pliegan de noche o en días nublados ("árbol de la lluvia"), permitiendo el paso de la lluvia al césped inferior',
      'Fijación masiva de nitrógeno atmosférico'
    ],
    serviciosUrbanos: [
      'Insuperable para plazas cívicas, campos universitarios y parques recreativos amplios',
      'Refugio biológico de gran escala en matrices urbanizadas',
      'Mitigación drástica del albedo urbano'
    ],
    faunaAsociada: ['Búhos rayados', 'Iguanas verdes', 'Abejas nativas', 'Trogones'],
    distanciamientoMinimo: {
      aceras: 'No plantar en aceras ni calzadas (mínimo 18 m de distancia)',
      tuberias: 'Mínimo 15 metros de cualquier instalación subterránea',
      cableadoAereo: 'No compatible con cableado eléctrico aéreo',
      edificaciones: 'Mínimo 20 metros de estructuras sólidas'
    },
    guiaPlantacion: {
      tamanoHoyada: '90 x 90 x 90 cm',
      sustratoRecomendado: 'Suelos profundos, fértiles y con buen drenaje',
      riegoInicial: 'Riego profundo cada 10 días durante el primer verano seco',
      podaRecomendacion: 'Mantenimiento preventivo de ramas horizontales pesadas para prevenir desgarros'
    },
    curiosidadesEtnobotanicas: 'Sus vainas negras y carnosas contienen una pulpa dulce comestible para el ganado y la fauna silvestre. En la pampa guanacasteca es venerado como el árbol sombra tradicional de sabaneros y animales.',
    imagenUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Samanea saman dosel'
  },
  {
    id: 'malinche',
    nombreComun: 'Malinche',
    otrosNombres: ['Flamboyán', 'Árbol del fuego', 'Chivato'],
    nombreCientifico: 'Delonix regia',
    sinonimos: ['Poinciana regia'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Fabales',
      familia: 'Fabaceae',
      genero: 'Delonix',
      especie: 'D. regia'
    },
    origen: 'Introducido / Naturalizado',
    porte: 'Mediano (6-15m)',
    alturaMaxima: '8 a 15 metros',
    diametroCopa: '10 a 16 metros',
    formaCopa: 'Parasol extendido y aplanado',
    aptitudUrbana: 'Solo parques y áreas abiertas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Marzo a Julio',
    colorFlor: 'Rojo escarlata intenso con pétalo blanco-amarillento matizado',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Superficial / Extendida',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Rápido',
    amenazaConservacion: 'Vulnerable',
    beneficiosEcosistemicos: [
      'Floración de altísima espectacularidad visual que dinamiza el paisaje urbano seco',
      'Copa ancha que genera densa sombra horizontal durante el invierno',
      'Aunque es originario de Madagascar, se encuentra en peligro crítico en su hábitat original y está protegido globalmente'
    ],
    serviciosUrbanos: [
      'Ideal para rotondas aisladas, parques infantiles y zonas verdes amplias',
      'Precaución: raíces contrafuertes vigorosas que levantan cordones de caño y aceras si se planta confinado'
    ],
    faunaAsociada: ['Colibríes caneleros', 'Abejas melíferas', 'Mariposas papilionidas'],
    distanciamientoMinimo: {
      aceras: 'No plantar en aceras angostas (mínimo 6 metros del borde de pavimento)',
      tuberias: 'Mínimo 8 metros de tuberías y ductos',
      cableadoAereo: 'Mínimo 6 metros por debajo o a los lados',
      edificaciones: 'Mínimo 8 metros de paredes y muros perimetrales'
    },
    guiaPlantacion: {
      tamanoHoyada: '60 x 60 x 60 cm',
      sustratoRecomendado: 'Suelos francos o arenosos bien drenados; tolera cierta salinidad costera',
      riegoInicial: 'Riego moderado el primer año; luego tolera meses completos sin agua',
      podaRecomendacion: 'Podas de despeje en ramas quebradizas tras temporales de viento'
    },
    curiosidadesEtnobotanicas: 'Introducido en Costa Rica en el siglo XIX, se ha integrado tan profundamente a la cultura guanacasteca que muchas personas lo consideran nativo. Sus semillas duras se usan en artesanías locales y maracas.',
    imagenUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Floración roja Malinche'
  },
  {
    id: 'almendro-rio',
    nombreComun: 'Almendro de Río',
    otrosNombres: ['Cabbage bark', 'Carne Asada', 'Moco'],
    nombreCientifico: 'Andira inermis',
    sinonimos: ['Geoffroea inermis'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Fabales',
      familia: 'Fabaceae',
      genero: 'Andira',
      especie: 'A. inermis'
    },
    origen: 'Nativo',
    porte: 'Grande (> 15m)',
    alturaMaxima: '15 a 25 metros',
    diametroCopa: '10 a 16 metros',
    formaCopa: 'Densa, columnar a redondeada',
    aptitudUrbana: 'Bulevares y avenidas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Enero a Mayo',
    colorFlor: 'Morado púrpura a rosado oscuro en panículas erectas',
    follaje: 'Perennifolio (siempre verde)',
    tipoRaiz: 'Profunda / Pivotante',
    requerimientoRiego: 'Moderado',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Medio',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Pilar fundamental en la restauración de riberas fluviales urbanas y microcuencas',
      'Follaje denso perenne que mitiga el polvo en suspensión todo el año',
      'Fijador simbiótico de nitrógeno en el perfil profundo del suelo'
    ],
    serviciosUrbanos: [
      'Ideal para cinturones verdes riparios y parques lineales junto a ríos o quebradas urbanas',
      'Excelente pantalla acústica y cortavientos',
      'Flores moradas altamente decorativas'
    ],
    faunaAsociada: ['Murciélagos nectarívoros (Artibeus)', 'Pájaros carpinteros', 'Abejas nativas sin aguijón'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 3.5 metros de distancia a la calzada',
      tuberias: 'Mínimo 4 metros de redes',
      cableadoAereo: 'Mínimo 5 metros de líneas de distribución',
      edificaciones: 'Mínimo 6 metros de muros habitacionales'
    },
    guiaPlantacion: {
      tamanoHoyada: '70 x 70 x 70 cm',
      sustratoRecomendado: 'Prefiere suelos aluviales húmedos pero tolera sequías periódicas',
      riegoInicial: 'Riego semanal constante en los primeros dos veranos',
      podaRecomendacion: 'Podas de limpieza sanitaria eliminando ramas bajeras secas'
    },
    curiosidadesEtnobotanicas: 'Su madera es apreciada por su grano y color rojizo. Las semillas fueron usadas tradicionalmente en medicina indígena como vermífugo bajo estricta dosificación.',
    imagenUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Corredor ripario Guanacaste'
  },
  {
    id: 'carao',
    nombreComun: 'Carao',
    otrosNombres: ['Cañafístula rosada', 'Carámaro'],
    nombreCientifico: 'Cassia grandis',
    sinonimos: ['Bactyrilobium grande'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Fabales',
      familia: 'Fabaceae',
      genero: 'Cassia',
      especie: 'C. grandis'
    },
    origen: 'Nativo',
    porte: 'Grande (> 15m)',
    alturaMaxima: '18 a 30 metros',
    diametroCopa: '12 a 20 metros',
    formaCopa: 'Globosa abierta y elegante',
    aptitudUrbana: 'Solo parques y áreas abiertas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Febrero a Abril',
    colorFlor: 'Rosado coral a salmón con tintes anaranjados',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Profunda / Pivotante',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Medio',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Floración temprana en racimos colgantes que transforma el dosel en una nube coralina',
      'Vainas leñosas largas ricas en miel espesa con hierro consumida por la fauna silvestre',
      'Gran resistencia a suelos pedregosos y condiciones secas extremas'
    ],
    serviciosUrbanos: [
      'Extraordinario valor estético en parques recreativos y áreas comunales amplias',
      'Sombra amplia y filtrada que permite el crecimiento de tapices vegetales bajo su copa'
    ],
    faunaAsociada: ['Loras de nuca amarilla', 'Ardillas', 'Avispas solitarias', 'Mariposas nocturnas esfíngidas'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 5 metros; vainas pesadas pueden caer en temporada seca',
      tuberias: 'Mínimo 5 metros de conducciones',
      cableadoAereo: 'Mínimo 6 metros del tendido superior',
      edificaciones: 'Mínimo 8 metros de techos y tejados'
    },
    guiaPlantacion: {
      tamanoHoyada: '70 x 70 x 70 cm',
      sustratoRecomendado: 'Suelos francos a pedregosos con excelente drenaje',
      riegoInicial: 'Riego espaciado cada 10 días el primer año seco',
      podaRecomendacion: 'Poda de despeje para evitar acumulación de vainas viejas en áreas de tránsito'
    },
    curiosidadesEtnobotanicas: 'La pulpa de su vaina es la base del tradicional "refresco de carao con leche", famoso en Guanacaste como reconstituyente natural y remedio popular contra la anemia por su altísimo contenido mineral.',
    imagenUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Cassia grandis floración coral'
  },
  {
    id: 'caoba-pacifico',
    nombreComun: 'Caoba del Pacífico',
    otrosNombres: ['Caobilla', 'Venadillo'],
    nombreCientifico: 'Swietenia humilis',
    sinonimos: ['Swietenia bijuga'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Sapindales',
      familia: 'Meliaceae',
      genero: 'Swietenia',
      especie: 'S. humilis'
    },
    origen: 'Nativo',
    porte: 'Mediano (6-15m)',
    alturaMaxima: '8 a 15 metros',
    diametroCopa: '6 a 10 metros',
    formaCopa: 'Cónica a globosa compacta',
    aptitudUrbana: 'Bulevares y avenidas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Febrero a Mayo',
    colorFlor: 'Blanquecino verdosa, pequeña y perfumada',
    follaje: 'Semicaducifolio',
    tipoRaiz: 'Profunda / Pivotante',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Lento',
    amenazaConservacion: 'En Peligro',
    beneficiosEcosistemicos: [
      'Especie nativa en peligro de extinción incluida en el Apéndice II de CITES',
      'Su incorporación en el arbolado urbano funciona como banco vivo de conservación ex-situ de germoplasma genético',
      'Madera noble de máxima calidad resistente a plagas nativas'
    ],
    serviciosUrbanos: [
      'Apta para camellones anchos y bulevares urbanos con copa proporcionada',
      'Sistema de raíces ordenado y profundo que no fractura aceras',
      'Excelente valor didáctico y educativo ambiental para la ciudadanía'
    ],
    faunaAsociada: ['Aves insectívoras', 'Loras frentiblancas', 'Abejas solitarias'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 2.5 metros desde el cordón de caño',
      tuberias: 'Mínimo 3 metros',
      cableadoAereo: 'Mínimo 4 metros de margen',
      edificaciones: 'Mínimo 4.5 metros de fachadas'
    },
    guiaPlantacion: {
      tamanoHoyada: '60 x 60 x 60 cm con tierra desinfectada',
      sustratoRecomendado: 'Suelos con textura media, buen drenaje y materia orgánica',
      riegoInicial: 'Riego semanal meticuloso durante los primeros tres años para afianzar fuste recto',
      podaRecomendacion: 'Control del barrenador del brote apical (Hypsipyla grandella) y poda preventiva de guías bifurcadas'
    },
    curiosidadesEtnobotanicas: 'Las semillas aladas poseen flavonoides y limonoides amargos investigados por sus propiedades hipoglucemiantes en bioquímica moderna.',
    imagenUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Especie forestal protegida'
  },
  {
    id: 'poro-gigante',
    nombreComun: 'Poró Gigante',
    otrosNombres: ['Poró extranjero', 'Búcaro', 'Cámbulo'],
    nombreCientifico: 'Erythrina poeppigiana',
    sinonimos: ['Micropteryx poeppigiana'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Fabales',
      familia: 'Fabaceae',
      genero: 'Erythrina',
      especie: 'E. poeppigiana'
    },
    origen: 'Nativo',
    porte: 'Grande (> 15m)',
    alturaMaxima: '18 a 30 metros',
    diametroCopa: '12 a 18 metros',
    formaCopa: 'Globosa extendida con ramificación abierta',
    aptitudUrbana: 'Solo parques y áreas abiertas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Enero a Marzo',
    colorFlor: 'Anaranjado brillante a escarlata en racimos terminales erguidos',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Media no agresiva',
    requerimientoRiego: 'Moderado',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Rápido',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Inigualable fijación simbiótica de nitrógeno que enriquece sustancialmente el perfil de suelo',
      'Aporte masivo de hojarasca y biomasa biodegradable que regenera suelos urbanos degradados',
      'Flores colmadas de néctar vitales para aves migratorias y polinizadores'
    ],
    serviciosUrbanos: [
      'Recomendado para campus universitarios, jardines botánicos y parques metropolitanos',
      'Crecimiento veloz que produce cobertura arbórea y sombra en pocos años',
      'No plantar cerca de tendido eléctrico debido a que sus ramas jóvenes pueden quebrarse con vientos extremos'
    ],
    faunaAsociada: ['Colibríes pico de hoz', 'Tangaras azulejos', 'Reinita amarilla migratoria', 'Abejorros bombus'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 6 metros de calzadas peatonales o vehiculares',
      tuberias: 'Mínimo 6 metros de drenajes',
      cableadoAereo: 'Mínimo 7 metros de líneas eléctricas',
      edificaciones: 'Mínimo 10 metros de edificaciones'
    },
    guiaPlantacion: {
      tamanoHoyada: '70 x 70 x 70 cm',
      sustratoRecomendado: 'Tolera amplia variedad de suelos pero rinde mejor en suelos fértiles con humedad estacional',
      riegoInicial: 'Riego semanal moderado durante el primer verano seco',
      podaRecomendacion: 'Podas de aclareo de ramas gruesas para reducir el efecto vela ante ráfagas de viento'
    },
    curiosidadesEtnobotanicas: 'Históricamente plantado como árbol de sombra para los cafetales y cacaotales de Costa Rica. Sus flores carnosas son consumidas en guisos tradicionales por su alto contenido de proteína vegetal.',
    imagenUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Erythrina en floración'
  },
  {
    id: 'flor-blanca',
    nombreComun: 'Flor Blanca / Sacuanjoche',
    otrosNombres: ['Frangipani', 'Cacalosúchil'],
    nombreCientifico: 'Plumeria rubra',
    sinonimos: ['Plumeria acutifolia'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Gentianales',
      familia: 'Apocynaceae',
      genero: 'Plumeria',
      especie: 'P. rubra'
    },
    origen: 'Nativo',
    porte: 'Pequeño (< 6m)',
    alturaMaxima: '4 a 7 metros',
    diametroCopa: '3 a 5 metros',
    formaCopa: 'Candelabro / Redondeada compacta',
    aptitudUrbana: 'Apto aceras angostas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Diciembre a Mayo',
    colorFlor: 'Blanca con centro amarillo intenso, excepcionalmente perfumada',
    follaje: 'Caducifolio (pierde hojas)',
    tipoRaiz: 'Media no agresiva',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Lento',
    amenazaConservacion: 'Preocupación Menor',
    beneficiosEcosistemicos: [
      'Atracción de polinizadores nocturnos (mariposas esfíngidas de lengua larga)',
      'Máxima tolerancia a estrés hídrico extremo y calor radiante de aceras de asfalto',
      'Nula interferencia con redes aéreas ni tuberías'
    ],
    serviciosUrbanos: [
      'Árbol estrella para aceras peatonales angostas (1.2 a 2.0 metros)',
      'No levanta aceras ni fractura bordillos',
      'No interfiere con cables telefónicos ni de media tensión'
    ],
    faunaAsociada: ['Esfíngidos (Sphingidae)', 'Abejas solitarias', 'Mariposas de la pampa'],
    distanciamientoMinimo: {
      aceras: 'Apto para alcorques de 1 metro de ancho',
      tuberias: 'Mínimo 1.5 metros',
      cableadoAereo: 'No interfiere con cableado aéreo estándar (altura < 6m)',
      edificaciones: 'Mínimo 2 metros de paredes'
    },
    guiaPlantacion: {
      tamanoHoyada: '50 x 50 x 50 cm',
      sustratoRecomendado: 'Suelo muy bien drenado, con mezcla arenosa; no tolera encharcamientos',
      riegoInicial: 'Riego quincenal moderado en sequía el primer año; luego suspender riego en época seca',
      podaRecomendacion: 'Mínima necesidad de poda; solo desinfección en cortes para evitar pudrición por látex'
    },
    curiosidadesEtnobotanicas: 'Flor sagrada de las culturas mesoamericanas prehispánicas utilizada en guirnaldas de bienvenida y rituales ceremoniales debido a su exquisita fragancia que se intensifica al anochecer.',
    imagenUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Plumeria rubra floración'
  },
  {
    id: 'guayacan-real',
    nombreComun: 'Guayacán Real',
    otrosNombres: ['Palo Santo', 'Guayacán de la costa'],
    nombreCientifico: 'Guaiacum sanctum',
    sinonimos: ['Guaiacum guatemalense'],
    taxonomia: {
      reino: 'Plantae',
      division: 'Magnoliophyta',
      clase: 'Magnoliopsida',
      orden: 'Zygophyllales',
      familia: 'Zygophyllaceae',
      genero: 'Guaiacum',
      especie: 'G. sanctum'
    },
    origen: 'Nativo',
    porte: 'Mediano (6-15m)',
    alturaMaxima: '6 a 12 metros',
    diametroCopa: '5 a 8 metros',
    formaCopa: 'Globosa densa y simétrica',
    aptitudUrbana: 'Apto aceras angostas',
    floracionEpoca: 'Época seca (verano)',
    floracionMeses: 'Febrero a Abril',
    colorFlor: 'Azul violáceo intenso a celeste que se aclara con el tiempo',
    follaje: 'Perennifolio (siempre verde)',
    tipoRaiz: 'Profunda / Pivotante',
    requerimientoRiego: 'Bajo (Alta resistencia a sequía)',
    requerimientoLuz: 'Pleno sol',
    tasaCrecimiento: 'Lento',
    amenazaConservacion: 'En Peligro',
    beneficiosEcosistemicos: [
      'Especie relíctica de altísimo valor biológico en Peligro de Extinción (CITES Apéndice II)',
      'Excelente retención de humedad y microclima bajo su copa verde todo el año',
      'Flores azules poco comunes en el trópico seco de altísimo valor nectarífero'
    ],
    serviciosUrbanos: [
      'Idóneo para aceras urbanas medianas y bulevares cívicos por su porte controlado y raíces profundas',
      'No genera riesgos mecánicos de caída de ramas',
      'Aporte patrimonial educativo incalculable'
    ],
    faunaAsociada: ['Abejas meliponas', 'Mariposas endémicas del bosque seco', 'Aves semilleras'],
    distanciamientoMinimo: {
      aceras: 'Mínimo 1.8 metros de acera libre',
      tuberias: 'Mínimo 2.5 metros',
      cableadoAereo: 'Mínimo 3 metros; raramente sobrepasa líneas altas',
      edificaciones: 'Mínimo 3 metros de cimientos'
    },
    guiaPlantacion: {
      tamanoHoyada: '60 x 60 x 60 cm',
      sustratoRecomendado: 'Suelos pedregosos o calizos bien drenados típicos de la bajura guanacasteca',
      riegoInicial: 'Riego quincenal moderado en primeros 2 años',
      podaRecomendacion: 'Prácticamente no requiere poda por su crecimiento simétrico natural'
    },
    curiosidadesEtnobotanicas: 'Su madera es una de las más pesadas y duras del mundo (densidad mayor a 1.2 g/cm³; no flota en agua). Fue explotado comercialmente desde la colonia para fabricar chumaceras y piezas de barcos por su auto-lubricación natural por resina de guayacol.',
    imagenUrl: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80',
    imagenCredito: 'Guaiacum sanctum floración azul'
  }
];

export interface EstadisticasCatalogo {
  totalEspecies: number;
  nativas: number;
  introducidas: number;
  aptasAceras: number;
  enPeligroOProtegidas: number;
}

export const getEstadisticasCatalogo = (): EstadisticasCatalogo => {
  return {
    totalEspecies: ESPECIES_ARBOREAS.length,
    nativas: ESPECIES_ARBOREAS.filter(e => e.origen === 'Nativo').length,
    introducidas: ESPECIES_ARBOREAS.filter(e => e.origen.includes('Introducido')).length,
    aptasAceras: ESPECIES_ARBOREAS.filter(e => e.aptitudUrbana === 'Apto aceras angostas').length,
    enPeligroOProtegidas: ESPECIES_ARBOREAS.filter(e => e.amenazaConservacion === 'En Peligro' || e.amenazaConservacion === 'Protegido en Costa Rica').length
  };
};

export const PRINCIPIOS_ARBORICULTURA = [
  {
    titulo: 'El Árbol Correcto en el Sitio Correcto',
    descripcion: 'Seleccionar la especie evaluando el espacio disponible en madurez: altura, extensión de copa y sistema radicular antes de plantar.',
    icono: 'tree'
  },
  {
    titulo: 'Convivencia con Infraestructura Gris',
    descripcion: 'Respetar los distanciamientos mínimos a tuberías de acueductos, tendido eléctrico y fachadas para evitar conflictos y mutilaciones por poda.',
    icono: 'shield'
  },
  {
    titulo: 'Biodiversidad Urbana y Resiliencia',
    descripcion: 'Fomentar la mezcla de especies nativas del bosque seco tropical guanacasteco para mitigar plagas y resistir sequías prolongadas.',
    icono: 'leaf'
  },
  {
    titulo: 'Servicios Ecosistémicos y Bioclimáticos',
    descripcion: 'Maximizar la sombra para peatones, la captura de carbono y la provisión de hábitat y alimento para polinizadores y fauna local.',
    icono: 'sun'
  }
];

export const GLOSARIO_BOTANICO = [
  {
    termino: 'Caducifolio',
    definicion: 'Árbol que pierde la totalidad de su follaje durante una época del año (típicamente durante la estación seca en Guanacaste para conservar agua).'
  },
  {
    termino: 'Perennifolio',
    definicion: 'Especie que mantiene sus hojas verdes durante todo el año mediante renovación gradual y continua.'
  },
  {
    termino: 'Raíz Pivotante',
    definicion: 'Sistema radicular con un eje central profundo que se ancla verticalmente hacia capas freáticas, minimizando daños en aceras y tuberías superficiales.'
  },
  {
    termino: 'Gálibo Urbano',
    definicion: 'Altura libre mínima necesaria bajo la copa de un árbol para permitir el tránsito seguro de peatones (2.5 m) o vehículos pesados (4.5 m).'
  },
  {
    termino: 'Alcorque',
    definicion: 'Espacio o pozo sin pavimentar alrededor del tronco de un árbol en una acera o plaza que permite la infiltración de agua y oxígeno a las raíces.'
  },
  {
    termino: 'Fijación de Nitrógeno',
    definicion: 'Proceso biológico donde bacterias simbióticas (Rhizobium) en las raíces de las leguminosas convierten el nitrógeno atmosférico en abono natural para el suelo.'
  }
];
