import React from 'react';
import { usePwa } from './PwaContext';
import { useTranslation } from '../i18n/LanguageContext';

export const UpdateModal = () => {
  const { needRefresh, isUpdating, updateServiceWorker, dismissUpdate } = usePwa();
  const { t } = useTranslation();

  if (!needRefresh) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-dialog-title"
    >
      <div
        className="max-w-sm w-full p-6 space-y-5 animate-in zoom-in duration-200 rounded-2xl text-center flex flex-col items-center"
        style={{
          background: 'var(--surf)',
          border: '1px solid var(--line)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)',
          color: 'var(--text)',
        }}
      >
        {/* Animated Brand Sync Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
          style={{
            background: 'var(--tint)',
            color: 'var(--primary)',
            border: '1px solid var(--line)',
          }}
        >
          <svg
            className={`w-8 h-8 ${isUpdating ? 'animate-spin' : 'animate-bounce'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3
            id="update-dialog-title"
            style={{
              color: 'var(--text)',
              fontSize: '18px',
              fontWeight: 800,
              lineHeight: 1.3,
            }}
          >
            {t('pwa.updateTitle')}
          </h3>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {t('pwa.updateText')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full pt-1">
          <button
            type="button"
            onClick={updateServiceWorker}
            disabled={isUpdating}
            className="w-full py-3 px-4 glass-button-primary text-sm font-extrabold min-h-[46px] rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
            style={{
              background: 'var(--primary)',
              color: 'var(--pi)',
              cursor: isUpdating ? 'not-allowed' : 'pointer',
            }}
          >
            {isUpdating ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--pi)' }}
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>{t('pwa.updatingBtn')}</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
                <span>{t('pwa.updateBtn')}</span>
              </>
            )}
          </button>

          {!isUpdating && (
            <button
              type="button"
              onClick={dismissUpdate}
              className="w-full py-2.5 px-4 text-xs font-semibold min-h-[40px] rounded-xl transition-colors"
              style={{
                background: 'var(--surf2)',
                color: 'var(--muted)',
                border: '1px solid var(--line)',
                cursor: 'pointer',
              }}
            >
              {t('pwa.later')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
