import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { useDisclaimer } from './DisclaimerContext';
import { IconShieldAlert, IconX, IconCheck } from './Icons';

export const DisclaimerModal = () => {
  const { t } = useTranslation();
  const { isDisclaimerOpen, closeDisclaimer } = useDisclaimer();
  const modalRef = useRef(null);

  // Close on Escape key & manage body scroll
  useEffect(() => {
    if (!isDisclaimerOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeDisclaimer();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isDisclaimerOpen, closeDisclaimer]);

  if (!isDisclaimerOpen) return null;

  const points = [
    {
      title: t('disclaimer.point1Title'),
      desc: t('disclaimer.point1Desc'),
    },
    {
      title: t('disclaimer.point2Title'),
      desc: t('disclaimer.point2Desc'),
    },
    {
      title: t('disclaimer.point3Title'),
      desc: t('disclaimer.point3Desc'),
    },
    {
      title: t('disclaimer.point4Title'),
      desc: t('disclaimer.point4Desc'),
    },
    {
      title: t('disclaimer.point5Title'),
      desc: t('disclaimer.point5Desc'),
    },
  ];

  return createPortal(
    <div
      className="page-info-backdrop"
      onClick={closeDisclaimer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-heading"
    >
      <div
        className="page-info-panel"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '620px' }}
      >
        {/* Mobile Sheet Grab Handle */}
        <div className="page-info-handle-wrap">
          <div className="page-info-handle" />
        </div>

        {/* Modal Header */}
        <div className="page-info-header">
          <div
            className="page-info-icon-badge"
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#EF4444',
            }}
          >
            <IconShieldAlert size={22} />
          </div>
          <div className="page-info-title-wrap">
            <h2 id="disclaimer-heading" className="page-info-title">
              {t('disclaimer.title')}
            </h2>
            <p className="page-info-subtitle">
              {t('disclaimer.subtitle')}
            </p>
          </div>
          <button
            type="button"
            className="page-info-close-btn"
            onClick={closeDisclaimer}
            aria-label={t('common.close')}
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="page-info-body" style={{ gap: '14px' }}>
          {/* Main Notice Box */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '16px',
              background: 'var(--surf2)',
              border: '1px solid var(--line)',
              borderLeft: '4px solid var(--primary)',
            }}
          >
            <p
              style={{
                fontSize: '13.5px',
                lineHeight: 1.6,
                fontWeight: 700,
                color: 'var(--text)',
                margin: 0,
              }}
            >
              {t('disclaimer.intro')}
            </p>
          </div>

          {/* Legal Points Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {points.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'var(--surf2)',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      flexShrink: 0,
                    }}
                  />
                  <b
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 800,
                      color: 'var(--text)',
                    }}
                  >
                    {pt.title}
                  </b>
                </div>
                <p
                  style={{
                    fontSize: '12.5px',
                    lineHeight: 1.55,
                    color: 'var(--muted)',
                    margin: '0 0 0 14px',
                    fontWeight: 500,
                  }}
                >
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Acceptance Box */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              background: 'rgba(59, 79, 224, 0.08)',
              border: '1px dashed var(--primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ color: 'var(--primary)' }}>
              <IconCheck size={18} />
            </span>
            <span
              style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: 'var(--text)',
              }}
            >
              {t('disclaimer.acceptance')}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="page-info-footer">
          <button
            type="button"
            className="page-info-dismiss-btn"
            onClick={closeDisclaimer}
            style={{
              background: 'var(--primary)',
              color: 'var(--pi)',
              fontWeight: 800,
              fontSize: '14px',
            }}
          >
            {t('disclaimer.closeBtn')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DisclaimerModal;
