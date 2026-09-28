import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconInfo, IconX } from './Icons';
import { getPageInfo } from '../../data/pageInfo';

/**
 * Reusable Page Information Component
 * Displays a ⓘ trigger button in the page header and opens a Liquid Glass
 * modal (Desktop) or bottom sheet (Mobile) with comprehensive, localized
 * information about the current page.
 */
export const PageInfo = ({ pageId }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const info = getPageInfo(pageId, t);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Lock body scroll when modal/sheet is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!info) return null;

  return (
    <>
      {/* ⓘ Header Action Button */}
      <button
        type="button"
        className="ib header-icon-btn page-info-trigger"
        onClick={() => setIsOpen(true)}
        aria-label={t('pageInfo.infoTitle')}
        title={t('pageInfo.tooltip')}
      >
        <IconInfo size={16} />
      </button>

      {/* Liquid Glass Information Modal / Bottom Sheet */}
      {isOpen &&
        createPortal(
          <div
            className="page-info-backdrop"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="page-info-heading"
          >
            <div
              className="page-info-panel"
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Sheet Grab Handle */}
              <div className="page-info-handle-wrap">
                <div className="page-info-handle" />
              </div>

              {/* Header */}
              <div className="page-info-header">
                <div className="page-info-icon-badge">
                  <IconInfo size={20} />
                </div>
                <div className="page-info-title-wrap">
                  <h2 id="page-info-heading" className="page-info-title">
                    {info.title}
                  </h2>
                  {info.subtitle && (
                    <p className="page-info-subtitle">{info.subtitle}</p>
                  )}
                </div>
                <button
                  type="button"
                  className="page-info-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label={t('common.close')}
                >
                  <IconX size={18} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="page-info-body">
                {/* 1. Purpose */}
                {info.purpose && (
                  <div className="page-info-section">
                    <span className="page-info-section-tag">
                      {t('pageInfo.purposeTitle')}
                    </span>
                    <div className="page-info-purpose-card">
                      <p>{info.purpose}</p>
                    </div>
                  </div>
                )}

                {/* 2. How to Use */}
                {info.howToUse && info.howToUse.length > 0 && (
                  <div className="page-info-section">
                    <span className="page-info-section-tag">
                      {t('pageInfo.howToUseTitle')}
                    </span>
                    <ol className="page-info-steps-list">
                      {info.howToUse.map((step, idx) => (
                        <li key={idx} className="page-info-step-item">
                          <span className="page-info-step-number">
                            {idx + 1}
                          </span>
                          <span className="page-info-step-text">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* 3. Key Features */}
                {info.keyFeatures && info.keyFeatures.length > 0 && (
                  <div className="page-info-section">
                    <span className="page-info-section-tag">
                      {t('pageInfo.keyFeaturesTitle')}
                    </span>
                    <ul className="page-info-features-list">
                      {info.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="page-info-feature-item">
                          <span className="page-info-feature-bullet" />
                          <span className="page-info-feature-text">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Important Fields & Metrics */}
                {info.importantFields && info.importantFields.length > 0 && (
                  <div className="page-info-section">
                    <span className="page-info-section-tag">
                      {t('pageInfo.importantFieldsTitle')}
                    </span>
                    <div className="page-info-fields-grid">
                      {info.importantFields.map((field, idx) => {
                        const parts = field.split(':');
                        const term = parts[0]?.trim();
                        const desc = parts.slice(1).join(':').trim();
                        return (
                          <div key={idx} className="page-info-field-card">
                            <b className="page-info-field-term">{term}</b>
                            {desc && (
                              <p className="page-info-field-desc">{desc}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. Actions & Controls */}
                {info.actions && info.actions.length > 0 && (
                  <div className="page-info-section">
                    <span className="page-info-section-tag">
                      {t('pageInfo.actionsTitle')}
                    </span>
                    <div className="page-info-actions-list">
                      {info.actions.map((act, idx) => (
                        <div key={idx} className="page-info-action-pill">
                          <span className="page-info-action-dot" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Button */}
              <div className="page-info-footer">
                <button
                  type="button"
                  className="page-info-dismiss-btn"
                  onClick={() => setIsOpen(false)}
                >
                  {t('pageInfo.gotIt') || t('common.close')}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default PageInfo;
