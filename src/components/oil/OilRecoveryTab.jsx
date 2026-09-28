import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconTrending } from '../common/Icons';
import { calculateOilRecovery } from '../../utils/calculations';

export const OilRecoveryTab = ({
  oilInputSeed,
  setOilInputSeed,
  oilRecoveryPercent,
  setOilRecoveryPercent,
  cakeRecoveryPercent,
  setCakeRecoveryPercent,
}) => {
  const { t } = useTranslation();

  const {
    oilYieldKg,
    oilPercent,
    cakeYieldKg,
    cakePercent,
    wasteYieldKg,
    wastePercent,
  } = calculateOilRecovery({
    oilInputSeed,
    oilRecoveryPercent,
    cakeRecoveryPercent,
  });

  return (
    <>
      <div className="card glass">
        <div className="lbl">{t('oil.seedInput')}</div>
        <div className="f">
          <label>{t('oil.totalSeedProcessed')}</label>
          <div className="fi">
            <input
              type="number"
              value={oilInputSeed}
              onChange={(e) => setOilInputSeed(e.target.value)}
              inputMode="decimal"
            />
            <u>kg</u>
          </div>
        </div>

        <div className="two">
          <div className="f">
            <label>{t('oil.oilRecPercent')}</label>
            <div className="fi y">
              <input
                type="number"
                value={oilRecoveryPercent}
                onChange={(e) => setOilRecoveryPercent(e.target.value)}
                inputMode="decimal"
              />
              <u>%</u>
            </div>
          </div>

          <div className="f">
            <label>{t('oil.cakeRecPercent')}</label>
            <div className="fi g">
              <input
                type="number"
                value={cakeRecoveryPercent}
                onChange={(e) => setCakeRecoveryPercent(e.target.value)}
                inputMode="decimal"
              />
              <u>%</u>
            </div>
          </div>
        </div>
      </div>

      <div className="card glass" style={{ marginTop: '14px' }}>
        <div className="lbl" style={{ fontSize: '15px', color: 'var(--text)' }}>
          <span style={{ color: 'var(--accent)' }}><IconTrending /></span>
          {t('oil.outputBreakdown')}
        </div>
        <div className="rows">
          <div className="row big">
            <span className="dot" style={{ background: 'var(--gold)' }}></span>
            {t('oil.washOil')}
            <b>
              <span>{oilYieldKg} kg</span>
              <em style={{ color: 'var(--gold)' }}>{oilPercent}%</em>
            </b>
          </div>

          <div className="row big">
            <span className="dot" style={{ background: 'var(--ok)' }}></span>
            {t('oil.oilCake')}
            <b>
              <span>{cakeYieldKg} kg</span>
              <em style={{ color: 'var(--ok)' }}>{cakePercent}%</em>
            </b>
          </div>

          <div className="row big">
            <span className="dot" style={{ background: 'var(--bad)' }}></span>
            {t('oil.wasteLoss')}
            <b>
              <span>{wasteYieldKg} kg</span>
              <em style={{ color: 'var(--bad)' }}>{wastePercent}%</em>
            </b>
          </div>
        </div>
      </div>
    </>
  );
};

export default OilRecoveryTab;
