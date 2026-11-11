import React, { useState } from 'react';
import {
  Smartphone,
  Cloud,
  Cpu,
  Layers,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  Wifi,
  Zap,
  Activity,
  Trees,
  FileCheck
} from 'lucide-react';
import { SURVEY123_PIPELINE, PipelineStep } from '../data/survey123Data';

interface Survey123SyncPipelineProps {
  onOpenSurveyModal?: (formId: string) => void;
}

export const Survey123SyncPipeline: React.FC<Survey123SyncPipelineProps> = ({
  onOpenSurveyModal
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Smartphone size={22} />;
      case 1:
        return <Cloud size={22} />;
      case 2:
        return <Cpu size={22} />;
      case 3:
        return <Layers size={22} />;
      case 4:
        return <Building2 size={22} />;
      default:
        return <Activity size={22} />;
    }
  };

  const currentStep = SURVEY123_PIPELINE[activeStepIndex];

  return (
    <div
      className="survey-pipeline-wrapper"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '32px 28px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
        marginBottom: '40px'
      }}
    >
      {/* Encabezado del Pipeline */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '3px 10px',
                borderRadius: '12px'
              }}
            >
              Arquitectura Geoespacial de Extremo a Extremo
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#16a34a', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
              Enlace Activo ArcGIS Online
            </span>
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#234175', margin: '0 0 6px 0' }}>
            Pipeline de Sincronización Survey123 ↔ SIGARU
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '780px', margin: 0, lineHeight: 1.55 }}>
            Flujo continuo de datos en tiempo real: desde la recolección en los cantones guanacastecos por brigadas
            estudiantiles hasta la ingestión analítica en el SIG y los tableros de gestión municipal.
          </p>
        </div>

        {onOpenSurveyModal && (
          <button
            onClick={() => onOpenSurveyModal('datos-generales')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#234175',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(35, 65, 117, 0.2)'
            }}
          >
            <Smartphone size={16} />
            Lanzar Censo en Campo
          </button>
        )}
      </div>

      {/* Diagrama de Fases en Barra Conectada */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '28px',
          position: 'relative'
        }}
      >
        {SURVEY123_PIPELINE.map((st, idx) => {
          const isActive = idx === activeStepIndex;
          const isPast = idx < activeStepIndex;

          return (
            <div
              key={st.step}
              onClick={() => setActiveStepIndex(idx)}
              style={{
                background: isActive ? '#f0f9ff' : '#f8fafc',
                border: isActive ? '2px solid #0284c7' : '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: isActive ? '0 4px 14px rgba(2, 132, 199, 0.12)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: isActive ? '#0284c7' : isPast ? '#16a34a' : '#e2e8f0',
                    color: isActive || isPast ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {getStepIcon(idx)}
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: isActive ? '#0284c7' : '#94a3b8'
                  }}
                >
                  PASO {st.step}
                </span>
              </div>

              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                {st.phase}
              </div>
              <div
                style={{
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: isActive ? '#0369a1' : '#1e293b',
                  lineHeight: 1.3,
                  marginTop: '2px'
                }}
              >
                {st.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Detalle del Paso Activo */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1px solid #cbd5e1',
          borderRadius: '16px',
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: '24px',
          alignItems: 'center'
        }}
        className="pipeline-detail-card"
      >
        {/* Metadatos Técnicos */}
        <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '20px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#0284c7', marginBottom: '4px' }}>
            Fase {currentStep.step}: {currentStep.phase}
          </div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 14px 0' }}>
            {currentStep.title}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: '#64748b' }}>Responsable / Actor:</span>
              <div style={{ fontWeight: 700, color: '#234175' }}>{currentStep.actor}</div>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Tecnología Implementada:</span>
              <div style={{ fontWeight: 600, color: '#0f766e', fontFamily: 'monospace' }}>
                {currentStep.technology}
              </div>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Rendimiento / Métrica:</span>
              <div style={{ fontWeight: 700, color: '#15803d' }}>{currentStep.metrics}</div>
            </div>
          </div>
        </div>

        {/* Descripción Funcional y Conexión */}
        <div>
          <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={16} color="#0284c7" />
            Operación del Sistema
          </h5>
          <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.6, margin: '0 0 16px 0' }}>
            {currentStep.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.74rem',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                color: '#475569'
              }}
            >
              🔒 Cifrado TLS 1.3 en tránsito
            </span>
            <span
              style={{
                fontSize: '0.74rem',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                color: '#475569'
              }}
            >
              🛰️ Datum Proyectado CRTM05 (EPSG: 5367)
            </span>
            <span
              style={{
                fontSize: '0.74rem',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '4px 10px',
                borderRadius: '6px',
                color: '#475569'
              }}
            >
              🌲 Estándar TRAQ ISA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
