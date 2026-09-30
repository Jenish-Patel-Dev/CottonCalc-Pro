import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';

export const AppFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="foot" aria-label="Application Footer">
      <div>
        <b>{t('app.standardUnitsTitle') || 'Standard Units'}</b>
      </div>
      <div>
        1 Candy = 355.62 kg Lint | 1 Maund = 20 kg
      </div>
      <div style={{ marginTop: '2px' }}>
        {t('app.disclaimer') || 'All calculations are estimates. Market conditions vary.'}
      </div>
    </footer>
  );
};

export default AppFooter;
