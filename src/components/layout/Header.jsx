import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/ThemeContext';
import { usePwa } from '../../pwa/PwaContext';
import { IconSidebarToggle, IconSun, IconMoon, IconScale, IconDownload, IconRefresh } from '../common/Icons';
import GlassSelect from '../common/GlassSelect';
import PageInfo from '../common/PageInfo';

export const Header = ({
  currentView,
  onNavigateHome,
  isSidebarCollapsed = false,
  onToggleSidebar,
}) => {
  const { t, language, setLanguage } = useTranslation();
  const { activeTheme, setTheme } = useTheme();
  const { isInstalled, triggerInstall, refreshApp, isUpdating } = usePwa();

  const isDark = activeTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const getPageTitle = () => {
    switch (currentView) {
      case 'ginning':
        return t('app.ginningTitle');
      case 'oil':
        return t('app.oilTitle');
      case 'settings':
        return t('app.settingsTitle');
      default:
        return t('app.title');
    }
  };

  const getPageSubtitle = () => {
    switch (currentView) {
      case 'ginning':
        return t('app.ginningSubtitle');
      case 'oil':
        return t('app.oilSubtitle');
      case 'settings':
        return t('app.settingsSubtitle');
      default:
        return t('app.tagline');
    }
  };

  return (
    <header className="top glass" aria-label="Top Bar">
      {/* Desktop Navigation Menu Open/Close Toggle Button */}
      <button
        type="button"
        className="ib sidebar-toggle-btn"
        id="desktop-sidebar-toggle"
        onClick={onToggleSidebar}
        aria-label={isSidebarCollapsed ? t('nav.expand') : t('nav.collapse')}
        title={isSidebarCollapsed ? t('nav.expand') : t('nav.collapse')}
      >
        <IconSidebarToggle isCollapsed={isSidebarCollapsed} size={20} />
      </button>

      {/* Mobile Brand Title on Home */}
      <div className="mb cursor-pointer select-none" onClick={onNavigateHome}>
        <img
          src={isDark ? '/assets/logos/logo-dark-full.png' : '/assets/logos/logo-light-full.png'}
          alt="CottonCalc Pro"
          className="mobile-brand-logo-img"
        />
      </div>

      {/* Page Title & Subtitle */}
      <div className="tx min-w-0">
        <h1 id="tt" className="truncate">{getPageTitle()}</h1>
        <p id="ts" className="truncate">{getPageSubtitle()}</p>
      </div>

      {/* Spacer */}
      <div className="sp flex-1" />

      {/* Language Select Dropdown - Image 1 LOV UI */}
      <GlassSelect
        value={language}
        onChange={(val) => setLanguage(val)}
        options={[
          { value: 'en', label: 'English', badge: 'EN' },
          { value: 'hi', label: 'हिन्दी', badge: 'HI' },
          { value: 'gu', label: 'ગુજરાતી', badge: 'GU' },
        ]}
        className="header-lang-select"
        buttonClassName="header-lang-btn"
      />

      {/* Theme Toggle Icon Button */}
      <button
        type="button"
        className="ib header-icon-btn"
        id="th"
        onClick={toggleTheme}
        aria-label={t('settings.appearanceTitle')}
        title={isDark ? 'Switch to Light' : 'Switch to Dark'}
      >
        {isDark ? <IconMoon size={16} /> : <IconSun size={16} />}
      </button>

      {/* If app is installed, show Refresh Button to reload latest updates; otherwise show Install Button */}
      {isInstalled ? (
        <button
          type="button"
          className="ib header-icon-btn"
          id="header-refresh-btn"
          onClick={refreshApp}
          disabled={isUpdating}
          aria-label={t('nav.refresh') || 'Refresh Application'}
          title={t('nav.refresh') || 'Refresh Application'}
        >
          <IconRefresh size={16} className={isUpdating ? 'animate-spin' : ''} />
        </button>
      ) : (
        <button
          type="button"
          className="ib header-icon-btn"
          id="header-dl-btn"
          onClick={triggerInstall}
          aria-label={t('settings.installBtn')}
          title={t('settings.installBtn')}
        >
          <IconDownload size={16} />
        </button>
      )}

      {/* Page Information Button for the 3 main pages (placed at the very end on the right) */}
      {['ginning', 'oil', 'settings'].includes(currentView) && (
        <PageInfo pageId={currentView} />
      )}
    </header>
  );
};

export default Header;
