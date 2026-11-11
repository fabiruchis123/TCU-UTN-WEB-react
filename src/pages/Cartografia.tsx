import React, { useState, useMemo } from 'react';
import {
  Map as MapIcon,
  Layers,
  Compass,
  Thermometer,
  Trees,
  Zap,
  Download,
  Info,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Maximize2,
  Eye,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  FileText,
  ChevronRight,
  Flame,
  Leaf,
  SlidersHorizontal,
  Grid,
  Crosshair,
  Check,
  Smartphone,
  QrCode
} from 'lucide-react';
import {
  CANTON_ZONES,
  THEMATIC_LAYERS,
  CARTOGRAPHIC_METHODOLOGY,
  DOWNLOADABLE_MAPS,
  CantonZone,
  MapMode
} from '../data/cartografiaData';
import { Survey123Modal, TreeContextData } from '../components/Survey123Modal';
import { Survey123SyncPipeline } from '../components/Survey123SyncPipeline';
import '../styles/cartografia.css';

export default function Cartografia() {
  // Estado para el cantón seleccionado
  const [selectedCantonId, setSelectedCantonId] = useState<string>('liberia-centro');
  // Modo de capa activa en el visor
  const [activeMode, setActiveMode] = useState<MapMode>('canopy');
  // Estilo de mapa base (satelital, vectorial, topográfico)
  const [basemap, setBasemap] = useState<'sat' | 'vector' | 'topo'>('sat');
  // Zoom del visor
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  // Capas conmutables adicionales
  const [showPowerLines, setShowPowerLines] = useState<boolean>(true);
  const [showQuadrants, setShowQuadrants] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showThermalOverlay, setShowThermalOverlay] = useState<boolean>(true);
  // Árbol o cuadrante seleccionado
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>('t-lib-01');
  const [hoveredTreeId, setHoveredTreeId] = useState<string | null>(null);
  // Pestaña activa del panel lateral
  const [inspectorTab, setInspectorTab] = useState<'diagnosis' | 'tree'>('diagnosis');
  // Filtro de la galería de descargas
  const [downloadCategory, setDownloadCategory] = useState<string>('Todos');
  // Estado de notificación de descarga
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  // Estado de copiado
  const [copiedGeoJson, setCopiedGeoJson] = useState<boolean>(false);
  // Coordenadas del cursor simuladas en el mapa
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number }>({ x: 342650, y: 1176210 });
  // Modal de Survey123 y censo en campo
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  const [activeSurveyFormId, setActiveSurveyFormId] = useState<string>('datos-generales');
  const [surveyTreeContext, setSurveyTreeContext] = useState<TreeContextData | null>(null);

  // Cantón activo
  const currentCanton: CantonZone = useMemo(() => {
    return CANTON_ZONES.find((c) => c.id === selectedCantonId) || CANTON_ZONES[0];
  }, [selectedCantonId]);

  // Capa temática activa
  const currentLayer = useMemo(() => {
    return THEMATIC_LAYERS.find((l) => l.mode === activeMode) || THEMATIC_LAYERS[0];
  }, [activeMode]);

  // Árbol seleccionado actualmente
  const selectedTree = useMemo(() => {
    if (!selectedTreeId) return currentCanton.sampleTrees[0] || null;
    return currentCanton.sampleTrees.find((t) => t.id === selectedTreeId) || currentCanton.sampleTrees[0] || null;
  }, [selectedTreeId, currentCanton]);

  // Manejo de cambio de cantón
  const handleCantonChange = (id: string) => {
    setSelectedCantonId(id);
    const newCanton = CANTON_ZONES.find((c) => c.id === id);
    if (newCanton && newCanton.sampleTrees.length > 0) {
      setSelectedTreeId(newCanton.sampleTrees[0].id);
    } else {
      setSelectedTreeId(null);
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  // Manejo de movimiento de cursor en el mapa SVG para coordenadas interactivas
  const handleMouseMoveMap = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    // Cálculo en coordenadas proyectadas oficiales CRTM05
    const crtmX = Math.round(currentCanton.crtm05.x + (relX - 0.5) * 1200);
    const crtmY = Math.round(currentCanton.crtm05.y - (relY - 0.5) * 1200);
    setCursorCoords({ x: crtmX, y: crtmY });
  };

  // Función para determinar el color del árbol según el modo activo
  const getTreeColor = (tree: CantonZone['sampleTrees'][0]) => {
    if (activeMode === 'canopy') {
      if (tree.canopyRadiusM >= 12) return '#15803d'; // Muy denso
      if (tree.canopyRadiusM >= 7) return '#47c73b'; // Medio
      if (tree.canopyRadiusM >= 4) return '#a3e635'; // Disperso
      return '#facc15';
    }
    if (activeMode === 'thermal') {
      if (tree.canopyRadiusM >= 10) return '#059669'; // Gran frescor
      if (tree.canopyRadiusM >= 6) return '#84cc16';
      return '#eab308';
    }
    if (activeMode === 'risk') {
      if (tree.electricConflict === 'Severo' || tree.health === 'Crítico') return '#dc2626';
      if (tree.electricConflict === 'Moderado' || tree.health === 'Regular') return '#f59e0b';
      return '#10b981';
    }
    if (activeMode === 'diversity') {
      return tree.isNative ? '#16a34a' : '#e11d48';
    }
    return '#47c73b';
  };

  // Filtrado de mapas descargables
  const filteredMaps = useMemo(() => {
    if (downloadCategory === 'Todos') return DOWNLOADABLE_MAPS;
    return DOWNLOADABLE_MAPS.filter((m) => m.category.toLowerCase().includes(downloadCategory.toLowerCase()));
  }, [downloadCategory]);

  // Manejo de descarga simulada de ficha cartográfica
  const handleDownloadMap = (mapItem: typeof DOWNLOADABLE_MAPS[0]) => {
    // Generar archivo JSON de metadatos cartográficos reales
    const metadataContent = {
      proyecto: 'TCU-102A: Gestión Integral del Árbol Urbano en mi Comunidad',
      institucion: 'Universidad Técnica Nacional (UTN) - Sede de Guanacaste',
      cooperacion: 'SINAC (ACAT / ACG) y Municipalidad de ' + mapItem.canton,
      mapa: {
        id: mapItem.id,
        titulo: mapItem.title,
        categoria: mapItem.category,
        canton: mapItem.canton,
        escala: mapItem.scale,
        proyeccion: mapItem.projection,
        resolucionEspacialGSD: '2.5 cm/píxel (Ortomosaico UAV)',
        fuentes: ['Sentinel-2 MSI', 'Landsat 9 TIRS', 'Survey123 GNSS RTK']
      },
      fechaGeneracion: new Date().toISOString(),
      avisoLegal: 'Datos geoespaciales para planificación territorial, investigación académica y gestión del arbolado.'
    };

    const blob = new Blob([JSON.stringify(metadataContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mapItem.id}_metadatos_cartografia_utn.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotification(`Ficha técnica y metadatos geoespaciales de "${mapItem.title}" descargados correctamente.`);
    setTimeout(() => setDownloadNotification(null), 5000);
  };

  // Copiar GeoJSON del árbol seleccionado
  const handleCopyTreeGeoJson = () => {
    if (!selectedTree) return;
    const geoJsonFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          Number((currentCanton.lng + (selectedTree.x - 50) * 0.0001).toFixed(6)),
          Number((currentCanton.lat - (selectedTree.y - 50) * 0.0001).toFixed(6))
        ]
      },
      properties: {
        codigo: selectedTree.code,
        nombreComun: selectedTree.commonName,
        nombreCientifico: selectedTree.scientificName,
        familia: selectedTree.family,
        alturaM: selectedTree.heightM,
        dapCm: selectedTree.dapCm,
        radioCopaM: selectedTree.canopyRadiusM,
        condicionSalud: selectedTree.health,
        conflictoElectrico: selectedTree.electricConflict,
        especieNativa: selectedTree.isNative,
        capturaCarbonoKgAnio: selectedTree.carbonCaptureKgYear,
        sistemaReferencia: 'CR05 / CRTM05 (EPSG: 5367)'
      }
    };
    navigator.clipboard.writeText(JSON.stringify(geoJsonFeature, null, 2));
    setCopiedGeoJson(true);
    setTimeout(() => setCopiedGeoJson(false), 3000);
  };

  // Apertura del modal interactivo de Survey123 con contexto de árbol
  const handleOpenSurveyModal = (
    formId: string = 'datos-generales',
    tree: CantonZone['sampleTrees'][0] | null = selectedTree
  ) => {
    setActiveSurveyFormId(formId);
    if (tree) {
      setSurveyTreeContext({
        id: tree.id,
        code: tree.code,
        commonName: tree.commonName,
        scientificName: tree.scientificName,
        canton: currentCanton.canton,
        lat: Number((currentCanton.lat - (tree.y - 50) * 0.0001).toFixed(6)),
        lng: Number((currentCanton.lng + (tree.x - 50) * 0.0001).toFixed(6)),
        dap: tree.dapCm,
        height: tree.heightM,
        health: tree.health
      });
    } else {
      setSurveyTreeContext(null);
    }
    setIsSurveyModalOpen(true);
  };

  // Cálculo de déficit del área verde cantonal respecto a la OMS
  const greenDeficitPercent = Math.round(
    ((currentCanton.omsTarget - currentCanton.greenAreaPerCapita) / currentCanton.omsTarget) * 100
  );

  return (
    <div className="cartografia-page">
      {/* Notificación flotante de descarga */}
      {downloadNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#234175',
            color: '#ffffff',
            padding: '16px 22px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '460px',
            border: '2px solid #47c73b'
          }}
        >
          <CheckCircle2 color="#47c73b" size={24} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{downloadNotification}</span>
        </div>
      )}

      {/* HERO BANNER */}
      <section className="cartografia-hero">
        <div className="hero-badge">
          <Globe size={16} />
          Laboratorio de Geomática, Drones y Teledetección • TCU-102A UTN
        </div>
        <h1 className="hero-title">
          Cartografía y <span>Análisis Espacial</span> del Árbol Urbano
        </h1>
        <p className="hero-desc">
          Plataforma de visualización geoespacial e inteligencia territorial de la Región Chorotega.
          Monitoreamos la cobertura del dosel, mitigación de islas de calor urbanas y vulnerabilidad del tendido
          eléctrico en los cantones de Guanacaste con precisión geodésica GNSS RTK y sensores aerotransportados.
        </p>

        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <div className="hero-stat-val">5 Cantones</div>
            <div className="hero-stat-label">Liberia, Cañas, Bagaces, Santa Cruz, Nicoya</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-val">+5,500</div>
            <div className="hero-stat-label">Árboles Georreferenciados (Survey123)</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-val">CRTM05</div>
            <div className="hero-stat-label">Proyección Oficial (EPSG: 5367)</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-val">2.5 cm/px</div>
            <div className="hero-stat-label">Resolución GSD Ortomosaicos UAV</div>
          </div>
        </div>
      </section>

      {/* VISOR CARTOGRÁFICO INTERACTIVO */}
      <section className="visor-container" id="visor-cartografico">
        {/* Selector de Cantón y Lanzador de Survey123 */}
        <div className="visor-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapIcon color="#234175" size={22} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#234175', margin: 0 }}>
                Visor Cartográfico SIGARU Guanacaste
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                {currentCanton.distrito} • {currentCanton.region}
              </span>
              <button
                className="survey-launch-btn"
                onClick={() => handleOpenSurveyModal('datos-generales', selectedTree)}
                title="Lanzar ArcGIS Survey123 para censo en campo con brigadas UTN"
              >
                <Smartphone size={16} />
                <span>Iniciar Censo con Survey123</span>
              </button>
            </div>
          </div>

          <div className="canton-select-bar">
            {CANTON_ZONES.map((canton) => (
              <button
                key={canton.id}
                onClick={() => handleCantonChange(canton.id)}
                className={`canton-tab-btn ${selectedCantonId === canton.id ? 'active' : ''}`}
              >
                <Compass size={16} />
                {canton.canton}: {canton.name.split('-')[1] || canton.name}
              </button>
            ))}
          </div>
        </div>

        {/* Barra de Modos / Capas Temáticas */}
        <div className="mode-tabs-bar">
          {THEMATIC_LAYERS.map((layer) => {
            const getIcon = () => {
              switch (layer.mode) {
                case 'canopy':
                  return <Trees size={16} />;
                case 'thermal':
                  return <Flame size={16} />;
                case 'risk':
                  return <Zap size={16} />;
                case 'diversity':
                  return <Leaf size={16} />;
              }
            };

            return (
              <button
                key={layer.mode}
                onClick={() => setActiveMode(layer.mode)}
                className={`mode-tab-pill ${activeMode === layer.mode ? 'active' : ''}`}
              >
                {getIcon()}
                <span>{layer.name}</span>
              </button>
            );
          })}
        </div>

        {/* Layout principal del visor (Mapa + Panel lateral) */}
        <div className="visor-layout">
          {/* Viewport del Mapa interactivo */}
          <div className="map-viewport-wrapper">
            {/* Controles flotantes */}
            <div className="map-controls-floating">
              <button onClick={handleZoomIn} className="map-ctrl-btn" title="Acercar mapa">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleZoomOut} className="map-ctrl-btn" title="Alejar mapa">
                <ZoomOut size={18} />
              </button>
              <button onClick={handleResetZoom} className="map-ctrl-btn" title="Restablecer vista">
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className="map-ctrl-btn"
                title={showLabels ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
                style={{ color: showLabels ? '#234175' : '#94a3b8' }}
              >
                <Grid size={18} />
              </button>
            </div>

            {/* Selector de Mapa Base */}
            <div className="map-basemap-selector">
              <button
                onClick={() => setBasemap('sat')}
                className={`basemap-pill ${basemap === 'sat' ? 'active' : ''}`}
              >
                Satelital
              </button>
              <button
                onClick={() => setBasemap('vector')}
                className={`basemap-pill ${basemap === 'vector' ? 'active' : ''}`}
              >
                Vectorial
              </button>
              <button
                onClick={() => setBasemap('topo')}
                className={`basemap-pill ${basemap === 'topo' ? 'active' : ''}`}
              >
                Relieve
              </button>
            </div>

            {/* Canvas interactivo SVG */}
            <div className="map-canvas-container">
              <svg
                viewBox="0 0 1000 650"
                className="map-canvas-svg"
                onMouseMove={handleMouseMoveMap}
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.25s ease'
                }}
              >
                <defs>
                  {/* Patrón de cuadrícula de coordenadas CRTM05 */}
                  <pattern id="grid-crtm" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path
                      d="M 100 0 L 0 0 0 100"
                      fill="none"
                      stroke={basemap === 'sat' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}
                      strokeWidth="1"
                    />
                  </pattern>

                  {/* Gradiente térmico para islas de calor */}
                  <radialGradient id="thermal-blob-hot" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.65" />
                    <stop offset="60%" stopColor="#f97316" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="thermal-blob-cool" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                    <stop offset="65%" stopColor="#059669" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                  </radialGradient>

                  {/* Filtro de sombra suave para copas de árboles */}
                  <filter id="canopy-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* Fondo según basemap */}
                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="650"
                  fill={
                    basemap === 'sat'
                      ? '#131d2a'
                      : basemap === 'vector'
                      ? '#f1f5f9'
                      : '#e8edf3'
                  }
                />

                {/* Cuadrícula geodésica */}
                <rect x="0" y="0" width="1000" height="650" fill="url(#grid-crtm)" />

                {/* Red Vial y Ejes Urbanos (Calles y Avenidas) */}
                <g stroke={basemap === 'sat' ? '#2e3d52' : '#cbd5e1'} strokeWidth="18" fill="none">
                  {/* Calles principales horizontales y verticales */}
                  <path d="M 0 250 L 1000 250" />
                  <path d="M 0 420 L 1000 420" />
                  <path d="M 300 0 L 300 650" />
                  <path d="M 680 0 L 680 650" />
                </g>

                {/* Manzanas urbanas / Bloques de construcciones */}
                <g fill={basemap === 'sat' ? '#1c2836' : '#e2e8f0'} stroke={basemap === 'sat' ? '#2d3f54' : '#94a3b8'} strokeWidth="2">
                  <rect x="60" y="50" width="200" height="160" rx="8" />
                  <rect x="340" y="50" width="300" height="160" rx="8" />
                  <rect x="720" y="50" width="220" height="160" rx="8" />

                  <rect x="60" y="280" width="200" height="110" rx="8" />
                  <rect x="720" y="280" width="220" height="110" rx="8" />

                  <rect x="60" y="460" width="200" height="150" rx="8" />
                  <rect x="340" y="460" width="300" height="150" rx="8" />
                  <rect x="720" y="460" width="220" height="150" rx="8" />
                </g>

                {/* Polígono de Espacio Verde / Parque Central de la Zona */}
                <rect
                  x="330"
                  y="270"
                  width="320"
                  height="130"
                  rx="12"
                  fill={activeMode === 'thermal' ? 'rgba(5, 150, 105, 0.25)' : 'rgba(71, 199, 59, 0.22)'}
                  stroke="#47c73b"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />

                {/* Capa de Estrés Térmico (Islas de Calor / LST) */}
                {activeMode === 'thermal' && showThermalOverlay && (
                  <g>
                    {/* Hotspot en avenidas con pavimento y sin sombra */}
                    <circle cx="160" cy="250" r="140" fill="url(#thermal-blob-hot)" />
                    <circle cx="820" cy="250" r="150" fill="url(#thermal-blob-hot)" />
                    <circle cx="500" cy="130" r="130" fill="url(#thermal-blob-hot)" />
                    <circle cx="820" cy="520" r="140" fill="url(#thermal-blob-hot)" />

                    {/* Isla de frescor sobre el parque central arbolado */}
                    <circle cx="490" cy="335" r="120" fill="url(#thermal-blob-cool)" />

                    {/* Etiquetas de temperatura superficial en puntos críticos */}
                    <text x="140" y="240" fill="#fca5a5" fontSize="13" fontWeight="bold" fontFamily="monospace">
                      42.1 °C
                    </text>
                    <text x="470" y="340" fill="#6ee7b7" fontSize="14" fontWeight="bold" fontFamily="monospace">
                      31.8 °C
                    </text>
                    <text x="800" y="240" fill="#fca5a5" fontSize="13" fontWeight="bold" fontFamily="monospace">
                      41.5 °C
                    </text>
                  </g>
                )}

                {/* Red Eléctrica Aérea (13.2 kV / 24.9 kV) */}
                {showPowerLines && (
                  <g>
                    <path
                      d="M 20 238 L 980 238"
                      stroke={activeMode === 'risk' ? '#f59e0b' : '#38bdf8'}
                      strokeWidth={activeMode === 'risk' ? '3' : '2'}
                      strokeDasharray="10 5"
                      fill="none"
                    />
                    <path
                      d="M 20 408 L 980 408"
                      stroke={activeMode === 'risk' ? '#f59e0b' : '#38bdf8'}
                      strokeWidth={activeMode === 'risk' ? '3' : '2'}
                      strokeDasharray="10 5"
                      fill="none"
                    />
                    <path
                      d="M 312 20 L 312 630"
                      stroke={activeMode === 'risk' ? '#f59e0b' : '#38bdf8'}
                      strokeWidth={activeMode === 'risk' ? '3' : '2'}
                      strokeDasharray="10 5"
                      fill="none"
                    />

                    {/* Postes de concreto georreferenciados */}
                    {[80, 200, 312, 450, 580, 680, 800, 920].map((px, idx) => (
                      <rect
                        key={`poste-${idx}`}
                        x={px - 3}
                        y={235}
                        width="6"
                        height="6"
                        fill="#f8fafc"
                        stroke="#0f172a"
                        strokeWidth="1"
                      />
                    ))}
                  </g>
                )}

                {/* Cuadrantes Urbanos mapeados */}
                {showQuadrants &&
                  currentCanton.quadrants.map((quad) => {
                    const qX = (quad.x / 100) * 1000;
                    const qY = (quad.y / 100) * 650;
                    const qW = (quad.w / 100) * 1000;
                    const qH = (quad.h / 100) * 650;

                    return (
                      <g key={quad.id} className="quadrant-poly">
                        <rect
                          x={qX}
                          y={qY}
                          width={qW}
                          height={qH}
                          fill="rgba(59, 130, 246, 0.04)"
                          stroke="rgba(59, 130, 246, 0.25)"
                          strokeWidth="1.5"
                          rx="8"
                        />
                        {showLabels && (
                          <text
                            x={qX + 8}
                            y={qY + 16}
                            fill={basemap === 'sat' ? '#94a3b8' : '#475569'}
                            fontSize="11"
                            fontWeight="600"
                          >
                            {quad.name}
                          </text>
                        )}
                      </g>
                    );
                  })}

                {/* Renderizado de ÁRBOLES CENSADOS */}
                {currentCanton.sampleTrees.map((tree) => {
                  const tX = (tree.x / 100) * 1000;
                  const tY = (tree.y / 100) * 650;
                  const radiusPixels = Math.max(14, (tree.canopyRadiusM * 2.8) * zoomLevel);
                  const isSelected = selectedTree?.id === tree.id;
                  const isHovered = hoveredTreeId === tree.id;
                  const treeColor = getTreeColor(tree);

                  return (
                    <g
                      key={tree.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedTreeId(tree.id);
                        setInspectorTab('tree');
                      }}
                      onMouseEnter={() => setHoveredTreeId(tree.id)}
                      onMouseLeave={() => setHoveredTreeId(null)}
                    >
                      {/* Anillo de selección si está activo */}
                      {isSelected && (
                        <circle
                          cx={tX}
                          cy={tY}
                          r={radiusPixels + 8}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="3"
                          strokeDasharray="4 2"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="0;12"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Proyección del dosel (Canopy Polygon) */}
                      <circle
                        cx={tX}
                        cy={tY}
                        r={radiusPixels}
                        fill={treeColor}
                        fillOpacity={isSelected || isHovered ? 0.9 : 0.75}
                        stroke={isSelected ? '#ffffff' : '#0f172a'}
                        strokeWidth={isSelected ? 2.5 : 1}
                        filter="url(#canopy-shadow)"
                      />

                      {/* Núcleo / Fuste del árbol */}
                      <circle cx={tX} cy={tY} r="4" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />

                      {/* Icono de alerta en modo riesgo si hay conflicto */}
                      {activeMode === 'risk' && tree.electricConflict === 'Severo' && (
                        <g transform={`translate(${tX - 10}, ${tY - radiusPixels - 14})`}>
                          <rect x="0" y="0" width="20" height="14" rx="4" fill="#dc2626" />
                          <text x="10" y="11" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            ⚡
                          </text>
                        </g>
                      )}

                      {/* Etiqueta del árbol */}
                      {showLabels && (
                        <text
                          x={tX}
                          y={tY + radiusPixels + 12}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="700"
                          style={{
                            textShadow: '0 1px 3px rgba(0,0,0,0.85)',
                            pointerEvents: 'none'
                          }}
                        >
                          {tree.commonName}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Rosa de los vientos (Norte) */}
                <g transform="translate(940, 60)">
                  <circle cx="0" cy="0" r="22" fill="rgba(15, 23, 42, 0.75)" stroke="#47c73b" strokeWidth="1.5" />
                  <path d="M 0 -18 L 6 0 L 0 -4 L -6 0 Z" fill="#47c73b" />
                  <path d="M 0 18 L 6 0 L 0 4 L -6 0 Z" fill="#94a3b8" />
                  <text x="0" y="-8" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                    N
                  </text>
                </g>

                {/* Escala Gráfica Dinámica */}
                <g transform="translate(60, 610)">
                  <rect x="-8" y="-16" width="160" height="24" rx="6" fill="rgba(15, 23, 42, 0.75)" />
                  <line x1="0" y1="0" x2="140" y2="0" stroke="#ffffff" strokeWidth="3" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#ffffff" strokeWidth="2" />
                  <line x1="70" y1="-3" x2="70" y2="3" stroke="#ffffff" strokeWidth="2" />
                  <line x1="140" y1="-5" x2="140" y2="5" stroke="#ffffff" strokeWidth="2" />
                  <text x="70" y="-6" textAnchor="middle" fill="#47c73b" fontSize="10" fontWeight="bold">
                    {Math.round(100 / zoomLevel)} m
                  </text>
                </g>
              </svg>
            </div>

            {/* Barra de Estado con Coordenadas */}
            <div className="map-status-bar">
              <div>
                <Crosshair size={12} style={{ display: 'inline', marginRight: '6px' }} />
                <span>
                  CRTM05: X={cursorCoords.x} m • Y={cursorCoords.y} m (EPSG: 5367)
                </span>
              </div>
              <div>
                <span>WGS84: {currentCanton.lat.toFixed(4)}° N, {currentCanton.lng.toFixed(4)}° W</span>
                <span style={{ marginLeft: '14px', color: '#47c73b' }}>Zoom: {Math.round(zoomLevel * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Panel Lateral de Inspección y Estadísticas */}
          <div className="visor-inspector-panel">
            <div className="inspector-tabs">
              <button
                onClick={() => setInspectorTab('diagnosis')}
                className={`inspector-tab-btn ${inspectorTab === 'diagnosis' ? 'active' : ''}`}
              >
                Diagnóstico Cantonal
              </button>
              <button
                onClick={() => setInspectorTab('tree')}
                className={`inspector-tab-btn ${inspectorTab === 'tree' ? 'active' : ''}`}
              >
                Ficha del Árbol {selectedTree ? `(${selectedTree.code})` : ''}
              </button>
            </div>

            <div className="inspector-content">
              {inspectorTab === 'diagnosis' ? (
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#234175', marginBottom: '6px' }}>
                    {currentCanton.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                    {currentCanton.description}
                  </p>

                  {/* Indicador OMS de Área Verde por Habitante */}
                  <div className="gauge-card">
                    <div className="gauge-header">
                      <span>Área Verde Peatonal</span>
                      <strong style={{ color: currentCanton.greenAreaPerCapita < 9 ? '#dc2626' : '#15803d' }}>
                        {currentCanton.greenAreaPerCapita} m²/hab
                      </strong>
                    </div>
                    <div className="gauge-bar-bg">
                      <div
                        className="gauge-bar-fill"
                        style={{
                          width: `${Math.min(100, (currentCanton.greenAreaPerCapita / 15) * 100)}%`,
                          background: currentCanton.greenAreaPerCapita < 9 ? '#f87171' : '#47c73b'
                        }}
                      />
                      {/* Marca objetivo de la OMS (9 m2) */}
                      <div className="gauge-mark" style={{ left: '60%' }} title="Meta mínima OMS (9 m²/hab)" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
                      <span>0 m²</span>
                      <span style={{ color: '#dc2626', fontWeight: 700 }}>Meta OMS: 9.0 m²</span>
                      <span>15 m²</span>
                    </div>
                    {greenDeficitPercent > 0 && (
                      <div style={{ marginTop: '8px', fontSize: '0.76rem', color: '#b91c1c', background: '#fee2e2', padding: '6px 10px', borderRadius: '6px' }}>
                        ⚠️ Déficit del {greenDeficitPercent}% respecto al estándar de salud urbana de la OMS.
                      </div>
                    )}
                  </div>

                  {/* Fila de Métricas Clave */}
                  <div className="metric-row">
                    <div className="metric-box">
                      <div className="metric-box-val">{currentCanton.canopyCoveragePercent}%</div>
                      <div className="metric-box-lbl">Cobertura de Dosel</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-box-val" style={{ color: '#ea580c' }}>
                        +{currentCanton.heatIslandDelta} °C
                      </div>
                      <div className="metric-box-lbl">Efecto Isla de Calor</div>
                    </div>
                  </div>

                  <div className="metric-row">
                    <div className="metric-box">
                      <div className="metric-box-val">{currentCanton.totalTreesSurveyed}</div>
                      <div className="metric-box-lbl">Árboles Inventariados</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-box-val" style={{ color: '#dc2626' }}>
                        {currentCanton.electricConflictPercent}%
                      </div>
                      <div className="metric-box-lbl">Conflicto Red Eléctrica</div>
                    </div>
                  </div>

                  {/* Estado Fitosanitario */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                      Condición Fitosanitaria Global
                    </div>
                    <div style={{ display: 'flex', height: '10px', borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
                      <div style={{ width: `${currentCanton.healthDistribution.good}%`, background: '#16a34a' }} title="Bueno" />
                      <div style={{ width: `${currentCanton.healthDistribution.regular}%`, background: '#f59e0b' }} title="Regular" />
                      <div style={{ width: `${currentCanton.healthDistribution.poor}%`, background: '#dc2626' }} title="Crítico" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>● {currentCanton.healthDistribution.good}% Bueno</span>
                      <span style={{ color: '#d97706', fontWeight: 600 }}>● {currentCanton.healthDistribution.regular}% Regular</span>
                      <span style={{ color: '#dc2626', fontWeight: 600 }}>● {currentCanton.healthDistribution.poor}% Crítico</span>
                    </div>
                  </div>

                  {/* Especies Predominantes */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                      Especies Más Frecuentes
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentCanton.topSpecies.map((spec, i) => (
                        <div
                          key={i}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: '0.82rem', color: '#1e293b' }}>{spec.common}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#64748b', fontStyle: 'italic' }}>
                              {spec.scientific}
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '12px',
                              background: spec.native ? '#e8f8e6' : '#fef2f2',
                              color: spec.native ? '#15803d' : '#b91c1c'
                            }}
                          >
                            {spec.native ? 'Nativa' : 'Exótica'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recomendaciones Técnicas */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                      Recomendaciones para el Plan Regulador
                    </div>
                    <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: '#475569', lineHeight: 1.55 }}>
                      {currentCanton.recommendations.map((rec, i) => (
                        <li key={i} style={{ marginBottom: '6px' }}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                /* Ficha Técnica del Árbol Seleccionado */
                <div>
                  {selectedTree ? (
                    <div className="tree-detail-card">
                      <div className="tree-code-badge">{selectedTree.code}</div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#234175', margin: '4px 0 2px 0' }}>
                        {selectedTree.commonName}
                      </h4>
                      <div className="tree-name-latin">{selectedTree.scientificName} ({selectedTree.family})</div>

                      <div className="tree-spec-grid">
                        <div className="tree-spec-item">
                          <strong>Altura Total</strong>
                          {selectedTree.heightM} metros
                        </div>
                        <div className="tree-spec-item">
                          <strong>DAP (Diámetro fuste)</strong>
                          {selectedTree.dapCm} cm
                        </div>
                        <div className="tree-spec-item">
                          <strong>Radio de Copa</strong>
                          {selectedTree.canopyRadiusM} m
                        </div>
                        <div className="tree-spec-item">
                          <strong>Área de Sombra</strong>
                          {selectedTree.shadowAreaM2} m²
                        </div>
                        <div className="tree-spec-item">
                          <strong>Captura de CO₂</strong>
                          {selectedTree.carbonCaptureKgYear} kg/año
                        </div>
                        <div className="tree-spec-item">
                          <strong>Origen Biogeográfico</strong>
                          <span style={{ color: selectedTree.isNative ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
                            {selectedTree.isNative ? 'Nativa de Costa Rica' : 'Introducida / Exótica'}
                          </span>
                        </div>
                      </div>

                      {/* Evaluación de Conflictos y Salud */}
                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem' }}>
                          <span style={{ color: '#64748b' }}>Fitosanidad:</span>
                          <strong style={{ color: selectedTree.health === 'Bueno' ? '#16a34a' : selectedTree.health === 'Regular' ? '#d97706' : '#dc2626' }}>
                            {selectedTree.health}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem' }}>
                          <span style={{ color: '#64748b' }}>Conflicto con Red Eléctrica:</span>
                          <strong style={{ color: selectedTree.electricConflict === 'Ninguno' ? '#16a34a' : '#dc2626' }}>
                            {selectedTree.electricConflict}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ color: '#64748b' }}>Riesgo Estructural:</span>
                          <strong style={{ color: selectedTree.riskLevel === 'Bajo' ? '#16a34a' : '#dc2626' }}>
                            {selectedTree.riskLevel}
                          </strong>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '16px', lineHeight: 1.5, background: '#f1f5f9', padding: '10px', borderRadius: '8px' }}>
                        <strong>Observaciones de campo (Survey123):</strong> {selectedTree.notes}
                      </div>

                      {/* Acciones de Campo Survey123 conectadas al árbol */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        <button
                          onClick={() => handleOpenSurveyModal('evaluacion-riesgo', selectedTree)}
                          className="tree-survey-btn tree-survey-btn-risk"
                          title="Abrir formulario oficial de Evaluación Básica de Riesgo en Survey123 para este árbol"
                        >
                          <AlertTriangle size={15} />
                          <span>Re-evaluar Fitosanidad con Survey123</span>
                        </button>

                        <button
                          onClick={() => handleOpenSurveyModal('dendrometria', selectedTree)}
                          className="tree-survey-btn tree-survey-btn-daso"
                          title="Actualizar DAP, altura y proyección de copa en Survey123"
                        >
                          <SlidersHorizontal size={15} />
                          <span>Actualizar Datos Dasométricos</span>
                        </button>
                      </div>

                      <button
                        onClick={handleCopyTreeGeoJson}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '10px',
                          borderRadius: '8px',
                          background: copiedGeoJson ? '#16a34a' : '#234175',
                          color: '#ffffff',
                          border: 'none',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        {copiedGeoJson ? <Check size={16} /> : <FileText size={16} />}
                        {copiedGeoJson ? '¡Atributos GeoJSON Copiados!' : 'Copiar Atributos GeoJSON'}
                      </button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 10px', color: '#94a3b8' }}>
                      <Trees size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
                      <p>Selecciona un árbol en el mapa interactivo para ver su ficha biométrica y fitosanitaria.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leyenda Cartográfica Dinámica */}
        <div className="map-legend-bar">
          <div className="legend-title">
            <Layers size={16} color="#234175" />
            Leyenda: {currentLayer.name}
          </div>
          <div className="legend-items-list">
            {currentLayer.colorScale.map((scaleItem, idx) => (
              <div key={idx} className="legend-chip">
                <span className="legend-color-dot" style={{ background: scaleItem.color }} />
                <span>{scaleItem.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIPELINE DE SINCRONIZACIÓN EN TIEMPO REAL SURVEY123 ↔ SIGARU */}
      <Survey123SyncPipeline onOpenSurveyModal={(formId) => handleOpenSurveyModal(formId, selectedTree)} />

      {/* METODOLOGÍA CARTOGRÁFICA DEL TCU-102A */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-title-wrap">
          <span className="section-tag">Metodología de Precisión</span>
          <h2 className="section-title">Flujo Geodésico y de Teledetección</h2>
          <p className="section-subtitle">
            Cómo el TCU-102A de la Universidad Técnica Nacional captura, calibra y procesa los datos geoespaciales
            para las municipalidades y el SINAC en Guanacaste.
          </p>
        </div>

        <div className="methodology-grid">
          {CARTOGRAPHIC_METHODOLOGY.map((step) => (
            <div key={step.step} className="method-card">
              <span className="method-number">{step.step}</span>
              <div className="method-icon-circle">
                {step.step === '01' && <Compass size={24} />}
                {step.step === '02' && <Layers size={24} />}
                {step.step === '03' && <Thermometer size={24} />}
                {step.step === '04' && <Trees size={24} />}
                {step.step === '05' && <ShieldCheck size={24} />}
              </div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
              <div className="method-tags">
                {step.tools.map((t, idx) => (
                  <span key={idx} className="method-pill">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANÁLISIS DE ISLAS DE CALOR URBANAS Y DÉFICIT VERDE */}
      <section className="uhi-analysis-container">
        <div className="section-title-wrap" style={{ marginBottom: '24px' }}>
          <span className="section-tag" style={{ color: '#ea580c' }}>Mitigación Climática</span>
          <h2 className="section-title" style={{ color: '#234175' }}>
            Islas de Calor y Déficit de Cobertura en Guanacaste
          </h2>
          <p className="section-subtitle">
            El asfalto y concreto en cascos comerciales de Guanacaste alcanzan temperaturas radiativas de hasta 42.6 °C,
            mientras que las copas densas de Guanacastes, Espaveles y Tempisques actúan como acondicionadores de aire naturales,
            reduciendo la temperatura hasta en 10.8 °C en su sombra directa.
          </p>
        </div>

        <div className="uhi-comparison-grid">
          {CANTON_ZONES.map((cz) => (
            <div key={cz.id} className="uhi-canton-card">
              <h5>{cz.canton}</h5>
              <div className="temp-badge-row">
                <span className="temp-tag-hot">LST: {cz.avgLST} °C</span>
                <span className="temp-delta-pill">+{cz.heatIslandDelta} °C Isla Calor</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '8px' }}>
                <strong>Área verde peatonal:</strong> {cz.greenAreaPerCapita} m²/hab
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Meta OMS: 9.0 m² • {cz.greenAreaPerCapita < 9 ? (
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>Déficit crítico</span>
                ) : (
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Óptimo</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA DE MAPAS TEMÁTICOS DESCARGABLES */}
      <section style={{ marginBottom: '50px' }}>
        <div className="section-title-wrap">
          <span className="section-tag">Cartografía Oficial</span>
          <h2 className="section-title">Mapas Temáticos y Fichas para Descarga</h2>
          <p className="section-subtitle">
            Cartografía técnica oficial en alta resolución y paquetes de datos abiertos para urbanistas,
            investigadores, cuadrillas municipales y ciudadanos.
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="download-filters">
          {['Todos', 'Cobertura', 'Riesgo', 'Térmico', 'Biodiversidad', 'OpenData'].map((cat) => (
            <button
              key={cat}
              onClick={() => setDownloadCategory(cat)}
              className={`filter-btn ${downloadCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Fichas Descargables */}
        <div className="download-cards-grid">
          {filteredMaps.map((mapItem) => (
            <div key={mapItem.id} className="download-card">
              <div className="download-card-header" style={{ background: mapItem.previewColor }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {mapItem.category}
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: '12px' }}>
                  {mapItem.year}
                </span>
              </div>

              <div className="download-card-body">
                <h4 className="download-card-title">{mapItem.title}</h4>
                <p className="download-card-desc">{mapItem.description}</p>

                <div className="download-meta-list">
                  <div><strong>Cantón:</strong> {mapItem.canton}</div>
                  <div><strong>Escala:</strong> {mapItem.scale}</div>
                  <div><strong>Formato:</strong> {mapItem.format}</div>
                  <div><strong>Tamaño:</strong> {mapItem.size}</div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                  {mapItem.tags.map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '0.7rem', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <button onClick={() => handleDownloadMap(mapItem)} className="download-action-btn">
                  <Download size={16} />
                  Descargar Mapa y Metadatos ({mapItem.size})
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COOPERACIÓN INTERINSTITUCIONAL (SINAC, MUNICIPALIDADES, UTN) */}
      <section className="partners-box">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#234175', marginBottom: '8px' }}>
          Alianzas e Integración Territorial
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '780px', margin: '0 auto' }}>
          La cartografía del TCU-102A se produce bajo convenios de cooperación técnica con las autoridades ambientales
          y de gobierno local de la Región Chorotega, aportando insumos geoespaciales para los Planes Reguladores Cantonales
          y los Corredores Biológicos Interurbanos.
        </p>

        <div className="partners-logos-row">
          <div className="partner-badge">
            <ShieldCheck size={18} color="#47c73b" />
            SINAC - ACAT / ACG
          </div>
          <div className="partner-badge">
            <Compass size={18} color="#234175" />
            Municipalidad de Liberia
          </div>
          <div className="partner-badge">
            <Compass size={18} color="#234175" />
            Municipalidad de Cañas
          </div>
          <div className="partner-badge">
            <Compass size={18} color="#234175" />
            Municipalidad de Bagaces
          </div>
          <div className="partner-badge">
            <Compass size={18} color="#234175" />
            Municipalidad de Santa Cruz
          </div>
          <div className="partner-badge">
            <Compass size={18} color="#234175" />
            Municipalidad de Nicoya
          </div>
          <div className="partner-badge">
            <Zap size={18} color="#f59e0b" />
            Coopeguanacaste R.L.
          </div>
        </div>
      </section>

      {/* MODAL INTERACTIVO DE SURVEY123 (CÓDIGOS QR, WEB Y APP MÓVIL) */}
      <Survey123Modal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
        initialFormId={activeSurveyFormId}
        treeContext={surveyTreeContext}
      />
    </div>
  );
}
