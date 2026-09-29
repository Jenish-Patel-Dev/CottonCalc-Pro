import React, { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import OilRecoveryTab from './OilRecoveryTab';
import OilProfitTab from './OilProfitTab';
import KhalParityTab from './KhalParityTab';

export const OilMillCalculator = () => {
  const { t } = useTranslation();

  // Mode state: 'recovery', 'parity', 'khal_parity'
  const [oilMode, setOilMode] = useState('recovery');

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
  const [oilExpenseUnit, setOilExpenseUnit] = useState(1000); // Default to Ton

  const handleOilModeChange = (mode) => {
    setOilMode(mode);
    if (mode === 'khal_parity') {
      setOilExpenseUnit(20); // Default to 20kg for Khal Parity
    } else if (mode === 'parity') {
      setOilExpenseUnit(1000); // Default back to Ton for Profit
    }
  };

  const tabIndex = oilMode === 'recovery' ? 0 : oilMode === 'parity' ? 1 : 2;

  return (
    <>
      {/* Indigo Segmented Tabs */}
      <div className="seg" style={{ '--n': 3, '--i': tabIndex }}>
        <i />
        <button
          type="button"
          className={tabIndex === 0 ? 'on active' : ''}
          onClick={() => handleOilModeChange('recovery')}
        >
          <span>{t('oil.tabRecovery')}</span>
        </button>
        <button
          type="button"
          className={tabIndex === 1 ? 'on active' : ''}
          onClick={() => handleOilModeChange('parity')}
        >
          <span>{t('oil.tabProfit')}</span>
        </button>
        <button
          type="button"
          className={tabIndex === 2 ? 'on active' : ''}
          onClick={() => handleOilModeChange('khal_parity')}
        >
          <span>{t('oil.tabKhalCost')}</span>
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
