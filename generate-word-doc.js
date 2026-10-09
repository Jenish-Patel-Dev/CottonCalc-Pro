import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, WidthType, AlignmentType, BorderStyle, ShadingType } from "docx";
import fs from "fs";

function createHeaderCell(text, widthPercent = 25) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: "1E293B", type: ShadingType.CLEAR },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text: text,
            bold: true,
            color: "FFFFFF",
            font: "Segoe UI",
            size: 20, // 10pt
          }),
        ],
      }),
    ],
  });
}

function createDataCell(text, widthPercent = 25, isBold = false, isBgLight = false) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: isBgLight ? { fill: "F8FAFC", type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text: text,
            bold: isBold,
            color: "0F172A",
            font: "Segoe UI",
            size: 19, // 9.5pt
          }),
        ],
      }),
    ],
  });
}

function createCodeBlock(lines) {
  return lines.map(line =>
    new Paragraph({
      spacing: { before: 40, after: 40 },
      shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
      children: [
        new TextRun({
          text: line,
          font: "Consolas",
          size: 19,
          color: "1E293B",
          bold: line.startsWith("Step") || line.startsWith("//"),
        }),
      ],
    })
  );
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Segoe UI", size: 22, color: "1E293B" }, // 11pt
        paragraph: { spacing: { line: 280, before: 100, after: 100 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 },
        },
      },
      children: [
        // Title
        new Paragraph({
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 80 },
          children: [
            new TextRun({
              text: "CottonCalc Pro",
              bold: true,
              size: 44, // 22pt
              color: "1E3A8A",
              font: "Segoe UI",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: "Complete Calculation & Equation Technical Specification",
              size: 26, // 13pt
              color: "475569",
              bold: true,
              font: "Segoe UI",
            }),
          ],
        }),

        // Section 1: Global Standards
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: "1. Global Industry Constants & Unit Standards",
              bold: true,
              size: 28,
              color: "1E3A8A",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "CottonCalc Pro implements the official historical benchmarks utilized across Indian Mandis and processing factories:",
            }),
          ],
        }),

        // Table for Constants
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("Variable Name", 25),
                createHeaderCell("Regional Name", 25),
                createHeaderCell("Numeric Value", 20),
                createHeaderCell("Description", 30),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("LINT_PER_CANDY", 25, true),
                createDataCell("1 Candy (કાનડી / खांडी)", 25),
                createDataCell("355.62 kg", 20, true, true),
                createDataCell("Net lint cotton weight per commercial candy.", 30),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("MAUND", 25, true),
                createDataCell("1 Maund (મણ / मन)", 25),
                createDataCell("20.00 kg", 20, true, true),
                createDataCell("Standard Mandi unit for Kapas & Cottonseed.", 30),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("ONE_TON", 25, true),
                createDataCell("1 Metric Ton (ટન / टन)", 25),
                createDataCell("1,000.00 kg", 20, true, true),
                createDataCell("Standard baseline lot for oil mill crushing.", 30),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("QUINTAL", 25, true),
                createDataCell("1 Quintal (ક્વિન્ટલ)", 25),
                createDataCell("100.00 kg", 20, true, true),
                createDataCell("Standard agricultural bulk trading unit.", 30),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("KHAL_BAG", 25, true),
                createDataCell("1 Bag (ગુણી / बोरी)", 25),
                createDataCell("50.00 kg", 20, true, true),
                createDataCell("Standard retail bag weight for Oil Cake.", 30),
              ],
            }),
          ],
        }),

        // Section 2: Ginning Module
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 120 },
          children: [
            new TextRun({
              text: "2. Module 1: Cotton Ginning Calculator",
              bold: true,
              size: 28,
              color: "1E3A8A",
            }),
          ],
        }),

        // Tab 1.1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "Tab 1.1: Cost Parity (Candy Cost of Production)",
              bold: true,
              size: 24,
              color: "0F766E",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Backend Function: calculateGinningParity(...)\nPurpose: Calculates the net manufacturing cost to produce 1 Candy (355.62 kg) of lint from raw Kapas.",
              italics: true,
            }),
          ],
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("Field Label", 22),
                createHeaderCell("Component Variable", 22),
                createHeaderCell("Dropdown (LOV) Options", 28),
                createHeaderCell("Internal Return Value", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Kapas Price", 22, true),
                createDataCell("kapasRate", 22),
                createDataCell("N/A (Direct Number Input)", 28),
                createDataCell("Raw Kapas purchase price in ₹", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Kapas Unit Dropdown", 22, true),
                createDataCell("kapasUnit", 22),
                createDataCell("Per 20 kg (20K) | Per 100 kg (100K)", 28),
                createDataCell("20 (for 20kg Maund) or 100 (for Quintal)", 28, true, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Seed Price", 22, true),
                createDataCell("seedRate", 22),
                createDataCell("N/A (Direct Number Input)", 28),
                createDataCell("Selling price of byproduct cottonseed in ₹", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Seed Unit Dropdown", 22, true),
                createDataCell("seedUnit", 22),
                createDataCell("Per 20 kg (20K) | Per 100 kg (100K)", 28),
                createDataCell("20 (for 20kg Maund) or 100 (for Quintal)", 28, true, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Ginning Expense", 22, true),
                createDataCell("expensePerMaund", 22),
                createDataCell("Fixed: Per Maund (20 kg)", 28),
                createDataCell("Denominator is fixed at 20 kg", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Expected GOT %", 22, true),
                createDataCell("expectedGot", 22),
                createDataCell("Default: 35.0%", 28),
                createDataCell("Lint Outturn percentage", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Expected Shortage %", 22, true),
                createDataCell("expectedShortage", 22),
                createDataCell("Default: 2.0%", 28),
                createDataCell("Moisture loss and trash percentage", 28),
              ],
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [
            new TextRun({ text: "Human-Readable Calculation Equations:", bold: true, color: "0F766E" }),
          ],
        }),
        ...createCodeBlock([
          "Step 1: seedPercentage = 100 - expectedGot - expectedShortage",
          "Step 2: requiredKapasKg = 355.62 / (expectedGot / 100)",
          "Step 3: generatedSeedKg = requiredKapasKg * (seedPercentage / 100)",
          "Step 4: costOfKapas = (requiredKapasKg / kapasUnit) * kapasRate",
          "Step 5: processingCost = (requiredKapasKg / 20) * expensePerMaund",
          "Step 6: recoveryFromSeed = (generatedSeedKg / seedUnit) * seedRate",
          "Step 7: netCandyCost = costOfKapas + processingCost - recoveryFromSeed",
          "Step 8: parityCost = Math.round(netCandyCost)",
        ]),

        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: "Worked Verification Example:", bold: true }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Inputs: kapasRate = 1500 (kapasUnit = 20), seedRate = 700 (seedUnit = 20), expensePerMaund = 150, expectedGot = 35.0%, expectedShortage = 2.0%\n" +
                "1. seedPercentage = 100 - 35 - 2 = 63.0%\n" +
                "2. requiredKapasKg = 355.62 / 0.35 = 1016.0571 kg\n" +
                "3. generatedSeedKg = 1016.0571 * 0.63 = 640.1160 kg\n" +
                "4. costOfKapas = (1016.0571 / 20) * 1500 = ₹ 76,204.29\n" +
                "5. processingCost = (1016.0571 / 20) * 150 = ₹ 7,620.43\n" +
                "6. recoveryFromSeed = (640.1160 / 20) * 700 = ₹ 22,404.06\n" +
                "7. netCandyCost = 76204.29 + 7620.43 - 22404.06 = ₹ 61,420.66\n" +
                "Result Displayed: ₹ 61,421 / Candy",
            }),
          ],
        }),

        // Tab 1.2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 260, after: 100 },
          children: [
            new TextRun({
              text: "Tab 1.2: Reverse Parity (Break-Even Kapas Purchase Rate)",
              bold: true,
              size: 24,
              color: "0F766E",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Backend Function: calculateReverseParity(...)\nPurpose: Determines the maximum rate a ginner can pay per 20 kg Maund of raw Kapas in the mandi to break even.",
              italics: true,
            }),
          ],
        }),
        ...createCodeBlock([
          "Baseline: Exactly 20 kg of Raw Kapas (1 Maund)",
          "Step 1: lintYieldKg = 20 * (revGot / 100)",
          "Step 2: seedYieldKg = 20 * ((100 - revGot - revShortage) / 100)",
          "Step 3: lintValue = (lintYieldKg / 355.62) * revLintPrice",
          "Step 4: seedValue = (seedYieldKg / revSeedUnit) * revSeedPrice",
          "Step 5: totalRealization = lintValue + seedValue",
          "Step 6: maxKapasRate = totalRealization - revExpense",
          "Step 7: revKapasRate = Math.round(maxKapasRate)",
        ]),
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: "Example: revLintPrice = 61421, revSeedPrice = 700 (revSeedUnit = 20), revExpense = 150, revGot = 35%, revShortage = 2%\n" +
                "Lint Value = (7.0 kg / 355.62) * 61421 = ₹ 1,209.01 | Seed Value = (12.6 kg / 20) * 700 = ₹ 441.00\n" +
                "Total Realization = ₹ 1,650.01 | Max Kapas Rate = 1650.01 - 150 = ₹ 1,500.01\n" +
                "Result Displayed: ₹ 1,500 / 20 kg Maund",
            }),
          ],
        }),

        // Tab 1.3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 260, after: 100 },
          children: [
            new TextRun({
              text: "Tab 1.3: Output Ratio (G.O.T. & Yield Distribution Analysis)",
              bold: true,
              size: 24,
              color: "0F766E",
            }),
          ],
        }),
        ...createCodeBlock([
          "Step 1: gotPercent = (lintWeight / inputWeight) * 100",
          "Step 2: seedPercent = (seedWeight / inputWeight) * 100",
          "Step 3: wastePercent = (wasteWeight / inputWeight) * 100",
          "Step 4: totalPercent = gotPercent + seedPercent + wastePercent",
          "Step 5: isBalanced = (Math.round(totalPercent) === 100)",
          "// showWarning = true if total does not equal 100%",
        ]),

        // Section 3: Oil Mill Module
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 120 },
          children: [
            new TextRun({
              text: "3. Module 2: Cottonseed Oil Mill Calculator",
              bold: true,
              size: 28,
              color: "1E3A8A",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Crushing Batch Standard: All calculations are anchored to exactly 1 Metric Ton (1,000 kg) of cottonseed crushed.",
              bold: true,
            }),
          ],
        }),

        // Tab 2.1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "Tab 2.1: Khal Cost Parity (Production Cost per Bag / Unit)",
              bold: true,
              size: 24,
              color: "C2410C",
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell("Field Label", 22),
                createHeaderCell("Component Variable", 22),
                createHeaderCell("Dropdown (LOV) Options", 28),
                createHeaderCell("Internal Return Value", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Seed Purchase Rate", 22, true),
                createDataCell("oilSeedBuyRate", 22),
                createDataCell("N/A (Direct Number Input)", 28),
                createDataCell("Rate paid for raw cottonseed in ₹", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Seed Buy Unit Dropdown", 22, true),
                createDataCell("oilSeedBuyUnit", 22),
                createDataCell("Per 20 kg (20K) | Per 100 kg (100K) | Per Ton (TON)", 28),
                createDataCell("20, 100, or 1000 (scaled via 1000/unit)", 28, true, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Oil Selling Rate", 22, true),
                createDataCell("oilSellRate", 22),
                createDataCell("N/A (Direct Number Input)", 28),
                createDataCell("Selling price of Wash Oil in ₹", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Oil Sell Unit Dropdown", 22, true),
                createDataCell("oilSellUnit", 22),
                createDataCell("Per 10 kg (10K) | Per 1 kg (1K) | Per 15 kg (15K)", 28),
                createDataCell("10, 1, or 15 (divisor for oil sales)", 28, true, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Processing Expense", 22, true),
                createDataCell("oilExpense", 22),
                createDataCell("N/A (Direct Number Input)", 28),
                createDataCell("Milling & expeller charges in ₹", 28),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Expense Unit Dropdown", 22, true),
                createDataCell("oilExpenseUnit", 22),
                createDataCell("Per 20 kg (20K) | Per Ton (TON)", 28),
                createDataCell("20 (scaled via 1000/20) or 1000", 28, true, true),
              ],
            }),
            new TableRow({
              children: [
                createDataCell("Show Cost Per Dropdown", 22, true),
                createDataCell("cakeSellUnit", 22),
                createDataCell("Per 50 kg Bag (BAG) | Per 20 kg | Per 100 kg | Per 1 kg", 28),
                createDataCell("50, 20, 100, or 1 (final multiplier)", 28, true, true),
              ],
            }),
          ],
        }),

        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [
            new TextRun({ text: "Human-Readable Calculation Equations:", bold: true, color: "C2410C" }),
          ],
        }),
        ...createCodeBlock([
          "Processing Batch: Exactly 1,000 kg (1 Metric Ton) of Cottonseed",
          "Step 1: costOfSeed = (1000 / oilSeedBuyUnit) * oilSeedBuyRate",
          "Step 2: costProcessing = (1000 / oilExpenseUnit) * oilExpense",
          "Step 3: totalCost = costOfSeed + costProcessing",
          "Step 4: oilYieldKg = 1000 * (oilRecoveryPercent / 100)",
          "Step 5: cakeYieldKg = 1000 * (cakeRecoveryPercent / 100)",
          "Step 6: revenueOil = (oilYieldKg / oilSellUnit) * oilSellRate",
          "Step 7: remainingCost = totalCost - revenueOil",
          "Step 8: costPerKgCake = remainingCost / cakeYieldKg",
          "Step 9: costPerUnitCake = costPerKgCake * cakeSellUnit",
          "Step 10: khalParityCost = Math.round(costPerUnitCake)",
        ]),
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: "Example: Seed ₹700/20kg, Expense ₹30/20kg, Oil ₹1200/10kg (12% yield = 120kg), Cake 84% yield = 840kg, Unit = 50kg Bag\n" +
                "1. costOfSeed = (1000/20)*700 = ₹ 35,000 | costProcessing = (1000/20)*30 = ₹ 1,500 | totalCost = ₹ 36,500\n" +
                "2. revenueOil = (120/10)*1200 = ₹ 14,400\n" +
                "3. remainingCost = 36500 - 14400 = ₹ 22,100\n" +
                "4. costPerKgCake = 22100 / 840 = ₹ 26.3095 / kg\n" +
                "5. costPerUnitCake = 26.3095 * 50 = ₹ 1,315.48\n" +
                "Result Displayed: ₹ 1,315 / 50 kg Bag",
            }),
          ],
        }),

        // Tab 2.2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 260, after: 100 },
          children: [
            new TextRun({
              text: "Tab 2.2: Crushing Profit & Loss (Margin per Ton)",
              bold: true,
              size: 24,
              color: "C2410C",
            }),
          ],
        }),
        ...createCodeBlock([
          "Processing Batch: Exactly 1,000 kg (1 Metric Ton) of Cottonseed",
          "Step 1: totalCost = ((1000 / oilSeedBuyUnit) * oilSeedBuyRate) + ((1000 / oilExpenseUnit) * oilExpense)",
          "Step 2: oilYieldKg = 1000 * (oilRecoveryPercent / 100)",
          "Step 3: cakeYieldKg = 1000 * (cakeRecoveryPercent / 100)",
          "Step 4: revenueOil = (oilYieldKg / oilSellUnit) * oilSellRate",
          "Step 5: revenueCake = (cakeYieldKg / cakeSellUnit) * cakeSellRate",
          "Step 6: totalRevenue = revenueOil + revenueCake",
          "Step 7: netProfitOrLoss = totalRevenue - totalCost",
          "Step 8: oilProfit = Math.round(netProfitOrLoss)",
          "// Status: If oilProfit >= 0: PROFIT (Green) | If oilProfit < 0: LOSS (Red)",
        ]),
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: "Example: Seed ₹700/20kg (Total ₹35,000), Exp ₹30/20kg (Total ₹1,500) -> totalCost = ₹36,500\n" +
                "Oil 12% (120kg) @ ₹1200/10kg = ₹14,400 | Cake 84% (840kg) @ ₹1800/50kg = ₹30,240 -> totalRevenue = ₹44,640\n" +
                "netProfit = 44640 - 36500 = +₹ 8,140\n" +
                "Result Displayed: ₹ +8,140 / Ton (Profitable)",
            }),
          ],
        }),

        // Tab 2.3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 260, after: 100 },
          children: [
            new TextRun({
              text: "Tab 2.3: Oil Mill Recovery (Physical Yield Breakdown)",
              bold: true,
              size: 24,
              color: "C2410C",
            }),
          ],
        }),
        ...createCodeBlock([
          "Step 1: wastePercent = 100 - oilRecoveryPercent - cakeRecoveryPercent",
          "Step 2: oilYieldKg = oilInputSeed * (oilRecoveryPercent / 100)",
          "Step 3: cakeYieldKg = oilInputSeed * (cakeRecoveryPercent / 100)",
          "Step 4: wasteYieldKg = oilInputSeed * (wastePercent / 100)",
        ]),
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            new TextRun({
              text: "Example: 1000 kg input seed, Oil 12%, Cake 84% -> Waste = 4%\n" +
                "Oil = 120.0 kg (12%) | Cake = 840.0 kg (84%) | Waste = 40.0 kg (4%)",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("CottonCalc_Pro_Calculation_Specification.docx", buffer);
  console.log("Successfully generated CottonCalc_Pro_Calculation_Specification.docx!");
});
