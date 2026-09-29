import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { calculateOilProfitAndParity } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatting';
import GlassSelect from '../common/GlassSelect';

export const KhalParityTab = ({
  oilSeedBuyRate,
  setOilSeedBuyRate,
  oilSeedBuyUnit,
  setOilSeedBuyUnit,
  oilSellRate,
  setOilSellRate,
  oilSellUnit,
  setOilSellUnit,
  cakeSellUnit = 50,
  setCakeSellUnit,
  oilExpense,
  setOilExpense,
  oilExpenseUnit,
  setOilExpenseUnit,
  oilRecoveryPercent,
  setOilRecoveryPercent,
  cakeRecoveryPercent,
  setCakeRecoveryPercent,
}) => {
  const { t } = useTranslation();

  const { hasValidOilData, khalParityCost } = calculateOilProfitAndParity({
    oilSeedBuyRate,
    oilSeedBuyUnit,
    oilSellRate,
    oilSellUnit,
    cakeSellRate: '',
    cakeSellUnit,
    oilExpense,
    oilExpenseUnit,
    oilRecoveryPercent,
    cakeRecoveryPercent,
    oilMode: 'khal_parity',
  });

  return (
    <>
      <div className="card glass">
        <div className="lbl">{t('oil.inputRates')}</div>

        {/* Seed Purchase Rate */}
        <div className="f">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <label style={{ margin: 0 }}>{t('oil.seedPurchaseRate')}</label>
            <GlassSelect
              value={oilSeedBuyUnit}
              onChange={(val) => setOilSeedBuyUnit(Number(val))}
              options={[
                { value: 20, label: t('oil.per20kg'), badge: '20K' },
                { value: 100, label: t('oil.per100kg'), badge: '100K' },
                { value: 1000, label: t('oil.perTon'), badge: 'TON' },
              ]}
            />
          </div>
          <div className="fi">
            <u style={{ marginRight: '8px' }}>₹</u>
            <input
              type="number"
              value={oilSeedBuyRate}
              onChange={(e) => setOilSeedBuyRate(e.target.value)}
              placeholder="0"
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Oil Selling Rate */}
        <div className="f">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <label style={{ margin: 0 }}>{t('oil.oilSellingRate')}</label>
            <GlassSelect
              value={oilSellUnit}
              onChange={(val) => setOilSellUnit(Number(val))}
              options={[
                { value: 10, label: t('oil.per10kg'), badge: '10K' },
                { value: 1, label: t('oil.per1kg'), badge: '1K' },
                { value: 15, label: t('oil.per15kg'), badge: '15K' },
              ]}
            />
          </div>
          <div className="fi">
            <u style={{ marginRight: '8px' }}>₹</u>
            <input
              type="number"
              value={oilSellRate}
              onChange={(e) => setOilSellRate(e.target.value)}
              placeholder="0"
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Processing Expense */}
        <div className="f">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <label style={{ margin: 0 }}>{t('oil.processingExpense')}</label>
            <GlassSelect
              value={oilExpenseUnit}
              onChange={(val) => setOilExpenseUnit(Number(val))}
              options={[
                { value: 1000, label: t('oil.perTon'), badge: 'TON' },
                { value: 20, label: t('oil.per20kg'), badge: '20K' },
              ]}
            />
          </div>
          <div className="fi">
            <u style={{ marginRight: '8px' }}>₹</u>
            <input
              type="number"
              value={oilExpense}
              onChange={(e) => setOilExpense(e.target.value)}
              placeholder="0"
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Recovery Percentages */}
        <div className="two" style={{ paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
          <div className="f" style={{ margin: 0 }}>
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
          <div className="f" style={{ margin: 0 }}>
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

        {/* Show Cost Per Unit Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
          <label style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>
            {t('oil.showCostPer')}
          </label>
          <GlassSelect
            value={cakeSellUnit}
            onChange={(val) => setCakeSellUnit(Number(val))}
            options={[
              { value: 50, label: t('oil.bag50kg'), badge: 'BAG' },
              { value: 20, label: t('oil.unit20kg'), badge: '20K' },
              { value: 100, label: t('oil.unit100kg'), badge: '100K' },
              { value: 1, label: t('oil.unit1kg'), badge: '1K' },
            ]}
          />
        </div>
      </div>

      {/* Khal Cost Result Card */}
      {hasValidOilData && (
        <div
          className="card"
          style={{
            background: 'var(--side)',
            color: '#fff',
            border: '1px solid rgba(127, 211, 255, 0.3)',
            marginTop: '14px',
          }}
        >
          <div className="lbl" style={{ color: '#7FD3FF', marginBottom: '6px' }}>
            {t('oil.khalCostTitle')}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                color: '#fff',
              }}
            >
              ₹ {formatCurrency(khalParityCost)}
            </span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#AAB5F0',
              }}
            >
              / {cakeSellUnit === 50 ? t('oil.bag50kg') : `${cakeSellUnit} kg`}
            </span>
          </div>
          <p
            style={{
              fontSize: '12px',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#AAB5F0',
              fontWeight: 600,
            }}
          >
            {t('oil.khalCostNote', { unit: cakeSellUnit })}
          </p>
        </div>
      )}
    </>
  );
};

export default KhalParityTab;
