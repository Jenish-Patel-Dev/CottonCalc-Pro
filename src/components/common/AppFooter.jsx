import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useDisclaimer } from './DisclaimerContext';
import { IconShieldAlert } from './Icons';

export const AppFooter = () => {
  const { t } = useTranslation();
  const { openDisclaimer } = useDisclaimer();

  return (
    <footer className="foot" aria-label="Application Footer">
      <div>
        <b>{t('app.standardUnitsTitle') || 'Standard Units'}</b>
      </div>
      <div>
        1 Candy = 355.62 kg Lint | 1 Maund = 20 kg
      </div>
      <div style={{ marginTop: '3px' }}>
        <span>{t('app.disclaimer')}</span>
        {' • '}
        <button
          type="button"
          onClick={openDisclaimer}
          className="foot-disclaimer-btn"
          aria-label={t('disclaimer.title')}
          title={t('disclaimer.title')}
        >
          <IconShieldAlert size={13} />
          <span>{t('disclaimer.title')}</span>
        </button>
      </div>
    </footer>
  );
};

export default AppFooter;
