import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconTrending } from '../common/Icons';
import { calculateGinningOutput } from '../../utils/calculations';

export const OutputRatioTab = ({
  weightUnit,
  onToggleWeightUnit,
  inputWeight,
  setInputWeight,
  lintWeight,
  setLintWeight,
  seedWeight,
  setSeedWeight,
  wasteWeight,
  setWasteWeight,
}) => {
  const { t } = useTranslation();

  const {
    gotPercent,
    seedPercent,
    wastePercent,
    totalPercent,
    showWarning,
  } = calculateGinningOutput({
    inputWeight,
    lintWeight,
    seedWeight,
    wasteWeight,
  });

  const parsedGot = parseFloat(gotPercent) || 0;
  const parsedSeed = parseFloat(seedPercent) || 0;
  const seedEnd = parsedGot + parsedSeed;

  const handleInputChange = (field, val) => {
    if (field === 'raw') setInputWeight(val);
    if (field === 'lint') setLintWeight(val);
    if (field === 'seed') setSeedWeight(val);
  };

  return (
    <div id="gb" className="space-y-3.5">
      {/* Mini Unit Toggle (Sample vs Bulk) */}
      <div className="flex justify-center">
        <div
          className="seg mini"
          style={{ '--n': 2, '--i': weightUnit === 'g' ? 0 : 1 }}
        >
          <i />
          <button
            type="button"
            className={weightUnit === 'g' ? 'on active' : ''}
            onClick={() => onToggleWeightUnit('g')}
          >
            <span>{t('ginning.sampleUnit')}</span>
          </button>
          <button
            type="button"
            className={weightUnit === 'kg' ? 'on active' : ''}
            onClick={() => onToggleWeightUnit('kg')}
          >
            <span>{t('ginning.bulkUnit')}</span>
          </button>
        </div>
      </div>

      {/* Input Details Card */}
      <div className="card glass">
        <div className="lbl" id="gu">
          {t('ginning.inputDetails').toUpperCase()} ({weightUnit.toUpperCase()})
        </div>

        {/* Total Raw Cotton */}
        <div className="f">
          <label htmlFor="raw">{t('ginning.rawCotton')}</label>
          <div className="fi">
            <input
              id="raw"
              type="number"
              value={inputWeight}
              onChange={(e) => handleInputChange('raw', e.target.value)}
              inputMode="decimal"
            />
            <u>{weightUnit}</u>
          </div>
        </div>

        {/* Lint Output */}
        <div className="f">
          <label htmlFor="lint">{t('ginning.lintOutput')}</label>
          <div className="fi g">
            <input
              id="lint"
              type="number"
              value={lintWeight}
              onChange={(e) => handleInputChange('lint', e.target.value)}
              inputMode="decimal"
            />
            <u>{weightUnit}</u>
          </div>
        </div>

        {/* Seed & Waste/Loss Side by Side */}
        <div className="two">
          <div className="f">
            <label htmlFor="seed">{t('ginning.seedOutput')}</label>
            <div className="fi y">
              <input
                id="seed"
                type="number"
                value={seedWeight}
                onChange={(e) => handleInputChange('seed', e.target.value)}
                inputMode="decimal"
              />
              <u>{weightUnit}</u>
            </div>
          </div>

          <div className="f">
            <label htmlFor="wst">{t('ginning.wasteLoss')}</label>
            <div className="fi r">
              <input
                id="wst"
                type="number"
                value={wasteWeight}
                onChange={(e) => setWasteWeight(e.target.value)}
                inputMode="decimal"
              />
              <u>{weightUnit}</u>
            </div>
          </div>
        </div>

        {/* Balance Warning (if total != 100%) */}
        {showWarning && (
          <div
            className="p-3 bg-[var(--bad-tint)] border border-[var(--bad)] rounded-xl text-xs font-bold text-[var(--bad)] flex items-center justify-between"
            style={{ marginTop: '14px' }}
          >
            <span>{t('ginning.balanceWarning', { percent: totalPercent })}</span>
          </div>
        )}
      </div>

      {/* GOT Visualization and Breakdown */}
      <div className="card glass">
        <div className="lbl" style={{ fontSize: '15px', color: 'var(--text)' }}>
          <span style={{ color: 'var(--accent)' }}>
            <IconTrending />
          </span>
          {t('ginning.gotTitle')}
        </div>

        <div className="got">
          <div
            className="ring"
            id="rg"
            style={{
              background: `conic-gradient(var(--primary) 0% ${gotPercent}%, var(--gold) ${gotPercent}% ${seedEnd}%, var(--bad) ${seedEnd}% 100%)`,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span id="gt" style={{ fontSize: '20px', lineHeight: 1.1 }}>{gotPercent}%</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', letterSpacing: '0.06em', marginTop: '3px' }}>GOT</span>
            </div>
          </div>

          <div className="rows">
            <div className="row">
              <span className="dot" style={{ background: 'var(--accent)' }} />
              <span>Lint</span>
              <b id="pl">{gotPercent}%</b>
            </div>
            <div className="row">
              <span className="dot" style={{ background: 'var(--gold)' }} />
              <span>Seed</span>
              <b id="ps">{seedPercent}%</b>
            </div>
            <div className="row">
              <span className="dot" style={{ background: 'var(--bad)' }} />
              <span>Waste</span>
              <b id="pw">{wastePercent}%</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputRatioTab;
