import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { PwaProvider } from './pwa/PwaContext';
import AppLayout from './components/layout/AppLayout';
import HomeScreen from './components/home/HomeScreen';
import GinningCalculator from './components/ginning/GinningCalculator';
import OilMillCalculator from './components/oil/OilMillCalculator';
import SettingsPage from './components/settings/SettingsPage';
import SplashScreen from './components/common/SplashScreen';

function AppContent() {
  // Navigation view: 'home' | 'ginning' | 'oil' | 'settings'
  const [currentView, setCurrentView] = useState('home');
  const [ginningTab, setGinningTab] = useState('parity');
  const [oilMode, setOilMode] = useState('khal_parity');
  const [showSplash, setShowSplash] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSelectView = (view, tab) => {
    if (view === 'ginning') {
      setGinningTab(tab || 'parity');
    } else if (view === 'oil') {
      setOilMode(tab || 'khal_parity');
    }
    setCurrentView(view);
  };

  useEffect(() => {
    // Show splash on initial load and page refresh, then smoothly fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 550);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 850);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && <SplashScreen isFadingOut={isFadingOut} />}
      <AppLayout currentView={currentView} onSelectView={handleSelectView}>
        {currentView === 'home' && <HomeScreen onSelectView={handleSelectView} />}
        {currentView === 'ginning' && (
          <GinningCalculator activeTab={ginningTab} onTabChange={setGinningTab} />
        )}
        {currentView === 'oil' && (
          <OilMillCalculator activeTab={oilMode} onTabChange={setOilMode} />
        )}
        {currentView === 'settings' && <SettingsPage />}
      </AppLayout>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PwaProvider>
          <AppContent />
        </PwaProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
