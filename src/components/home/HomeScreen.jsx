import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconScale, IconDroplet, IconSettings } from '../common/Icons';

export const HomeScreen = ({ onSelectView }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* 1. Cotton Ginning Tile */}
      <div
        className="tile glass"
        onClick={() => onSelectView('ginning')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectView('ginning')}
      >
        <div className="th">
          <div className="ti">
            <IconScale />
          </div>
          <div>
            <h3>{t('app.ginningTitle')}</h3>
            <p>{t('app.ginningSubtitle')}: GOT, Parity & Reverse</p>
          </div>
          <span className="ch">
            <svg className="i" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <div className="chips">
          <span>{t('ginning.tabOutput')}</span>
          <span>{t('ginning.tabParity')}</span>
          <span>{t('ginning.tabReverse')}</span>
        </div>
        <div className="tstat">
          1 Candy = <b>355.62 kg Lint</b>
        </div>
      </div>

      {/* 2. Oil Mill Tile */}
      <div
        className="tile glass alt"
        onClick={() => onSelectView('oil')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectView('oil')}
      >
        <div className="th">
          <div className="ti">
            <IconDroplet />
          </div>
          <div>
            <h3>{t('app.oilTitle')}</h3>
            <p>{t('app.oilSubtitle')}: Recovery, Profit & Khal Cost</p>
          </div>
          <span className="ch">
            <svg className="i" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <div className="chips">
          <span>{t('oil.tabRecovery')}</span>
          <span>{t('oil.tabProfit')}</span>
          <span>{t('oil.tabKhalCost')}</span>
        </div>
        <div className="tstat">
          1 Ton = <b>1000 kg Seed</b>
        </div>
      </div>

      {/* 3. Settings Tile */}
      <div
        className="tile glass plain"
        onClick={() => onSelectView('settings')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectView('settings')}
      >
        <div className="th">
          <div className="ti">
            <IconSettings />
          </div>
          <div>
            <h3>{t('app.settingsTitle')}</h3>
            <p>{t('app.settingsSubtitle')}</p>
          </div>
          <span className="ch">
            <svg className="i" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
        <div className="chips">
          <span>{t('settings.theme')}</span>
          <span>{t('settings.languageTitle')}</span>
          <span>{t('settings.installBtnShort') || 'Install'}</span>
        </div>
        <div className="tstat">
          PWA App &bull; <b>{t('settings.storageTitle')}</b>
        </div>
      </div>

      {/* 4. Market Tip Block */}
      <div className="tip glass">
        <b>{t('app.marketTipTitle')}</b>
        <p>{t('app.marketTipQuote')}</p>
      </div>

      {/* 5. Standard Units Footer */}
      <div className="foot">
        Standard Units<br />
        1 Candy = 355.62 kg Lint | 1 Maund = 20 kg<br />
        All calculations are estimates. Market conditions vary.
      </div>
    </>
  );
};

export default HomeScreen;
