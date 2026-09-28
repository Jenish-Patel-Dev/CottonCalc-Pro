import React from 'react';
import { usePwa } from './PwaContext';
import { useTranslation } from '../i18n/LanguageContext';

export const OfflineBanner = () => {
  const { isOffline } = usePwa();
  const { t } = useTranslation();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500/90 text-white text-xs px-4 py-2 text-center font-medium shadow-sm transition-all duration-300 flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
      <span>{t('pwa.offlineText')}</span>
    </div>
  );
};

export default OfflineBanner;
