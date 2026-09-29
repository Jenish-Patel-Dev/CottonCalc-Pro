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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-level-4 max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in zoom-in duration-200 border border-white/30 dark:border-white/15 rounded-2xl">
        <div className="flex items-center gap-3.5">
          <img
            src="/assets/logos/logo-light-icon.png"
            alt="CottonCalc Pro"
            style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'transparent', display: 'block' }}
            className="flex-shrink-0"
          />
          <div>
            <h3 className="font-bold text-app-primary text-base">
              {t('pwa.installTitle')}
            </h3>
            <p className="text-xs text-app-secondary font-medium">
              {t('app.title')} PWA
            </p>
          </div>
        </div>

        <p className="text-sm text-app-secondary font-medium">
          {t('pwa.installDesc')}
        </p>

        {/* Platform-specific instructions */}
        <div className="bg-white/40 dark:bg-white/10 rounded-xl p-3.5 border border-app-border text-xs text-app-primary space-y-2">
          {platform === 'ios' ? (
            <div className="space-y-2">
              <p className="font-bold text-app-primary">iOS Safari:</p>
              <ol className="list-decimal pl-4 space-y-1 text-app-secondary">
                <li>Tap the <strong>Share</strong> button at bottom of Safari.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                <li>Tap <strong>Add</strong> in the top right.</li>
              </ol>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-bold text-app-primary">
                {platform === 'android' ? 'Android Chrome:' : 'Desktop Browser:'}
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-app-secondary">
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
