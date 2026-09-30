import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import OilRecoveryTab from './OilRecoveryTab';
import OilProfitTab from './OilProfitTab';
import KhalParityTab from './KhalParityTab';

export const OilMillCalculator = ({ activeTab = 'khal_parity', onTabChange }) => {
  const { t } = useTranslation();

  // Mode state: 'khal_parity', 'parity', 'recovery'
  const [oilMode, setOilMode] = useState(activeTab);

  useEffect(() => {
    if (activeTab) {
      setOilMode(activeTab);
    }
  }, [activeTab]);

  // Recovery Tab State
  const [oilInputSeed, setOilInputSeed] = useState(1000);
  const [oilRecoveryPercent, setOilRecoveryPercent] = useState(12.0);
  const [cakeRecoveryPercent, setCakeRecoveryPercent] = useState(84.0);

  // Parity / Khal Parity Shared State
  const [oilSeedBuyRate, setOilSeedBuyRate] = useState('');
  const [oilSeedBuyUnit, setOilSeedBuyUnit] = useState(20);
  const [oilSellRate, setOilSellRate] = useState('');
  const [oilSellUnit, setOilSellUnit] = useState(10);
  const [cakeSellRate, setCakeSellRate] = useState('');
  const [cakeSellUnit, setCakeSellUnit] = useState(50);
  const [oilExpense, setOilExpense] = useState('');
  const [oilExpenseUnit, setOilExpenseUnit] = useState(20); // Default to 20kg

  const handleOilModeChange = (mode) => {
    setOilMode(mode);
    if (onTabChange) {
      onTabChange(mode);
    }
  };

  const tabIndex = oilMode === 'khal_parity' ? 0 : oilMode === 'parity' ? 1 : 2;

  return (
    <>
      {/* Indigo Segmented Tabs */}
      <div className="seg" style={{ '--n': 3, '--i': tabIndex }}>
        <i />
        <button
          type="button"
          className={tabIndex === 0 ? 'on active' : ''}
          onClick={() => handleOilModeChange('khal_parity')}
        >
          <svg className="i" viewBox="0 0 24 24">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <circle cx="7" cy="7" r="1.5" />
          </svg>
          <span>{t('oil.tabKhalCost')}</span>
        </button>
        <button
          type="button"
          className={tabIndex === 1 ? 'on active' : ''}
          onClick={() => handleOilModeChange('parity')}
        >
          <svg className="i" viewBox="0 0 24 24">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span>{t('oil.tabProfit')}</span>
        </button>
        <button
          type="button"
          className={tabIndex === 2 ? 'on active' : ''}
          onClick={() => handleOilModeChange('recovery')}
        >
          <svg className="i" viewBox="0 0 24 24">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
          </svg>
          <span>{t('oil.tabRecovery')}</span>
        </button>
      </div>

      {oilMode === 'recovery' && (
        <OilRecoveryTab
          oilInputSeed={oilInputSeed}
          setOilInputSeed={setOilInputSeed}
          oilRecoveryPercent={oilRecoveryPercent}
          setOilRecoveryPercent={setOilRecoveryPercent}
          cakeRecoveryPercent={cakeRecoveryPercent}
          setCakeRecoveryPercent={setCakeRecoveryPercent}
        />
      )}

      {oilMode === 'parity' && (
        <OilProfitTab
          oilSeedBuyRate={oilSeedBuyRate}
          setOilSeedBuyRate={setOilSeedBuyRate}
          oilSeedBuyUnit={oilSeedBuyUnit}
          setOilSeedBuyUnit={setOilSeedBuyUnit}
          oilSellRate={oilSellRate}
          setOilSellRate={setOilSellRate}
          oilSellUnit={oilSellUnit}
          setOilSellUnit={setOilSellUnit}
          cakeSellRate={cakeSellRate}
          setCakeSellRate={setCakeSellRate}
          cakeSellUnit={cakeSellUnit}
          setCakeSellUnit={setCakeSellUnit}
          oilExpense={oilExpense}
          setOilExpense={setOilExpense}
          oilExpenseUnit={oilExpenseUnit}
          setOilExpenseUnit={setOilExpenseUnit}
          oilRecoveryPercent={oilRecoveryPercent}
          setOilRecoveryPercent={setOilRecoveryPercent}
          cakeRecoveryPercent={cakeRecoveryPercent}
          setCakeRecoveryPercent={setCakeRecoveryPercent}
        />
      )}

      {oilMode === 'khal_parity' && (
        <KhalParityTab
          oilSeedBuyRate={oilSeedBuyRate}
          setOilSeedBuyRate={setOilSeedBuyRate}
          oilSeedBuyUnit={oilSeedBuyUnit}
          setOilSeedBuyUnit={setOilSeedBuyUnit}
          oilSellRate={oilSellRate}
          setOilSellRate={setOilSellRate}
          oilSellUnit={oilSellUnit}
          setOilSellUnit={setOilSellUnit}
          cakeSellUnit={cakeSellUnit}
          setCakeSellUnit={setCakeSellUnit}
          oilExpense={oilExpense}
          setOilExpense={setOilExpense}
          oilExpenseUnit={oilExpenseUnit}
          setOilExpenseUnit={setOilExpenseUnit}
          oilRecoveryPercent={oilRecoveryPercent}
          setOilRecoveryPercent={setOilRecoveryPercent}
          cakeRecoveryPercent={cakeRecoveryPercent}
          setCakeRecoveryPercent={setCakeRecoveryPercent}
        />
      )}

      {/* Standard Units Footer */}
      <div className="foot">
        Standard Units<br />
        1 Candy = 355.62 kg Lint | 1 Maund = 20 kg<br />
        All calculations are estimates. Market conditions vary.
      </div>
    </>
  );
};

export default OilMillCalculator;
