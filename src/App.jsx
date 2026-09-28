import React, { useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { PwaProvider } from './pwa/PwaContext';
import AppLayout from './components/layout/AppLayout';
import HomeScreen from './components/home/HomeScreen';
import GinningCalculator from './components/ginning/GinningCalculator';
import OilMillCalculator from './components/oil/OilMillCalculator';
import SettingsPage from './components/settings/SettingsPage';

function AppContent() {
  // Navigation view: 'home' | 'ginning' | 'oil' | 'settings'
  const [currentView, setCurrentView] = useState('home');

  return (
    <AppLayout currentView={currentView} onSelectView={setCurrentView}>
      {currentView === 'home' && <HomeScreen onSelectView={setCurrentView} />}
      {currentView === 'ginning' && <GinningCalculator />}
      {currentView === 'oil' && <OilMillCalculator />}
      {currentView === 'settings' && <SettingsPage />}
    </AppLayout>
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
