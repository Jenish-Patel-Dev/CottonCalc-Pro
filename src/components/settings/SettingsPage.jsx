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
  IconShare,
  IconShieldAlert,
  IconUser,
  IconMail,
} from '../common/Icons';
import { useDisclaimer } from '../common/DisclaimerContext';
import AppFooter from '../common/AppFooter';

export const SettingsPage = () => {
  const { t, language, setLanguage } = useTranslation();
  const { themeMode, setTheme } = useTheme();
  const { isInstallable, isInstalled, triggerInstall, platform } = usePwa();
  const { openReview, acceptedDate, hasAccepted, appVersion } = useDisclaimer();
  const [resetMessage, setResetMessage] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  const handleShareApp = async () => {
    const shareUrl = window.location.origin;
    const shareData = {
      title: 'CottonCalc Pro',
      text: 'CottonCalc Pro - Cotton Ginning & Oil Mill Calculator',
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyShareLink(shareUrl);
        }
      }
    } else {
      copyShareLink(shareUrl);
    }
  };

  const copyShareLink = async (url) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    } catch {
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    }
  };

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

      {/* 4. Share Application */}
      <div className="card glass">
        <div className="lbl">
          <IconShare size={15} />
          <span>{t('settings.shareTitle').toUpperCase()}</span>
        </div>
        <div className="status settings-status-row" style={{ background: 'none', border: 0, padding: 0 }}>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', margin: 0, lineHeight: 1.5, flex: 1 }}>
            {t('settings.shareDescription')}
          </p>
          <button
            type="button"
            onClick={handleShareApp}
            className="btn"
            style={{
              background: shareFeedback ? '#10B981' : 'var(--primary)',
              color: '#ffffff',
              boxShadow: shareFeedback
                ? '0 4px 14px rgba(16, 185, 129, 0.4)'
                : '0 4px 14px rgba(34, 46, 137, 0.25)',
              border: 0,
              padding: '11px 22px',
              fontSize: '13.5px',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              transition: 'all 200ms ease',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            {shareFeedback ? <IconCheck size={18} /> : <IconShare size={18} />}
            <span>{shareFeedback ? t('settings.linkCopied') : t('settings.shareBtn')}</span>
          </button>
        </div>
      </div>

      {/* 4. About Application & Industry Reference */}
      <div className="card glass">
        <div className="lbl">{t('settings.aboutTitle').toUpperCase()}</div>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
          {t('settings.purposeText')}
        </p>
        <div className="units">
          <div>1 CANDY<b>355.62 kg Lint</b></div>
          <div>1 MAUND<b>20 kg Raw</b></div>
          <div>1 QUINTAL<b>100 kg</b></div>
          <div>1 TON<b>1000 kg Seed</b></div>
        </div>
      </div>

      {/* 6. Legal & Terms / Disclaimer Card */}
      <div className="card glass">
        <div className="lbl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconShieldAlert size={16} />
            <span>{(t('termsGate.settingsTitle') || t('disclaimer.title')).toUpperCase()}</span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '999px',
              background: hasAccepted ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.1)',
              color: hasAccepted ? '#10B981' : '#EF4444',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {hasAccepted && <IconCheck size={13} />}
            {hasAccepted
              ? (t('termsGate.settingsBadge') || 'ACCEPTED')
              : (t('termsGate.settingsPending') || 'PENDING')}
          </span>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.6, margin: '8px 0 12px' }}>
          {hasAccepted && acceptedDate
            ? (t('termsGate.settingsNote')
                ? t('termsGate.settingsNote').replace('{date}', acceptedDate)
                : `Accepted on ${acceptedDate} (v${appVersion})`)
            : t('disclaimer.intro')}
        </p>
        <div
          className="status settings-disclaimer-row"
          style={{
            background: 'none',
            border: 0,
            padding: '14px 0 0',
            borderTop: '1px solid var(--line)',
            borderRadius: 0,
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', flex: 1, lineHeight: 1.4 }}>
            {hasAccepted
              ? (t('termsGate.settingsAccepted') || 'Accepted & Active')
              : t('disclaimer.acceptance')}
          </span>
          <button
            type="button"
            onClick={openReview}
            className="btn sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: 'var(--primary)',
              color: 'var(--pi)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            <IconShieldAlert size={15} />
            <span>{t('termsGate.viewTerms') || t('disclaimer.readFull')}</span>
          </button>
        </div>
      </div>

      {/* 6. Storage & Reset */}
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

      {/* Minimalist App Signature (Option 2) */}
      <div
        className="settings-signature"
        style={{
          textAlign: 'center',
          padding: '24px 16px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11.5px',
            fontWeight: 800,
            color: 'var(--muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--line)' }} />
          <span>{t('settings.developedBy') || 'Designed & Developed by'}</span>
          <span style={{ width: '24px', height: '1px', background: 'var(--line)' }} />
        </div>

        <div
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}
        >
          Naresh Khambhaliya &amp; Jenish Khambhaliya
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--muted)',
            marginTop: '2px',
          }}
        >
          <span>{t('settings.contactEmail') || 'Contact'}:</span>
          <a
            href="mailto:jgpatel8080@gmail.com"
            style={{
              color: 'var(--primary)',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Send Email"
          >
            <IconMail size={13} />
            <span>jgpatel8080@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Standard Units & Disclaimer Footer */}
      <AppFooter />
    </>
  );
};

export default SettingsPage;
