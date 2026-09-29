import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconDollar, IconSettings, IconCheck } from '../common/Icons';
import GlassSelect from '../common/GlassSelect';
import { calculateReverseParity } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatting';

export const ReverseParityTab = ({
  revLintPrice,
  setRevLintPrice,
  revSeedPrice,
  setRevSeedPrice,
  revSeedUnit,
  setRevSeedUnit,
  revExpense,
  setRevExpense,
  revGot,
  setRevGot,
  revShortage,
  setRevShortage,
}) => {
  const { t } = useTranslation();

  const { hasValidData, revKapasRate } = calculateReverseParity({
    revLintPrice,
    revSeedPrice,
    revSeedUnit,
    revExpense,
    revGot,
    revShortage,
  });

  return (
    <div className="space-y-3.5">
      {/* Market Selling Prices Card */}
      <div className="card glass">
        <div className="lbl">
          <IconDollar />
          <span>{t('ginning.marketSellingPrices')}</span>
        </div>

        {/* Lint Selling Price */}
        <div className="f">
          <label htmlFor="rev-lint-price">{t('ginning.lintSellingPrice')}</label>
          <div className="fi g">
            <input
              id="rev-lint-price"
              type="number"
              value={revLintPrice}
              onChange={(e) => setRevLintPrice(e.target.value)}
              placeholder="e.g. 58000"
              inputMode="decimal"
            />
            <u>₹</u>
          </div>
        </div>

        {/* Seed Price */}
        <div className="f">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="rev-seed-price" className="m-0 font-extrabold text-[13px]">
              {t('ginning.seedPrice')}
            </label>
            <GlassSelect
              value={revSeedUnit}
              onChange={(val) => setRevSeedUnit(Number(val))}
              options={[
                { value: 20, label: t('ginning.per20kg'), badge: '20K' },
                { value: 100, label: t('ginning.per100kg'), badge: '100K' },
              ]}
            />
          </div>
          <div className="fi y">
            <input
              id="rev-seed-price"
              type="number"
              value={revSeedPrice}
              onChange={(e) => setRevSeedPrice(e.target.value)}
              placeholder="e.g. 3500"
              inputMode="decimal"
            />
            <u>₹</u>
          </div>
        </div>

        {/* Ginning Expense */}
        <div className="f">
          <label htmlFor="rev-expense">{t('ginning.ginningExpense')}</label>
          <div className="fi">
            <input
              id="rev-expense"
              type="number"
              value={revExpense}
              onChange={(e) => setRevExpense(e.target.value)}
              placeholder="e.g. 200"
              inputMode="decimal"
            />
            <u>{t('ginning.perMaundKapas')}</u>
          </div>
        </div>
      </div>

      {/* Parameters Card */}
      <div className="card glass">
        <div className="lbl">
          <IconSettings />
          <span>{t('ginning.parameters')}</span>
        </div>
        <div className="two">
          <div className="f">
            <label htmlFor="rev-expected-got">{t('ginning.expectedGot')}</label>
            <div className="fi g">
              <input
                id="rev-expected-got"
                type="number"
                value={revGot}
                onChange={(e) => setRevGot(e.target.value)}
                inputMode="decimal"
              />
              <u>%</u>
            </div>
          </div>
          <div className="f">
            <label htmlFor="rev-expected-shortage">{t('ginning.expectedShortage')}</label>
            <div className="fi r">
              <input
                id="rev-expected-shortage"
                type="number"
                value={revShortage}
                onChange={(e) => setRevShortage(e.target.value)}
                inputMode="decimal"
              />
              <u>%</u>
            </div>
          </div>
        </div>
      </div>

      {/* Buying Parity Result Card */}
      {hasValidData && (
        <div
          className="card"
          style={{
            background: 'var(--side)',
            color: '#ffffff',
            border: '1px solid rgba(127, 211, 255, 0.3)',
            marginTop: '14px',
          }}
        >
          <div
            className="lbl"
            style={{
              color: '#7FD3FF',
              marginBottom: '6px',
            }}
          >
            {t('ginning.buyingParityTitle')}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                color: '#ffffff',
              }}
            >
              ₹ {formatCurrency(revKapasRate)}
            </span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#AAB5F0',
              }}
            >
              {t('ginning.perMaundKapas')}
            </span>
          </div>
          <p
            style={{
              fontSize: '12px',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#AAB5F0',
            }}
          >
            <IconCheck size={14} className="text-[#7FD3FF]" />
            <span>{t('ginning.buyingParityNote')}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ReverseParityTab;
