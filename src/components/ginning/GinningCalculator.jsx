import React, { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import OutputRatioTab from './OutputRatioTab';
import ParityTab from './ParityTab';
import ReverseParityTab from './ReverseParityTab';

export const GinningCalculator = () => {
  const { t } = useTranslation();

  // Tab state: 'ratio', 'parity', 'reverse'
  const [ginningTab, setGinningTab] = useState('ratio');

  // --- Output Ratio Tab State ---
  const [weightUnit, setWeightUnit] = useState('g');
  const [inputWeight, setInputWeight] = useState(100);
  const [lintWeight, setLintWeight] = useState(35);
  const [seedWeight, setSeedWeight] = useState(62);
  const [wasteWeight, setWasteWeight] = useState(3);

  const handleToggleWeightUnit = (unit) => {
    setWeightUnit(unit);
    if (unit === 'g') {
      setInputWeight(100);
      setLintWeight(35);
      setSeedWeight(62);
      setWasteWeight(3);
    } else {
      setInputWeight(1000);
      setLintWeight(350);
      setSeedWeight(620);
      setWasteWeight(30);
    }
  };

  // --- Cost Parity Tab State ---
  const [kapasRate, setKapasRate] = useState('');
  const [kapasUnit, setKapasUnit] = useState(20);
  const [seedRate, setSeedRate] = useState('');
  const [seedUnit, setSeedUnit] = useState(20);
  const [expensePerMaund, setExpensePerMaund] = useState('');
  const [expectedGot, setExpectedGot] = useState(35.0);
  const [expectedShortage, setExpectedShortage] = useState(2.0);

  // --- Reverse Parity Tab State ---
  const [revLintPrice, setRevLintPrice] = useState('');
  const [revSeedPrice, setRevSeedPrice] = useState('');
  const [revSeedUnit, setRevSeedUnit] = useState(20);
  const [revExpense, setRevExpense] = useState('');
  const [revGot, setRevGot] = useState(35.0);
  const [revShortage, setRevShortage] = useState(2.0);

  const tabIndex = ginningTab === 'ratio' ? 0 : ginningTab === 'parity' ? 1 : 2;

  return (
    <>
      {/* Indigo Segmented Tabs */}
      <div className="seg" style={{ '--n': 3, '--i': tabIndex }}>
        <i />
        <button
          type="button"
          className={tabIndex === 0 ? 'on active' : ''}
          onClick={() => setGinningTab('ratio')}
        >
          <svg className="i" viewBox="0 0 24 24">
            <path d="M6 3h9l4 4v14H6z" />
            <path d="M9 12h7M9 16h7" />
          </svg>
          <span>{t('ginning.tabOutput')}</span>
        </button>
        <button
          type="button"
          className={tabIndex === 1 ? 'on active' : ''}
          onClick={() => setGinningTab('parity')}
        >
          <svg className="i" viewBox="0 0 24 24">
            <path d="M12 2v20M17 6H9.5a3 3 0 000 6h5a3 3 0 010 6H6" />
          </svg>
          <span>{t('ginning.tabParity')}</span>
        </button>
        <button
          type="button"
          className={tabIndex === 2 ? 'on active' : ''}
          onClick={() => setGinningTab('reverse')}
        >
          <svg className="i" viewBox="0 0 24 24">
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h11a5 5 0 010 10h-3" />
          </svg>
          <span>{t('ginning.tabReverse')}</span>
        </button>
      </div>

      {/* Tab Content */}
      {ginningTab === 'ratio' && (
        <OutputRatioTab
          weightUnit={weightUnit}
          onToggleWeightUnit={handleToggleWeightUnit}
          inputWeight={inputWeight}
          setInputWeight={setInputWeight}
          lintWeight={lintWeight}
          setLintWeight={setLintWeight}
          seedWeight={seedWeight}
          setSeedWeight={setSeedWeight}
          wasteWeight={wasteWeight}
          setWasteWeight={setWasteWeight}
        />
      )}

      {ginningTab === 'parity' && (
        <ParityTab
          kapasRate={kapasRate}
          setKapasRate={setKapasRate}
          kapasUnit={kapasUnit}
          setKapasUnit={setKapasUnit}
          seedRate={seedRate}
          setSeedRate={setSeedRate}
          seedUnit={seedUnit}
          setSeedUnit={setSeedUnit}
          expensePerMaund={expensePerMaund}
          setExpensePerMaund={setExpensePerMaund}
          expectedGot={expectedGot}
          setExpectedGot={setExpectedGot}
          expectedShortage={expectedShortage}
          setExpectedShortage={setExpectedShortage}
        />
      )}

      {ginningTab === 'reverse' && (
        <ReverseParityTab
          revLintPrice={revLintPrice}
          setRevLintPrice={setRevLintPrice}
          revSeedPrice={revSeedPrice}
          setRevSeedPrice={setRevSeedPrice}
          revSeedUnit={revSeedUnit}
          setRevSeedUnit={setRevSeedUnit}
          revExpense={revExpense}
          setRevExpense={setRevExpense}
          revGot={revGot}
          setRevGot={setRevGot}
          revShortage={revShortage}
          setRevShortage={setRevShortage}
        />
      )}

      {/* Standard Units Footer */}
      <div className="foot">
        Standard Units<br />
        1 Candy = 356 kg Lint | 1 Maund = 20 kg<br />
        All calculations are estimates. Market conditions vary.
      </div>
    </>
  );
};

export default GinningCalculator;
