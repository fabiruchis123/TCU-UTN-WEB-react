import React, { useState, useMemo } from 'react';
import {
  Scale,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Zap,
  Building2,
  Home,
  TreePine,
  Phone,
  Mail,
  HelpCircle,
  Copy,
  Check,
  X,
  FileCheck,
  Sparkles,
  Info,
  Calendar,
  Activity,
  AlertCircle
} from 'lucide-react';
import {
  NORMATIVAS_DATA,
  RUTAS_ATENCION,
  FAQS_DATA,
  DIRECTIVAS_GUANACASTE,
  NormativaItem,
  RutaAtencion
} from '../data/normativaData';
import '../styles/normativa.css';

export const Normativa: React.FC = () => {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<'marco-legal' | 'ruta-ciudadana' | 'calculadora-traq' | 'preguntas-frecuentes' | 'directorio'>('marco-legal');

  // Search & Filter state for Normativas
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Expandable state for card articles
  const [expandedArticles, setExpandedArticles] = useState<{ [key: string]: boolean }>({});

  // Modal detail state
  const [selectedNormativaModal, setSelectedNormativaModal] = useState<NormativaItem | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Active citizen route
  const [selectedRutaId, setSelectedRutaId] = useState<string>(RUTAS_ATENCION[0].id);

  // Interactive TRAQ Risk Calculator state
  const [traqFalla, setTraqFalla] = useState<'Improbable' | 'Posible' | 'Probable' | 'Inminente'>('Posible');
  const [traqImpacto, setTraqImpacto] = useState<'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto'>('Medio');
  const [traqConsecuencia, setTraqConsecuencia] = useState<'Insignificante' | 'Menor' | 'Significativa' | 'Severa'>('Significativa');

  // FAQ Accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_DATA[0].id);

  // Filtered Normativas
  const filteredNormativas = useMemo(() => {
    return NORMATIVAS_DATA.filter(item => {
      const matchCategory = selectedCategory === 'Todas' || item.categoria === selectedCategory;
      const term = searchQuery.toLowerCase().trim();
      const matchSearch =
        item.titulo.toLowerCase().includes(term) ||
        item.numero.toLowerCase().includes(term) ||
        item.resumenEjecutivo.toLowerCase().includes(term) ||
        item.explicacionCiudadana.toLowerCase().includes(term) ||
        item.etiquetas.some(tag => tag.toLowerCase().includes(term));
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Selected route object
  const activeRuta: RutaAtencion = useMemo(() => {
    return RUTAS_ATENCION.find(r => r.id === selectedRutaId) || RUTAS_ATENCION[0];
  }, [selectedRutaId]);

  // TRAQ Risk Level Logic
  const traqCalculation = useMemo(() => {
    // Scoring logic according to ISA TRAQ Matrix standard
    let score = 0;
    if (traqFalla === 'Improbable') score += 1;
    else if (traqFalla === 'Posible') score += 2;
    else if (traqFalla === 'Probable') score += 3;
    else if (traqFalla === 'Inminente') score += 4;

    if (traqImpacto === 'Muy Bajo') score += 1;
    else if (traqImpacto === 'Bajo') score += 2;
    else if (traqImpacto === 'Medio') score += 3;
    else if (traqImpacto === 'Alto') score += 4;

    if (traqConsecuencia === 'Insignificante') score += 1;
    else if (traqConsecuencia === 'Menor') score += 2;
    else if (traqConsecuencia === 'Significativa') score += 3;
    else if (traqConsecuencia === 'Severa') score += 4;

    if (score <= 5) {
      return {
        level: 'Riesgo Bajo',
        colorClass: 'riesgo-bajo',
        desc: 'El árbol o rama presenta una probabilidad reducida de fallo o el impacto potencial a bienes y personas es mínimo.',
        action: 'Monitoreo de rutina cada 24 a 36 meses. No requiere intervenciones drásticas.'
      };
    } else if (score <= 8) {
      return {
        level: 'Riesgo Moderado',
        colorClass: 'riesgo-moderado',
        desc: 'Se identifican defectos estructurales incipientes o blanco con ocupación intermedia en acera o parque.',
        action: 'Poda de aclareo o elevación de copa correctiva por personal capacitado en un plazo de 3 a 6 meses.'
      };
    } else if (score <= 10) {
      return {
        level: 'Riesgo Alto',
        colorClass: 'riesgo-alto',
        desc: 'Defectos severos (pudrición de tronco, grietas profundas, raíces expuestas) con alta probabilidad de afectar personas o viviendas.',
        action: 'Mitigación prioritaria en un plazo no mayor a 15 a 30 días. Notificar a la Unidad de Gestión Ambiental.'
      };
    } else {
      return {
        level: 'Riesgo Extremo',
        colorClass: 'riesgo-extremo',
        desc: 'Fallo inminente en curso de fuste o ramas mayores sobre blancos críticos (vía principal o tendido eléctrico).',
        action: 'Intervención inmediata de emergencia (24-48 hrs). Perimetrar la zona y llamar a Bomberos, ICE o Coopeguanacaste.'
      };
    }
  }, [traqFalla, traqImpacto, traqConsecuencia]);

  const toggleArticleAccordion = (articleKey: string) => {
    setExpandedArticles(prev => ({
      ...prev,
      [articleKey]: !prev[articleKey]
    }));
  };

  const handleCopyLegalCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="normativa-page-wrapper">
      {/* Hero Banner */}
      <section className="normativa-hero">
        <div className="normativa-hero-badge">
          <Scale size={16} /> Marco Legal y Buenas Prácticas Técnicas
        </div>
        <h1>Normativa y Legislación del Árbol Urbano</h1>
        <p className="lead">
          Conozca el marco jurídico de Costa Rica y los estándares internacionales de arboricultura (ISA) 
          que fundamentan el proyecto TCU-102A de la Universidad Técnica Nacional (Sede Guanacaste). 
          Protección ciudadana, competencias institucionales y gestión sostenible del patrimonio arbóreo.
        </p>

        <div className="normativa-hero-stats">
          <div className="hero-stat-pill">
            <BookOpen size={18} />
            <span><strong>Leyes Clave:</strong> Forestal N° 7575, Ambiente N° 7554, Cód. Municipal N° 7794</span>
          </div>
          <div className="hero-stat-pill">
            <ShieldCheck size={18} />
            <span><strong>Estándar Global:</strong> ANSI A300 &amp; Metodología TRAQ (ISA)</span>
          </div>
          <div className="hero-stat-pill">
            <Building2 size={18} />
            <span><strong>Enfoque Territorial:</strong> Cantones de Guanacaste</span>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Menu Tabs */}
      <div className="normativa-tabs-container">
        <nav className="normativa-main-nav">
          <button
            className={`normativa-nav-btn ${activeTab === 'marco-legal' ? 'active' : ''}`}
            onClick={() => setActiveTab('marco-legal')}
          >
            <BookOpen size={18} />
            Marco Legal y Normas
          </button>
          <button
            className={`normativa-nav-btn ${activeTab === 'ruta-ciudadana' ? 'active' : ''}`}
            onClick={() => setActiveTab('ruta-ciudadana')}
          >
            <Zap size={18} />
            Ruta de Atención Ciudadana
          </button>
          <button
            className={`normativa-nav-btn ${activeTab === 'calculadora-traq' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculadora-traq')}
          >
            <Activity size={18} />
            Matriz de Riesgo TRAQ
          </button>
          <button
            className={`normativa-nav-btn ${activeTab === 'preguntas-frecuentes' ? 'active' : ''}`}
            onClick={() => setActiveTab('preguntas-frecuentes')}
          >
            <HelpCircle size={18} />
            Preguntas Frecuentes (FAQ)
          </button>
          <button
            className={`normativa-nav-btn ${activeTab === 'directorio' ? 'active' : ''}`}
            onClick={() => setActiveTab('directorio')}
          >
            <Phone size={18} />
            Directorio Cantonal
          </button>
        </nav>
      </div>

      {/* =========================================================================
          TAB 1: MARCO LEGAL Y NORMAS TÉCNICAS
          ========================================================================= */}
      {activeTab === 'marco-legal' && (
        <section>
          {/* Search and Filters */}
          <div className="normativa-search-card">
            <div className="search-input-group">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar por artículo, ley (ej. 7575), poda, SINAC, desmoche, municipalidad..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-filter-chips">
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--norm-text-muted)', marginRight: '6px' }}>
                Filtrar por:
              </span>
              {['Todas', 'Leyes Nacionales', 'Estándares ISA', 'Normativa Municipal', 'Procedimientos y Trámites'].map(cat => (
                <button
                  key={cat}
                  className={`filter-chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="normativa-cards-grid">
            {filteredNormativas.map(normativa => {
              const categorySlug = normativa.categoria.toLowerCase().replace(/\s+/g, '-');
              return (
                <article key={normativa.id} className="normativa-card">
                  <header className="card-top-header">
                    <div className="card-badge-row">
                      <span className={`category-tag ${categorySlug}`}>
                        {normativa.categoria}
                      </span>
                      <span className="obligatoriedad-pill">
                        {normativa.nivelObligatoriedad}
                      </span>
                    </div>
                    <h3>{normativa.titulo}</h3>
                    <div className="card-legal-number">
                      <Scale size={14} />
                      <span>{normativa.numero} &bull; {normativa.anoVigencia}</span>
                    </div>
                  </header>

                  <div className="card-body-content">
                    <p className="card-resumen">{normativa.resumenEjecutivo}</p>

                    <div className="ciudadano-box">
                      <h4>
                        <Sparkles size={14} /> ¿Qué significa para la comunidad?
                      </h4>
                      <p>{normativa.explicacionCiudadana}</p>
                    </div>

                    <div className="guanacaste-impact-box">
                      <strong>Impacto en Guanacaste:</strong> {normativa.impactoGuanacaste}
                    </div>

                    {/* Artículos Clave Acordeón */}
                    <div className="articles-accordion">
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--norm-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                        Articulado destacado ({normativa.articulosClave.length})
                      </div>
                      {normativa.articulosClave.map((art, idx) => {
                        const artKey = `${normativa.id}-art-${idx}`;
                        const isExpanded = !!expandedArticles[artKey];
                        return (
                          <div key={artKey} className="article-item">
                            <div
                              className="article-header"
                              onClick={() => toggleArticleAccordion(artKey)}
                            >
                              <span><strong>{art.articulo}:</strong> {art.titulo}</span>
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                            {isExpanded && (
                              <div className="article-body">
                                <p>{art.contenido}</p>
                                <div className="aplicacion">
                                  <strong>Aplicación práctica en TCU:</strong> {art.aplicacionPractica}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="card-tags-list">
                      {normativa.etiquetas.map(tag => (
                        <span key={tag} className="card-tag-pill">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  <footer className="card-footer-actions">
                    <button
                      className="btn-details"
                      onClick={() => setSelectedNormativaModal(normativa)}
                    >
                      <FileCheck size={16} />
                      Ver Ficha Técnica
                    </button>
                    <a
                      href={normativa.enlaceOficial}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-external-link"
                      title="Consultar fuente original"
                    >
                      <span>{normativa.fuenteNombre}</span>
                      <ExternalLink size={14} />
                    </a>
                  </footer>
                </article>
              );
            })}
          </div>

          {filteredNormativas.length === 0 && (
            <div className="text-center p-5 bg-white rounded-4 border">
              <AlertCircle size={48} className="text-muted mb-3" />
              <h4>No se encontraron normativas para esa búsqueda</h4>
              <p className="text-muted">Intente con palabras clave como &quot;poda&quot;, &quot;SINAC&quot;, &quot;7575&quot; o restablezca los filtros.</p>
              <button
                className="btn btn-outline-success mt-2"
                onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); }}
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          TAB 2: RUTA DE ATENCIÓN CIUDADANA PASO A PASO
          ========================================================================= */}
      {activeTab === 'ruta-ciudadana' && (
        <section className="ruta-ciudadana-section">
          <div className="section-header-centered">
            <h2>¿Qué hacer si un árbol genera peligro o interfiere con servicios?</h2>
            <p>
              Ruta oficial de atención ciudadana coordinada entre Municipalidades de Guanacaste, 
              empresas eléctricas (Coopeguanacaste / ICE) y el SINAC. Seleccione su caso para conocer el procedimiento exacto:
            </p>
          </div>

          {/* Selector de Caso */}
          <div className="ruta-selector-cards">
            {RUTAS_ATENCION.map(ruta => {
              const isSelected = ruta.id === selectedRutaId;
              let IconComp = Zap;
              if (ruta.icono === 'Building2') IconComp = Building2;
              if (ruta.icono === 'Home') IconComp = Home;
              if (ruta.icono === 'TreePine') IconComp = TreePine;

              return (
                <button
                  key={ruta.id}
                  className={`ruta-card-option ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedRutaId(ruta.id)}
                >
                  <div className="ruta-card-icon">
                    <IconComp size={24} />
                  </div>
                  <h4>{ruta.titulo}</h4>
                  <p>{ruta.descripcionCorta}</p>
                </button>
              );
            })}
          </div>

          {/* Detalles de la Ruta Activa */}
          <div className="ruta-active-details">
            <div className="ruta-banner-meta">
              <div className="meta-item">
                <Building2 size={20} />
                <div>
                  <h5>Entidad Responsable</h5>
                  <p>{activeRuta.entidadResponsable}</p>
                </div>
              </div>
              <div className="meta-item">
                <Phone size={20} />
                <div>
                  <h5>Contacto Inmediato</h5>
                  <p>{activeRuta.contactoEmergencia}</p>
                </div>
              </div>
              <div className="meta-item">
                <Calendar size={20} />
                <div>
                  <h5>Plazo Estimado de Atención</h5>
                  <p>{activeRuta.plazoRespuesta}</p>
                </div>
              </div>
            </div>

            <div className="ruta-warning-box">
              <AlertTriangle size={24} />
              <div>
                <strong>Aviso Importante:</strong>
                <p>{activeRuta.advertenciaImportante}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--norm-primary)', marginBottom: '16px' }}>
              Flujo de pasos a seguir:
            </h3>

            <div className="ruta-steps-timeline">
              {activeRuta.pasos.map(paso => (
                <div key={paso.numero} className="ruta-step-item">
                  <div className="step-number-circle">{paso.numero}</div>
                  <div className="step-content">
                    <h4>{paso.titulo}</h4>
                    <p>{paso.detalle}</p>
                    {paso.requisito && (
                      <div className="step-requisito">
                        <FileCheck size={14} />
                        <span><strong>Requisito:</strong> {paso.requisito}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', padding: '12px 16px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--norm-border)', fontSize: '0.88rem', color: 'var(--norm-text-muted)' }}>
              <strong>Fundamento Jurídico:</strong> {activeRuta.baseLegal}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 3: EVALUADOR / MATRIZ DE RIESGO ISA-TRAQ
          ========================================================================= */}
      {activeTab === 'calculadora-traq' && (
        <section className="traq-interactive-calculator">
          <div className="section-header-centered">
            <h2>Evaluador Preliminar de Riesgo Arbóreo (TRAQ - ISA)</h2>
            <p>
              Herramienta didáctica basada en la metodología <em>Tree Risk Assessment Qualification</em> de la 
              Sociedad Internacional de Arboricultura (ISA). Ayuda a estudiantes y miembros de la comunidad a 
              estimar de forma objetiva la urgencia de una intervención técnica.
            </p>
          </div>

          <div className="traq-form-grid">
            <div className="traq-field">
              <label htmlFor="traq-falla">
                <AlertTriangle size={18} />
                1. Probabilidad de Fallo de la Parte
              </label>
              <select
                id="traq-falla"
                className="traq-select"
                value={traqFalla}
                onChange={e => setTraqFalla(e.target.value as any)}
              >
                <option value="Improbable">Improbable (árbol vigoroso, sin pudrición visible)</option>
                <option value="Posible">Posible (ramas secas medianas, leve inclinación antigua)</option>
                <option value="Probable">Probable (cancros severos, rajaduras, pudrición activa)</option>
                <option value="Inminente">Inminente (desarraigo visible, crujidos, suelo levantado)</option>
              </select>
              <small style={{ color: 'var(--norm-text-muted)' }}>Evalúa las anomalías biomecánicas del tronco, copa o raíz.</small>
            </div>

            <div className="traq-field">
              <label htmlFor="traq-impacto">
                <Building2 size={18} />
                2. Probabilidad de Impacto en Blanco
              </label>
              <select
                id="traq-impacto"
                className="traq-select"
                value={traqImpacto}
                onChange={e => setTraqImpacto(e.target.value as any)}
              >
                <option value="Muy Bajo">Muy Bajo (terreno baldío sin tránsito ni cables)</option>
                <option value="Bajo">Bajo (camino rural de tráfico muy esporádico)</option>
                <option value="Medio">Medio (acera comunal, parque de barrio regular)</option>
                <option value="Alto">Alto (vía principal cantonal, escuela, tendido primario)</option>
              </select>
              <small style={{ color: 'var(--norm-text-muted)' }}>Frecuencia con la que personas o estructuras están bajo la copa.</small>
            </div>

            <div className="traq-field">
              <label htmlFor="traq-consecuencia">
                <ShieldCheck size={18} />
                3. Magnitud de Consecuencias
              </label>
              <select
                id="traq-consecuencia"
                className="traq-select"
                value={traqConsecuencia}
                onChange={e => setTraqConsecuencia(e.target.value as any)}
              >
                <option value="Insignificante">Insignificante (daño menor a césped o plantas)</option>
                <option value="Menor">Menor (reparación leve de cerca o tapia de bajo costo)</option>
                <option value="Significativa">Significativa (daño a vehículos, techos o cableado local)</option>
                <option value="Severa">Severa (riesgo directo a vidas humanas o colapso estructural)</option>
              </select>
              <small style={{ color: 'var(--norm-text-muted)' }}>Estimación del valor del blanco y la severidad del impacto.</small>
            </div>
          </div>

          {/* Resultado Dinámico */}
          <div className={`traq-result-display ${traqCalculation.colorClass}`}>
            <div className="result-badge-text">
              <h3>Clasificación Final: {traqCalculation.level}</h3>
              <p>{traqCalculation.desc}</p>
            </div>
            <div className="traq-action-recommendation">
              <strong>Acción Recomendada:</strong> {traqCalculation.action}
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--norm-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--norm-primary)', fontWeight: 700 }}>
              <Info size={18} />
              <span>Criterio Técnico del Proyecto TCU-102A</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--norm-text-muted)', margin: 0, lineHeight: 1.5 }}>
              Esta evaluación preliminar no sustituye el informe pericial de un profesional forestal colegiado o arborista certificado ISA. 
              En el marco del proyecto TCU-102A capacitamos a brigadistas comunitarios y estudiantes de la UTN en el levantamiento digital de 
              estos parámetros a través de la plataforma <strong>SIGARU</strong>.
            </p>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 4: PREGUNTAS FRECUENTES (FAQ ACORDEÓN)
          ========================================================================= */}
      {activeTab === 'preguntas-frecuentes' && (
        <section className="faq-section-wrapper">
          <div className="section-header-centered">
            <h2>Preguntas Frecuentes sobre Legislación y Arbolado</h2>
            <p>
              Respuestas fundamentadas jurídicamente a las dudas más comunes de la ciudadanía guanacasteca 
              sobre permisos de corta, desmoche, multas y responsabilidades de gobiernos locales.
            </p>
          </div>

          <div className="faq-list-container">
            {FAQS_DATA.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="faq-accordion-item">
                  <button
                    className={`faq-header-button ${isOpen ? 'active' : ''}`}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  >
                    <span>{faq.pregunta}</span>
                    <ChevronDown size={20} />
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <div className="faq-short-summary">
                        <strong>En resumen:</strong> {faq.respuestaCorta}
                      </div>
                      <p className="faq-detailed-text">{faq.respuestaDetallada}</p>
                      <div className="faq-legal-reference">
                        <Scale size={14} />
                        <span><strong>Base Jurídica:</strong> {faq.fundamentoLegal}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 5: DIRECTORIO CANTONAL DE GUANACASTE
          ========================================================================= */}
      {activeTab === 'directorio' && (
        <section className="faq-section-wrapper">
          <div className="section-header-centered">
            <h2>Directorio de Gestión Ambiental Cantonal en Guanacaste</h2>
            <p>
              Canales oficiales de las Unidades de Gestión Ambiental (UGA) y entidades colaboradoras 
              para tramitar solicitudes de inspección, podas técnicas y denuncias ambientales.
            </p>
          </div>

          <div className="directorio-guanacaste-grid">
            {DIRECTIVAS_GUANACASTE.map(item => (
              <div key={item.canton} className="directorio-card">
                <span className="directorio-canton-badge">Cantón: {item.canton}</span>
                <h4>{item.entidad}</h4>

                <div className="directorio-info-row">
                  <Phone size={16} />
                  <span>{item.telefono}</span>
                </div>

                <div className="directorio-info-row">
                  <Mail size={16} />
                  <span>{item.correo}</span>
                </div>

                <div className="directorio-services">
                  <strong>Servicios y Competencias:</strong> {item.servicios}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '30px', padding: '18px 24px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <TreePine size={32} style={{ color: 'var(--norm-accent)', flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 4px', color: '#166534', fontSize: '1.05rem', fontWeight: 700 }}>
                Línea Gratuita de Denuncias Ambientales del MINAE (SITADA)
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d' }}>
                Para reportar tala ilegal en áreas de protección hídrica, invasión de humedales o caza de fauna silvestre: marque al <strong>1192</strong> o ingrese a <strong>sitada.go.cr</strong> las 24 horas del día.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          MODAL DETALLE DE NORMATIVA
          ========================================================================= */}
      {selectedNormativaModal && (
        <div className="normativa-modal-backdrop" onClick={() => setSelectedNormativaModal(null)}>
          <div className="normativa-modal-dialog" onClick={e => e.stopPropagation()}>
            <header className="normativa-modal-header">
              <h3>{selectedNormativaModal.titulo}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedNormativaModal(null)}
                aria-label="Cerrar ventana"
              >
                <X size={18} />
              </button>
            </header>

            <div className="normativa-modal-content">
              <div className="modal-detail-section">
                <h4>Identificación de la Norma</h4>
                <p><strong>Identificador:</strong> {selectedNormativaModal.numero}</p>
                <p><strong>Vigencia:</strong> {selectedNormativaModal.anoVigencia}</p>
                <p><strong>Ente Rector:</strong> {selectedNormativaModal.entidadEmisora}</p>
                <p><strong>Nivel de Obligatoriedad:</strong> {selectedNormativaModal.nivelObligatoriedad}</p>
              </div>

              <div className="modal-detail-section">
                <h4>Resumen y Objeto</h4>
                <p>{selectedNormativaModal.resumenEjecutivo}</p>
              </div>

              <div className="modal-detail-section">
                <h4>Articulado Técnico Completo</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedNormativaModal.articulosClave.map((art, idx) => (
                    <div key={idx} style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid var(--norm-border)' }}>
                      <div style={{ fontWeight: 700, color: 'var(--norm-primary)', marginBottom: '4px' }}>
                        {art.articulo}: {art.titulo}
                      </div>
                      <p style={{ fontSize: '0.88rem', margin: '0 0 6px', color: 'var(--norm-text-main)' }}>{art.contenido}</p>
                      <div style={{ fontSize: '0.82rem', color: '#166534', background: '#f0fdf4', padding: '6px 10px', borderRadius: '4px' }}>
                        <strong>Aplicación Práctica:</strong> {art.aplicacionPractica}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-detail-section">
                <h4>Cita Legal para Informes del TCU</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <span>
                    República de Costa Rica. {selectedNormativaModal.numero}: {selectedNormativaModal.titulo}. {selectedNormativaModal.anoVigencia}. Ente rector: {selectedNormativaModal.entidadEmisora}.
                  </span>
                  <button
                    style={{ background: 'var(--norm-primary)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginLeft: '12px', flexShrink: 0 }}
                    onClick={() => handleCopyLegalCitation(`República de Costa Rica. ${selectedNormativaModal.numero}: ${selectedNormativaModal.titulo}. ${selectedNormativaModal.anoVigencia}. Ente rector: ${selectedNormativaModal.entidadEmisora}.`)}
                  >
                    {copiedQuote ? <Check size={14} /> : <Copy size={14} />}
                    {copiedQuote ? '¡Copiado!' : 'Copiar Cita'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <a
                  href={selectedNormativaModal.enlaceOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--norm-accent)', color: '#fff', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  <span>Abrir Documento Oficial ({selectedNormativaModal.fuenteNombre})</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Normativa;
