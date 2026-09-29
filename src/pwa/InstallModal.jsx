import React from 'react';
import { usePwa } from './PwaContext';
import { useTranslation } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

export const InstallModal = () => {
  const { showInstallModal, setShowInstallModal, platform, triggerInstall, isInstallable } = usePwa();
  const { t } = useTranslation();
  const { activeTheme } = useTheme();

  const isDark = activeTheme === 'dark';

  if (!showInstallModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in zoom-in duration-200 rounded-2xl"
        style={{
          background: 'var(--surf)',
          border: '1px solid var(--line)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)',
          color: 'var(--text)',
        }}
      >
        <div className="flex items-center gap-3.5">
          <img
            src="/icon-192.png"
            alt="Cotton Calculater Pro"
            style={{ width: '52px', height: '52px', objectFit: 'contain', background: 'transparent', display: 'block' }}
            className="flex-shrink-0"
          />
          <div>
            <h3 style={{ color: 'var(--text)', fontWeight: 800, fontSize: '16px' }}>
              {t('pwa.installTitle')}
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: 600 }}>
              Cotton Calculater Pro
            </p>
          </div>
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.5, fontWeight: 500 }}>
          {t('pwa.installDesc')}
        </p>

        {/* Platform-specific instructions */}
        <div
          className="rounded-xl p-3.5 space-y-2 text-xs"
          style={{
            background: 'var(--surf2)',
            border: '1px solid var(--line)',
            color: 'var(--text)',
          }}
        >
          {platform === 'ios' ? (
            <div className="space-y-2">
              <p style={{ fontWeight: 800, color: 'var(--text)' }}>iOS Safari:</p>
              <ol className="list-decimal pl-4 space-y-1" style={{ color: 'var(--muted)' }}>
                <li>Tap the <strong>Share</strong> button at bottom of Safari.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                <li>Tap <strong>Add</strong> in the top right.</li>
              </ol>
            </div>
          ) : (
            <div className="space-y-2">
              <p style={{ fontWeight: 800, color: 'var(--text)' }}>
                {platform === 'android' ? 'Android Chrome:' : 'Desktop Browser:'}
              </p>
              <ol className="list-decimal pl-4 space-y-1" style={{ color: 'var(--muted)' }}>
                {platform === 'android' ? (
                  <>
                    <li>Tap the <strong>three dots menu (⋮)</strong> in Chrome.</li>
                    <li>Tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.</li>
                  </>
                ) : (
                  <>
                    <li>Look for the <strong>Install</strong> icon in the address bar.</li>
                    <li>Click <strong>Install</strong> to install as a desktop application.</li>
                  </>
                )}
              </ol>
            </div>
          )}
        </div>

        <div className="flex gap-2.5 pt-1">
          {isInstallable && (
            <button
              type="button"
              onClick={triggerInstall}
              className="flex-1 py-2.5 px-4 glass-button-primary text-sm min-h-[44px]"
            >
              {t('pwa.installNow')}
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowInstallModal(false)}
            className="flex-1 py-2.5 px-4 glass-button-secondary text-sm min-h-[44px]"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallModal;
