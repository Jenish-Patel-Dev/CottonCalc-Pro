import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconInfo } from './Icons';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-8 px-4 text-center text-app-muted text-xs pb-4 select-none">
      <div className="flex justify-center items-center gap-1.5 mb-1.5 font-semibold text-app-secondary">
        <span className="text-blue-600 dark:text-sky-400"><IconInfo /></span>
        <span>{t('app.standardUnitsTitle')}</span>
      </div>
      <p>{t('app.standardUnitsText')}</p>
      <p className="mt-1 text-app-muted/80 text-[11px]">
        {t('app.disclaimer')}
      </p>
    </footer>
  );
};

export default Footer;
