import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Smartphone,
  ExternalLink,
  QrCode,
  Download,
  Check,
  Copy,
  Info,
  Maximize2,
  Minimize2,
  TreePine,
  ShieldAlert,
  Ruler,
  Leaf,
  FileText,
  MapPin,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { SURVEY123_FORMS, Survey123FormItem } from '../data/survey123Data';

export interface TreeContextData {
  id?: string;
  code?: string;
  commonName?: string;
  scientificName?: string;
  canton?: string;
  lat?: number | string;
  lng?: number | string;
  dap?: number;
  height?: number;
  health?: string;
}

interface Survey123ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormId?: string;
  treeContext?: TreeContextData | null;
}

export const Survey123Modal: React.FC<Survey123ModalProps> = ({
  isOpen,
  onClose,
  initialFormId = 'datos-generales',
  treeContext = null
}) => {
  const [activeFormId, setActiveFormId] = useState<string>(initialFormId);
  const [openMode, setOpenMode] = useState<'qr' | 'embed'>('qr');
  const [qrSvg, setQrSvg] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isCopiedUrl, setIsCopiedUrl] = useState<boolean>(false);
  const [isCopiedTreeData, setIsCopiedTreeData] = useState<boolean>(false);
  const [isIframeExpanded, setIsIframeExpanded] = useState<boolean>(false);

  // Sincronizar formulario activo si cambia la prop
  useEffect(() => {
    if (initialFormId) {
      setActiveFormId(initialFormId);
    }
  }, [initialFormId, isOpen]);

  // Obtener formulario seleccionado
  const currentForm: Survey123FormItem =
    SURVEY123_FORMS.find((f) => f.id === activeFormId) || SURVEY123_FORMS[0];

  // Generar Código QR SVG y PNG dinámico cuando cambie el formulario
  useEffect(() => {
    let isMounted = true;

    // Generar SVG vectorial puro
    QRCode.toString(currentForm.url, {
      type: 'svg',
      margin: 1.5,
      color: {
        dark: '#1e293b',
        light: '#ffffff'
      }
    })
      .then((svg) => {
        if (isMounted) setQrSvg(svg);
      })
      .catch((err) => {
        console.error('Error generando QR SVG:', err);
      });

    // Generar DataURL para descarga PNG fácil
    QRCode.toDataURL(currentForm.url, {
      margin: 2,
      width: 400,
      color: {
        dark: '#1e293b',
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isMounted) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generando QR DataURL:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [currentForm.url]);

  // Manejar copia de URL
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentForm.url);
    setIsCopiedUrl(true);
    setTimeout(() => setIsCopiedUrl(false), 2200);
  };

  // Manejar copia de datos de árbol
  const handleCopyTreeContext = () => {
    if (!treeContext) return;
    const treeText = [
      `Árbol: ${treeContext.code || treeContext.id || 'N/A'} - ${treeContext.commonName || ''}`,
      `Científico: ${treeContext.scientificName || 'N/A'}`,
      `Cantón: ${treeContext.canton || 'N/A'}`,
      `Coordenadas: Lat ${treeContext.lat || 'N/A'}, Lng ${treeContext.lng || 'N/A'}`,
      treeContext.dap ? `DAP: ${treeContext.dap} cm` : '',
      treeContext.height ? `Altura: ${treeContext.height} m` : '',
      treeContext.health ? `Fitosanidad: ${treeContext.health}` : ''
    ]
      .filter(Boolean)
      .join(' | ');

    navigator.clipboard.writeText(treeText);
    setIsCopiedTreeData(true);
    setTimeout(() => setIsCopiedTreeData(false), 2200);
  };

  // Descargar código QR como PNG
  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `QR-Survey123-${currentForm.id}-TCU102A.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div
      className="survey-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="survey-modal-box"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: isIframeExpanded ? '1180px' : '960px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          transition: 'max-width 0.3s ease',
          animation: 'fadeInScale 0.25s ease-out'
        }}
      >
        {/* Cabecera del Modal */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #234175 100%)',
            color: '#ffffff',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px'
              }}
            >
              <img
                src="/images/Survey123-icon.png"
                alt="ArcGIS Survey123"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: '#47c73b',
                    color: '#0f291e',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}
                >
                  ArcGIS Survey123 Oficial
                </span>
                <span style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
                  TCU-102A • UTN Guanacaste
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '2px 0 0 0', color: '#ffffff' }}>
                Censo Forestal y Recolección en Campo
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              title="Cerrar modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Ficha contextual del árbol si fue invocado desde un punto cartográfico */}
        {treeContext && (
          <div
            style={{
              background: '#f0fdf4',
              borderBottom: '1px solid #bbf7d0',
              padding: '10px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              fontSize: '0.84rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534' }}>
              <TreePine size={18} color="#15803d" />
              <span>
                Árbol vinculado:{' '}
                <strong>
                  {treeContext.code || treeContext.id} — {treeContext.commonName}
                </strong>
                {treeContext.canton ? ` (${treeContext.canton})` : ''}
              </span>
              {treeContext.dap && (
                <span style={{ background: '#dcfce7', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                  DAP: {treeContext.dap}cm
                </span>
              )}
            </div>
            <button
              onClick={handleCopyTreeContext}
              style={{
                background: isCopiedTreeData ? '#15803d' : '#ffffff',
                color: isCopiedTreeData ? '#ffffff' : '#166534',
                border: '1px solid #86efac',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              {isCopiedTreeData ? <Check size={13} /> : <Copy size={13} />}
              {isCopiedTreeData ? '¡Datos Copiados!' : 'Copiar Atributos para Campo'}
            </button>
          </div>
        )}

        {/* Selector de los Formularios Oficiales */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '8px 16px',
            gap: '8px'
          }}
        >
          {SURVEY123_FORMS.map((form, idx) => {
            const isSelected = form.id === activeFormId;
            return (
              <button
                key={form.id}
                onClick={() => {
                  setActiveFormId(form.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${form.color}` : '1px solid #cbd5e1',
                  background: isSelected ? '#ffffff' : 'transparent',
                  color: isSelected ? form.color : '#475569',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isSelected ? form.color : '#94a3b8',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 800
                  }}
                >
                  {idx + 1}
                </span>
                <span>{form.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Cuerpo Principal del Modal con scroll */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Ficha Resumen del Formulario Seleccionado */}
          <div
            style={{
              background: '#f8fafc',
              border: `1px solid ${currentForm.color}40`,
              borderLeft: `5px solid ${currentForm.color}`,
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <div style={{ flex: '1 1 450px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: `${currentForm.color}15`,
                    color: currentForm.color
                  }}
                >
                  {currentForm.badge}
                </span>
                <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                  Código Oficial: {currentForm.code}
                </span>
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0' }}>
                {currentForm.title}
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                {currentForm.subtitle}
              </p>
            </div>

            {/* Alternador de Vista (Código QR vs Visor Embebido) */}
            <div
              style={{
                display: 'inline-flex',
                background: '#e2e8f0',
                padding: '3px',
                borderRadius: '8px'
              }}
            >
              <button
                onClick={() => setOpenMode('qr')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: openMode === 'qr' ? '#ffffff' : 'transparent',
                  color: openMode === 'qr' ? '#1e293b' : '#64748b',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: openMode === 'qr' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <QrCode size={15} />
                Código QR Móvil
              </button>
              <button
                onClick={() => setOpenMode('embed')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: openMode === 'embed' ? '#ffffff' : 'transparent',
                  color: openMode === 'embed' ? '#1e293b' : '#64748b',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: openMode === 'embed' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <Layers size={15} />
                Visor Embebido (Web)
              </button>
            </div>
          </div>

          {/* Opciones de Acción Directa: Web, Deep Link y Copiar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px'
            }}
          >
            {/* Opción 1: Abrir en Web */}
            <a
              href={currentForm.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '10px',
                background: currentForm.color,
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                transition: 'transform 0.15s ease, opacity 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.92';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ExternalLink size={16} />
              Abrir Formulario en Web
            </a>

            {/* Opción 2: Abrir en App Survey123 con Deep Link */}
            <a
              href={currentForm.deepLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '10px',
                background: '#0284c7',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)',
                transition: 'transform 0.15s ease, opacity 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.92';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              title="Abre directamente en la app nativa instalada de Survey123 (arcgis-survey123://)"
            >
              <Smartphone size={16} />
              Abrir en App Móvil Survey123
            </a>

            {/* Opción 3: Copiar Enlace Directo */}
            <button
              onClick={handleCopyUrl}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '10px',
                background: isCopiedUrl ? '#16a34a' : '#f1f5f9',
                color: isCopiedUrl ? '#ffffff' : '#334155',
                border: '1px solid #cbd5e1',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isCopiedUrl ? <Check size={16} /> : <Copy size={16} />}
              {isCopiedUrl ? '¡Enlace Copiado!' : currentForm.url.replace('https://', '')}
            </button>
          </div>

          {/* VISTA 1: MODO CÓDIGO QR INTERACTIVO */}
          {openMode === 'qr' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 340px) 1fr',
                gap: '24px',
                alignItems: 'start'
              }}
              className="survey-qr-layout"
            >
              {/* Tarjeta de Código QR */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={14} color="#f59e0b" />
                  Escanear en Campo desde el Celular
                </div>

                {/* Contenedor del SVG del QR */}
                <div
                  style={{
                    width: '240px',
                    height: '240px',
                    background: '#ffffff',
                    padding: '12px',
                    borderRadius: '14px',
                    border: '2px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)'
                  }}
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />

                <div
                  style={{
                    marginTop: '12px',
                    fontSize: '0.74rem',
                    color: '#64748b',
                    lineHeight: 1.4
                  }}
                >
                  Apunta con la cámara de tu teléfono móvil o el lector de Survey123 para abrir instantáneamente.
                </div>

                {/* Botón de descarga de QR */}
                <button
                  onClick={handleDownloadQr}
                  style={{
                    marginTop: '14px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Download size={14} />
                  Descargar Código QR (PNG)
                </button>
              </div>

              {/* Información Técnica del Formulario */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                    Objetivo Técnico del Formulario
                  </h5>
                  <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                    {currentForm.description}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {/* Equipamiento Recomendado */}
                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#234175', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Ruler size={14} />
                      Equipamiento de Campo Requerido
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                      {currentForm.equipment.map((eq, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{eq}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Campos Clave Registrados */}
                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={14} />
                      Variables Críticas Levantadas
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                      {currentForm.keyFields.slice(0, 4).map((kf, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{kf}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consejo de Campo */}
                <div
                  style={{
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <Info size={16} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.78rem', color: '#92400e', lineHeight: 1.5 }}>
                    <strong>Protocolo de Brigada UTN:</strong> {currentForm.fieldTips}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: VISOR EMBEBIDO (IFRAME) */}
          {openMode === 'embed' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f1f5f9',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  color: '#475569'
                }}
              >
                <span>
                  Mostrando formulario web interactivo en tiempo real desde <strong>arcg.is</strong>.
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setIsIframeExpanded(!isIframeExpanded)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#234175',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isIframeExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    {isIframeExpanded ? 'Reducir' : 'Expandir'}
                  </button>
                  <a
                    href={currentForm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Abrir fuera ↗
                  </a>
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  height: isIframeExpanded ? '640px' : '480px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  position: 'relative'
                }}
              >
                <iframe
                  src={currentForm.url}
                  title={currentForm.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="geolocation; camera; microphone"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
                />
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div
          style={{
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            padding: '14px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#64748b'
          }}
        >
          <div>
            <span>Soporte de campo: </span>
            <strong style={{ color: '#1e293b' }}>Coordinación TCU-102A UTN Guanacaste</strong>
            <span> • Sincronización continua con ArcGIS Online</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#234175',
              color: '#ffffff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Listo / Volver al Mapa
          </button>
        </div>
      </div>
    </div>
  );
};
