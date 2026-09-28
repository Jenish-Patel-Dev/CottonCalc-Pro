import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { IconDollar, IconSettings } from '../common/Icons';
import GlassSelect from '../common/GlassSelect';
import { calculateGinningParity } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatting';

export const ParityTab = ({
  kapasRate,
  setKapasRate,
  kapasUnit,
  setKapasUnit,
  seedRate,
  setSeedRate,
  seedUnit,
  setSeedUnit,
  expensePerMaund,
  setExpensePerMaund,
  expectedGot,
  setExpectedGot,
  expectedShortage,
  setExpectedShortage,
}) => {
  const { t } = useTranslation();

  const { hasValidData, parityCost } = calculateGinningParity({
    kapasRate,
    kapasUnit,
    seedRate,
    seedUnit,
    expensePerMaund,
    expectedGot,
    expectedShortage,
  });

  return (
    <div className="space-y-3.5">
      {/* Market Rates Card */}
      <div className="card glass">
        <div className="lbl">
          <IconDollar />
          <span>{t('ginning.marketRates')}</span>
        </div>

        {/* Kapas Price */}
        <div className="f">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="kapas-rate" className="m-0 font-extrabold text-[13px]">
              {t('ginning.kapasPrice')}
            </label>
            <GlassSelect
              value={kapasUnit}
              onChange={(val) => setKapasUnit(Number(val))}
              options={[
                { value: 20, label: t('ginning.per20kg'), badge: '20K' },
                { value: 100, label: t('ginning.per100kg'), badge: '100K' },
              ]}
            />
          </div>
          <div className="fi">
            <input
              id="kapas-rate"
              type="number"
              value={kapasRate}
              onChange={(e) => setKapasRate(e.target.value)}
              placeholder="0"
              inputMode="decimal"
            />
            <u>₹</u>
          </div>
        </div>

        {/* Seed Price */}
        <div className="f">
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="seed-rate" className="m-0 font-extrabold text-[13px]">
              {t('ginning.seedPrice')}
            </label>
            <GlassSelect
              value={seedUnit}
              onChange={(val) => setSeedUnit(Number(val))}
              options={[
                { value: 20, label: t('ginning.per20kg'), badge: '20K' },
                { value: 100, label: t('ginning.per100kg'), badge: '100K' },
              ]}
            />
          </div>
          <div className="fi y">
            <input
              id="seed-rate"
              type="number"
              value={seedRate}
              onChange={(e) => setSeedRate(e.target.value)}
              placeholder="0"
              inputMode="decimal"
            />
            <u>₹</u>
          </div>
        </div>

        {/* Ginning Expense */}
        <div className="f">
          <label htmlFor="ginning-expense">{t('ginning.ginningExpense')}</label>
          <div className="fi">
            <input
              id="ginning-expense"
              type="number"
              value={expensePerMaund}
              onChange={(e) => setExpensePerMaund(e.target.value)}
              placeholder="0"
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
            <label htmlFor="expected-got">{t('ginning.expectedGot')}</label>
            <div className="fi g">
              <input
                id="expected-got"
                type="number"
                value={expectedGot}
                onChange={(e) => setExpectedGot(e.target.value)}
                inputMode="decimal"
              />
              <u>%</u>
            </div>
          </div>
          <div className="f">
            <label htmlFor="expected-shortage">{t('ginning.expectedShortage')}</label>
            <div className="fi r">
              <input
                id="expected-shortage"
                type="number"
                value={expectedShortage}
                onChange={(e) => setExpectedShortage(e.target.value)}
                inputMode="decimal"
              />
              <u>%</u>
            </div>
          </div>
        </div>
      </div>

      {/* Parity Cost Result Card */}
      {hasValidData && (
        <div className="card" style={{ background: 'var(--side)', color: '#ffffff', border: 0 }}>
          <div style={{ fontSize: '12px', color: 'var(--side-accent)', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
            {t('ginning.costOfProduction')}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              ₹ {formatCurrency(parityCost)}
            </span>
            <span style={{ color: 'var(--side-muted)', fontSize: '13px', fontWeight: 700 }}>
              {t('ginning.perCandy')}
            </span>
          </div>
          <p style={{ color: 'var(--side-muted)', fontSize: '12px', fontWeight: 600, marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
            {t('ginning.candyLintNote')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParityTab;
