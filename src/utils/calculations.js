/**
 * Pure calculation utilities for Cotton Ginning & Oil Mill processing.
 * Preserves 100% exact mathematical formulas, precision, rounding, and validation rules.
 */

/**
 * Calculates GOT %, Seed %, and Waste % from weights.
 */
export function calculateGinningOutput({ inputWeight, lintWeight, seedWeight, wasteWeight }) {
  const safeInput = parseFloat(inputWeight) || 0;
  const safeLint = parseFloat(lintWeight) || 0;
  const safeSeed = parseFloat(seedWeight) || 0;
  const safeWaste = parseFloat(wasteWeight) || 0;

  if (safeInput > 0) {
    const gotPercent = ((safeLint / safeInput) * 100).toFixed(2);
    const seedPercent = ((safeSeed / safeInput) * 100).toFixed(2);
    const wastePercent = ((safeWaste / safeInput) * 100).toFixed(2);
    const sum = parseFloat(gotPercent) + parseFloat(seedPercent) + parseFloat(wastePercent);
    const totalPercent = sum.toFixed(2);
    const isBalanced = sum.toFixed(0) === '100';

    return {
      gotPercent,
      seedPercent,
      wastePercent,
      totalPercent,
      showWarning: !isBalanced && safeInput > 0,
    };
  }

  return {
    gotPercent: '0',
    seedPercent: '0',
    wastePercent: '0',
    totalPercent: '0.00',
    showWarning: false,
  };
}

export const LINT_PER_CANDY = 355.62;

/**
 * Calculates Cost of Production (Parity) per Candy (355.62 kg of Lint).
 */
export function calculateGinningParity({
  kapasRate,
  kapasUnit,
  seedRate,
  seedUnit,
  expensePerMaund,
  expectedGot,
  expectedShortage,
}) {
  const isDataEntered = kapasRate !== '' && seedRate !== '' && expensePerMaund !== '';
  if (!isDataEntered) {
    return { hasValidData: false, parityCost: '0' };
  }

  const safeKapasRate = parseFloat(kapasRate) || 0;
  const safeSeedRate = parseFloat(seedRate) || 0;
  const safeExpensePerMaund = parseFloat(expensePerMaund) || 0;
  const safeGot = parseFloat(expectedGot) || 0;
  const safeShortage = parseFloat(expectedShortage) || 0;

  if (safeGot > 0) {
    const requiredKapasKg = LINT_PER_CANDY / (safeGot / 100);
    const seedPercentageDec = (100 - safeGot - safeShortage) / 100;
    const generatedSeedKg = requiredKapasKg * seedPercentageDec;

    const costOfKapas = (requiredKapasKg / kapasUnit) * safeKapasRate;
    const processingCost = (requiredKapasKg / 20) * safeExpensePerMaund;
    const recoveryFromSeed = (generatedSeedKg / seedUnit) * safeSeedRate;

    const netCost = costOfKapas + processingCost - recoveryFromSeed;
    return {
      hasValidData: true,
      parityCost: netCost.toFixed(0),
    };
  }

  return { hasValidData: false, parityCost: '0' };
}

/**
 * Calculates Buying Parity (Max purchase rate for 20kg Raw Cotton).
 */
export function calculateReverseParity({
  revLintPrice,
  revSeedPrice,
  revSeedUnit,
  revExpense,
  revGot,
  revShortage,
}) {
  const isDataEntered = revLintPrice !== '' && revSeedPrice !== '' && revExpense !== '';
  if (!isDataEntered) {
    return { hasValidData: false, revKapasRate: '0' };
  }

  const safeLintPrice = parseFloat(revLintPrice) || 0;
  const safeSeedPrice = parseFloat(revSeedPrice) || 0;
  const safeExpense = parseFloat(revExpense) || 0;
  const safeGot = parseFloat(revGot) || 0;
  const safeShortage = parseFloat(revShortage) || 0;

  if (safeGot > 0) {
    const KAPAS_UNIT = 20;
    const lintYieldKg = KAPAS_UNIT * (safeGot / 100);
    const seedYieldKg = KAPAS_UNIT * ((100 - safeGot - safeShortage) / 100);

    const lintValue = (lintYieldKg / LINT_PER_CANDY) * safeLintPrice;
    const seedValue = (seedYieldKg / revSeedUnit) * safeSeedPrice;
    const totalRealization = lintValue + seedValue;
    const maxKapasRate = totalRealization - safeExpense;

    return {
      hasValidData: true,
      revKapasRate: maxKapasRate.toFixed(0),
    };
  }

  return { hasValidData: false, revKapasRate: '0' };
}

/**
 * Calculates Oil Mill output recovery breakdown in kg and percentages.
 */
export function calculateOilRecovery({
  oilInputSeed,
  oilRecoveryPercent,
  cakeRecoveryPercent,
}) {
  const input = parseFloat(oilInputSeed) || 0;
  const oilRec = parseFloat(oilRecoveryPercent) || 0;
  const cakeRec = parseFloat(cakeRecoveryPercent) || 0;
  const wasteRec = 100 - oilRec - cakeRec;

  const oilYieldKg = (input * (oilRec / 100)).toFixed(1);
  const cakeYieldKg = (input * (cakeRec / 100)).toFixed(1);
  const wasteYieldKg = (input * (wasteRec / 100)).toFixed(1);

  return {
    oilYieldKg,
    oilPercent: oilRec,
    cakeYieldKg,
    cakePercent: cakeRec,
    wasteYieldKg,
    wastePercent: wasteRec.toFixed(1),
  };
}

/**
 * Calculates Oil Mill Crushing Profit/Loss and Khal Cost Parity.
 */
export function calculateOilProfitAndParity({
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
  oilMode,
}) {
  const safeSeedBuyRate = parseFloat(oilSeedBuyRate) || 0;
  const safeOilSellRate = parseFloat(oilSellRate) || 0;
  const safeCakeSellRate = parseFloat(cakeSellRate) || 0;
  const safeOilExpense = parseFloat(oilExpense) || 0;
  const safeOilRec = parseFloat(oilRecoveryPercent) || 0;
  const safeCakeRec = parseFloat(cakeRecoveryPercent) || 0;
  const safeCakeSellUnit = parseFloat(cakeSellUnit) || 50;

  const ONE_TON = 1000;

  // Calculate Costs for 1 Ton of Seed Processing
  const costOfSeed = (ONE_TON / oilSeedBuyUnit) * safeSeedBuyRate;
  const costProcessing = (ONE_TON / oilExpenseUnit) * safeOilExpense;
  const totalCost = costOfSeed + costProcessing;

  // Yields
  const oilYieldKg = ONE_TON * (safeOilRec / 100);
  const cakeYieldKg = ONE_TON * (safeCakeRec / 100);

  let oilProfit = '0';
  let khalParityCost = '0';
  let hasValidOilData = false;

  if (oilMode === 'parity') {
    const isDataEntered =
      oilSeedBuyRate !== '' &&
      oilSellRate !== '' &&
      cakeSellRate !== '' &&
      oilExpense !== '';
    hasValidOilData = isDataEntered;
    if (isDataEntered) {
      const revenueOil = (oilYieldKg / oilSellUnit) * safeOilSellRate;
      const revenueCake = (cakeYieldKg / cakeSellUnit) * safeCakeSellRate;
      const totalRevenue = revenueOil + revenueCake;
      oilProfit = (totalRevenue - totalCost).toFixed(0);
    }
  }

  if (oilMode === 'khal_parity') {
    const isDataEntered =
      oilSeedBuyRate !== '' &&
      oilSellRate !== '' &&
      oilExpense !== '';
    hasValidOilData = isDataEntered;
    if (isDataEntered && cakeYieldKg > 0) {
      const revenueOil = (oilYieldKg / oilSellUnit) * safeOilSellRate;
      const remainingCost = totalCost - revenueOil;
      const costPerKgCake = remainingCost / cakeYieldKg;
      const costPerUnitCake = costPerKgCake * safeCakeSellUnit;
      khalParityCost = costPerUnitCake.toFixed(0);
    }
  }

  return {
    hasValidOilData,
    oilProfit,
    khalParityCost,
  };
}
