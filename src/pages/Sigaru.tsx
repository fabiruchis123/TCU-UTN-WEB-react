import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Layers,
  TreePine,
  Trees,
  Search,
  Download,
  ShieldCheck,
  Compass,
  Activity,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  Filter,
  Eye,
  FileText,
  Database,
  Smartphone,
  ExternalLink,
  BarChart3,
  Building2,
  Sparkles,
  Calendar,
  Ruler,
  Crosshair,
  RefreshCw,
  X,
  Maximize2,
  Minimize2,
  Check,
  Copy,
  ChevronRight,
  Send
} from 'lucide-react';
import { sanitizeText, sanitizePhone } from '../utils/security';
import {
  SIGARU_KPIS,
  SIGARU_LAYERS,
  ARBOLES_SIGARU,
  TECH_STEPS,
  MUNICIPAL_PARTNERS,
  RESOURCE_DOWNLOADS,
  TreePoint
} from '../data/sigaruData';
import { Survey123Modal, TreeContextData } from '../components/Survey123Modal';
import { Survey123SyncPipeline } from '../components/Survey123SyncPipeline';
import '../styles/sigaru.css';

export const Sigaru: React.FC = () => {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState<'visor-sig' | 'catalogo-arboles' | 'metodologia-sig' | 'alianzas-cantonales' | 'datos-abiertos'>('visor-sig');

  // Filter States
  const [selectedCanton, setSelectedCanton] = useState<string>('Todos');
  const [selectedEstado, setSelectedEstado] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map Controls State
  const [mapBaseTheme, setMapBaseTheme] = useState<'dark-carto' | 'satellite' | 'streets'>('dark-carto');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeLayers, setActiveLayers] = useState<{ [key: string]: boolean }>({
    arboles: true,
    parques: true,
    infraestructura: true,
    sombra: false,
    alertas: true
  });
  const [cursorCoords, setCursorCoords] = useState<{ lat: string; lng: string }>({
    lat: '10.5124° N',
    lng: '-85.3412° W'
  });
  const [isFullscreenMap, setIsFullscreenMap] = useState<boolean>(false);

  // Selected Tree Inspector
  const [selectedTree, setSelectedTree] = useState<TreePoint | null>(ARBOLES_SIGARU[0]);
  const [hoveredTree, setHoveredTree] = useState<TreePoint | null>(null);

  // Copy feedback state
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Citizen Report Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  // Survey123 Modal State
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [activeSurveyFormId, setActiveSurveyFormId] = useState<string>('datos-generales');
  const [surveyTreeContext, setSurveyTreeContext] = useState<TreeContextData | null>(null);

  const [reportFormData, setReportFormData] = useState({
    canton: 'Liberia',
    tipoProblema: 'Ramas en contacto con tendido eléctrico',
    direccion: '',
    descripcion: '',
    contactoNombre: '',
    telefono: ''
  });
  const [reportSuccessTicket, setReportSuccessTicket] = useState<string | null>(null);

  // Layer toggle handler
  const handleToggleLayer = (layerId: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setSelectedCanton('Todos');
    setSelectedEstado('Todos');
    setSearchQuery('');
  };

  // Filtered Trees
  const filteredTrees = useMemo(() => {
    return ARBOLES_SIGARU.filter(tree => {
      const matchCanton = selectedCanton === 'Todos' || tree.canton === selectedCanton;
      const matchEstado = selectedEstado === 'Todos' || tree.estadoFitosanitario === selectedEstado;
      const term = searchQuery.toLowerCase().trim();
      const matchSearch =
        tree.nombreComun.toLowerCase().includes(term) ||
        tree.nombreCientifico.toLowerCase().includes(term) ||
        tree.id.toLowerCase().includes(term) ||
        tree.canton.toLowerCase().includes(term) ||
        tree.ubicacionDetalle.toLowerCase().includes(term);

      return matchCanton && matchEstado && matchSearch;
    });
  }, [selectedCanton, selectedEstado, searchQuery]);

  // Handle map cursor coordinate display
  const handleMapMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    // Simulate Guanacaste Bounding Box Coordinates (Lat ~10.0 to 10.9 N, Lng -85.7 to -84.9 W)
    const lat = (10.85 - yPct * 0.8).toFixed(4);
    const lng = (-85.75 + xPct * 0.8).toFixed(4);
    setCursorCoords({ lat: `${lat}° N`, lng: `${lng}° W` });
  };

  // Copy coordinates to clipboard
  const handleCopyCoords = (lat: number, lng: number) => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2200);
  };

  // Simulate Municipal Work Order dispatch
  const handleSimulateWorkOrder = (tree: TreePoint) => {
    setActionNotice(`¡Orden de intervención generada para el árbol ${tree.id}! Notificada a la Unidad Ambiental de la ${tree.canton}.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Manejador para abrir Survey123 con contexto de árbol
  const handleOpenSurveyModal = (formId: string = 'datos-generales', tree: TreePoint | null = selectedTree) => {
    setActiveSurveyFormId(formId);
    if (tree) {
      setSurveyTreeContext({
        id: tree.id,
        code: tree.id,
        commonName: tree.nombreComun,
        scientificName: tree.nombreCientifico,
        canton: tree.canton,
        lat: tree.coordenadas.lat,
        lng: tree.coordenadas.lng,
        dap: tree.dap,
        height: tree.altura,
        health: tree.estadoFitosanitario
      });
    } else {
      setSurveyTreeContext(null);
    }
    setIsSurveyModalOpen(true);
  };

  // Citizen Report Submission con sanitización de entradas
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNombre = sanitizeText(reportFormData.contactoNombre, 100);
    const cleanTelefono = sanitizePhone(reportFormData.telefono);
    const cleanDireccion = sanitizeText(reportFormData.direccion, 250);
    const cleanDescripcion = sanitizeText(reportFormData.descripcion, 1000);

    if (!cleanDireccion || !cleanDescripcion || !cleanNombre || !cleanTelefono) {
      alert('Por favor complete todos los campos requeridos con información válida.');
      return;
    }

    const ticketId = `SIGARU-TICK-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportSuccessTicket(ticketId);
    setTimeout(() => {
      setIsReportModalOpen(false);
      setReportSuccessTicket(null);
      setReportFormData({
        canton: 'Liberia',
        tipoProblema: 'Ramas en contacto con tendido eléctrico',
        direccion: '',
        descripcion: '',
        contactoNombre: '',
        telefono: ''
      });
      setActionNotice(`Reporte ciudadano ${ticketId} registrado con éxito (${cleanNombre}). Gracias por colaborar en el arbolado de Guanacaste.`);
      setTimeout(() => setActionNotice(null), 5000);
    }, 2800);
  };

  return (
    <div className="sigaru-page-container">
      {/* Toast Notification */}
      {actionNotice && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 10000,
            background: 'var(--sig-primary)',
            color: '#ffffff',
            padding: '14px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderLeft: '5px solid var(--sig-accent)',
            animation: 'slideInRight 0.3s ease'
          }}
        >
          <CheckCircle2 color="#47c73b" size={22} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{actionNotice}</span>
        </div>
      )}

      {/* ==========================================================================
          HERO BANNER
          ========================================================================== */}
      <section className="sigaru-hero">
        <div className="sigaru-hero-content">
          <div className="sigaru-badge-pill">
            <Sparkles size={16} />
            <span>Sistema de Información Geográfica del Arbolado Urbano · TCU-102A UTN</span>
          </div>

          <h1>
            Plataforma <span>SIGARU</span>: Gestión y Diagnóstico Espacial del Árbol Urbano
          </h1>

          <p className="sigaru-hero-description">
            SIGARU integra tecnologías geoespaciales de vanguardia (ArcGIS Online, QGIS, Survey123 y GNSS diferencial)
            para georreferenciar, evaluar y monitorear el estado fitosanitario del patrimonio arbóreo en espacios públicos,
            parques y bulevares de Guanacaste. Diseñado para prevenir riesgos de caída sobre el tendido eléctrico y
            planificar podas técnicas y reforestación con especies nativas adaptadas al bosque seco tropical.
          </p>

          <div className="sigaru-hero-actions">
            <button
              className="btn-sigaru-primary"
              onClick={() => {
                setActiveTab('visor-sig');
                const el = document.getElementById('visor-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Compass size={18} />
              <span>Explorar Visor SIG Interactivo</span>
            </button>

            <button
              className="btn-sigaru-outline"
              onClick={() => {
                setActiveTab('catalogo-arboles');
                const el = document.getElementById('visor-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Database size={18} />
              <span>Consultar Base de Datos ({SIGARU_KPIS.totalArboles.toLocaleString()} árboles)</span>
            </button>

            <button
              className="btn-sigaru-outline"
              onClick={() => setIsReportModalOpen(true)}
              style={{ background: 'rgba(71, 199, 59, 0.2)', borderColor: 'rgba(71, 199, 59, 0.5)' }}
            >
              <AlertTriangle size={18} color="#86efac" />
              <span>Reportar Árbol en Riesgo</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          KPIS & METRICS BAR
          ========================================================================== */}
      <section className="sigaru-kpi-grid">
        {/* KPI 1 */}
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <TreePine size={22} />
            </div>
            <span className="kpi-badge" style={{ background: '#d1fae5', color: '#047857' }}>
              Georreferenciados
            </span>
          </div>
          <div className="kpi-value">+{SIGARU_KPIS.totalArboles.toLocaleString()}</div>
          <div className="kpi-label">Árboles Inventariados</div>
          <div className="kpi-subtext">
            <Compass size={13} />
            <span>Precisión GNSS submétrica (CR05 / WGS84)</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-progress-bar" style={{ width: '85%', background: '#10b981' }}></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <Trees size={22} />
            </div>
            <span className="kpi-badge" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
              Biodiversidad
            </span>
          </div>
          <div className="kpi-value">{SIGARU_KPIS.especiesRegistradas}</div>
          <div className="kpi-label">Especies Registradas</div>
          <div className="kpi-subtext">
            <CheckCircle2 size={13} />
            <span>82% Nativas del Bosque Seco Tropical</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-progress-bar" style={{ width: '92%', background: '#3b82f6' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Activity size={22} />
            </div>
            <span className="kpi-badge" style={{ background: '#fde68a', color: '#92400e' }}>
              Semáforo Fitosanitario
            </span>
          </div>
          <div className="kpi-value" style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ color: '#16a34a', fontSize: '1.4rem' }}>{SIGARU_KPIS.saludBuenoPct}%</span>
            <span style={{ color: '#d97706', fontSize: '1.1rem' }}>{SIGARU_KPIS.saludRegularPct}%</span>
            <span style={{ color: '#dc2626', fontSize: '1.1rem' }}>{SIGARU_KPIS.saludCriticoPct}%</span>
          </div>
          <div className="kpi-label">Sano / Regular / Crítico</div>
          <div className="kpi-subtext">
            <ShieldCheck size={13} />
            <span>Evaluación estandarizada TRAQ - ISA</span>
          </div>
          <div className="kpi-progress" style={{ display: 'flex' }}>
            <div style={{ width: '64%', background: '#22c55e', height: '100%' }}></div>
            <div style={{ width: '26%', background: '#f59e0b', height: '100%' }}></div>
            <div style={{ width: '10%', background: '#ef4444', height: '100%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#fdf2f8', color: '#db2777' }}>
              <Zap size={22} />
            </div>
            <span className="kpi-badge" style={{ background: '#fce7f3', color: '#9d174d' }}>
              Seguridad Eléctrica
            </span>
          </div>
          <div className="kpi-value">{SIGARU_KPIS.podasProgramadas}</div>
          <div className="kpi-label">Podas Técnicas en Agenda</div>
          <div className="kpi-subtext">
            <Building2 size={13} />
            <span>Coordinación con Coopeguanacaste & ICE</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-progress-bar" style={{ width: '70%', background: '#db2777' }}></div>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon-wrap" style={{ background: '#f0fdf4', color: '#15803d' }}>
              <Layers size={22} />
            </div>
            <span className="kpi-badge" style={{ background: '#dcfce7', color: '#166534' }}>
              Mitigación Térmica
            </span>
          </div>
          <div className="kpi-value">+{Math.round(SIGARU_KPIS.coberturaSombraM2 / 1000)}k m²</div>
          <div className="kpi-label">Cobertura de Sombra Urbana</div>
          <div className="kpi-subtext">
            <BarChart3 size={13} />
            <span>Reducción de hasta 4.2°C en aceras</span>
          </div>
          <div className="kpi-progress">
            <div className="kpi-progress-bar" style={{ width: '80%', background: '#15803d' }}></div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          NAVIGATION TABS
          ========================================================================== */}
      <nav className="sigaru-tabs-nav" aria-label="Navegación de secciones SIGARU">
        <button
          className={`sigaru-tab-btn ${activeTab === 'visor-sig' ? 'active' : ''}`}
          onClick={() => setActiveTab('visor-sig')}
        >
          <Compass size={18} />
          <span>Visor GIS Interactivo</span>
        </button>

        <button
          className={`sigaru-tab-btn ${activeTab === 'catalogo-arboles' ? 'active' : ''}`}
          onClick={() => setActiveTab('catalogo-arboles')}
        >
          <Database size={18} />
          <span>Inventario Catastral ({filteredTrees.length})</span>
        </button>

        <button
          className={`sigaru-tab-btn ${activeTab === 'metodologia-sig' ? 'active' : ''}`}
          onClick={() => setActiveTab('metodologia-sig')}
        >
          <Layers size={18} />
          <span>Arquitectura & Metodología</span>
        </button>

        <button
          className={`sigaru-tab-btn ${activeTab === 'alianzas-cantonales' ? 'active' : ''}`}
          onClick={() => setActiveTab('alianzas-cantonales')}
        >
          <Building2 size={18} />
          <span>Alianzas Municipales ({MUNICIPAL_PARTNERS.length})</span>
        </button>

        <button
          className={`sigaru-tab-btn ${activeTab === 'datos-abiertos' ? 'active' : ''}`}
          onClick={() => setActiveTab('datos-abiertos')}
        >
          <Download size={18} />
          <span>Descargas y Capas Abiertas</span>
        </button>
      </nav>

      {/* ==========================================================================
          TAB 1: VISOR GIS INTERACTIVO
          ========================================================================== */}
      {activeTab === 'visor-sig' && (
        <div id="visor-section" className="gis-viewer-container">
          {/* Viewer Top Header */}
          <div className="gis-viewer-header">
            <div className="gis-header-title">
              <div className="gis-status-indicator"></div>
              <div>
                <h3>Visor Geoespacial SIGARU v2.4 (Guanacaste, Costa Rica)</h3>
                <p>Capa activa: Proyección Cartográfica Oficial CR05 / WGS84 · Servidor WebGIS UTN</p>
              </div>
            </div>

            {/* Toolbar Buttons */}
            <div className="gis-controls-toolbar">
              <div style={{ display: 'flex', gap: '4px', background: '#1e293b', padding: '3px', borderRadius: '8px' }}>
                <button
                  className={`gis-tool-btn ${mapBaseTheme === 'dark-carto' ? 'active' : ''}`}
                  onClick={() => setMapBaseTheme('dark-carto')}
                  title="Mapa Base Cartográfico Oscuro"
                >
                  Cartográfico
                </button>
                <button
                  className={`gis-tool-btn ${mapBaseTheme === 'satellite' ? 'active' : ''}`}
                  onClick={() => setMapBaseTheme('satellite')}
                  title="Imagen Aérea / Satelital"
                >
                  Satelital
                </button>
                <button
                  className={`gis-tool-btn ${mapBaseTheme === 'streets' ? 'active' : ''}`}
                  onClick={() => setMapBaseTheme('streets')}
                  title="Red Vial y Manzanas Urbanas"
                >
                  Calles
                </button>
              </div>

              <button className="gis-tool-btn" onClick={handleResetZoom} title="Centrar Mapa en Guanacaste">
                <RefreshCw size={15} />
                <span>Restablecer</span>
              </button>

              <button
                className="gis-survey-btn"
                onClick={() => handleOpenSurveyModal('datos-generales', selectedTree)}
                title="Lanzar ArcGIS Survey123 para censo en campo con brigadas UTN"
              >
                <Smartphone size={15} />
                <span>Capturar en Campo (Survey123)</span>
              </button>

              <button
                className="gis-tool-btn"
                onClick={() => setIsFullscreenMap(!isFullscreenMap)}
                title="Alternar Pantalla Completa"
              >
                {isFullscreenMap ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                <span>{isFullscreenMap ? 'Normal' : 'Maximizar'}</span>
              </button>
            </div>
          </div>

          {/* Viewer Filter Strip */}
          <div className="gis-filters-strip">
            <div className="gis-filters-group">
              <div className="gis-filter-label">
                <Filter size={15} />
                <span>Cantón:</span>
              </div>
              <select
                className="gis-select"
                value={selectedCanton}
                onChange={e => setSelectedCanton(e.target.value)}
              >
                <option value="Todos">Todos los Cantones (Guanacaste)</option>
                <option value="Liberia">Liberia (Cabecera Provincial)</option>
                <option value="Cañas">Cañas (Sede Central UTN)</option>
                <option value="Bagaces">Bagaces</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Nicoya">Nicoya</option>
              </select>
            </div>

            <div className="gis-filters-group">
              <div className="gis-filter-label">
                <Activity size={15} />
                <span>Estado Fitosanitario:</span>
              </div>
              <select
                className="gis-select"
                value={selectedEstado}
                onChange={e => setSelectedEstado(e.target.value)}
              >
                <option value="Todos">Todos los Estados (Verde, Amarillo, Rojo)</option>
                <option value="Bueno">Bueno / Sano (Vigoroso)</option>
                <option value="Regular">Regular / Mantenimiento Programado</option>
                <option value="Crítico">Crítico / Riesgo Inminente</option>
              </select>
            </div>

            <div className="gis-search-input-wrap">
              <Search className="gis-search-icon" size={16} />
              <input
                type="text"
                placeholder="Buscar especie, código o calle..."
                value={searchQuery}
                onChange={e => setSearchQuery(sanitizeText(e.target.value, 80))}
              />
            </div>
          </div>

          {/* Viewer Workspace */}
          <div className="gis-workspace" style={{ height: isFullscreenMap ? '780px' : '560px' }}>
            {/* Layers Toggle Drawer Panel */}
            <div className="gis-layers-panel">
              <div className="gis-layers-panel-header">
                <h4>
                  <Layers size={16} color="#47c73b" />
                  <span>Control de Capas SIG</span>
                </h4>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>5 activas</span>
              </div>

              {SIGARU_LAYERS.map(layer => (
                <div key={layer.id} className="gis-layer-item">
                  <label htmlFor={`layer-${layer.id}`}>
                    <span className="layer-color-dot" style={{ background: layer.color }}></span>
                    <span>{layer.nombre}</span>
                  </label>
                  <input
                    type="checkbox"
                    id={`layer-${layer.id}`}
                    className="gis-layer-checkbox"
                    checked={!!activeLayers[layer.id]}
                    onChange={() => handleToggleLayer(layer.id)}
                  />
                </div>
              ))}

              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #334155', fontSize: '0.72rem', color: '#94a3b8' }}>
                Mostrando <strong style={{ color: '#47c73b' }}>{filteredTrees.length}</strong> de {ARBOLES_SIGARU.length} ejemplares georreferenciados del muestreo piloto.
              </div>
            </div>

            {/* SVG Map Canvas Display */}
            <div className="gis-map-canvas-area" onMouseMove={handleMapMouseMove}>
              <svg
                className="gis-svg-map"
                viewBox="0 0 1000 650"
                preserveAspectRatio="xMidYMid slice"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)'
                }}
              >
                <defs>
                  {/* Gradients and Patterns for Base Maps */}
                  <linearGradient id="bgGuanacasteDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0b1329" />
                    <stop offset="50%" stopColor="#111c38" />
                    <stop offset="100%" stopColor="#0d182b" />
                  </linearGradient>

                  <linearGradient id="bgSatellite" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0a1912" />
                    <stop offset="50%" stopColor="#12251a" />
                    <stop offset="100%" stopColor="#0f2015" />
                  </linearGradient>

                  <linearGradient id="bgStreets" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#182030" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>

                  <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>

                  {/* Shading filter for tree dots */}
                  <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22c55e" floodOpacity="0.8" />
                  </filter>
                  <filter id="glowYellow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.8" />
                  </filter>
                  <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.9" />
                  </filter>
                </defs>

                {/* Base Map Background */}
                <rect
                  width="1000"
                  height="650"
                  fill={
                    mapBaseTheme === 'dark-carto'
                      ? 'url(#bgGuanacasteDark)'
                      : mapBaseTheme === 'satellite'
                      ? 'url(#bgSatellite)'
                      : 'url(#bgStreets)'
                  }
                />
                <rect width="1000" height="650" fill="url(#gridPattern)" />

                {/* Stylized Geography: Guanacaste Province Contour Outline */}
                <path
                  d="M 120 180 Q 220 80 420 110 T 680 150 Q 820 220 880 340 T 780 520 Q 640 600 480 590 T 260 550 Q 140 450 160 320 Z"
                  fill={mapBaseTheme === 'satellite' ? 'rgba(34, 76, 45, 0.25)' : 'rgba(35, 65, 117, 0.18)'}
                  stroke={mapBaseTheme === 'satellite' ? '#2e7d32' : '#2563eb'}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />

                {/* Pacific Coastline Aesthetic Curve (Golfo de Nicoya / Papagayo) */}
                <path
                  d="M 160 140 Q 110 240 140 330 T 220 440 Q 240 540 280 620"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  opacity="0.4"
                />

                {/* Regional Rivers (Río Tempisque & Río Bebedero Corridors) */}
                <path
                  d="M 380 120 Q 420 280 460 380 T 520 540"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.2"
                  opacity="0.5"
                />
                <text x="440" y="320" fill="#38bdf8" fontSize="10" opacity="0.6" fontStyle="italic">
                  Corredor Ripario Río Tempisque
                </text>

                {/* LAYER: RED VIAL & ELÉCTRICA (Infraestructura) */}
                {activeLayers.infraestructura && (
                  <g className="layer-infraestructura">
                    {/* Carretera Interamericana Norte (Ruta 1) */}
                    <path
                      d="M 320 140 L 410 230 L 530 330 L 670 420 L 780 490"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="3.5"
                      opacity="0.5"
                    />
                    <text x="540" y="320" fill="#cbd5e1" fontSize="9" fontWeight="600" opacity="0.6">
                      Ruta 1 (Interamericana)
                    </text>

                    {/* Ruta 21 (Liberia a Santa Cruz y Nicoya) */}
                    <path
                      d="M 410 230 L 320 360 L 260 460 L 340 550"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2.8"
                      opacity="0.5"
                    />
                    <text x="250" y="420" fill="#cbd5e1" fontSize="9" fontWeight="600" opacity="0.6">
                      Ruta 21
                    </text>

                    {/* Líneas Eléctricas de Distribución Coopeguanacaste / ICE */}
                    <path
                      d="M 390 210 L 420 250 L 510 320 L 650 410"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      opacity="0.75"
                    />
                    <path
                      d="M 330 370 L 270 450 L 330 530"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.8"
                      strokeDasharray="6 4"
                      opacity="0.75"
                    />
                    <text x="660" y="405" fill="#f59e0b" fontSize="9" fontWeight="600" opacity="0.8">
                      ⚡ Red Media Tensión Coopeguanacaste
                    </text>
                  </g>
                )}

                {/* LAYER: PARQUES Y ZONAS VERDES */}
                {activeLayers.parques && (
                  <g className="layer-parques">
                    {/* Parque Central de Liberia */}
                    <rect
                      x="360"
                      y="190"
                      width="55"
                      height="40"
                      rx="8"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text x="362" y="184" fill="#a7f3d0" fontSize="9" fontWeight="600">
                      Parque Héctor Zúñiga (Liberia)
                    </text>

                    {/* Parque Central de Cañas */}
                    <rect
                      x="650"
                      y="390"
                      width="60"
                      height="45"
                      rx="8"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text x="650" y="384" fill="#a7f3d0" fontSize="9" fontWeight="600">
                      Parque Central Cañas
                    </text>

                    {/* Parque de Bagaces */}
                    <rect
                      x="515"
                      y="275"
                      width="45"
                      height="35"
                      rx="6"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text x="515" y="270" fill="#a7f3d0" fontSize="9" fontWeight="600">
                      Parque Bagaces
                    </text>

                    {/* Parque Bernabela Ramos (Santa Cruz) */}
                    <rect
                      x="200"
                      y="445"
                      width="50"
                      height="40"
                      rx="8"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text x="180" y="440" fill="#a7f3d0" fontSize="9" fontWeight="600">
                      Plaza Santa Cruz
                    </text>

                    {/* Parque Recaredo Briceño (Nicoya) */}
                    <rect
                      x="320"
                      y="545"
                      width="50"
                      height="40"
                      rx="8"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <text x="315" y="540" fill="#a7f3d0" fontSize="9" fontWeight="600">
                      Parque Nicoya
                    </text>
                  </g>
                )}

                {/* LAYER: COBERTURA DE SOMBRA (Buffers Térmicos) */}
                {activeLayers.sombra && (
                  <g className="layer-sombra">
                    {filteredTrees.map(tree => {
                      const cx = (tree.mapPos.x / 100) * 1000;
                      const cy = (tree.mapPos.y / 100) * 650;
                      const radius = Math.max(tree.coberturaCopa * 1.5, 18);
                      return (
                        <circle
                          key={`sombra-${tree.id}`}
                          cx={cx}
                          cy={cy}
                          r={radius}
                          fill="rgba(59, 130, 246, 0.22)"
                          stroke="#60a5fa"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                      );
                    })}
                  </g>
                )}

                {/* Cantonal Label Markers */}
                <g className="canton-labels" opacity="0.65">
                  <text x="370" y="170" fill="#93c5fd" fontSize="13" fontWeight="700">
                    LIBERIA
                  </text>
                  <text x="690" y="375" fill="#93c5fd" fontSize="13" fontWeight="700">
                    CAÑAS
                  </text>
                  <text x="530" y="260" fill="#93c5fd" fontSize="12" fontWeight="700">
                    BAGACES
                  </text>
                  <text x="160" y="420" fill="#93c5fd" fontSize="12" fontWeight="700">
                    SANTA CRUZ
                  </text>
                  <text x="340" y="525" fill="#93c5fd" fontSize="12" fontWeight="700">
                    NICOYA
                  </text>
                </g>

                {/* LAYER: ÁRBOLES GEORREFERENCIADOS (Pines Interactivos) */}
                {activeLayers.arboles && (
                  <g className="layer-arboles">
                    {filteredTrees.map(tree => {
                      const cx = (tree.mapPos.x / 100) * 1000;
                      const cy = (tree.mapPos.y / 100) * 650;
                      const isSelected = selectedTree?.id === tree.id;
                      const isCritico = tree.estadoFitosanitario === 'Crítico';
                      const isRegular = tree.estadoFitosanitario === 'Regular';

                      let fillColor = '#22c55e'; // Bueno
                      let filterId = 'url(#glowGreen)';
                      if (isRegular) {
                        fillColor = '#f59e0b';
                        filterId = 'url(#glowYellow)';
                      } else if (isCritico) {
                        fillColor = '#ef4444';
                        filterId = 'url(#glowRed)';
                      }

                      return (
                        <g
                          key={tree.id}
                          className={`tree-pin ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedTree(tree)}
                          onMouseEnter={() => setHoveredTree(tree)}
                          onMouseLeave={() => setHoveredTree(null)}
                        >
                          {/* Pulsing ring for critical risk or selected tree */}
                          {(isCritico || isSelected) && (
                            <circle
                              cx={cx}
                              cy={cy}
                              r="16"
                              className="pulse-ring"
                              fill="none"
                              stroke={isCritico ? '#ef4444' : '#47c73b'}
                              strokeWidth="2"
                            />
                          )}

                          {/* Outer halo */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isSelected ? 14 : 10}
                            fill={fillColor}
                            opacity={isSelected ? 0.95 : 0.85}
                            filter={filterId}
                          />

                          {/* Inner core */}
                          <circle cx={cx} cy={cy} r={isSelected ? 6 : 4} fill="#ffffff" />

                          {/* Tree Icon symbol in center */}
                          {isSelected && (
                            <circle cx={cx} cy={cy} r={2} fill={fillColor} />
                          )}

                          {/* Label for selected */}
                          {isSelected && (
                            <text
                              x={cx + 14}
                              y={cy + 4}
                              fill="#ffffff"
                              fontSize="11"
                              fontWeight="700"
                              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                            >
                              {tree.nombreComun} ({tree.id})
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}
              </svg>

              {/* Floating Zoom & Map Controls */}
              <div className="gis-floating-controls">
                <button className="gis-float-btn" onClick={handleZoomIn} title="Acercar (+)">
                  +
                </button>
                <button className="gis-float-btn" onClick={handleZoomOut} title="Alejar (-)">
                  -
                </button>
                <button className="gis-float-btn" onClick={handleResetZoom} title="Restablecer">
                  <Compass size={16} />
                </button>
              </div>

              {/* Coordinates HUD */}
              <div className="gis-coordinates-hud">
                <span>WGS84: {cursorCoords.lat} | {cursorCoords.lng} · Zoom: {Math.round(zoomLevel * 100)}%</span>
              </div>

              {/* Map Legend */}
              <div className="gis-legend-box">
                <div className="gis-legend-title">Simbología SIG</div>
                <div className="gis-legend-row">
                  <span className="layer-color-dot" style={{ background: '#22c55e' }}></span>
                  <span>Sano / Fitosanitario Óptimo</span>
                </div>
                <div className="gis-legend-row">
                  <span className="layer-color-dot" style={{ background: '#f59e0b' }}></span>
                  <span>Regular / Mantenimiento</span>
                </div>
                <div className="gis-legend-row">
                  <span className="layer-color-dot" style={{ background: '#ef4444' }}></span>
                  <span>Crítico / Riesgo Caída</span>
                </div>
                <div className="gis-legend-row">
                  <span style={{ width: '12px', height: '2px', background: '#f59e0b', display: 'inline-block' }}></span>
                  <span>Línea Eléctrica (Coopeg.)</span>
                </div>
              </div>

              {/* Tooltip on Hover */}
              {hoveredTree && (
                <div
                  style={{
                    position: 'absolute',
                    top: `${(hoveredTree.mapPos.y / 100) * 100 - 10}%`,
                    left: `${(hoveredTree.mapPos.x / 100) * 100}%`,
                    transform: 'translate(-50%, -100%)',
                    background: 'rgba(15, 23, 42, 0.95)',
                    color: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    pointerEvents: 'none',
                    zIndex: 30,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
                    border: '1px solid #334155',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#47c73b' }}>{hoveredTree.nombreComun}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '0.72rem', color: '#cbd5e1' }}>{hoveredTree.nombreCientifico}</div>
                  <div style={{ fontSize: '0.7rem', marginTop: '2px', color: '#94a3b8' }}>
                    {hoveredTree.canton} · Estado: {hoveredTree.estadoFitosanitario}
                  </div>
                </div>
              )}
            </div>

            {/* Tree Detail Inspector Slide-Out Drawer */}
            {selectedTree && (
              <div className="gis-tree-inspector">
                <div className="inspector-header">
                  <button
                    className="inspector-close-btn"
                    onClick={() => setSelectedTree(null)}
                    title="Cerrar Ficha"
                  >
                    <X size={16} />
                  </button>

                  <div className="inspector-id-pill">{selectedTree.id}</div>
                  <h4 className="inspector-title">{selectedTree.nombreComun}</h4>
                  <p className="inspector-sci-name">{selectedTree.nombreCientifico} ({selectedTree.familia})</p>
                </div>

                <div className="inspector-body">
                  {/* Photo & Badge */}
                  <div className="inspector-image-wrap">
                    <img src={selectedTree.imagen} alt={selectedTree.nombreComun} />
                    {selectedTree.patrimonial && (
                      <div className="inspector-patrimonial-badge">
                        <Sparkles size={12} />
                        <span>Árbol Patrimonial</span>
                      </div>
                    )}
                  </div>

                  {/* Status Banner */}
                  <div
                    className={`status-badge-row ${
                      selectedTree.estadoFitosanitario === 'Bueno'
                        ? 'bueno'
                        : selectedTree.estadoFitosanitario === 'Regular'
                        ? 'regular'
                        : 'critico'
                    }`}
                  >
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        Diagnóstico Fitosanitario
                      </span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800 }}>
                        {selectedTree.estadoFitosanitario}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        Riesgo TRAQ (ISA)
                      </span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800 }}>
                        Nivel {selectedTree.riesgoTRAQ}
                      </div>
                    </div>
                  </div>

                  {/* Dasometric Metrics */}
                  <div className="inspector-metrics-grid">
                    <div className="metric-pill">
                      <span className="metric-pill-label">DAP (cm)</span>
                      <span className="metric-pill-val">{selectedTree.dap} cm</span>
                    </div>
                    <div className="metric-pill">
                      <span className="metric-pill-label">Altura (m)</span>
                      <span className="metric-pill-val">{selectedTree.altura} m</span>
                    </div>
                    <div className="metric-pill">
                      <span className="metric-pill-label">Copa (m)</span>
                      <span className="metric-pill-val">{selectedTree.coberturaCopa} m</span>
                    </div>
                  </div>

                  {/* Location Detail */}
                  <div className="inspector-section-block">
                    <div className="inspector-section-label">
                      <MapPin size={14} color="#234175" />
                      <span>Ubicación Cantonal</span>
                    </div>
                    <p className="inspector-section-text">
                      <strong>{selectedTree.canton}</strong>: {selectedTree.ubicacionDetalle}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                        Lat: {selectedTree.coordenadas.lat}, Lng: {selectedTree.coordenadas.lng}
                      </span>
                      <button
                        onClick={() => handleCopyCoords(selectedTree.coordenadas.lat, selectedTree.coordenadas.lng)}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {copiedCoords ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                        <span>{copiedCoords ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Urban Conflict */}
                  <div className="inspector-section-block">
                    <div className="inspector-section-label">
                      <AlertTriangle size={14} color="#f59e0b" />
                      <span>Conflicto o Interferencia Urbana</span>
                    </div>
                    <p className="inspector-section-text">{selectedTree.conflicto}</p>
                  </div>

                  {/* Silvicultural Recommendation */}
                  <div className="inspector-section-block">
                    <div className="inspector-section-label">
                      <ShieldCheck size={14} color="#16a34a" />
                      <span>Prescripción Silvicultural (ANSI A300)</span>
                    </div>
                    <p className="inspector-section-text">{selectedTree.recomendacion}</p>
                  </div>

                  {/* Ecosystem Services */}
                  <div className="inspector-section-block">
                    <div className="inspector-section-label">
                      <Sparkles size={14} color="#0284c7" />
                      <span>Servicios Ecosistémicos Estimados</span>
                    </div>
                    <div className="eco-chips-row">
                      <div className="eco-chip">
                        <div className="eco-chip-value">+{selectedTree.serviciosEcosistemicos.sombraM2} m²</div>
                        <div className="eco-chip-label">Sombra Urbana</div>
                      </div>
                      <div className="eco-chip">
                        <div className="eco-chip-value">{selectedTree.serviciosEcosistemicos.capturaCarbonoKgAno} kg</div>
                        <div className="eco-chip-label">CO₂ Fijado/Año</div>
                      </div>
                      <div className="eco-chip">
                        <div className="eco-chip-value">+{selectedTree.serviciosEcosistemicos.retencionAguaLitrosAno} L</div>
                        <div className="eco-chip-label">Retención Agua</div>
                      </div>
                    </div>
                  </div>

                  {/* Survey Info */}
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      <span>Censado: {selectedTree.fechaCenso}</span>
                    </div>
                    <div style={{ marginTop: '3px' }}>
                      <span>Brigada: {selectedTree.censoPor}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button
                      onClick={() => handleSimulateWorkOrder(selectedTree)}
                      style={{
                        flex: 1,
                        background: 'var(--sig-primary)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Zap size={14} />
                      <span>Generar Orden de Poda</span>
                    </button>

                    <button
                      onClick={() => {
                        setActionNotice(`Descargando Ficha Técnica Catastral en PDF para ${selectedTree.id}...`);
                        setTimeout(() => setActionNotice(null), 3000);
                      }}
                      style={{
                        background: 'var(--sig-bg-soft)',
                        border: '1px solid var(--sig-border)',
                        color: 'var(--sig-primary)',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Descargar Ficha PDF"
                    >
                      <Download size={14} />
                      <span>PDF</span>
                    </button>
                  </div>

                  {/* Acciones de Campo Survey123 conectadas al árbol */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                    <button
                      onClick={() => handleOpenSurveyModal('evaluacion-riesgo', selectedTree)}
                      style={{
                        width: '100%',
                        background: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                      title="Re-evaluar fitosanidad y riesgo TRAQ en Survey123"
                    >
                      <AlertTriangle size={14} />
                      <span>Re-evaluar Fitosanidad con Survey123</span>
                    </button>

                    <button
                      onClick={() => handleOpenSurveyModal('dendrometria', selectedTree)}
                      style={{
                        width: '100%',
                        background: '#f0fdf4',
                        color: '#15803d',
                        border: '1px solid #bbf7d0',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                      title="Actualizar DAP, altura y copa en Survey123"
                    >
                      <Ruler size={14} />
                      <span>Actualizar Dendro-metría en Campo</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================================================
          TAB 2: CATÁLOGO / TABLA DE DATOS
          ========================================================================== */}
      {activeTab === 'catalogo-arboles' && (
        <section className="sigaru-table-card">
          <div className="table-header-flex">
            <div>
              <h3>
                <Database size={22} color="#234175" />
                <span>Catálogo General del Arbolado Urbano de Guanacaste</span>
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
                Inventario dasométrico individual con diagnóstico fitosanitario según metodología ISA-TRAQ.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select
                className="gis-select"
                value={selectedCanton}
                onChange={e => setSelectedCanton(e.target.value)}
              >
                <option value="Todos">Todos los Cantones</option>
                <option value="Liberia">Liberia</option>
                <option value="Cañas">Cañas</option>
                <option value="Bagaces">Bagaces</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Nicoya">Nicoya</option>
              </select>

              <select
                className="gis-select"
                value={selectedEstado}
                onChange={e => setSelectedEstado(e.target.value)}
              >
                <option value="Todos">Todos los Estados</option>
                <option value="Bueno">Bueno / Sano</option>
                <option value="Regular">Regular</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>
          </div>

          <div className="sigaru-table-responsive">
            <table className="sigaru-custom-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Especie / Nombre Científico</th>
                  <th>Cantón & Ubicación</th>
                  <th>DAP</th>
                  <th>Altura</th>
                  <th>Estado</th>
                  <th>Riesgo TRAQ</th>
                  <th>Prescripción Técnica</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrees.map(tree => (
                  <tr key={tree.id}>
                    <td>
                      <span style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--sig-primary)' }}>
                        {tree.id}
                      </span>
                    </td>
                    <td>
                      <div className="table-tree-title">{tree.nombreComun}</div>
                      <div className="table-tree-sub">{tree.nombreCientifico}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{tree.canton}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{tree.ubicacionDetalle}</div>
                    </td>
                    <td>{tree.dap} cm</td>
                    <td>{tree.altura} m</td>
                    <td>
                      <span
                        className={`badge-status-pill ${
                          tree.estadoFitosanitario === 'Bueno'
                            ? 'bueno'
                            : tree.estadoFitosanitario === 'Regular'
                            ? 'regular'
                            : 'critico'
                        }`}
                      >
                        {tree.estadoFitosanitario}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {tree.riesgoTRAQ}
                      </span>
                    </td>
                    <td style={{ maxWidth: '240px', fontSize: '0.8rem', color: '#475569' }}>
                      {tree.recomendacion}
                    </td>
                    <td>
                      <button
                        className="table-action-btn"
                        onClick={() => {
                          setSelectedTree(tree);
                          setActiveTab('visor-sig');
                          const el = document.getElementById('visor-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <Eye size={14} />
                        <span>Ver en SIG</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ==========================================================================
          TAB 3: ARQUITECTURA TECNOLÓGICA & METODOLOGÍA
          ========================================================================== */}
      {activeTab === 'metodologia-sig' && (
        <section className="sigaru-tech-section">
          <div className="section-title-wrap">
            <span className="section-badge">Metodología Estandarizada</span>
            <h2>Pipeline Tecnológico y Flujo de Datos SIGARU</h2>
            <p>
              El flujo de trabajo implementado por el TCU-102A vincula la toma de datos en campo de alta precisión
              con el análisis espacial en laboratorio y la transferencia directa a los gobiernos locales de Guanacaste.
            </p>
          </div>

          <div className="tech-steps-grid">
            {TECH_STEPS.map(step => (
              <div key={step.fase} className="tech-step-card">
                <div className="tech-step-header">
                  <div className="tech-phase-badge">0{step.fase}</div>
                  <div className="tech-step-icon">
                    {step.icono === 'Smartphone' && <Smartphone size={22} />}
                    {step.icono === 'ShieldCheck' && <ShieldCheck size={22} />}
                    {step.icono === 'Layers' && <Layers size={22} />}
                    {step.icono === 'Database' && <Database size={22} />}
                  </div>
                </div>

                <h3 className="tech-step-title">{step.titulo}</h3>
                <p className="tech-step-desc">{step.descripcion}</p>

                <div className="tech-tools-tag-row">
                  {step.herramientas.map(tool => (
                    <span key={tool} className="tech-tool-tag">{tool}</span>
                  ))}
                </div>

                <ul className="tech-details-list">
                  {step.detalles.map((det, idx) => (
                    <li key={idx}>{det}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Pipeline de Sincronización en Tiempo Real Survey123 ↔ SIGARU */}
          <div style={{ marginTop: '35px' }}>
            <Survey123SyncPipeline onOpenSurveyModal={(formId) => handleOpenSurveyModal(formId, selectedTree)} />
          </div>

          {/* Link to Normativa and Tutorials */}
          <div
            style={{
              marginTop: '35px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '14px',
              padding: '24px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 6px 0', color: 'var(--sig-primary)', fontSize: '1.1rem' }}>
                Capacitación y Estándares Técnicos Complementarios
              </h4>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>
                Aprende a conectar Kobotoolbox con QGIS y consulta el marco legal costarricense (Ley Forestal 7575 y norma ANSI A300).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                to="/tutoriales"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--sig-primary)',
                  color: '#ffffff',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <span>Ver Tutoriales QGIS</span>
                <ChevronRight size={15} />
              </Link>

              <Link
                to="/normativa"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  border: '1px solid var(--sig-border)',
                  color: 'var(--sig-primary)',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <span>Marco Legal & ISA</span>
                <ExternalLink size={15} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================================
          TAB 4: ALIANZAS MUNICIPALES
          ========================================================================== */}
      {activeTab === 'alianzas-cantonales' && (
        <section className="sigaru-partners-section">
          <div className="section-title-wrap" style={{ marginBottom: '15px' }}>
            <span className="section-badge">Articulación Interinstitucional</span>
            <h2>Colaboración Activa con Gobiernos Locales de Guanacaste</h2>
            <p>
              El proyecto TCU-102A de la Universidad Técnica Nacional transfiere directamente los inventarios
              y herramientas del SIGARU a los departamentos de Gestión Ambiental y Parques de las municipalidades cantonales.
            </p>
          </div>

          <div className="partners-grid">
            {MUNICIPAL_PARTNERS.map(partner => (
              <div key={partner.canton} className="partner-card">
                <div className="partner-card-header">
                  <div className="partner-logo-box">
                    <img src={partner.logo} alt={partner.canton} />
                  </div>
                  <div>
                    <h3 className="partner-canton-name">{partner.canton}</h3>
                    <p className="partner-dept-name">{partner.nombreEntidad}</p>
                  </div>
                </div>

                <div className="partner-stat-pill">
                  <TreePine size={14} />
                  <span>+{partner.arbolesCensados.toLocaleString()} árboles integrados</span>
                </div>

                <div className="partner-priority-box">
                  <strong style={{ color: 'var(--sig-primary)', display: 'block', marginBottom: '3px' }}>
                    Prioridad de Intervención:
                  </strong>
                  <span>{partner.prioridadActual}</span>
                </div>

                <div className="partner-contact-row">
                  <Building2 size={13} />
                  <span>Contacto: {partner.contacto}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Utility Coops Banner */}
          <div
            style={{
              marginTop: '25px',
              padding: '20px 24px',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ background: '#f59e0b', color: '#ffffff', padding: '10px', borderRadius: '10px' }}>
              <Zap size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#92400e', fontSize: '1rem', fontWeight: 700 }}>
                Coordinación Especial con Distribuidoras Eléctricas (Coopeguanacaste R.L. e ICE)
              </h4>
              <p style={{ margin: 0, color: '#78350f', fontSize: '0.85rem', lineHeight: 1.5 }}>
                El módulo de servidumbre de líneas eléctricas del SIGARU emite reportes periódicos de proximidad
                para evitar interrupciones de suministro eléctrico e incendios por roce de ramas en conductores de alta y media tensión.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ==========================================================================
          TAB 5: DATOS ABIERTOS & DESCARGAS
          ========================================================================== */}
      {activeTab === 'datos-abiertos' && (
        <section className="sigaru-downloads-section">
          <div className="section-title-wrap">
            <span className="section-badge">Acceso Ciudadano y Académico</span>
            <h2>Centro de Descargas y Recursos Geoespaciales Abiertos</h2>
            <p>
              Ponemos a disposición de la comunidad, investigadoras, investigadores y gobiernos locales las capas
              cartográficas, manuales de toma de datos y fichas estandarizadas del SIGARU bajo licencia abierta.
            </p>
          </div>

          <div className="downloads-grid">
            {RESOURCE_DOWNLOADS.map(res => (
              <div key={res.id} className="download-card">
                <div className="download-card-top">
                  <span
                    className={`format-pill ${
                      res.formato.toLowerCase().includes('shp')
                        ? 'shp'
                        : res.formato.toLowerCase().includes('geojson')
                        ? 'geojson'
                        : res.formato.toLowerCase().includes('pdf')
                        ? 'pdf'
                        : 'xlsx'
                    }`}
                  >
                    {res.formato}
                  </span>
                  <span className="download-category-badge">{res.categoria}</span>
                </div>

                <h3 className="download-card-title">{res.titulo}</h3>
                <p className="download-card-desc">{res.descripcion}</p>

                <div className="download-card-footer">
                  <span className="download-size">{res.tamano} · {res.badge}</span>
                  <button
                    className="btn-download-file"
                    onClick={() => {
                      setActionNotice(`Iniciando descarga de "${res.titulo}" (${res.formato})...`);
                      setTimeout(() => setActionNotice(null), 3000);
                    }}
                  >
                    <Download size={14} />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==========================================================================
          CITIZEN ACTION / REPORT TREE BANNER
          ========================================================================== */}
      <section className="sigaru-report-cta">
        <div className="report-cta-text">
          <h3>¿Observó un árbol en riesgo o con afectación en su cantón?</h3>
          <p>
            Su participación es clave para mantener un entorno urbano seguro. Reporte árboles secos, ramas fracturadas
            sobre el tendido eléctrico o interferencias en aceras públicas para su inspección técnica por el TCU-102A y las municipalidades.
          </p>
        </div>

        <div className="report-cta-actions">
          <button className="btn-sigaru-primary" onClick={() => setIsReportModalOpen(true)}>
            <AlertTriangle size={18} />
            <span>Generar Reporte Ciudadano</span>
          </button>
        </div>
      </section>

      {/* ==========================================================================
          CITIZEN REPORT MODAL
          ========================================================================== */}
      {isReportModalOpen && (
        <div className="sigaru-modal-backdrop" onClick={() => setIsReportModalOpen(false)}>
          <div className="sigaru-modal-box" onClick={e => e.stopPropagation()}>
            <div className="sigaru-modal-header">
              <h4>
                <AlertTriangle size={20} color="#86efac" />
                <span>Reporte Comunitario de Árbol Urbano</span>
              </h4>
              <button
                className="inspector-close-btn"
                onClick={() => setIsReportModalOpen(false)}
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="sigaru-modal-body">
              {reportSuccessTicket ? (
                <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#ecfdf5',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ color: 'var(--sig-primary)', marginBottom: '8px' }}>¡Reporte Registrado!</h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '14px' }}>
                    Número de Ticket Oficial de Seguimiento:
                  </p>
                  <div
                    style={{
                      background: '#f1f5f9',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: 'var(--sig-primary)',
                      fontFamily: 'monospace',
                      display: 'inline-block',
                      marginBottom: '16px'
                    }}
                  >
                    {reportSuccessTicket}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                    La solicitud ha sido enviada a la Unidad de Gestión Ambiental del cantón para su inspección TRAQ Nivel 2.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit}>
                  <div className="form-group-sigaru">
                    <label>Cantón de Guanacaste *</label>
                    <select
                      className="form-control-sigaru"
                      value={reportFormData.canton}
                      onChange={e => setReportFormData({ ...reportFormData, canton: e.target.value })}
                      required
                    >
                      <option value="Liberia">Liberia</option>
                      <option value="Cañas">Cañas</option>
                      <option value="Bagaces">Bagaces</option>
                      <option value="Santa Cruz">Santa Cruz</option>
                      <option value="Nicoya">Nicoya</option>
                    </select>
                  </div>

                  <div className="form-group-sigaru">
                    <label>Tipo de Situación o Riesgo Observado *</label>
                    <select
                      className="form-control-sigaru"
                      value={reportFormData.tipoProblema}
                      onChange={e => setReportFormData({ ...reportFormData, tipoProblema: e.target.value })}
                      required
                    >
                      <option value="Ramas en contacto con tendido eléctrico">Ramas en contacto con tendido eléctrico (Riesgo Alto)</option>
                      <option value="Rama grande fracturada o descolgada">Rama grande fracturada o descolgada sobre acera/calle</option>
                      <option value="Árbol seco en pie con riesgo de colapso">Árbol seco en pie con riesgo de colapso</option>
                      <option value="Inclinación acentuada del tronco">Inclinación acentuada del tronco con descalce de raíces</option>
                      <option value="Levantamiento severo de losas de acera">Levantamiento severo de losas de acera peatonal</option>
                      <option value="Solicitud de poda de formación o despeje de gálibo">Solicitud de poda de formación o despeje de gálibo vehicular</option>
                    </select>
                  </div>

                  <div className="form-group-sigaru">
                    <label>Dirección Exacta o Punto de Referencia *</label>
                    <input
                      type="text"
                      className="form-control-sigaru"
                      placeholder="Ej. Barrio Las Palmas, 100m norte del Supermercado, frente a poste PG-452"
                      value={reportFormData.direccion}
                      onChange={e => setReportFormData({ ...reportFormData, direccion: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-sigaru">
                    <label>Descripción de los Hechos y Detalles Adicionales</label>
                    <textarea
                      className="form-control-sigaru"
                      rows={3}
                      placeholder="Especifique si hay casas vecinas en riesgo, cables chispeando o niños jugando en la zona..."
                      value={reportFormData.descripcion}
                      onChange={e => setReportFormData({ ...reportFormData, descripcion: e.target.value })}
                    ></textarea>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group-sigaru">
                      <label>Nombre del Solicitante</label>
                      <input
                        type="text"
                        className="form-control-sigaru"
                        placeholder="Su nombre"
                        value={reportFormData.contactoNombre}
                        onChange={e => setReportFormData({ ...reportFormData, contactoNombre: e.target.value })}
                      />
                    </div>
                    <div className="form-group-sigaru">
                      <label>Teléfono de Contacto</label>
                      <input
                        type="tel"
                        className="form-control-sigaru"
                        placeholder="Ej. +506 8888-8888"
                        value={reportFormData.telefono}
                        onChange={e => setReportFormData({ ...reportFormData, telefono: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                      type="button"
                      className="btn-sigaru-outline"
                      style={{ color: '#64748b', borderColor: '#cbd5e1' }}
                      onClick={() => setIsReportModalOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-sigaru-primary">
                      <Send size={16} />
                      <span>Enviar Reporte al SIGARU</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Interactivo de Survey123 (Censo en Campo, Códigos QR y App Móvil) */}
      <Survey123Modal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
        initialFormId={activeSurveyFormId}
        treeContext={surveyTreeContext}
      />
    </div>
  );
};

export default Sigaru;
