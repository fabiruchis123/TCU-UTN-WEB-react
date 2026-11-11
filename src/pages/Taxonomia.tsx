import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  TreePine,
  ShieldCheck,
  Sun,
  Droplets,
  Layers,
  Calendar,
  AlertTriangle,
  Info,
  Maximize2,
  FileText,
  Printer,
  Compass,
  Building,
  Zap,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Share2,
  Check
} from 'lucide-react';
import {
  ESPECIES_ARBOREAS,
  EspecieArborea,
  getEstadisticasCatalogo,
  PRINCIPIOS_ARBORICULTURA,
  GLOSARIO_BOTANICO
} from '../data/taxonomiaData';
import '../styles/taxonomia.css';

export const Taxonomia: React.FC = () => {
  // Estados de filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrigen, setFilterOrigen] = useState<string>('Todos');
  const [filterPorte, setFilterPorte] = useState<string>('Todos');
  const [filterAptitud, setFilterAptitud] = useState<string>('Todos');
  const [filterFloracion, setFilterFloracion] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estado del modal de ficha técnica
  const [selectedEspecie, setSelectedEspecie] = useState<EspecieArborea | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'general' | 'plantacion' | 'distancias' | 'ecosistema'>('general');
  const [copiedLink, setCopiedLink] = useState(false);

  // Estadísticas del catálogo
  const stats = useMemo(() => getEstadisticasCatalogo(), []);

  // Filtrado reactivo en tiempo real
  const filteredEspecies = useMemo(() => {
    return ESPECIES_ARBOREAS.filter((esp) => {
      // Filtro de texto libre
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchComun = esp.nombreComun.toLowerCase().includes(query);
        const matchCientifico = esp.nombreCientifico.toLowerCase().includes(query);
        const matchFamilia = esp.taxonomia.familia.toLowerCase().includes(query);
        const matchOtros = esp.otrosNombres.some((n) => n.toLowerCase().includes(query));
        if (!matchComun && !matchCientifico && !matchFamilia && !matchOtros) {
          return false;
        }
      }

      // Filtro por Origen
      if (filterOrigen !== 'Todos') {
        if (filterOrigen === 'Nativo' && esp.origen !== 'Nativo') return false;
        if (filterOrigen === 'Introducido' && !esp.origen.includes('Introducido')) return false;
      }

      // Filtro por Porte
      if (filterPorte !== 'Todos' && esp.porte !== filterPorte) {
        return false;
      }

      // Filtro por Aptitud Urbana
      if (filterAptitud !== 'Todos' && esp.aptitudUrbana !== filterAptitud) {
        return false;
      }

      // Filtro por Época de Floración
      if (filterFloracion !== 'Todos' && esp.floracionEpoca !== filterFloracion) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filterOrigen, filterPorte, filterAptitud, filterFloracion]);

  // Resetear filtros
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterOrigen('Todos');
    setFilterPorte('Todos');
    setFilterAptitud('Todos');
    setFilterFloracion('Todos');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    filterOrigen !== 'Todos' ||
    filterPorte !== 'Todos' ||
    filterAptitud !== 'Todos' ||
    filterFloracion !== 'Todos';

  // Abrir modal
  const handleOpenModal = (esp: EspecieArborea) => {
    setSelectedEspecie(esp);
    setActiveModalTab('general');
    setCopiedLink(false);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setSelectedEspecie(null);
  };

  // Compartir / Copiar enlace simulado
  const handleShare = (esp: EspecieArborea) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Ficha Botánica TCU-102A: ${esp.nombreComun} (${esp.nombreCientifico}) - UTN Guanacaste`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Función para imprimir ficha
  const handlePrint = () => {
    window.print();
  };

  // Helper para fallback de imágenes
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/arb1.jpeg';
  };

  return (
    <div className="taxonomia-wrapper">
      {/* Hero Header */}
      <section className="taxonomia-hero">
        <div className="hero-pill-badge">
          <TreePine size={16} /> TCU-102A • UTN Sede Guanacaste
        </div>
        <h1>Guía Botánica y Taxonomía del Árbol Urbano</h1>
        <p className="hero-subtitle">
          Catálogo dendrológico técnico para la selección de especies arbóreas nativas y adaptadas al bosque
          tropical seco de Guanacaste. Planificación urbana armónica con aceras, redes de servicios y patrimonio natural.
        </p>

        {/* Métricas destacadas */}
        <div className="taxonomia-stats-grid">
          <div className="stat-card">
            <span className="stat-number">{stats.totalEspecies}</span>
            <span className="stat-label">Especies Catalogadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.nativas}</span>
            <span className="stat-label">Nativas Bosque Seco</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.aptasAceras}</span>
            <span className="stat-label">Aptas para Aceras</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.enPeligroOProtegidas}</span>
            <span className="stat-label">Protegidas / Amenazadas</span>
          </div>
        </div>
      </section>

      {/* Panel de Búsqueda y Filtros */}
      <section className="taxonomia-control-panel">
        {/* Barra de búsqueda */}
        <div className="search-bar-container">
          <Search className="search-icon-left" size={22} />
          <input
            type="text"
            className="search-input-field"
            placeholder="Buscar por nombre común (ej. Guanacaste, Cortez), científico (Enterolobium) o familia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Borrar búsqueda"
              aria-label="Borrar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filtros multifacéticos */}
        <div className="filters-grid">
          {/* Filtro Origen */}
          <div className="filter-group">
            <label className="filter-label">
              <Compass size={16} /> Origen Biogeográfico
            </label>
            <select
              className="filter-select"
              value={filterOrigen}
              onChange={(e) => setFilterOrigen(e.target.value)}
            >
              <option value="Todos">Todos los orígenes</option>
              <option value="Nativo">Nativo de Costa Rica</option>
              <option value="Introducido">Introducido / Naturalizado</option>
            </select>
          </div>

          {/* Filtro Porte */}
          <div className="filter-group">
            <label className="filter-label">
              <TreePine size={16} /> Porte y Altura
            </label>
            <select
              className="filter-select"
              value={filterPorte}
              onChange={(e) => setFilterPorte(e.target.value)}
            >
              <option value="Todos">Todos los portes</option>
              <option value="Pequeño (< 6m)">Pequeño (&lt; 6 m)</option>
              <option value="Mediano (6-15m)">Mediano (6 - 15 m)</option>
              <option value="Grande (> 15m)">Grande (&gt; 15 m)</option>
            </select>
          </div>

          {/* Filtro Aptitud Urbana */}
          <div className="filter-group">
            <label className="filter-label">
              <Building size={16} /> Aptitud Espacio Urbano
            </label>
            <select
              className="filter-select"
              value={filterAptitud}
              onChange={(e) => setFilterAptitud(e.target.value)}
            >
              <option value="Todos">Todas las ubicaciones</option>
              <option value="Apto aceras angostas">Apto aceras angostas</option>
              <option value="Bulevares y avenidas">Bulevares y avenidas</option>
              <option value="Solo parques y áreas abiertas">Solo parques y áreas abiertas</option>
            </select>
          </div>

          {/* Filtro Floración */}
          <div className="filter-group">
            <label className="filter-label">
              <Calendar size={16} /> Época de Floración
            </label>
            <select
              className="filter-select"
              value={filterFloracion}
              onChange={(e) => setFilterFloracion(e.target.value)}
            >
              <option value="Todos">Cualquier época</option>
              <option value="Época seca (verano)">Época seca (Diciembre - Abril)</option>
              <option value="Época lluviosa">Época lluviosa (Mayo - Noviembre)</option>
            </select>
          </div>
        </div>

        {/* Barra de resumen de filtros y controles de vista */}
        <div className="filter-summary-bar">
          <div className="results-count">
            Mostrando <strong>{filteredEspecies.length}</strong> de <strong>{ESPECIES_ARBOREAS.length}</strong> especies
          </div>

          <div className="view-controls">
            {hasActiveFilters && (
              <button className="reset-filters-btn" onClick={handleResetFilters}>
                <RotateCcw size={14} /> Limpiar Filtros
              </button>
            )}

            <div className="view-toggle-btn-group">
              <button
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Vista Cuadrícula"
                aria-label="Vista Cuadrícula"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                aria-label="Vista Lista"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Estado vacío cuando no hay resultados */}
      {filteredEspecies.length === 0 && (
        <div className="no-results-box">
          <AlertTriangle className="no-results-icon" size={48} />
          <h3>No se encontraron especies coincidentes</h3>
          <p>
            No hay especies en el catálogo botánico que cumplan con la combinación actual de filtros o el término buscado.
          </p>
          <button className="reset-filters-btn" onClick={handleResetFilters}>
            <RotateCcw size={16} /> Restablecer todos los filtros
          </button>
        </div>
      )}

      {/* Grid de Tarjetas Botánicas */}
      {viewMode === 'grid' && filteredEspecies.length > 0 && (
        <div className="taxonomia-cards-grid">
          {filteredEspecies.map((esp) => (
            <article key={esp.id} className="botanical-card">
              {/* Imagen y Badges */}
              <div className="card-image-box">
                <img
                  src={esp.imagenUrl}
                  alt={esp.nombreComun}
                  className="card-image"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="card-top-badges">
                  <span
                    className={`badge-origin ${
                      esp.origen === 'Nativo' ? 'nativo' : 'introducido'
                    }`}
                  >
                    {esp.origen}
                  </span>
                  {esp.amenazaConservacion !== 'Preocupación Menor' && (
                    <span
                      className={`badge-amenaza ${
                        esp.amenazaConservacion === 'Protegido en Costa Rica' ? 'protegido' : ''
                      }`}
                    >
                      {esp.amenazaConservacion}
                    </span>
                  )}
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="card-content">
                <span className="card-family-tag">{esp.taxonomia.familia}</span>
                <h3 className="card-common-name">{esp.nombreComun}</h3>
                <p className="card-scientific-name">{esp.nombreCientifico}</p>

                {/* Especificaciones clave */}
                <div className="specs-pills-row">
                  <div className="spec-pill" title="Altura máxima esperada">
                    <TreePine size={16} className="spec-pill-icon" />
                    <span>{esp.alturaMaxima}</span>
                  </div>
                  <div className="spec-pill" title="Requerimiento de luz solar">
                    <Sun size={16} className="spec-pill-icon" />
                    <span>{esp.requerimientoLuz}</span>
                  </div>
                  <div className="spec-pill" title="Temporada de floración">
                    <Calendar size={16} className="spec-pill-icon" />
                    <span>{esp.floracionEpoca.split(' ')[0]}</span>
                  </div>
                  <div className="spec-pill" title="Sistema radicular">
                    <Layers size={16} className="spec-pill-icon" />
                    <span>{esp.tipoRaiz.split('/')[0]}</span>
                  </div>
                </div>

                {/* Aptitud urbana badge */}
                <div className="aptitud-badge-container">
                  <span
                    className={`aptitud-chip ${
                      esp.aptitudUrbana === 'Apto aceras angostas'
                        ? 'aceras'
                        : esp.aptitudUrbana === 'Bulevares y avenidas'
                        ? 'bulevares'
                        : 'parques'
                    }`}
                  >
                    <Building size={14} />
                    {esp.aptitudUrbana}
                  </span>
                </div>

                {/* Beneficios ecosistémicos resumidos */}
                <div className="benefits-chips-list">
                  {esp.beneficiosEcosistemicos.slice(0, 2).map((ben, idx) => (
                    <span key={idx} className="benefit-chip">
                      ✓ {ben.length > 45 ? ben.substring(0, 45) + '...' : ben}
                    </span>
                  ))}
                </div>

                {/* Botón Ver Ficha Técnica */}
                <button
                  className="view-details-btn"
                  onClick={() => handleOpenModal(esp)}
                  aria-label={`Ver ficha técnica de ${esp.nombreComun}`}
                >
                  <FileText size={17} />
                  Ver Ficha Botánica Completa
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Vista de Lista */}
      {viewMode === 'list' && filteredEspecies.length > 0 && (
        <div className="taxonomia-cards-list">
          {filteredEspecies.map((esp) => (
            <article key={esp.id} className="botanical-card-list">
              <div className="list-image-box">
                <img
                  src={esp.imagenUrl}
                  alt={esp.nombreComun}
                  className="card-image"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="card-top-badges">
                  <span
                    className={`badge-origin ${
                      esp.origen === 'Nativo' ? 'nativo' : 'introducido'
                    }`}
                  >
                    {esp.origen}
                  </span>
                </div>
              </div>

              <div className="list-content">
                <span className="card-family-tag">{esp.taxonomia.familia}</span>
                <h3 className="card-common-name">{esp.nombreComun}</h3>
                <p className="card-scientific-name">{esp.nombreCientifico}</p>

                <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '12px' }}>
                  {esp.curiosidadesEtnobotanicas.substring(0, 140)}...
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <span
                    className={`aptitud-chip ${
                      esp.aptitudUrbana === 'Apto aceras angostas'
                        ? 'aceras'
                        : esp.aptitudUrbana === 'Bulevares y avenidas'
                        ? 'bulevares'
                        : 'parques'
                    }`}
                  >
                    <Building size={14} /> {esp.aptitudUrbana}
                  </span>
                  <span className="benefit-chip">Altura: {esp.alturaMaxima}</span>
                  <span className="benefit-chip">Floración: {esp.floracionMeses}</span>
                </div>
              </div>

              <div className="list-actions">
                <button
                  className="view-details-btn"
                  onClick={() => handleOpenModal(esp)}
                >
                  <FileText size={16} /> Ver Ficha
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal de Ficha Técnica Completa */}
      {selectedEspecie && (
        <div className="botanical-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="botanical-modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Botón cerrar */}
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
              title="Cerrar ventana"
              aria-label="Cerrar ventana"
            >
              <X size={20} />
            </button>

            {/* Cabecera visual de la ficha */}
            <div
              className="modal-header-hero"
              style={{ backgroundImage: `url(${selectedEspecie.imagenUrl})` }}
            >
              <div className="modal-header-overlay" />
              <div className="modal-header-content">
                <div className="modal-header-badges">
                  <span
                    className={`badge-origin ${
                      selectedEspecie.origen === 'Nativo' ? 'nativo' : 'introducido'
                    }`}
                  >
                    {selectedEspecie.origen}
                  </span>
                  <span className="badge-origin nativo" style={{ background: '#2563eb' }}>
                    {selectedEspecie.porte}
                  </span>
                  {selectedEspecie.amenazaConservacion !== 'Preocupación Menor' && (
                    <span className="badge-amenaza">
                      Estado: {selectedEspecie.amenazaConservacion}
                    </span>
                  )}
                </div>
                <h2 className="modal-common-name">{selectedEspecie.nombreComun}</h2>
                <div className="modal-scientific-name">
                  {selectedEspecie.nombreCientifico}
                  {selectedEspecie.sinonimos && selectedEspecie.sinonimos.length > 0 && (
                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1', marginLeft: '8px' }}>
                      (Sin: {selectedEspecie.sinonimos.join(', ')})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navegación por pestañas del modal */}
            <div className="modal-nav-tabs">
              <button
                className={`modal-tab-btn ${activeModalTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('general')}
              >
                <Info size={16} /> Dendrología & Taxonomía
              </button>
              <button
                className={`modal-tab-btn ${activeModalTab === 'distancias' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('distancias')}
              >
                <ShieldCheck size={16} /> Distanciamientos Urbanos
              </button>
              <button
                className={`modal-tab-btn ${activeModalTab === 'plantacion' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('plantacion')}
              >
                <TreePine size={16} /> Guía de Plantación
              </button>
              <button
                className={`modal-tab-btn ${activeModalTab === 'ecosistema' ? 'active' : ''}`}
                onClick={() => setActiveModalTab('ecosistema')}
              >
                <Sparkles size={16} /> Ecología & Etnobotánica
              </button>
            </div>

            {/* Cuerpo del Modal con scroll */}
            <div className="modal-body-scroll">
              {/* Tab 1: Dendrología y Taxonomía */}
              {activeModalTab === 'general' && (
                <div>
                  {/* Jerarquía Taxonómica */}
                  <div className="taxonomy-hierarchy-bar">
                    <span className="tax-item">Reino: <strong>{selectedEspecie.taxonomia.reino}</strong></span>
                    <span className="tax-separator">/</span>
                    <span className="tax-item">División: <strong>{selectedEspecie.taxonomia.division}</strong></span>
                    <span className="tax-separator">/</span>
                    <span className="tax-item">Clase: <strong>{selectedEspecie.taxonomia.clase}</strong></span>
                    <span className="tax-separator">/</span>
                    <span className="tax-item">Orden: <strong>{selectedEspecie.taxonomia.orden}</strong></span>
                    <span className="tax-separator">/</span>
                    <span className="tax-item">Familia: <strong>{selectedEspecie.taxonomia.familia}</strong></span>
                    <span className="tax-separator">/</span>
                    <span className="tax-item">Género: <strong>{selectedEspecie.taxonomia.genero}</strong></span>
                    <span className="tax-separator">/</span>
                    <span className="tax-item">Especie: <strong>{selectedEspecie.taxonomia.especie}</strong></span>
                  </div>

                  {/* Cuadrícula de características */}
                  <div className="info-section-grid">
                    <div className="info-card-block">
                      <h4 className="info-card-title">
                        <TreePine size={18} /> Dimensiones y Follaje
                      </h4>
                      <div className="info-data-row">
                        <span className="info-data-label">Altura madura:</span>
                        <span className="info-data-value">{selectedEspecie.alturaMaxima}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Diámetro de copa:</span>
                        <span className="info-data-value">{selectedEspecie.diametroCopa}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Forma de la copa:</span>
                        <span className="info-data-value">{selectedEspecie.formaCopa}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Comportamiento foliar:</span>
                        <span className="info-data-value">{selectedEspecie.follaje}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Tasa de crecimiento:</span>
                        <span className="info-data-value">{selectedEspecie.tasaCrecimiento}</span>
                      </div>
                    </div>

                    <div className="info-card-block">
                      <h4 className="info-card-title">
                        <Sun size={18} /> Fenología y Requerimientos
                      </h4>
                      <div className="info-data-row">
                        <span className="info-data-label">Época de floración:</span>
                        <span className="info-data-value">{selectedEspecie.floracionEpoca}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Meses activos:</span>
                        <span className="info-data-value">{selectedEspecie.floracionMeses}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Color de flor:</span>
                        <span className="info-data-value">{selectedEspecie.colorFlor}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Exposición solar:</span>
                        <span className="info-data-value">{selectedEspecie.requerimientoLuz}</span>
                      </div>
                      <div className="info-data-row">
                        <span className="info-data-label">Régimen hídrico:</span>
                        <span className="info-data-value">{selectedEspecie.requerimientoRiego}</span>
                      </div>
                    </div>
                  </div>

                  {/* Nombres vernáculos adicionales */}
                  {selectedEspecie.otrosNombres.length > 0 && (
                    <div style={{ marginTop: '10px', fontSize: '0.88rem', color: '#64748b' }}>
                      <strong>Otros nombres vernáculos:</strong> {selectedEspecie.otrosNombres.join(', ')}.
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Distanciamientos Urbanos */}
              {activeModalTab === 'distancias' && (
                <div>
                  <div className="distances-visual-box">
                    <h3 className="distances-title">
                      <ShieldCheck size={22} /> Matriz de Distanciamientos Mínimos de Seguridad
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#166534', marginBottom: '18px' }}>
                      Parámetros técnicos estandarizados por TCU-102A para evitar el fracturamiento de pavimentos,
                      conflictos con cableado eléctrico de Coopeguanacaste/ICE y colisión con acueductos municipales.
                    </p>

                    <div className="distances-grid">
                      <div className="distance-item">
                        <Building className="distance-item-icon" size={24} />
                        <div>
                          <div className="distance-item-name">Aceras y Cordón de Caño</div>
                          <div className="distance-item-spec">
                            {selectedEspecie.distanciamientoMinimo.aceras}
                          </div>
                        </div>
                      </div>

                      <div className="distance-item">
                        <Droplets className="distance-item-icon" size={24} />
                        <div>
                          <div className="distance-item-name">Tuberías Subterráneas</div>
                          <div className="distance-item-spec">
                            {selectedEspecie.distanciamientoMinimo.tuberias}
                          </div>
                        </div>
                      </div>

                      <div className="distance-item">
                        <Zap className="distance-item-icon" size={24} />
                        <div>
                          <div className="distance-item-name">Tendido Eléctrico Aéreo</div>
                          <div className="distance-item-spec">
                            {selectedEspecie.distanciamientoMinimo.cableadoAereo}
                          </div>
                        </div>
                      </div>

                      <div className="distance-item">
                        <Compass className="distance-item-icon" size={24} />
                        <div>
                          <div className="distance-item-name">Cimientos y Fachadas</div>
                          <div className="distance-item-spec">
                            {selectedEspecie.distanciamientoMinimo.edificaciones}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="info-card-block" style={{ marginTop: '20px' }}>
                    <h4 className="info-card-title">
                      <Layers size={18} /> Comportamiento del Sistema Radicular
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.5' }}>
                      Tipo de raíz: <strong>{selectedEspecie.tipoRaiz}</strong>.
                      {selectedEspecie.tipoRaiz.includes('Pivotante')
                        ? ' Esta especie profundiza su anclaje rápidamente hacia los estratos inferiores, por lo que es excepcionalmente segura frente a ráfagas de viento y respeta obras de concreto superficiales si se mantiene el alcorque con permeable.'
                        : selectedEspecie.tipoRaiz.includes('Superficial')
                        ? ' Las raíces forman contrafuertes y sistemas tabulares extendidos de gran diámetro. No debe confinarse en aceras o jardineras angostas para evitar roturas de pavimento y levantamiento de calzadas peatonales.'
                        : ' Raíces no agresivas con crecimiento moderado que permiten convivir con infraestructura peatonal bajo monitoreo periódico.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Guía de Plantación */}
              {activeModalTab === 'plantacion' && (
                <div>
                  <div className="planting-steps-list">
                    <div className="planting-step-item">
                      <div className="step-number-bubble">1</div>
                      <div className="step-details">
                        <strong>Dimensiones de la Hoyada</strong>
                        <p>{selectedEspecie.guiaPlantacion.tamanoHoyada}</p>
                      </div>
                    </div>

                    <div className="planting-step-item">
                      <div className="step-number-bubble">2</div>
                      <div className="step-details">
                        <strong>Sustrato y Enmienda Orgánica</strong>
                        <p>{selectedEspecie.guiaPlantacion.sustratoRecomendado}</p>
                      </div>
                    </div>

                    <div className="planting-step-item">
                      <div className="step-number-bubble">3</div>
                      <div className="step-details">
                        <strong>Régimen de Riego en Establecimiento</strong>
                        <p>{selectedEspecie.guiaPlantacion.riegoInicial}</p>
                      </div>
                    </div>

                    <div className="planting-step-item">
                      <div className="step-number-bubble">4</div>
                      <div className="step-details">
                        <strong>Podas Formativas y Sanitarias</strong>
                        <p>{selectedEspecie.guiaPlantacion.podaRecomendacion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Ecología y Etnobotánica */}
              {activeModalTab === 'ecosistema' && (
                <div>
                  {/* Curiosidades Etnobotánicas */}
                  <div className="etnobotanica-box">
                    <h4>
                      <BookOpen size={18} /> Patrimonio Cultural y Etnobotánica Guanacasteca
                    </h4>
                    <p>{selectedEspecie.curiosidadesEtnobotanicas}</p>
                  </div>

                  <div className="info-section-grid">
                    <div className="info-card-block">
                      <h4 className="info-card-title">
                        <Sparkles size={18} /> Servicios Ecosistémicos
                      </h4>
                      <ul className="bullet-benefits-list">
                        {selectedEspecie.beneficiosEcosistemicos.map((ben, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} className="bullet-check-icon" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="info-card-block">
                      <h4 className="info-card-title">
                        <TreePine size={18} /> Fauna Silvestre Asociada
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>
                        Especies de aves, mamíferos e insectos polinizadores que se benefician de sus flores, frutos o dosel:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedEspecie.faunaAsociada.map((fauna, i) => (
                          <span
                            key={i}
                            style={{
                              background: '#e0f2fe',
                              color: '#0369a1',
                              padding: '5px 10px',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}
                          >
                            • {fauna}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pie de acción del modal */}
            <div className="modal-footer-actions">
              <button
                className="modal-close-secondary-btn"
                onClick={() => handleShare(selectedEspecie)}
              >
                {copiedLink ? (
                  <>
                    <Check size={16} style={{ color: '#16a34a' }} /> Copiado al portapapeles
                  </>
                ) : (
                  <>
                    <Share2 size={16} /> Compartir Ficha
                  </>
                )}
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="modal-print-btn" onClick={handlePrint}>
                  <Printer size={16} /> Imprimir / PDF
                </button>
                <button className="modal-close-secondary-btn" onClick={handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sección Educativa: Principios de Arboricultura Urbana */}
      <section className="educational-section">
        <h2 className="educational-section-title">
          Principios de Arboricultura Urbana en Guanacaste
        </h2>
        <p className="educational-section-subtitle">
          Criterios técnicos adoptados por el TCU-102A para maximizar los beneficios bioclimáticos de los árboles
          en comunidades calurosas sin comprometer la seguridad pública ni la infraestructura civil.
        </p>

        <div className="principles-grid">
          {PRINCIPIOS_ARBORICULTURA.map((principio, idx) => (
            <div key={idx} className="principle-card">
              <div className="principle-icon-circle">
                {idx === 0 && <TreePine size={24} />}
                {idx === 1 && <ShieldCheck size={24} />}
                {idx === 2 && <Droplets size={24} />}
                {idx === 3 && <Sun size={24} />}
              </div>
              <h4>{principio.titulo}</h4>
              <p>{principio.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Glosario Botánico */}
        <h3
          style={{
            textAlign: 'center',
            color: '#234175',
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: '20px'
          }}
        >
          Glosario Técnico de Términos Forestales Urbanos
        </h3>
        <div className="glossary-accordion">
          {GLOSARIO_BOTANICO.map((item, idx) => (
            <div key={idx} className="glossary-item">
              <div className="glossary-term">{item.termino}</div>
              <p className="glossary-def">{item.definicion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Taxonomia;
