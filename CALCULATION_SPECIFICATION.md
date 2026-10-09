# CottonCalc Pro — Complete Calculation & Equation Specification Reference

> **Document Type**: Technical Calculation Reference & Variable Equation Architecture  
> **Target Audience**: Business Analysts, Software Engineers, Financial Auditors, Agribusiness Traders  
> **Source Code**: `src/utils/calculations.js`  
> **Notation**: Human-Readable Standard Arithmetic (`+`, `-`, `*`, `/`) with Exact Application Variable Names. **No raw LaTeX syntax.**

---

## 📑 Table of Contents

1. [Global Constants & Industry Benchmarks](#1-global-constants--industry-benchmarks)
2. [Module 1: Cotton Ginning Calculator](#2-module-1-cotton-ginning-calculator)
   - [Tab 1.1: Cost Parity (કાનડી કોસ્ટ / Candy Cost)](#tab-11-cost-parity-candy-cost)
   - [Tab 1.2: Reverse Parity (કપાસ ખરીદ પડતર / Break-Even Kapas Rate)](#tab-12-reverse-parity-break-even-kapas-rate)
   - [Tab 1.3: Output Ratio (G.O.T. & Yield Distribution Analysis)](#tab-13-output-ratio-got--yield-distribution-analysis)
3. [Module 2: Cottonseed Oil Mill Calculator](#3-module-2-cottonseed-oil-mill-calculator)
   - [Tab 2.1: Khal Cost Parity (ખોળ ઉત્પાદન પડતર / Production Cost per Bag)](#tab-21-khal-cost-parity-production-cost-per-bag)
   - [Tab 2.2: Crushing Profit & Loss (પિલાણ નફો / નુકસાન / Margin per Ton)](#tab-22-crushing-profit--loss-margin-per-ton)
   - [Tab 2.3: Oil Mill Recovery (રિકવરી વિશ્લેષણ / Physical Yield)](#tab-23-oil-mill-recovery-physical-yield)
4. [Master Summary Matrix (All 6 Tabs)](#4-master-summary-matrix-all-6-tabs)

---

## 1. Global Constants & Industry Benchmarks

The Indian cotton trading and crushing sector operates on historical benchmark units codified into this application:

| Constant Variable | Display / Regional Name | Numeric Value | Unit | Description |
|:---|:---|:---:|:---:|:---|
| `LINT_PER_CANDY` | 1 Candy (કાનડી / खांडी) | **355.62** | kg | Net weight of pure ginned lint cotton per commercial candy. |
| `MAUND` | 1 Maund (મણ / मन) | **20.00** | kg | Standard APMC Mandi auction unit for raw seed cotton (Kapas) and seed. |
| `QUINTAL` | 1 Quintal (ક્વિન્ટલ / क्विंटल) | **100.00** | kg | Standard weight unit for wholesale agricultural commodities. |
| `ONE_TON` | 1 Metric Ton (ટન / टन) | **1,000.00** | kg | Standard baseline processing lot for cottonseed crushing mills. |
| `KHAL_BAG` | 1 Bag (ગુણી / बोरी) | **50.00** | kg | Standard commercial packaging bag weight for Cottonseed Oil Cake (Khal). |
| `OIL_TIN` | 1 Tin (ડબ્બો / टिन) | **15.00** | kg | Standard packaging container for edible wash oil. |

---

## 2. Module 1: Cotton Ginning Calculator

---

### Tab 1.1: Cost Parity (Candy Cost)

* **UI Tab Title**: Parity (`t('ginning.tabParity')`)
* **Backend Function**: `calculateGinningParity(...)`
* **Purpose**: Calculates the net manufacturing cost of producing **1 Candy (355.62 kg)** of lint cotton from raw Kapas, after crediting byproduct cottonseed revenue and adding processing expenses.

#### 📋 Input Variables & Dropdown (LOV) Mapping

| Field Label | Component Variable | Type | Default | Dropdown Options (Display Label) | Internal Return Value (`value`) | Description / Formula Role |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **Kapas Price (કપાસ ભાવ)** | `kapasRate` | Number | `''` | N/A (Direct Number) | User Input | Raw seed cotton purchase rate in ₹. |
| **Kapas Unit Dropdown** | `kapasUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`) | `20`<br>`100` | • `20`: ₹ per 20 kg Maund (Mandi rate)<br>• `100`: ₹ per 100 kg Quintal rate |
| **Seed Price (કપાસિયા ભાવ)** | `seedRate` | Number | `''` | N/A (Direct Number) | User Input | Selling rate of byproduct cottonseed in ₹. |
| **Seed Unit Dropdown** | `seedUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`) | `20`<br>`100` | • `20`: ₹ per 20 kg Maund<br>• `100`: ₹ per 100 kg Quintal |
| **Ginning Expense (પ્રોસેસિંગ ખર્ચ)** | `expensePerMaund` | Number | `''` | Fixed label: `Per Maund (20 kg)` | Denominator = `20` | Processing charges per 20 kg Maund of raw Kapas. |
| **Expected GOT % (લિન્ટ ટકાવારી)** | `expectedGot` | Number | `35.0` | N/A (Direct Number) | User Input (0-100) | Ginning Outturn ratio (typically 32% - 36%). |
| **Expected Shortage % (ઘટ ટકાવારી)** | `expectedShortage` | Number | `2.0` | N/A (Direct Number) | User Input (0-100) | Moisture loss & trash percentage (typically 1.5% - 3.0%). |

#### ⚙️ Step-by-Step Human-Readable Equations

```text
Step 1: Calculate Seed Recovery Percentage
seedPercentage = 100 - expectedGot - expectedShortage

Step 2: Calculate Raw Cotton (Kapas) Required for 1 Candy (355.62 kg Lint)
requiredKapasKg = 355.62 / (expectedGot / 100)

Step 3: Calculate Cottonseed Generated from That Kapas
generatedSeedKg = requiredKapasKg * (seedPercentage / 100)

Step 4: Calculate Gross Raw Cotton Purchase Cost
costOfKapas = (requiredKapasKg / kapasUnit) * kapasRate

Step 5: Calculate Ginning & Pressing Processing Charges
processingCost = (requiredKapasKg / 20) * expensePerMaund

Step 6: Calculate Revenue Recovered from Selling Byproduct Cottonseed
recoveryFromSeed = (generatedSeedKg / seedUnit) * seedRate

Step 7: Calculate Net Cost of Production per Candy
netCandyCost = costOfKapas + processingCost - recoveryFromSeed

Step 8: Final Rounded Output
parityCost = Math.round(netCandyCost)   // Displayed as: ₹ parityCost / Candy
```

#### 🧪 Real-World Worked Numerical Example

* **User Inputs in Application**:
  * `kapasRate` = `1500`
  * `kapasUnit` = `20` (Per 20 kg Maund selected)
  * `seedRate` = `700`
  * `seedUnit` = `20` (Per 20 kg Maund selected)
  * `expensePerMaund` = `150`
  * `expectedGot` = `35.0` (%)
  * `expectedShortage` = `2.0` (%)

* **Step-by-Step Execution**:
  1. `seedPercentage` = `100 - 35.0 - 2.0 = 63.0%`
  2. `requiredKapasKg` = `355.62 / (35.0 / 100) = 355.62 / 0.35 = 1016.0571 kg`
  3. `generatedSeedKg` = `1016.0571 * (63.0 / 100) = 640.1160 kg`
  4. `costOfKapas` = `(1016.0571 / 20) * 1500 = 50.802855 * 1500 = ₹ 76,204.29`
  5. `processingCost` = `(1016.0571 / 20) * 150 = 50.802855 * 150 = ₹ 7,620.43`
  6. `recoveryFromSeed` = `(640.1160 / 20) * 700 = 32.0058 * 700 = ₹ 22,404.06`
  7. `netCandyCost` = `76204.29 + 7620.43 - 22404.06 = ₹ 61,420.66`
  8. `parityCost` = `Math.round(61420.66) = ₹ 61,421`

* **Output on Screen**: **₹ 61,421 / Candy**

---

### Tab 1.2: Reverse Parity (Break-Even Kapas Rate)

* **UI Tab Title**: Reverse Parity (`t('ginning.tabReverse')`)
* **Backend Function**: `calculateReverseParity(...)`
* **Purpose**: Calculates the **maximum procurement rate a ginner can pay per 20 kg Maund of raw Kapas** in the mandi to break even, given current market lint prices, seed prices, and expenses.

#### 📋 Input Variables & Dropdown (LOV) Mapping

| Field Label | Component Variable | Type | Default | Dropdown Options (Display Label) | Internal Return Value (`value`) | Description / Formula Role |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **Lint Selling Price (રૂ વેચાણ ભાવ)** | `revLintPrice` | Number | `''` | N/A (Direct Number) | User Input | Selling price of lint in ₹ per Candy (355.62 kg). |
| **Seed Price (કપાસિયા ભાવ)** | `revSeedPrice` | Number | `''` | N/A (Direct Number) | User Input | Market selling price of cottonseed in ₹. |
| **Seed Unit Dropdown** | `revSeedUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`) | `20`<br>`100` | • `20`: ₹ per 20 kg Maund<br>• `100`: ₹ per 100 kg Quintal |
| **Ginning Expense (પ્રોસેસિંગ ખર્ચ)** | `revExpense` | Number | `''` | Fixed label: `Per Maund (20 kg)` | Denominator = `20` | Processing cost per 20 kg Maund of raw Kapas. |
| **Expected GOT % (લિન્ટ ટકાવારી)** | `revGot` | Number | `35.0` | N/A (Direct Number) | User Input (0-100) | Expected Ginning Outturn %. |
| **Expected Shortage % (ઘટ ટકાવારી)** | `revShortage` | Number | `2.0` | N/A (Direct Number) | User Input (0-100) | Expected moisture & waste %. |

#### ⚙️ Step-by-Step Human-Readable Equations

```text
Baseline Lot: Exactly 20 kg of Raw Kapas (1 Maund)

Step 1: Calculate Lint Produced from 20 kg Kapas
lintYieldKg = 20 * (revGot / 100)

Step 2: Calculate Cottonseed Produced from 20 kg Kapas
seedYieldKg = 20 * ((100 - revGot - revShortage) / 100)

Step 3: Calculate Value Realized from Lint
lintValue = (lintYieldKg / 355.62) * revLintPrice

Step 4: Calculate Value Realized from Cottonseed
seedValue = (seedYieldKg / revSeedUnit) * revSeedPrice

Step 5: Calculate Total Gross Realization per 20 kg Kapas
totalRealization = lintValue + seedValue

Step 6: Subtract Ginning Processing Charges to Get Break-Even Rate
maxKapasRate = totalRealization - revExpense

Step 7: Final Rounded Output
revKapasRate = Math.round(maxKapasRate)   // Displayed as: ₹ revKapasRate / 20kg
```

#### 🧪 Real-World Worked Numerical Example

* **User Inputs in Application**:
  * `revLintPrice` = `61421` (₹ per Candy)
  * `revSeedPrice` = `700`
  * `revSeedUnit` = `20` (Per 20 kg Maund selected)
  * `revExpense` = `150` (₹ per 20 kg)
  * `revGot` = `35.0` (%)
  * `revShortage` = `2.0` (%)

* **Step-by-Step Execution**:
  1. `lintYieldKg` = `20 * (35.0 / 100) = 7.00 kg`
  2. `seedYieldKg` = `20 * ((100 - 35.0 - 2.0) / 100) = 20 * 0.63 = 12.60 kg`
  3. `lintValue` = `(7.00 / 355.62) * 61421 = 0.0196839 * 61421 = ₹ 1,209.01`
  4. `seedValue` = `(12.60 / 20) * 700 = 0.63 * 700 = ₹ 441.00`
  5. `totalRealization` = `1209.01 + 441.00 = ₹ 1,650.01`
  6. `maxKapasRate` = `1650.01 - 150 = ₹ 1,500.01`
  7. `revKapasRate` = `Math.round(1500.01) = ₹ 1,500`

* **Output on Screen**: **₹ 1,500 / 20 kg Maund**

---

### Tab 1.3: Output Ratio (G.O.T. & Yield Distribution Analysis)

* **UI Tab Title**: Ratio (`t('ginning.tabRatio')`)
* **Backend Function**: `calculateGinningOutput(...)`
* **Purpose**: Tests a laboratory sample (e.g. 100g) or commercial lot (e.g. 1000kg) to determine the exact Ginning Outturn (G.O.T.) %, Cottonseed %, and Waste %, with an automatic alert if the sum does not equal 100%.

#### 📋 Input Variables & Dropdown (LOV) Mapping

| Field Label | Component Variable | Type | Default | Toggle Options | Value | Description |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **Weight Unit Toggle** | `weightUnit` | String | `'g'` | • `Sample (100g)`<br>• `Bulk (1000kg)` | `'g'`<br>`'kg'` | • `'g'`: Sets initial values to `100`, `35`, `62`, `3`<br>• `'kg'`: Sets initial values to `1000`, `350`, `620`, `30` |
| **Total Raw Cotton (કુલ કપાસ)** | `inputWeight` | Number | `100` / `1000` | N/A | User Input | Gross weight of raw seed cotton tested. |
| **Lint Output (રૂ ઉત્પાદન)** | `lintWeight` | Number | `35` / `350` | N/A | User Input | Pure ginned lint weight obtained. |
| **Seed Output (કપાસિયા વજન)** | `seedWeight` | Number | `62` / `620` | N/A | User Input | Cottonseed weight obtained. |
| **Waste / Loss (વેસ્ટ / ઘટ)** | `wasteWeight` | Number | `3` / `30` | N/A | User Input | Trash, dust & moisture loss weight. |

#### ⚙️ Step-by-Step Human-Readable Equations

```text
Step 1: Calculate Ginning Outturn (G.O.T.) Percentage
gotPercent = (lintWeight / inputWeight) * 100        // Rounded to 2 decimals

Step 2: Calculate Cottonseed Percentage
seedPercent = (seedWeight / inputWeight) * 100      // Rounded to 2 decimals

Step 3: Calculate Waste / Shortage Percentage
wastePercent = (wasteWeight / inputWeight) * 100    // Rounded to 2 decimals

Step 4: Verify Sum of All Outputs
totalPercent = gotPercent + seedPercent + wastePercent

Step 5: Balance Verification Check
isBalanced = Math.round(totalPercent) === 100
showWarning = (!isBalanced && inputWeight > 0)
// If showWarning is true, an alert informs user that outputs do not balance to 100%.
```

#### 🧪 Real-World Worked Numerical Example

* **User Inputs**:
  * `inputWeight` = `100` grams
  * `lintWeight` = `34.8` grams
  * `seedWeight` = `62.4` grams
  * `wasteWeight` = `2.8` grams
* **Step-by-Step Execution**:
  1. `gotPercent` = `(34.8 / 100) * 100 = 34.80%`
  2. `seedPercent` = `(62.4 / 100) * 100 = 62.40%`
  3. `wastePercent` = `(2.8 / 100) * 100 = 2.80%`
  4. `totalPercent` = `34.80 + 62.40 + 2.80 = 100.00%`
  5. `showWarning` = `false` (Balanced)

---

## 3. Module 2: Cottonseed Oil Mill Calculator

> **Crushing Lot Standard**: In CottonCalc Pro, all oil mill calculations are anchored to **1 Metric Ton (1,000 kg)** of raw cottonseed crushed (`ONE_TON = 1000`).

---

### Tab 2.1: Khal Cost Parity (Production Cost per Bag)

* **UI Tab Title**: Khal Cost (`t('oil.tabKhalCost')`)
* **Backend Function**: `calculateOilProfitAndParity(..., oilMode: 'khal_parity')`
* **Purpose**: Calculates the net manufacturing cost of Cottonseed Oil Cake (Khal) per 50 kg Bag, per 20 kg Maund, per Quintal, or per kg, after crediting revenue from Wash Oil.

#### 📋 Input Variables & Dropdown (LOV) Mapping

| Field Label | Component Variable | Type | Default | Dropdown Options (Display Label) | Internal Return Value (`value`) | Backend Factor & Calculation Role |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **Seed Purchase Rate (કપાસિયા ખરીદ ભાવ)** | `oilSeedBuyRate` | Number | `''` | N/A (Direct Number) | User Input | Cost paid to purchase cottonseed in ₹. |
| **Seed Buy Unit Dropdown** | `oilSeedBuyUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`)<br>• `Per Ton` (`TON`) | `20`<br>`100`<br>`1000` | Scaled to 1 Ton (`1000 / oilSeedBuyUnit`):<br>• `20`: Multiplied by 50<br>• `100`: Multiplied by 10<br>• `1000`: Multiplied by 1 |
| **Oil Selling Rate (તેલ વેચાણ ભાવ)** | `oilSellRate` | Number | `''` | N/A (Direct Number) | User Input | Selling price of Wash Oil in ₹. |
| **Oil Sell Unit Dropdown** | `oilSellUnit` | Number | `10` | • `Per 10 kg` (`10K`)<br>• `Per 1 kg` (`1K`)<br>• `Per 15 kg` (`15K`) | `10`<br>`1`<br>`15` | Revenue divisor (`oilYieldKg / oilSellUnit`):<br>• `10`: ₹ per 10 kg<br>• `1`: ₹ per 1 kg<br>• `15`: ₹ per 15 kg Tin |
| **Processing Expense (પિલાણ ખર્ચ)** | `oilExpense` | Number | `''` | N/A (Direct Number) | User Input | Milling, power, labor & expeller charges in ₹. |
| **Expense Unit Dropdown** | `oilExpenseUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per Ton` (`TON`) | `20`<br>`1000` | Scaled to 1 Ton (`1000 / oilExpenseUnit`):<br>• `20`: Multiplied by 50<br>• `1000`: Multiplied by 1 |
| **Oil Recovery % (તેલ ટકાવારી)** | `oilRecoveryPercent` | Number | `12.0` | N/A (Direct Number) | User Input (0-100) | Extracted wash oil % (typically 10% - 13%). |
| **Cake Recovery % (ખોળ ટકાવારી)** | `cakeRecoveryPercent` | Number | `84.0` | N/A (Direct Number) | User Input (0-100) | Extracted oil cake % (typically 82% - 86%). |
| **Show Cost Per (પરિણામ યુનિટ)** | `cakeSellUnit` | Number | `50` | • `Per 50 kg Bag` (`BAG`)<br>• `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`)<br>• `Per 1 kg` (`1K`) | `50`<br>`20`<br>`100`<br>`1` | Final display packaging multiplier. Multiplies cost per kg by selected unit weight. |

#### ⚙️ Step-by-Step Human-Readable Equations

```text
Processing Batch: Exactly 1,000 kg (1 Metric Ton) of Cottonseed

Step 1: Calculate Total Raw Cottonseed Purchase Cost for 1 Ton
costOfSeed = (1000 / oilSeedBuyUnit) * oilSeedBuyRate

Step 2: Calculate Total Processing & Milling Expense for 1 Ton
costProcessing = (1000 / oilExpenseUnit) * oilExpense

Step 3: Calculate Total Crushing Expenditure for 1 Ton
totalCost = costOfSeed + costProcessing

Step 4: Calculate Physical Yield of Wash Oil and Oil Cake
oilYieldKg = 1000 * (oilRecoveryPercent / 100)
cakeYieldKg = 1000 * (cakeRecoveryPercent / 100)

Step 5: Calculate Revenue Realized from Selling Wash Oil
revenueOil = (oilYieldKg / oilSellUnit) * oilSellRate

Step 6: Calculate Net Remaining Cost to Be Recovered from Oil Cake
remainingCost = totalCost - revenueOil

Step 7: Calculate Manufacturing Cost per Single Kilogram of Oil Cake
costPerKgCake = remainingCost / cakeYieldKg

Step 8: Scale Cost per Kilogram to User's Selected Unit (e.g. 50 kg Bag)
costPerUnitCake = costPerKgCake * cakeSellUnit

Step 9: Final Rounded Output
khalParityCost = Math.round(costPerUnitCake)   // Displayed as: ₹ khalParityCost / Unit
```

#### 🧪 Real-World Worked Numerical Example

* **User Inputs in Application**:
  * `oilSeedBuyRate` = `700` | `oilSeedBuyUnit` = `20` (Per 20 kg Maund)
  * `oilSellRate` = `1200` | `oilSellUnit` = `10` (Per 10 kg)
  * `oilExpense` = `30` | `oilExpenseUnit` = `20` (Per 20 kg Maund)
  * `oilRecoveryPercent` = `12.0` (%)
  * `cakeRecoveryPercent` = `84.0` (%)
  * `cakeSellUnit` = `50` (Per 50 kg Bag selected)

* **Step-by-Step Execution**:
  1. `costOfSeed` = `(1000 / 20) * 700 = 50 * 700 = ₹ 35,000.00`
  2. `costProcessing` = `(1000 / 20) * 30 = 50 * 30 = ₹ 1,500.00`
  3. `totalCost` = `35000 + 1500 = ₹ 36,500.00`
  4. `oilYieldKg` = `1000 * 0.12 = 120.0 kg`
  5. `cakeYieldKg` = `1000 * 0.84 = 840.0 kg`
  6. `revenueOil` = `(120.0 / 10) * 1200 = 12 * 1200 = ₹ 14,400.00`
  7. `remainingCost` = `36500 - 14400 = ₹ 22,100.00`
  8. `costPerKgCake` = `22100 / 840.0 = ₹ 26.3095 per kg`
  9. `costPerUnitCake` = `26.3095 * 50 = ₹ 1,315.48 per 50 kg Bag`
  10. `khalParityCost` = `Math.round(1315.48) = ₹ 1,315`

* **Output on Screen**: **₹ 1,315 / 50 kg Bag**

---

### Tab 2.2: Crushing Profit & Loss (Margin per Ton)

* **UI Tab Title**: Profit (`t('oil.tabProfit')`)
* **Backend Function**: `calculateOilProfitAndParity(..., oilMode: 'parity')`
* **Purpose**: Evaluates the commercial profitability and net operating margin per Metric Ton (1,000 kg) of cottonseed processed.

#### 📋 Input Variables & Dropdown (LOV) Mapping

| Field Label | Component Variable | Type | Default | Dropdown Options (Display Label) | Internal Return Value (`value`) | Description / Formula Role |
|:---|:---|:---:|:---:|:---|:---:|:---|
| **Seed Purchase Rate (કપાસિયા ખરીદ ભાવ)** | `oilSeedBuyRate` | Number | `''` | N/A (Direct Number) | User Input | Purchase rate of seed in ₹. |
| **Seed Buy Unit Dropdown** | `oilSeedBuyUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`)<br>• `Per Ton` (`TON`) | `20`<br>`100`<br>`1000` | Scaled to 1 Ton (`1000 / oilSeedBuyUnit`). |
| **Oil Selling Rate (તેલ વેચાણ ભાવ)** | `oilSellRate` | Number | `''` | N/A (Direct Number) | User Input | Selling rate of Wash Oil in ₹. |
| **Oil Sell Unit Dropdown** | `oilSellUnit` | Number | `10` | • `Per 10 kg` (`10K`)<br>• `Per 1 kg` (`1K`)<br>• `Per 15 kg` (`15K`) | `10`<br>`1`<br>`15` | Divisor for oil sales realization. |
| **Cake Selling Rate (ખોળ વેચાણ ભાવ)** | `cakeSellRate` | Number | `''` | N/A (Direct Number) | User Input | Selling rate of Cottonseed Cake in ₹. |
| **Cake Sell Unit Dropdown** | `cakeSellUnit` | Number | `50` | • `Per 50 kg Bag` (`BAG`)<br>• `Per 20 kg` (`20K`)<br>• `Per 100 kg` (`100K`) | `50`<br>`20`<br>`100` | Divisor for cake sales revenue (`cakeYieldKg / cakeSellUnit`). |
| **Processing Expense (પિલાણ ખર્ચ)** | `oilExpense` | Number | `''` | N/A (Direct Number) | User Input | Milling and expeller charges in ₹. |
| **Expense Unit Dropdown** | `oilExpenseUnit` | Number | `20` | • `Per 20 kg` (`20K`)<br>• `Per Ton` (`TON`) | `20`<br>`1000` | Scaled to 1 Ton (`1000 / oilExpenseUnit`). |
| **Oil Recovery % (તેલ ટકાવારી)** | `oilRecoveryPercent` | Number | `12.0` | N/A (Direct Number) | User Input | Wash oil recovery %. |
| **Cake Recovery % (ખોળ ટકાવારી)** | `cakeRecoveryPercent` | Number | `84.0` | N/A (Direct Number) | User Input | Oil cake recovery %. |

#### ⚙️ Step-by-Step Human-Readable Equations

```text
Processing Batch: Exactly 1,000 kg (1 Metric Ton) of Cottonseed

Step 1: Calculate Total Expenditure for 1 Ton
costOfSeed = (1000 / oilSeedBuyUnit) * oilSeedBuyRate
costProcessing = (1000 / oilExpenseUnit) * oilExpense
totalCost = costOfSeed + costProcessing

Step 2: Calculate Yield Weights in kg
oilYieldKg = 1000 * (oilRecoveryPercent / 100)
cakeYieldKg = 1000 * (cakeRecoveryPercent / 100)

Step 3: Calculate Revenue from Wash Oil
revenueOil = (oilYieldKg / oilSellUnit) * oilSellRate

Step 4: Calculate Revenue from Cottonseed Cake (Khal)
revenueCake = (cakeYieldKg / cakeSellUnit) * safeCakeSellRate

Step 5: Calculate Total Gross Commercial Revenue Realized
totalRevenue = revenueOil + revenueCake

Step 6: Calculate Net Commercial Margin (Profit or Loss)
netProfitOrLoss = totalRevenue - totalCost

Step 7: Final Rounded Output & Color Status
oilProfit = Math.round(netProfitOrLoss)
isProfitable = (oilProfit >= 0)
// If isProfitable is true: Green badge, Checkmark icon (PROFIT)
// If isProfitable is false: Red badge, Cross icon (LOSS)
```

#### 🧪 Real-World Worked Numerical Example

* **User Inputs in Application**:
  * `oilSeedBuyRate` = `700` | `oilSeedBuyUnit` = `20` (Per 20 kg)
  * `oilExpense` = `30` | `oilExpenseUnit` = `20` (Per 20 kg)
  * `oilSellRate` = `1200` | `oilSellUnit` = `10` (Per 10 kg)
  * `cakeSellRate` = `1800` | `cakeSellUnit` = `50` (Per 50 kg Bag)
  * `oilRecoveryPercent` = `12.0` (%)
  * `cakeRecoveryPercent` = `84.0` (%)

* **Step-by-Step Execution**:
  1. `costOfSeed` = `(1000 / 20) * 700 = ₹ 35,000`
  2. `costProcessing` = `(1000 / 20) * 30 = ₹ 1,500`
  3. `totalCost` = `35000 + 1500 = ₹ 36,500`
  4. `oilYieldKg` = `1000 * 0.12 = 120.0 kg`
  5. `cakeYieldKg` = `1000 * 0.84 = 840.0 kg`
  6. `revenueOil` = `(120.0 / 10) * 1200 = ₹ 14,400`
  7. `revenueCake` = `(840.0 / 50) * 1800 = 16.8 * 1800 = ₹ 30,240`
  8. `totalRevenue` = `14400 + 30240 = ₹ 44,640`
  9. `netProfitOrLoss` = `44640 - 36500 = +₹ 8,140`
  10. `oilProfit` = `Math.round(8140) = ₹ 8,140` (Profitable: Green)

* **Output on Screen**: **₹ +8,140 / Ton (Profitable)**

---

### Tab 2.3: Oil Mill Recovery (Physical Yield)

* **UI Tab Title**: Recovery (`t('oil.tabRecovery')`)
* **Backend Function**: `calculateOilRecovery(...)`
* **Purpose**: Calculates physical production output distribution in kilograms and percentages from any raw cottonseed input batch weight.

#### 📋 Input Variables

| Field Label | Component Variable | Type | Default | Description |
|:---|:---|:---:|:---:|:---|
| **Total Seed Processed (કુલ કપાસિયા)** | `oilInputSeed` | Number | `1000` | Total weight of cottonseed processed in kg. |
| **Oil Recovery % (તેલ ટકાવારી)** | `oilRecoveryPercent` | Number | `12.0` | Wash oil recovery %. |
| **Cake Recovery % (ખોળ ટકાવારી)** | `cakeRecoveryPercent` | Number | `84.0` | Oil cake recovery %. |

#### ⚙️ Step-by-Step Human-Readable Equations

```text
Step 1: Calculate Waste / Shortage Percentage
wastePercent = 100 - oilRecoveryPercent - cakeRecoveryPercent

Step 2: Calculate Wash Oil Physical Output in kg
oilYieldKg = oilInputSeed * (oilRecoveryPercent / 100)      // Displayed to 1 decimal

Step 3: Calculate Oil Cake Physical Output in kg
cakeYieldKg = oilInputSeed * (cakeRecoveryPercent / 100)    // Displayed to 1 decimal

Step 4: Calculate Waste / Moisture Loss in kg
wasteYieldKg = oilInputSeed * (wastePercent / 100)          // Displayed to 1 decimal
```

#### 🧪 Real-World Worked Numerical Example

* **User Inputs**:
  * `oilInputSeed` = `1000` kg
  * `oilRecoveryPercent` = `12.0` %
  * `cakeRecoveryPercent` = `84.0` %

* **Execution**:
  1. `wastePercent` = `100 - 12.0 - 84.0 = 4.0%`
  2. `oilYieldKg` = `1000 * 0.12 = 120.0 kg` (12%)
  3. `cakeYieldKg` = `1000 * 0.84 = 840.0 kg` (84%)
  4. `wasteYieldKg` = `1000 * 0.04 = 40.0 kg` (4%)

---

## 4. Master Summary Matrix (All 6 Tabs)

| Tab ID | Tab Display Name | Function in Code | Primary Human-Readable Equation | Primary Output & Unit |
|:---|:---|:---|:---|:---|
| **`parity`** | Ginning Parity | `calculateGinningParity` | `((355.62 / (expectedGot/100)) / kapasUnit * kapasRate) + ((requiredKapas / 20) * expensePerMaund) - ((generatedSeed / seedUnit) * seedRate)` | **₹ / Candy (355.62 kg)** |
| **`reverse`** | Ginning Reverse Parity | `calculateReverseParity` | `((20 * (revGot/100) / 355.62) * revLintPrice) + ((20 * (seed%/100) / revSeedUnit) * revSeedPrice) - revExpense` | **₹ / 20 kg Maund** |
| **`ratio`** | Ginning Output Ratio | `calculateGinningOutput` | `gotPercent = (lintWeight / inputWeight) * 100`<br>`seedPercent = (seedWeight / inputWeight) * 100`<br>`wastePercent = (wasteWeight / inputWeight) * 100` | **GOT %, Seed %, Waste %** |
| **`khal_parity`** | Oil Mill Khal Cost | `calculateOilProfitAndParity` | `remainingCost = totalCost - revenueOil`<br>`costPerUnitCake = (remainingCost / cakeYieldKg) * cakeSellUnit` | **₹ / Bag (50kg) / 20kg / 100kg** |
| **`parity`** | Oil Mill Crushing Profit | `calculateOilProfitAndParity` | `oilProfit = (revenueOil + revenueCake) - (costOfSeed + costProcessing)` | **₹ Profit/Loss per Ton** |
| **`recovery`** | Oil Mill Recovery | `calculateOilRecovery` | `oilYieldKg = oilInputSeed * (oilRecoveryPercent / 100)`<br>`cakeYieldKg = oilInputSeed * (cakeRecoveryPercent / 100)` | **Oil kg, Cake kg, Waste kg** |

---
*Verified against the CottonCalc Pro test suite with 1 Candy = 355.62 kg.*
