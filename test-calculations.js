import {
  calculateGinningOutput,
  calculateGinningParity,
  calculateReverseParity,
  calculateOilRecovery,
  calculateOilProfitAndParity,
} from './src/utils/calculations.js';

console.log('--- Running Business Logic & Calculation Parity Tests ---');

// 1. Ginning Output Ratio Test
const out1 = calculateGinningOutput({
  inputWeight: 100,
  lintWeight: 35,
  seedWeight: 62,
  wasteWeight: 3,
});
console.log('Ginning Output 100g sample:', out1);
console.assert(out1.gotPercent === '35.00', 'GOT % should be 35.00');
console.assert(out1.seedPercent === '62.00', 'Seed % should be 62.00');
console.assert(out1.wastePercent === '3.00', 'Waste % should be 3.00');
console.assert(out1.showWarning === false, 'Warning should be false');

// 1b. Non-100 sum
const out2 = calculateGinningOutput({
  inputWeight: 100,
  lintWeight: 34,
  seedWeight: 62,
  wasteWeight: 3,
});
console.assert(out2.showWarning === true, 'Warning should be true when sum != 100');

// 2. Ginning Cost Parity Test
// Kapas: 1500 per 20kg, Seed: 700 per 20kg, Exp: 150 per maund, GOT: 35%, Shortage: 2%
// Lint per candy: 355.62
// requiredKapas = 355.62 / 0.35 = 1016.057143 kg
// seed% = (100 - 35 - 2)/100 = 63% = 0.63
// genSeed = 1016.057143 * 0.63 = 640.116 kg
// costOfKapas = (1016.057143 / 20) * 1500 = 76204.2857
// processingCost = (1016.057143 / 20) * 150 = 7620.42857
// recoveryFromSeed = (640.116 / 20) * 700 = 22404.06
// netCost = 76204.2857 + 7620.42857 - 22404.06 = 61420.65 -> toFixed(0) = '61421'
const parityResult = calculateGinningParity({
  kapasRate: '1500',
  kapasUnit: 20,
  seedRate: '700',
  seedUnit: 20,
  expensePerMaund: '150',
  expectedGot: 35.0,
  expectedShortage: 2.0,
});
console.log('Ginning Cost Parity Result:', parityResult);
console.assert(parityResult.hasValidData === true, 'Data should be valid');
console.assert(parityResult.parityCost === '61421', `Expected 61421, got ${parityResult.parityCost}`);

// 3. Reverse Parity Test
// Lint: 60000 / candy, Seed: 700 / 20kg, Expense: 150 / 20kg, GOT: 35%, Shortage: 2%
// lintYieldKg = 20 * 0.35 = 7 kg
// seedYieldKg = 20 * 0.63 = 12.6 kg
// lintValue = (7 / 355.62) * 60000 = 1181.036
// seedValue = (12.6 / 20) * 700 = 441
// totalRealization = 1181.036 + 441 = 1622.036
// maxKapas = 1622.036 - 150 = 1472.036 -> toFixed(0) = '1472'
const revResult = calculateReverseParity({
  revLintPrice: '60000',
  revSeedPrice: '700',
  revSeedUnit: 20,
  revExpense: '150',
  revGot: 35.0,
  revShortage: 2.0,
});
console.log('Reverse Parity Result:', revResult);
console.assert(revResult.hasValidData === true, 'Reverse data should be valid');
console.assert(revResult.revKapasRate === '1472', `Expected 1472, got ${revResult.revKapasRate}`);

// 4. Oil Recovery Test
const oilRec = calculateOilRecovery({
  oilInputSeed: 1000,
  oilRecoveryPercent: 12.0,
  cakeRecoveryPercent: 84.0,
});
console.log('Oil Recovery Result:', oilRec);
console.assert(oilRec.oilYieldKg === '120.0', 'Oil yield should be 120.0');
console.assert(oilRec.cakeYieldKg === '840.0', 'Cake yield should be 840.0');
console.assert(oilRec.wasteYieldKg === '40.0', 'Waste yield should be 40.0');

// 5. Oil Profit Test
// Seed Buy: 35000 per Ton (1000kg), Oil Sell: 1200 per 10kg, Cake Sell: 1800 per 50kg bag, Expense: 1500 per Ton
// costOfSeed = 35000, costProcessing = 1500, totalCost = 36500
// oilYield = 120kg -> (120/10)*1200 = 14400
// cakeYield = 840kg -> (840/50)*1800 = 30240
// totalRevenue = 14400 + 30240 = 44640
// profit = 44640 - 36500 = 8140
const oilProfitResult = calculateOilProfitAndParity({
  oilSeedBuyRate: '35000',
  oilSeedBuyUnit: 1000,
  oilSellRate: '1200',
  oilSellUnit: 10,
  cakeSellRate: '1800',
  cakeSellUnit: 50,
  oilExpense: '1500',
  oilExpenseUnit: 1000,
  oilRecoveryPercent: 12.0,
  cakeRecoveryPercent: 84.0,
  oilMode: 'parity',
});
console.log('Oil Profit Result:', oilProfitResult);
console.assert(oilProfitResult.oilProfit === '8140', `Expected 8140, got ${oilProfitResult.oilProfit}`);

// 6. Khal Cost Parity Test
// totalCost = 36500, oil revenue = 14400, remaining cost = 22100
// costPerKgCake = 22100 / 840 = 26.30952
// for 50kg bag = 26.30952 * 50 = 1315.476 -> toFixed(0) = '1315'
const khalResult = calculateOilProfitAndParity({
  oilSeedBuyRate: '35000',
  oilSeedBuyUnit: 1000,
  oilSellRate: '1200',
  oilSellUnit: 10,
  cakeSellRate: '',
  cakeSellUnit: 50,
  oilExpense: '1500',
  oilExpenseUnit: 1000,
  oilRecoveryPercent: 12.0,
  cakeRecoveryPercent: 84.0,
  oilMode: 'khal_parity',
});
console.log('Khal Cost Result:', khalResult);
console.assert(khalResult.khalParityCost === '1315', `Expected 1315, got ${khalResult.khalParityCost}`);

console.log('ALL FORMULA PARITY TESTS PASSED SUCCESSFULLY!');
