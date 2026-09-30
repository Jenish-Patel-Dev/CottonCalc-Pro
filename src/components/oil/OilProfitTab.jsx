import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { calculateOilProfitAndParity } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatting';
import GlassSelect from '../common/GlassSelect';
import { IconCheck, IconX } from '../common/Icons';

export const OilProfitTab = ({
  oilSeedBuyRate,
  setOilSeedBuyRate,
  oilSeedBuyUnit,
  setOilSeedBuyUnit,
  oilSellRate,
  setOilSellRate,
  oilSellUnit,
  setOilSellUnit,
  cakeSellRate,
  setCakeSellRate,
  cakeSellUnit,
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

  const { hasValidOilData, oilProfit } = calculateOilProfitAndParity({
    oilSeedBuyRate,
    oilSeedBuyUnit,
    oilSellRate,
    oilSellUnit,
    cakeSellRate,
    cakeSellUnit,
    oilExpense,
    oilExpenseUnit,
    oilRecoveryPercent,
    cakeRecoveryPercent,
    oilMode: 'parity',
  });

  const parsedProfit = parseFloat(oilProfit) || 0;
  const isProfitable = parsedProfit >= 0;

  return (
    <>
      <div className="card glass">
        <div className="lbl">{t('oil.costAndRevenue')}</div>

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

        {/* Cake (Khal) Selling Rate */}
        <div className="f">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
            <label style={{ margin: 0 }}>{t('oil.cakeSellingRate')}</label>
            <GlassSelect
              value={cakeSellUnit}
              onChange={(val) => setCakeSellUnit(Number(val))}
              options={[
                { value: 50, label: t('oil.per50kgBag'), badge: 'BAG' },
                { value: 20, label: t('oil.per20kg'), badge: '20K' },
                { value: 100, label: t('oil.per100kg'), badge: '100K' },
              ]}
            />
          </div>
          <div className="fi">
            <u style={{ marginRight: '8px' }}>₹</u>
            <input
              type="number"
              value={cakeSellRate}
              onChange={(e) => setCakeSellRate(e.target.value)}
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
                { value: 20, label: t('oil.per20kg'), badge: '20K' },
                { value: 1000, label: t('oil.perTon'), badge: 'TON' },
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
      </div>

      {/* Profit/Loss Result Card */}
      {hasValidOilData && (
        <div
          className="card"
          style={{
            background: isProfitable
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, var(--side) 100%)'
              : 'var(--badtint)',
            color: isProfitable ? '#fff' : 'var(--bad)',
            border: isProfitable
              ? '1px solid rgba(16, 185, 129, 0.4)'
              : '1px solid var(--bad)',
            marginTop: '14px',
          }}
        >
          <div
            className="lbl"
            style={{
              color: isProfitable ? '#10B981' : 'var(--bad)',
              marginBottom: '6px',
            }}
          >
            {t('oil.netProfitLoss')}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                color: isProfitable ? '#10B981' : 'var(--bad)',
              }}
            >
              ₹ {formatCurrency(Math.abs(parsedProfit))}
            </span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: isProfitable ? '#6EE7B7' : 'var(--bad)',
              }}
            >
              {t('oil.perTon')}
            </span>
          </div>
          <p
            style={{
              fontSize: '12px',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: isProfitable
                ? '1px solid rgba(16, 185, 129, 0.25)'
                : '1px solid rgba(214, 59, 79, 0.3)',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: isProfitable ? '#10B981' : 'var(--bad)',
            }}
          >
            {isProfitable ? (
              <>
                <IconCheck size={14} />
                <span>{t('oil.profitable')}</span>
              </>
            ) : (
              <>
                <IconX size={14} />
                <span>{t('oil.lossMaking')}</span>
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default OilProfitTab;
