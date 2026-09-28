import React from 'react';
import { usePwa } from './PwaContext';
import { useTranslation } from '../i18n/LanguageContext';

export const UpdateBanner = () => {
  const { needRefresh, updateServiceWorker } = usePwa();
  const { t } = useTranslation();

  if (!needRefresh) return null;

  return (
    <div className="bg-blue-600 text-white text-xs px-4 py-2 text-center font-medium shadow-md transition-all duration-300 flex items-center justify-between max-w-xl mx-auto rounded-b-xl z-50 relative">
      <span>{t('pwa.updateText')}</span>
      <button
        type="button"
        onClick={updateServiceWorker}
        className="ml-3 px-3 py-1 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
      >
        {t('pwa.updateBtn')}
      </button>
    </div>
  );
};

export default UpdateBanner;
