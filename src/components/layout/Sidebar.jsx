import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { usePwa } from '../../pwa/PwaContext';
import {
  IconFactory,
  IconScale,
  IconDroplet,
  IconSettings,
  IconShieldAlert,
} from '../common/Icons';
import { useDisclaimer } from '../common/DisclaimerContext';

export const Sidebar = ({ currentView, onSelectView, isCollapsed = false }) => {
  const { t } = useTranslation();
  const { isInstallable, isInstalled, triggerInstall } = usePwa();
  const { openDisclaimer } = useDisclaimer();
  // The Desktop Navigation Menu background is always deep dark indigo (#1B2673)
  // in both Light Mode and Dark Mode. Therefore, always use the dark mode logo
  // assets in the navigation menu so contrast and readability are always perfect:
  // - Navigation Open: DARK_MODE_FULL_LOGO (/assets/logos/logo-dark-full.png)
  // - Navigation Closed: DARK_MODE_ICON_LOGO (/assets/logos/logo-dark-icon.png)
  const logoSrc = isCollapsed
    ? '/assets/logos/logo-dark-icon.png'
    : '/assets/logos/logo-dark-full.png';

  const navItems = [
    {
      id: 'home',
      label: t('nav.home'),
      icon: <IconFactory />,
    },
    {
      id: 'ginning',
      label: t('nav.ginning'),
      icon: <IconScale />,
    },
    {
      id: 'oil',
      label: t('nav.oil'),
      icon: <IconDroplet />,
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: <IconSettings />,
    },
  ];

  return (
    <aside className="side glass" aria-label="Sidebar">
      {/* Brand Header */}
      <div className="brand">
        <span
          className="brand-logo-wrap cursor-pointer select-none"
          onClick={() => onSelectView('home')}
          title="CottonCalc Pro"
        >
          <img
            src={logoSrc}
            alt="CottonCalc Pro"
            className={`brand-logo-img ${isCollapsed ? 'icon-logo' : 'full-logo'}`}
          />
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectView(item.id)}
              className={`nav nav-item ${isActive ? 'on active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="ni">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="sp flex-1" />

      {/* Install Button */}
      {!isInstalled && (
        <button
          type="button"
          onClick={triggerInstall}
          className="btn inst w-full"
          title={t('settings.installBtn')}
          aria-label={t('settings.installBtn')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <path d="M12 3v12m-5-5l5 5 5-5M4 20h16" />
          </svg>
          <span>{t('settings.installBtn')}</span>
        </button>
      )}

      {/* Global Disclaimer Button */}
      <button
        type="button"
        onClick={openDisclaimer}
        className="nav nav-item sidebar-disclaimer-btn"
        title={isCollapsed ? t('disclaimer.title') : undefined}
        style={{
          marginTop: '6px',
          opacity: 0.82,
          fontSize: '12px',
        }}
      >
        <span className="ni">
          <IconShieldAlert size={16} />
        </span>
        <span>{t('disclaimer.title')}</span>
      </button>
    </aside>
  );
};

export default Sidebar;
