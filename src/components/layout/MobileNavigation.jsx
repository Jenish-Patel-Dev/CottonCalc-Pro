import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import {
  IconFactory,
  IconScale,
  IconDroplet,
  IconSettings,
} from '../common/Icons';

export const MobileNavigation = ({ currentView, onSelectView }) => {
  const { t, language } = useTranslation();

  const getGinningLabel = () => {
    if (language === 'hi') return 'जिनिंग';
    if (language === 'gu') return 'જીનીંગ';
    return 'Ginning';
  };

  const navItems = [
    {
      id: 'home',
      label: t('nav.home'),
      icon: <IconFactory />,
    },
    {
      id: 'ginning',
      label: getGinningLabel(),
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
    <nav className="tabbar glass" id="tb" aria-label="Mobile Bottom Navigation">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectView(item.id)}
            className={`nav nav-item ${isActive ? 'on active' : ''}`}
          >
            <span className="ni">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNavigation;
