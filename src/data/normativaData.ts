export interface NormativaItem {
  id: string;
  titulo: string;
  categoria: 'Leyes Nacionales' | 'Estándares ISA' | 'Normativa Municipal' | 'Procedimientos y Trámites';
  numero: string;
  anoVigencia: string;
  entidadEmisora: string;
  resumenEjecutivo: string;
  explicacionCiudadana: string;
  articulosClave: {
    articulo: string;
    titulo: string;
    contenido: string;
    aplicacionPractica: string;
  }[];
  etiquetas: string[];
  nivelObligatoriedad: 'Obligatorio por Ley' | 'Estándar Técnico Internacional' | 'Regulación Cantonal' | 'Guía de Procedimiento';
  enlaceOficial: string;
  fuenteNombre: string;
  impactoGuanacaste: string;
}

export interface RutaAtencion {
  id: string;
  titulo: string;
  icono: string;
  descripcionCorta: string;
  entidadResponsable: string;
  contactoEmergencia: string;
  plazoRespuesta: string;
  pasos: {
    numero: number;
    titulo: string;
    detalle: string;
    requisito?: string;
  }[];
  advertenciaImportante: string;
  baseLegal: string;
}

export interface FaqItem {
  id: string;
  pregunta: string;
  respuestaCorta: string;
  respuestaDetallada: string;
  fundamentoLegal: string;
  categoria: 'Permisos y Trámites' | 'Sanciones y Multas' | 'Técnica de Poda' | 'Responsabilidad Civil';
}

export interface TraqMatrixLevel {
  probabilidadFalla: 'Improbable' | 'Posible' | 'Probable' | 'Inminente';
  impactoBlanco: 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto';
  consecuencia: 'Insignificante' | 'Menor' | 'Significativa' | 'Severa';
}

export const NORMATIVAS_DATA: NormativaItem[] = [
  {
    id: 'ley-forestal-7575',
    titulo: 'Ley Forestal de Costa Rica',
    categoria: 'Leyes Nacionales',
    numero: 'Ley N° 7575',
    anoVigencia: '1996 (vigente con reformas)',
    entidadEmisora: 'Asamblea Legislativa de la República de Costa Rica',
    resumenEjecutivo: 'Regula la conservación, protección y administración de los recursos forestales del país, determinando las funciones del Estado a través del MINAE/SINAC y tipificando sanciones penales por tala ilegal y daño al patrimonio natural.',
    explicacionCiudadana: 'Es la máxima ley en materia de árboles en Costa Rica. Establece que ningún árbol en áreas de protección (márgenes de ríos o nacientes) puede ser talado bajo ninguna circunstancia sin autorización expresa, y define las sanciones de cárcel y multas para quien corte árboles sin los debidos permisos.',
    articulosClave: [
      {
        articulo: 'Artículo 1',
        titulo: 'Función esencial del recurso forestal',
        contenido: 'Establece como función esencial del Estado velar por la conservación, protección y administración de los bosques naturales y por la producción, aprovechamiento, industrialización y fomento de los recursos forestales del país de acuerdo con el principio de uso adecuado de los recursos naturales renovables.',
        aplicacionPractica: 'Reconoce que los árboles urbanos y rurales prestan servicios ecosistémicos indispensables (oxígeno, sombra, mitigación térmica) y deben ser salvaguardados.'
      },
      {
        articulo: 'Artículo 2 y 3',
        titulo: 'Competencias del MINAE y SINAC',
        contenido: 'Otorga al Ministerio de Ambiente y Energía (MINAE), a través del Sistema Nacional de Áreas de Conservación (SINAC), la potestad exclusiva sobre el patrimonio natural del Estado y la rectoría técnica sobre el aprovechamiento maderable.',
        aplicacionPractica: 'Delimita cuándo se debe acudir al SINAC (especies vedadas, terrenos de aptitud forestal, áreas de protección) y cuándo a la Municipalidad (áreas urbanas consolidadas y aceras públicas).'
      },
      {
        articulo: 'Artículo 33 y 34',
        titulo: 'Áreas de protección de nacientes y riberas',
        contenido: 'Declara áreas de protección inalienables: franja de 100 metros alrededor de nacientes permanentes, 10 o 50 metros en riberas de ríos y quebradas según topografía. Se prohíbe absolutamente la tala en estas fajas.',
        aplicacionPractica: 'Si un árbol está dentro del retiro de protección de un río o quebrada en cualquier cantón de Guanacaste, queda terminantemente prohibida su corta sin permiso excepcional emitido por SINAC.'
      },
      {
        articulo: 'Artículo 58',
        titulo: 'Sanciones penales por tala no autorizada',
        contenido: 'Se impondrá prisión de tres meses a tres años a quien invada un área de conservación o corte árboles en áreas de protección o terrenos del patrimonio natural del Estado sin autorización legal.',
        aplicacionPractica: 'La tala sin permiso no es una simple falta administrativa: puede constituir delito penal castigado con pena privativa de libertad y decomiso de herramientas o vehículos.'
      }
    ],
    etiquetas: ['Áreas Protegidas', 'SINAC-MINAE', 'Sanciones Penales', 'Ríos y Nacientes', 'Conservación'],
    nivelObligatoriedad: 'Obligatorio por Ley',
    enlaceOficial: 'http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=41661',
    fuenteNombre: 'Sistema Costarricense de Información Jurídica (SCIJ) / PGR',
    impactoGuanacaste: 'En Guanacaste protege corredores de bosque seco tropical riparios que atraviesan centros urbanos como Liberia, Nicoya, Cañas y Santa Cruz, previniendo la deforestación de cauces fluviales vitales durante la época seca.'
  },
  {
    id: 'ley-organica-ambiente-7554',
    titulo: 'Ley Orgánica del Ambiente',
    categoria: 'Leyes Nacionales',
    numero: 'Ley N° 7554',
    anoVigencia: '1995 (vigente)',
    entidadEmisora: 'Asamblea Legislativa de Costa Rica',
    resumenEjecutivo: 'Establece los principios rectores del derecho ambiental costarricense: principio precautorio, principio preventivo, tutela del paisaje y la obligación del Estado y las municipalidades de garantizar un ambiente sano y ecológicamente equilibrado.',
    explicacionCiudadana: 'Garantiza que cualquier decisión sobre el arbolado urbano debe anteponer la protección de la vida y el equilibrio ecológico. Si existe duda sobre si talar un árbol generará un daño ambiental irreversible, debe prevalecer la conservación (in dubio pro natura).',
    articulosClave: [
      {
        articulo: 'Artículo 2',
        titulo: 'Principios rectores y criterio preventivo',
        contenido: 'El ambiente es patrimonio común de todos los habitantes. El criterio de prevención prevalecerá sobre cualquier otro en la gestión ambiental. La ausencia de certeza científica absoluta no podrá alegarse como razón para postergar medidas eficaces.',
        aplicacionPractica: 'Fundamenta la obligatoriedad de realizar evaluaciones técnicas de riesgo (como TRAQ) antes de talar o mutilar árboles sanos de manera preventiva.'
      },
      {
        articulo: 'Artículo 37 y 38',
        titulo: 'Protección del paisaje y patrimonio escénico',
        contenido: 'El paisaje es un bien común protegido. Toda obra o alteración debe armonizar con el paisaje natural y urbano, evitando la degradación estética y ambiental.',
        aplicacionPractica: 'Los árboles centenarios de parques y alamedas cantonales forman parte del paisaje protegido; su sustitución o remoción debe justificarse técnicamente.'
      },
      {
        articulo: 'Artículo 59 y 60',
        titulo: 'Ordenamiento territorial y zonas verdes',
        contenido: 'Los planes reguladores y el ordenamiento territorial deben reservar obligatoriamente áreas verdes y espacios arborizados proporcionales a la densidad poblacional.',
        aplicacionPractica: 'Obliga a las municipalidades a destinar y proteger zonas verdes públicas con coberturas vegetales idóneas para sombra y confort bioclimático.'
      }
    ],
    etiquetas: ['Principio Precautorio', 'Paisaje Urbano', 'Equilibrio Ecológico', 'Ordenamiento Territorial'],
    nivelObligatoriedad: 'Obligatorio por Ley',
    enlaceOficial: 'http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=24952',
    fuenteNombre: 'SCIJ - Procuraduría General de la República',
    impactoGuanacaste: 'Crucial para combatir las islas de calor urbano en ciudades guanacastecas donde las temperaturas diurnas superan frecuentemente los 38°C.'
  },
  {
    id: 'codigo-municipal-7794',
    titulo: 'Código Municipal de Costa Rica',
    categoria: 'Normativa Municipal',
    numero: 'Ley N° 7794',
    anoVigencia: '1998 (con reformas)',
    entidadEmisora: 'Asamblea Legislativa de Costa Rica',
    resumenEjecutivo: 'Determina las facultades de los gobiernos locales sobre el ordenamiento urbano, mantenimiento de vías públicas, parques, aceras comunales y la prestación del servicio de mantenimiento de zonas verdes y arbolado.',
    explicacionCiudadana: 'Otorga a las Municipalidades cantonales (como Liberia, Nicoya, Bagaces, Cañas, etc.) la responsabilidad directa y legal de cuidar, podar y dar mantenimiento a los árboles ubicados en aceras, vías cantonales y parques públicos, así como de cobrar la tasa de servicios correspondiente.',
    articulosClave: [
      {
        articulo: 'Artículo 4',
        titulo: 'Competencias municipales en ornato y saneamiento',
        contenido: 'La municipalidad posee la competencia para dictar los reglamentos autónomos de organización y de servicio, administrar los servicios públicos locales y velar por el ornato, parques y zonas verdes.',
        aplicacionPractica: 'Faculta a los Concejos Municipales para emitir reglamentos de arbolado urbano y crear cuadrillas especializadas de arboristas municipales.'
      },
      {
        articulo: 'Artículo 74',
        titulo: 'Tasas y precios por mantenimiento de parques y zonas verdes',
        contenido: 'Por los servicios de conservación y ornato de parques, vías públicas y áreas verdes comunales, la municipalidad cobrará las tasas correspondientes fijadas según el costo efectivo del servicio prestado.',
        aplicacionPractica: 'Los ciudadanos contribuyen mediante impuestos municipales para que la alcaldía mantenga en óptimas condiciones fitosanitarias el arbolado público.'
      },
      {
        articulo: 'Artículo 75',
        titulo: 'Obligaciones de los propietarios sobre aceras y frentes',
        contenido: 'Los propietarios o poseedores de bienes inmuebles tienen la obligación de limpiar la vegetación que obstaculice el paso peatonal o vehicular y mantener en buen estado las aceras frente a sus predios.',
        aplicacionPractica: 'Si un árbol plantado dentro de una propiedad privada invade con ramas bajas la acera o el cableado, el dueño tiene el deber legal de solicitar permiso y podarlo.'
      }
    ],
    etiquetas: ['Municipalidades', 'Gobiernos Locales', 'Aceras y Parques', 'Vías Cantonales', 'Ornato'],
    nivelObligatoriedad: 'Obligatorio por Ley',
    enlaceOficial: 'http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=28812',
    fuenteNombre: 'SCIJ - Código Municipal',
    impactoGuanacaste: 'Regula directamente las acciones de los 11 cantones de Guanacaste en la gestión de sus parques centrales y bulevares urbanos.'
  },
  {
    id: 'ley-biodiversidad-7788',
    titulo: 'Ley de Biodiversidad',
    categoria: 'Leyes Nacionales',
    numero: 'Ley N° 7788',
    anoVigencia: '1998 (vigente)',
    entidadEmisora: 'Asamblea Legislativa de Costa Rica',
    resumenEjecutivo: 'Tiene como objetivo conservar la biodiversidad y el uso sostenible de los recursos genéticos y ecosistemas, incluyendo la fauna y flora silvestre albergada en matrices urbanas y periurbanas.',
    explicacionCiudadana: 'Protege las especies de árboles nativos y a los animales silvestres que anidan o se alimentan en ellos (como monos congos, lapas rojas, pericos y colibríes). Prohíbe podas o derribos que destruyan nidos activos o perturben fauna silvestre protegida.',
    articulosClave: [
      {
        articulo: 'Artículo 9',
        titulo: 'Criterio de conservación in situ',
        contenido: 'La conservación in situ de especies silvestres nativas tiene prioridad sobre cualquier medida ex situ, promoviendo la interconectividad de parches boscosos mediante corredores biológicos.',
        aplicacionPractica: 'Prioriza la conservación de árboles nativos de bosque seco (Guanacaste, Cenízaro, Pochote, Guayacán Real) frente a especies exóticas invasoras.'
      },
      {
        articulo: 'Artículo 69',
        titulo: 'Protección de especies silvestres y anidación',
        contenido: 'Queda prohibida toda actividad que deteriore o altere los hábitats críticos o sitios reproductivos de especies amenazadas o de flora nativa de distribución restringida.',
        aplicacionPractica: 'Si en un árbol que requiere poda existe un nido activo de aves o presencia temporal de crías de fauna arborícola, la intervención debe posponerse hasta que culmine el ciclo reproductivo, salvo riesgo inminente de vida humana.'
      }
    ],
    etiquetas: ['Fauna Silvestre', 'Nidos Activos', 'Especies Nativas', 'Bosque Seco', 'Corredores Biológicos'],
    nivelObligatoriedad: 'Obligatorio por Ley',
    enlaceOficial: 'http://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_texto_completo.aspx?param1=NRTC&nValor1=1&nValor2=28882',
    fuenteNombre: 'SCIJ - Ley de Biodiversidad',
    impactoGuanacaste: 'Especial relevancia para proteger la fauna icónica de Guanacaste (monos congo Alouatta palliata, garrobos, psitácidos) que utilizan el dosel arbóreo de barrios y plazas.'
  },
  {
    id: 'norma-ansi-a300-isa',
    titulo: 'Estándar ANSI A300 / Estándares Técnicos ISA',
    categoria: 'Estándares ISA',
    numero: 'ANSI A300 (Part 1 - Pruning)',
    anoVigencia: 'Edición actual homologada internacionalmente',
    entidadEmisora: 'International Society of Arboriculture (ISA) & Tree Care Industry Association (TCIA)',
    resumenEjecutivo: 'Estándar de consenso técnico global para el manejo y mantenimiento de árboles de sombra y leñosos urbanos. Define las especificaciones de cortes de poda, prohibición del desmoche y prescripción fitosanitaria.',
    explicacionCiudadana: 'Es la "biblia" internacional de la arboricultura moderna. Establece con sustento botánico por qué cortar la copa de un árbol a la mitad ("desmochar" o descabezar) es una pésima práctica que acelera la pudrición interna del tronco y genera brotes débiles muy peligrosos que caen con mayor facilidad con el viento.',
    articulosClave: [
      {
        articulo: 'Sección 5.3.1',
        titulo: 'Corte en el cuello de la rama (Branch Collar Cut)',
        contenido: 'Los cortes de poda deben realizarse inmediatamente afuera del collar de la rama y de la arruga de corteza, sin dejar muñones ni realizar cortes al ras (flush cuts).',
        aplicacionPractica: 'Permite que el árbol active su mecanismo natural de compartimentación (CODIT) para sellar la herida con madera de callo y evitar la entrada de hongos.'
      },
      {
        articulo: 'Sección 5.4.2',
        titulo: 'Prohibición explícita del desmoche (Topping)',
        contenido: 'El desmoche o descabezado ("topping", "heading", "tipping") no debe ser utilizado bajo ninguna circunstancia como práctica estándar de reducción de altura.',
        aplicacionPractica: 'El desmoche destruye las reservas de carbohidratos, produce muñones pudriéndose y crea brotes epicórmicos ("chupones") sin anclaje leñoso firme que colapsan ante vientos alisios.'
      },
      {
        articulo: 'Sección 5.5',
        titulo: 'Tipos de poda autorizados',
        contenido: 'Define las operaciones técnicas válidas: Aclareo de copa (Thinning), Elevación de copa (Raising), Reducción de copa (Reduction) y Limpieza de ramas secas o enfermas (Cleaning). La extracción no debe superar el 25% de la copa fotosintética anual.',
        aplicacionPractica: 'Cualquier cuadrilla municipal o contratista debe especificar contractualmente cuál de estas 4 podas técnicas ejecutará.'
      }
    ],
    etiquetas: ['Poda Técnica', 'Prohibición Desmoche', 'ANSI A300', 'ISA', 'Compartimentación'],
    nivelObligatoriedad: 'Estándar Técnico Internacional',
    enlaceOficial: 'https://www.isa-arbor.com/Credentials/Types-of-Credentials/ISA-Certified-Arborist',
    fuenteNombre: 'International Society of Arboriculture (ISA)',
    impactoGuanacaste: 'Adoptado en los manuales de capacitación técnica del TCU-102A UTN Guanacaste para erradicar las podas destructivas aplicadas históricamente en la provincia.'
  },
  {
    id: 'metodologia-traq-isa',
    titulo: 'Metodología TRAQ (Tree Risk Assessment Qualification)',
    categoria: 'Estándares ISA',
    numero: 'ISA TRAQ Standard Method',
    anoVigencia: 'Revisión técnica 2020 / Manual Oficial ISA',
    entidadEmisora: 'International Society of Arboriculture (ISA)',
    resumenEjecutivo: 'Metodología estandarizada mundialmente para evaluar de forma objetiva, reproducible y defendible legalmente el riesgo que representa un árbol para las personas y la infraestructura urbana.',
    explicacionCiudadana: 'Proporciona una fórmula científica para no talar árboles por simple temor infundado, ni ignorar árboles verdaderamente peligrosos. Analiza la probabilidad de que una rama o tronco falle, qué blanco (casa, peatones, autos) hay debajo y qué tan severo sería el daño.',
    articulosClave: [
      {
        articulo: 'Niveles de Evaluación (1, 2 y 3)',
        titulo: 'Alcance del diagnóstico',
        contenido: 'Nivel 1: Inspección visual rápida desde vehículo o caminata. Nivel 2: Evaluación visual integral de 360° en tierra (raíces, cuello, fuste, copa). Nivel 3: Diagnóstico avanzado con tomografía sónica, resistografía o trepa.',
        aplicacionPractica: 'Permite a los técnicos del TCU y de las UGAs municipales clasificar inventarios masivos de árboles en SIGARU.'
      },
      {
        articulo: 'Matriz de Riesgo ISA',
        titulo: 'Cálculo del nivel de riesgo final',
        contenido: 'El nivel de riesgo se clasifica en 4 categorías: Bajo, Moderado, Alto o Extremo, combinando la probabilidad de impacto en el blanco con la severidad de las consecuencias.',
        aplicacionPractica: 'Evita decisiones arbitrarias: solo ante riesgo Alto o Extremo no mitigable se aprueba el derribo; en riesgo Moderado o Bajo se aplican podas estructurales correctivas.'
      }
    ],
    etiquetas: ['Evaluación de Riesgo', 'TRAQ', 'Matriz de Riesgo', 'Seguridad Ciudadana', 'SIGARU'],
    nivelObligatoriedad: 'Estándar Técnico Internacional',
    enlaceOficial: 'https://www.isa-arbor.com/Education-and-Resources/ISA-Publications/TRAQ-Manual',
    fuenteNombre: 'ISA - Tree Risk Assessment Qualification',
    impactoGuanacaste: 'Capacitación impartida a estudiantes y técnicos de Guanacaste en el marco del TCU-102A para el censo de riesgo de árboles en vías de alto tránsito.'
  },
  {
    id: 'modelo-reglamento-arbolado-guanacaste',
    titulo: 'Modelo de Reglamento de Arbolado Urbano Cantonal',
    categoria: 'Normativa Municipal',
    numero: 'Ordenanza Modelo UTN / IFAM',
    anoVigencia: 'Propuesta técnica modelo 2024-2025',
    entidadEmisora: 'Universidad Técnica Nacional & Gobiernos Locales de Guanacaste',
    resumenEjecutivo: 'Propuesta de normativa cantonal modelo desarrollada por la academia y municipalidades para unificar los criterios de selección de especies nativas, distanciamientos a cordón de caño y tendido eléctrico, y procedimiento de compensación ecológica.',
    explicacionCiudadana: 'Es la normativa cantonal que regula qué árboles sembrar en las aceras guanacastecas (evitando especies con raíces destructivas como Ficus benjamina o Nim invasivo) y fomenta especies melíferas y de sombra profunda adaptadas al calor seco.',
    articulosClave: [
      {
        articulo: 'Capítulo III: Especies autorizadas',
        titulo: 'Catálogo de arbolado permitido',
        contenido: 'Prioriza árboles nativos de bajo, mediano y alto porte adaptados a la sequía: Cortés Amarillo, Jacaranda, Flor Blanca, Sotacaballo, Guachipelín. Prohíbe la siembra en aceras de árboles de raíces tabulares agresivas.',
        aplicacionPractica: 'Protege las tuberías de Acueductos y Alcantarillados (AyA/ASADAS) y las losas de concreto de las aceras peatonales.'
      },
      {
        articulo: 'Capítulo V: Permiso de corta y compensación',
        titulo: 'Régimen de mitigación por tala autorizada',
        contenido: 'Por cada árbol talado legalmente por motivos de riesgo o afectación grave a obras civiles, el solicitante deberá sembrar y dar mantenimiento de 3 a 5 árboles nativos en zonas designadas por la municipalidad.',
        aplicacionPractica: 'Garantiza que la masa arbórea urbana crezca permanentemente y compense cualquier pérdida de cobertura vegetal.'
      }
    ],
    etiquetas: ['Reglamento Cantonal', 'Especies Nativas', 'Compensación 3x1', 'Aceras Seguras', 'Guanacaste'],
    nivelObligatoriedad: 'Regulación Cantonal',
    enlaceOficial: 'https://www.ifam.go.cr',
    fuenteNombre: 'Instituto de Fomento y Asesoría Municipal (IFAM) / TCU UTN',
    impactoGuanacaste: 'Específicamente diseñado para responder a la realidad climática y urbanística de las comunidades de Guanacaste.'
  },
  {
    id: 'tramite-permiso-poda-corta',
    titulo: 'Procedimiento Administrativo para Permisos de Poda o Corta',
    categoria: 'Procedimientos y Trámites',
    numero: 'Procedimiento UGA-01',
    anoVigencia: 'Vigente en municipalidades de Costa Rica',
    entidadEmisora: 'Unidad de Gestión Ambiental (UGA) Municipal',
    resumenEjecutivo: 'Flujo administrativo formal que todo ciudadano o institución debe seguir para solicitar legalmente la intervención de un árbol en espacio público o privado con impacto vecinal.',
    explicacionCiudadana: 'Paso a paso que debe cumplir un vecino de Guanacaste para que un inspector municipal evalúe un árbol y emita la resolución vinculante antes de tocar cualquier rama o tronco.',
    articulosClave: [
      {
        articulo: 'Fase 1: Solicitud',
        titulo: 'Requisitos documentales',
        contenido: 'Llenado del formulario formal ante la UGA, copia de plano catastrado o ubicación GPS, fotografías del árbol y del riesgo o afectación invocada, y estar al día con los impuestos municipales.',
        aplicacionPractica: 'Cualquier vecino puede presentar la solicitud física o digitalmente en la plataforma de servicios de su municipalidad.'
      },
      {
        articulo: 'Fase 2: Inspección y Dictamen',
        titulo: 'Inspección técnica de campo',
        contenido: 'Un ingeniero forestal o agrónomo municipal visita el sitio, evalúa el árbol con ficha técnica (tipo TRAQ), verifica interferencias con cableado o ductos y emite un dictamen vinculante en un plazo máximo de 10 a 30 días hábiles.',
        aplicacionPractica: 'El dictamen indica si procede: poda de formación, aclareo, elevación de copa o corta justificada con plan de sustitución.'
      }
    ],
    etiquetas: ['Trámite Ciudadano', 'Formulario UGA', 'Inspección Técnica', 'Resolución Legal'],
    nivelObligatoriedad: 'Guía de Procedimiento',
    enlaceOficial: 'https://www.sinac.go.cr',
    fuenteNombre: 'Ruta Técnica de Servicios Municipales',
    impactoGuanacaste: 'Asegura a los vecinos de Guanacaste una respuesta fundada técnicamente sin caer en infracciones a la Ley Forestal 7575.'
  }
];

export const RUTAS_ATENCION: RutaAtencion[] = [
  {
    id: 'cableado-electrico',
    titulo: 'Árbol rozando o en riesgo con tendido eléctrico',
    icono: 'Zap',
    descripcionCorta: 'Ramas en contacto con cables de media o alta tensión, chispas o ramas inclinadas sobre líneas de transmisión eléctrica.',
    entidadResponsable: 'Distribuidora Eléctrica: Coopeguanacaste R.L. o Instituto Costarricense de Electricidad (ICE)',
    contactoEmergencia: 'Coopeguanacaste: 2681-4700 / 800-COOPEG (266734) | ICE: 8000-CLARIDAD (8000-252743)',
    plazoRespuesta: 'Emergencia (chispas o ramas caídas): Inmediato (1-4 horas) | Poda preventiva: 5 a 15 días hábiles',
    pasos: [
      {
        numero: 1,
        titulo: '¡PELIGRO MORTAL! No intentar podar usted mismo',
        detalle: 'Bajo NINGUNA circunstancia corte ramas cerca de cables eléctricos. La madera verde conduce electricidad de alto voltaje con riesgo de descarga mortal instantánea o arco eléctrico.'
      },
      {
        numero: 2,
        titulo: 'Identifique el número de poste o medidor más cercano',
        detalle: 'Ubique la placa metálica amarilla/azul con el número del poste eléctrico más próximo (ej. PG-1234) o el NIS/número de servicio de su factura eléctrica.'
      },
      {
        numero: 3,
        titulo: 'Reporte a Coopeguanacaste o al ICE',
        detalle: 'Comuníquese a la línea gratuita de reportes eléctricos. Indique la dirección exacta, cantón, distrito, número de poste y la severidad del contacto.',
        requisito: 'Número de poste o coordenada GPS, fotos claras tomadas a distancia segura.'
      },
      {
        numero: 4,
        titulo: 'Inspección y despeje por cuadrilla especializada',
        detalle: 'La cuadrilla eléctrica calificada ejecutará el descopado o aclareo con canasta aislada (bucket truck) y equipo dieléctrico certificado.'
      }
    ],
    advertenciaImportante: 'La Ley de Tránsito y el Código Penal prohíben que personal no acreditado por la empresa eléctrica intervenga vegetación en servidumbres de alta tensión.',
    baseLegal: 'Reglamento Técnico del Servicio Eléctrico de ARESEP y Ley Forestal 7575 (casos de fuerza mayor y seguridad pública).'
  },
  {
    id: 'acera-parque-publico',
    titulo: 'Árbol en vía pública, acera o parque cantonal con riesgo de caída',
    icono: 'Building2',
    descripcionCorta: 'Árboles secos, enfermos, con raíces expuestas o ramas fracturadas sobre calles públicas, cordón de caño o plazas.',
    entidadResponsable: 'Municipalidad del Cantón respectivo (Unidad de Gestión Ambiental - UGA / Parques y Ornato)',
    contactoEmergencia: 'Plataforma de Servicios de la Municipalidad de su cantón (Liberia, Nicoya, Santa Cruz, etc.)',
    plazoRespuesta: 'Inspección técnica: 5 a 10 días hábiles | Ejecución de intervención: según disponibilidad de cuadrilla',
    pasos: [
      {
        numero: 1,
        titulo: 'Tome evidencia fotográfica del árbol y su entorno',
        detalle: 'Fotografíe la base de las raíces, el fuste (tronco) y la copa. Registre grietas en el suelo, inclinaciones recientes o cavidades con hongos.'
      },
      {
        numero: 2,
        titulo: 'Presente la solicitud o denuncia formal ante la Municipalidad',
        detalle: 'Diríjase a la Unidad de Gestión Ambiental (UGA) o departamento de Obras de su gobierno local. Puede presentar formulario físico o por ventanilla digital.',
        requisito: 'Cédula del solicitante, dirección exacta, fotografías y descripción del riesgo para transeúntes o vehículos.'
      },
      {
        numero: 3,
        titulo: 'Inspección técnica in situ',
        detalle: 'El inspector municipal evaluará el árbol con el método ISA-TRAQ para determinar si amerita poda de aclareo/elevación o derribo justificado.'
      },
      {
        numero: 4,
        titulo: 'Resolución y calendarización de labores',
        detalle: 'La municipalidad programará los trabajos con personal y maquinaria propia o empresa contratista autorizada.'
      }
    ],
    advertenciaImportante: 'Ningún vecino puede talar por cuenta propia un árbol en la acera o calle pública. Hacerlo constituye infracción contra bienes de dominio público y puede acarrear multas y denuncias penales.',
    baseLegal: 'Código Municipal (Ley N° 7794, Artículos 4 y 74) y Ley Forestal 7575.'
  },
  {
    id: 'propiedad-privada-vecino',
    titulo: 'Árbol en propiedad privada amenazando casa o muro colindante',
    icono: 'Home',
    descripcionCorta: 'Árbol plantado en un solar o patio privado cuyas ramas o raíces dañan construcciones o amenazan desplomarse hacia predios vecinos.',
    entidadResponsable: 'Propietario del inmueble / Vía Civil (Juzgado de Menor Cuantía) / Inspección Municipal preventiva',
    contactoEmergencia: 'Inspección Municipal de Construcciones / Asesoría Legal Comunitaria UTN',
    plazoRespuesta: 'Trámite municipal de mediación: 15 días | Proceso judicial sumario: variable',
    pasos: [
      {
        numero: 1,
        titulo: 'Diálogo amistoso y notificación por escrito al propietario',
        detalle: 'El Código Civil otorga al vecino afectado el derecho de solicitar el corte de ramas y raíces invasoras. Entregue una nota formal solicitando la poda amistosa.'
      },
      {
        numero: 2,
        titulo: 'Solicitud de inspección preventiva ante la Municipalidad',
        detalle: 'Si el vecino se niega, solicite a la Unidad de Gestión Ambiental o Control de Construcciones una inspección de riesgo a la salud o seguridad pública.',
        requisito: 'Copia del plano catastrado, fotos de daños en tapias, techos o tuberías.'
      },
      {
        numero: 3,
        titulo: 'Notificación de apercibimiento municipal',
        detalle: 'La municipalidad puede intimar al dueño a podar el árbol en un plazo perentorio si existe peligro inminente para terceros.'
      },
      {
        numero: 4,
        titulo: 'Acción civil de interdicto o reclamo de daños',
        detalle: 'En caso de desacato, el afectado puede acudir ante el Juzgado Agrario o Civil para exigir judicialmente la poda forzosa y la indemnización de daños.'
      }
    ],
    advertenciaImportante: 'Usted no puede ingresar sin autorización a la propiedad de su vecino a cortar un árbol; debe tramitarlo por las vías legales correspondientes o ante flagrante emergencia con Bomberos.',
    baseLegal: 'Código Civil de Costa Rica (Artículos 403 y 404 sobre ramas y raíces invasoras) y Código Municipal.'
  },
  {
    id: 'cauces-areas-protegidas',
    titulo: 'Árbol en márgenes de ríos, quebradas o zonas de protección',
    icono: 'TreePine',
    descripcionCorta: 'Árboles situados a menos de 10, 50 o 100 metros de cursos fluviales, nacientes de agua o zonas declaradas de protección ambiental.',
    entidadResponsable: 'SINAC - MINAE (Área de Conservación Guanacaste ACG, Arenal Tempisque ACAT o Tempisque ACT)',
    contactoEmergencia: 'SITADA (Sistema Integrado de Trámite y Atención de Denuncias Ambientales): 1192 | Oficina Subregional SINAC',
    plazoRespuesta: 'Inspección forestal oficial: 15 a 30 días hábiles',
    pasos: [
      {
        numero: 1,
        titulo: 'Verificar si el terreno colinda con curso de agua',
        detalle: 'La Ley Forestal prohíbe tocar árboles en fajas de protección hídrica, incluso si están dentro de fincas o quintas privadas.'
      },
      {
        numero: 2,
        titulo: 'Tramitar solicitud formal de excepción ante el SINAC',
        detalle: 'Solo el SINAC tiene potestad para autorizar la remoción de árboles caídos que obstruyan cauces fluviales o representen peligro de represamiento e inundación.',
        requisito: 'Plano, personería, estudio técnico forestal o informe del Comité Municipal de Emergencias (CME).'
      },
      {
        numero: 3,
        titulo: 'Valoración conjunta con Comité Cantonal de Emergencias (si hay riesgo hidrológico)',
        detalle: 'Si el árbol amenaza con desbordar el río sobre un barrio o puente, el Comité Cantonal de Emergencias y la CNE pueden coordinar maquinaria especializada.'
      }
    ],
    advertenciaImportante: 'Talar árboles en márgenes de ríos sin autorización del SINAC es un delito penado con cárcel (Art. 58 Ley Forestal N° 7575) sin derecho a fianza simple en reincidencias.',
    baseLegal: 'Ley Forestal 7575 (Artículos 33, 34 y 58) y Ley de Aguas N° 276.'
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    pregunta: '¿Puedo podar o cortar un árbol que está al frente de mi casa en la acera?',
    respuestaCorta: 'No puede hacerlo por cuenta propia. La acera es un bien demanial (público) administrado por la Municipalidad.',
    respuestaDetallada: 'Aunque usted barre la acera o riega el árbol, el arbolado en espacio público está protegido por el Código Municipal y la Ley Forestal. Para cualquier poda o remoción, debe presentar una solicitud formal ante la Unidad de Gestión Ambiental (UGA) de su Municipalidad. Si el árbol amenaza con caerse sobre cables eléctricos, debe comunicarse con Coopeguanacaste o el ICE.',
    fundamentoLegal: 'Código Municipal (Ley N° 7794, Art. 4 y 74) y Ley Forestal N° 7575.',
    categoria: 'Permisos y Trámites'
  },
  {
    id: 'faq-2',
    pregunta: '¿Qué sanciones penales o económicas existen en Costa Rica por talar un árbol sin permiso?',
    respuestaCorta: 'Las sanciones van desde multas económicas hasta prisión de 3 meses a 3 años, decomiso de motosierras y obligación de reforestación.',
    respuestaDetallada: 'El Artículo 58 de la Ley Forestal 7575 sanciona la tala en áreas de protección o terrenos públicos con penas privativas de libertad de tres meses a tres años. Además, el infractor es remitido al Tribunal Ambiental Administrativo (TAA) para pagar la indemnización por daño ambiental y está obligado a sembrar y cuidar entre 10 y 20 árboles por cada ejemplar dañado.',
    fundamentoLegal: 'Ley Forestal N° 7575 (Art. 58) y Ley Orgánica del Ambiente N° 7554.',
    categoria: 'Sanciones y Multas'
  },
  {
    id: 'faq-3',
    pregunta: '¿Por qué la técnica del "desmoche" (cortar la copa completa a un muñón) está prohibida por normas internacionales?',
    respuestaCorta: 'Porque no soluciona el riesgo: debilita estructuralmente al árbol, pudre el tronco central y genera brotes nuevos débiles propensos a caer.',
    respuestaDetallada: 'La norma internacional ANSI A300 y la International Society of Arboriculture (ISA) prohíben taxativamente el "desmoche" (topping). Al descabezar el árbol, se le priva de hasta el 80% de su capacidad fotosintética, entra en choque calórico y la herida gigantesca no puede cicatrizar (mecanismo CODIT bloqueado). Los brotes secundarios que nacen de emergencia ("chupones") están adheridos superficialmente a la corteza y no a la médula leñosa, por lo que ante vientos fuertes en Guanacaste se desgajan con enorme peligro.',
    fundamentoLegal: 'Estándar Técnico ANSI A300 (Part 1 - Pruning) y Manual ISA de Buenas Prácticas.',
    categoria: 'Técnica de Poda'
  },
  {
    id: 'faq-4',
    pregunta: '¿Quién es legalmente responsable si un árbol de la acera o parque municipal cae sobre un vehículo o casa?',
    respuestaCorta: 'La Municipalidad puede ser civilmente responsable si existían denuncias previas de riesgo y actuó con omisión culpable o negligencia.',
    respuestaDetallada: 'De acuerdo con la jurisprudencia de la Sala Primera de la Corte Suprema de Justicia y el Tribunal Contencioso Administrativo, el Estado y las Municipalidades tienen el deber objetivo de custodia de las vías públicas. Si un ciudadano u organización ya había advertido por escrito el mal estado del árbol y la municipalidad no intervino a tiempo, el afectado puede demandar por daños y perjuicios. En casos de eventos de fuerza mayor o desastre natural extraordinario no previsible, la responsabilidad se evalúa caso por caso.',
    fundamentoLegal: 'Ley General de la Administración Pública (Arts. 190-194) y Código Civil de Costa Rica.',
    categoria: 'Responsabilidad Civil'
  },
  {
    id: 'faq-5',
    pregunta: '¿Qué especies de árboles nativos de Guanacaste cuentan con veda o protección especial?',
    respuestaCorta: 'Especies como el Guayacán Real, Cristóbal, Ron-rón, Caoba y Pochote poseen vedas totales o restricciones severas de corta por SINAC.',
    respuestaDetallada: 'En Costa Rica, el Decreto Ejecutivo de Vedas Forestales protege especies amenazadas de bosque seco. El Guayacán Real (Guaiacum sanctum), árbol nativo de flor azul-púrpura de madera de extraordinaria densidad, está catalogado en peligro de extinción en CITES y su corta está absolutamente vedada. En el TCU-102A de la UTN promovemos activamente su propagación en viveros y su plantación en parques protegidos.',
    fundamentoLegal: 'Decreto Ejecutivo N° 25700-MINAE (Veda de Especies Forestales) y Ley de Biodiversidad N° 7788.',
    categoria: 'Permisos y Trámites'
  },
  {
    id: 'faq-6',
    pregunta: '¿Cómo puedo saber si un árbol en mi comunidad califica como "Árbol Patrimonial"?',
    respuestaCorta: 'A través de un dictamen técnico que evalúa longevidad histórica, dimensiones excepcionales, valor cultural o paisajístico cantonal.',
    respuestaDetallada: 'Los árboles patrimoniales son ejemplares que destacan por su avanzada edad (a menudo más de 80 a 100 años), su arquitectura monumental o su conexión con la historia local (como antiguos árboles de descanso de boyeros o plazas coloniales en Guanacaste). Pueden ser declarados Patrimonio Natural y Cultural mediante acuerdo del Concejo Municipal, otorgándoles blindaje legal perpetuo contra la tala y asignándoles presupuesto específico de mantenimiento arborícola con peritaje TRAQ periódico.',
    fundamentoLegal: 'Ley de Patrimonio Histórico-Arquitectónico N° 7555 y Acuerdos de Concejos Municipales de Guanacaste.',
    categoria: 'Permisos y Trámites'
  }
];

export const DIRECTIVAS_GUANACASTE = [
  {
    canton: 'Liberia',
    entidad: 'Municipalidad de Liberia - Unidad de Gestión Ambiental (UGA)',
    telefono: '+506 2666-0169',
    correo: 'gestionambiental@munilib.go.cr',
    servicios: 'Inspección de árboles en vías públicas, dictamen técnico de poda, donación de árboles nativos para reforestación cantonal.'
  },
  {
    canton: 'Nicoya',
    entidad: 'Municipalidad de Nicoya - Departamento de Gestión Ambiental',
    telefono: '+506 2685-8700',
    correo: 'ambiental@nicoya.go.cr',
    servicios: 'Atención de emergencias arbóreas, censo de arbolado urbano en parques coloniales y programas de educación ambiental comunal.'
  },
  {
    canton: 'Cañas y Bagaces',
    entidad: 'Municipalidades de Cañas y Bagaces / Oficinas Subregionales SINAC-ACAT',
    telefono: '+506 2669-0012 / 2671-1290',
    correo: 'acat.denuncias@sinac.go.cr',
    servicios: 'Coordinación con el Área de Conservación Arenal Tempisque (ACAT) para intervención de árboles en zonas de amortiguamiento y vías de tránsito.'
  },
  {
    canton: 'Santa Cruz y Carrillo',
    entidad: 'Municipalidades de Santa Cruz y Carrillo / Coopeguanacaste R.L.',
    telefono: '+506 2680-0017 / 2681-4700',
    correo: 'info@coopeguanacaste.com',
    servicios: 'Cuadrillas eléctricas conjuntas para despeje preventivo de tendido eléctrico en la bajura guanacasteca.'
  }
];
