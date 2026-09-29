import React, { useState } from 'react';
import { useTranslation, availableLanguages } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/ThemeContext';
import { usePwa } from '../../pwa/PwaContext';
import {
  IconSun,
  IconMoon,
  IconMonitor,
  IconDownload,
  IconCheck,
} from '../common/Icons';

export const SettingsPage = () => {
  const { t, language, setLanguage } = useTranslation();
  const { themeMode, setTheme } = useTheme();
  const { isInstallable, isInstalled, triggerInstall, platform } = usePwa();
  const [resetMessage, setResetMessage] = useState(false);

  const handleResetPreferences = () => {
    localStorage.removeItem('cotton_calc_theme');
    localStorage.removeItem('cotton_calc_lang');
    localStorage.removeItem('cotton_calc_sidebar_collapsed');
    setTheme('light');
    setLanguage('en');
    setResetMessage(true);
    setTimeout(() => setResetMessage(false), 3000);
  };

  return (
    <>
      {/* 1. Appearance / Theme */}
      <div className="card glass">
        <div className="lbl">{t('settings.appearanceTitle').toUpperCase()}</div>
        <div className="opt">
          {[
            { id: 'system', label: t('settings.themeSystem'), icon: IconMonitor },
            { id: 'light', label: t('settings.themeLight'), icon: IconSun },
            { id: 'dark', label: t('settings.themeDark'), icon: IconMoon },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = themeMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={isSelected ? 'on' : ''}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Language Selection */}
      <div className="card glass">
        <div className="lbl">{t('settings.languageTitle').toUpperCase()}</div>
        <div className="opt">
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={isSelected ? 'on' : ''}
              >
                <span>{lang.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PWA & Installation */}
      <div className="card glass">
        <div className="lbl">{t('settings.pwaTitle').toUpperCase()}</div>
        <div className="status settings-status-row">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span
              className="dot"
              style={{ background: isInstalled ? 'var(--gold)' : 'var(--primary)' }}
            />
            <div className="min-w-0">
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>
                {t('settings.appStatus')}
              </div>
              <small style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: 600, display: 'block' }}>
                {isInstalled
                  ? t('settings.standaloneRunning')
                  : t('settings.browserRunning')}
              </small>
            </div>
          </div>
          {!isInstalled && isInstallable && (
            <button
              type="button"
              onClick={triggerInstall}
              className="btn sm"
            >
              <IconDownload size={16} />
              <span>{t('settings.installBtn')}</span>
            </button>
          )}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.5 }}>
          {platform === 'ios' || platform === 'android'
            ? t('settings.installInstructionsMobile')
            : t('settings.installInstructionsDesktop')}
        </p>
      </div>

      {/* 4. About Application & Industry Reference */}
      <div className="card glass">
        <div className="lbl">{t('settings.aboutTitle').toUpperCase()}</div>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
          {t('settings.purposeText')}
        </p>
        <div className="units">
          <div>1 CANDY<b>356 kg Lint</b></div>
          <div>1 MAUND<b>20 kg Raw</b></div>
          <div>1 QUINTAL<b>100 kg</b></div>
          <div>1 TON<b>1000 kg Seed</b></div>
        </div>
      </div>

      {/* 5. Storage & Reset */}
      <div className="card glass">
        <div className="status settings-reset-row" style={{ background: 'none', border: 0, padding: 0 }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)', flex: 1, lineHeight: 1.4 }}>
            {resetMessage ? (
              <span style={{ color: 'var(--primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <IconCheck size={14} />
                <span>{t('settings.resetSuccess')}</span>
              </span>
            ) : (
              'Reset all local preferences (theme, language, layout).'
            )}
          </span>
          <button
            type="button"
            onClick={handleResetPreferences}
            className="btn sm danger"
          >
            {t('settings.resetBtn')}
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
