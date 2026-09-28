# Ginning Master - Progressive Web Application (PWA)
### Professional Cotton Ginning & Cottonseed Oil Mill Calculator

A production-ready Progressive Web Application (PWA) engineered for Cotton Ginners, Commodity Traders, and Cottonseed Oil Mill Processors. Built with modern React, Tailwind CSS, an extensible i18n localization engine (English, Hindi, Gujarati), and a design-token-based Theme System (System, Light, Dark).

---

## 🌟 Key Application Features

### 1. Progressive Web App (PWA) Capabilities
- **Installable Desktop & Mobile App**: Can be installed directly from modern browsers (Chrome, Edge, Safari, Firefox, Android, iOS, Windows, macOS).
- **Standalone App Experience**: Launches without browser URL bars or navigation clutter when installed (`display: standalone`).
- **PWA Manifest & Metadata**: Complete `manifest.webmanifest` configuration with 192x192, 512x512, and maskable icons.
- **Service Worker & Offline Shell**: `public/sw.js` caches application shell and assets; includes live offline banner notification when network connection drops.
- **Auto-Update Cycle**: Prompts user with a non-intrusive banner (`New version available. Reload to update.`) when a new build is deployed.
- **Platform-Specific Install Modal**: Step-by-step guidance for iOS Safari ("Share > Add to Home Screen") and Android/Desktop browsers.

### 2. Multi-Device Layout (Desktop & Mobile)
- **Desktop (1024px+)**:
  - Collapsible Sidebar with navigation items, status badges, and tooltips.
  - Sticky Top Header with Breadcrumbs, Language dropdown, Theme switcher, and Install button.
- **Mobile (320px - 767px) & Tablet (768px - 1023px)**:
  - Mobile App Bar with back navigation and view titles.
  - Fixed Bottom Navigation Bar with touch targets $\ge 44\text{px}$ and safe area padding (`pwa-safe-bottom`).

### 3. Theme System (Light, Dark, System)
- Design tokens via CSS variables (`--bg-app`, `--bg-surface`, `--text-main`, `--text-muted`, `--border-color`, etc.).
- Three user modes:
  - ☀ **Light Mode**
  - 🌙 **Dark Mode**
  - 💻 **System Mode** (automatically synchronizes with OS preference via `matchMedia`).
- Persisted across sessions in `localStorage`.

### 4. Multilingual Support (i18n)
- 100% translated user interface with instant switching without page reload:
  - 🇬🇧 **English**
  - 🇮🇳 **हिन्दी (Hindi)**
  - 🇮🇳 **ગુજરાતી (Gujarati)**
- Industry-accurate regional terminology (Kapas, Candy/Khandi, Maund/Man, Khal/Khol, GOT, Wash Oil).
- Persisted across sessions in `localStorage`.

### 5. Settings Page
- **Appearance**: Visual radio cards to toggle between System, Light, and Dark themes.
- **Language**: One-tap selection of English, Hindi, or Gujarati.
- **PWA & Installation**: Live detection of Standalone Mode vs Browser Mode with install triggers and manual guidance.
- **About & Standards**: Application version, purpose, and standard trade conversion matrix (1 Candy = 356 kg Lint, 1 Maund = 20 kg, 1 Quintal = 100 kg, 1 Ton = 1000 kg).
- **Data & Storage**: "Reset Preferences" button to revert customized UI settings.

### 6. Calculations & Business Logic (100% Preserved)
- **Ginning Output Ratio**: Sample (`g`) and Bulk (`kg`) test analysis with dynamic conic-gradient donut chart.
- **Cost Parity (Production Cost per Candy)**: Net cost per 356kg lint after seed realization and ginning expenses.
- **Reverse Parity (Max Purchase Rate)**: Break-even buying rate per 20kg maund of Kapas.
- **Oil Mill Recovery**: Output breakdown in kg and percentages for Wash Oil, Oil Cake (Khal), and Waste.
- **Crushing Profit & Loss**: Net profit or loss per Ton of cottonseed crushed with color-coded profit badge.
- **Khal Cost Parity**: Manufacturing cost of oil cake per customizable unit (50kg bag, 20kg, 100kg, 1kg).

---

## 📁 Project Structure

```
Cotton Ginning Calculator/
├── public/
│   ├── favicon.svg                 # SVG application icon
│   ├── icon-192.png                # Standard 192x192 PWA icon
│   ├── icon-512.png                # Standard 512x512 PWA icon
│   ├── icon-maskable-192.png       # Maskable 192x192 icon
│   ├── icon-maskable-512.png       # Maskable 512x512 icon
│   ├── apple-touch-icon.png        # iOS Safari touch icon
│   ├── manifest.webmanifest        # PWA configuration manifest
│   └── sw.js                       # Service worker caching and offline handler
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Footer.jsx          # Trade units & disclaimer footer
│   │   │   └── Icons.jsx           # SVG icon components
│   │   ├── ginning/
│   │   │   ├── GinningCalculator.jsx   # Tab container for ginning workflows
│   │   │   ├── OutputRatioTab.jsx      # GOT ratio & conic donut chart
│   │   │   ├── ParityTab.jsx           # Production cost per Candy parity
│   │   │   └── ReverseParityTab.jsx    # Reverse break-even Kapas rate
│   │   ├── home/
│   │   │   └── HomeScreen.jsx      # Gateway cards & market tip
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx       # Multi-platform layout manager
│   │   │   ├── Header.jsx          # Top application bar
│   │   │   ├── MobileNavigation.jsx # Fixed mobile bottom navigation
│   │   │   └── Sidebar.jsx         # Collapsible desktop sidebar
│   │   ├── oil/
│   │   │   ├── KhalParityTab.jsx   # Khal cost of production
│   │   │   ├── OilMillCalculator.jsx # Tab container for oil mill
│   │   │   ├── OilProfitTab.jsx    # Crushing profit/loss per Ton
│   │   │   └── OilRecoveryTab.jsx  # Recovery kg & % breakdown
│   │   └── settings/
│   │       └── SettingsPage.jsx    # Appearance, language, and PWA settings
│   ├── i18n/
│   │   ├── en.json                 # English dictionary
│   │   ├── gu.json                 # Gujarati dictionary
│   │   ├── hi.json                 # Hindi dictionary
│   │   └── LanguageContext.jsx     # i18n provider & useTranslation hook
│   ├── pwa/
│   │   ├── InstallModal.jsx        # Platform-specific install guidance
│   │   ├── OfflineBanner.jsx       # Network disconnection alert
│   │   ├── PwaContext.jsx          # PWA installation & status state
│   │   └── UpdateBanner.jsx        # Service worker update banner
│   ├── theme/
│   │   ├── theme.css               # Design tokens (light / dark)
│   │   └── ThemeContext.jsx        # Theme provider & useTheme hook
│   ├── utils/
│   │   ├── calculations.js         # Pure business logic & formulas
│   │   └── formatting.js           # Currency and number formatting
│   ├── App.jsx                     # Root application coordinator
│   ├── index.css                   # Global stylesheet
│   └── main.jsx                    # Application bootstrap & SW registration
├── generate-pwa-icons.js           # Icon generation script
├── index.html                      # PWA meta tags & HTML template
├── package.json                    # Project configuration & dependencies
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind configuration with darkMode
├── test-calculations.js            # Automated mathematical verification suite
└── vite.config.js                  # Vite build tooling
```

---

## 🛠️ How to Run and Test

### 1. Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Verify Mathematical Parity
```bash
node test-calculations.js
```
Runs the automated verification suite confirming exact numerical match across all formulas.

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build (with Service Worker & PWA)
```bash
npm run preview
```

---

## 📱 How to Install the Application

- **Desktop (Chrome / Edge / Brave)**: Click the **Install** button in the top navigation header or click the install icon in the browser address bar.
- **Android (Chrome)**: Tap the **Install Application** button or open the Chrome menu (⋮) and tap **Add to Home screen**.
- **iOS (Safari)**: Tap the **Share** button at the bottom of Safari, scroll down, and select **Add to Home Screen**.
