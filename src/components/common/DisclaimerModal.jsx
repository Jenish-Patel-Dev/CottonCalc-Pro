import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { useDisclaimer } from './DisclaimerContext';
import { IconShieldAlert, IconX, IconCheck } from './Icons';

export const DisclaimerModal = () => {
  const { t } = useTranslation();
  const {
    isGateOpen,
    isReviewOpen,
    isUpdatedTerms,
    acceptedDate,
    acceptTerms,
    closeReview,
  } = useDisclaimer();

  const [isChecked, setIsChecked] = useState(false);
  const modalRef = useRef(null);

  const isOpen = isGateOpen || isReviewOpen;
  const isMandatoryGate = isGateOpen;

  // Lock body scroll whenever modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // If review mode, allow closing via Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isMandatoryGate) {
        closeReview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isMandatoryGate, closeReview]);

  // Reset checkbox state whenever gate opens
  useEffect(() => {
    if (isGateOpen) {
      setIsChecked(false);
    }
  }, [isGateOpen]);

  if (!isOpen) return null;

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

  const handleBackdropClick = () => {
    // Only allow backdrop dismissal in review mode, NOT in mandatory gate mode!
    if (!isMandatoryGate) {
      closeReview();
    }
  };

  return createPortal(
    <div
      className="page-info-backdrop"
      onClick={handleBackdropClick}
      style={{
        zIndex: 99999,
        background: isMandatoryGate ? 'rgba(5, 8, 26, 0.85)' : 'rgba(8, 12, 32, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-heading"
    >
      <div
        className="page-info-panel"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '620px',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px var(--line)',
        }}
      >
        {/* Mobile Sheet Grab Handle */}
        <div className="page-info-handle-wrap">
          <div className="page-info-handle" />
        </div>

        {/* Modal Header */}
        <div className="page-info-header" style={{ padding: '16px 20px' }}>
          <div
            className="page-info-icon-badge"
            style={{
              background: isMandatoryGate ? 'rgba(59, 79, 224, 0.15)' : 'rgba(239, 68, 68, 0.12)',
              color: isMandatoryGate ? 'var(--primary)' : '#EF4444',
            }}
          >
            <IconShieldAlert size={22} />
          </div>
          <div className="page-info-title-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 id="disclaimer-heading" className="page-info-title" style={{ fontSize: '17px' }}>
                {isUpdatedTerms
                  ? (t('termsGate.updateTitle') || t('disclaimer.title'))
                  : (t('termsGate.title') || t('disclaimer.title'))}
              </h2>
              {isReviewOpen && (
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t('termsGate.acceptedStatus') || 'ACCEPTED'}
                </span>
              )}
            </div>
            <p className="page-info-subtitle" style={{ marginTop: '2px' }}>
              {isMandatoryGate
                ? (isUpdatedTerms
                    ? (t('termsGate.updateSubtitle') || 'Terms updated. Please review and accept to continue.')
                    : (t('termsGate.subtitle') || 'Please review and accept to enter the application.'))
                : (acceptedDate
                    ? `${t('termsGate.acceptedOn') || 'Accepted on'}: ${acceptedDate}`
                    : t('disclaimer.subtitle'))}
            </p>
          </div>

          {/* Close button ONLY in review mode, NOT in mandatory gate mode */}
          {!isMandatoryGate && (
            <button
              type="button"
              className="page-info-close-btn"
              onClick={closeReview}
              aria-label={t('common.close')}
            >
              <IconX size={18} />
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div
          className="page-info-body"
          style={{
            gap: '12px',
            maxHeight: '62vh',
            overflowY: 'auto',
            padding: '16px 20px',
          }}
        >
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

        {/* Modal Footer Controls */}
        <div
          className="page-info-footer"
          style={{
            padding: '14px 20px',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {isMandatoryGate ? (
            <>
              {/* Checkbox Agreement */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 1.45,
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    marginTop: '2px',
                    accentColor: 'var(--primary)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />
                <span>
                  {t('termsGate.checkboxLabel') ||
                    'I have read, understood, and agree to the Terms & Conditions and Disclaimer.'}
                </span>
              </label>

              {/* Accept & Continue Button */}
              <button
                type="button"
                className="page-info-dismiss-btn"
                disabled={!isChecked}
                onClick={acceptTerms}
                style={{
                  width: '100%',
                  background: isChecked ? 'var(--primary)' : 'var(--surf2)',
                  color: isChecked ? 'var(--pi)' : 'var(--muted)',
                  border: isChecked ? 'none' : '1px solid var(--line)',
                  cursor: isChecked ? 'pointer' : 'not-allowed',
                  opacity: isChecked ? 1 : 0.6,
                  fontWeight: 800,
                  fontSize: '14px',
                  minHeight: '44px',
                  boxShadow: isChecked
                    ? '0 4px 14px rgba(59, 79, 224, 0.35)'
                    : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {t('termsGate.acceptBtn') || 'Accept & Continue'}
              </button>
            </>
          ) : (
            /* Review Mode Close Button */
            <button
              type="button"
              className="page-info-dismiss-btn"
              onClick={closeReview}
              style={{
                width: '100%',
                background: 'var(--primary)',
                color: 'var(--pi)',
                fontWeight: 800,
                fontSize: '14px',
                minHeight: '44px',
              }}
            >
              {t('common.close') || 'Close'}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DisclaimerModal;
