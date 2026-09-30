import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import OfflineBanner from '../../pwa/OfflineBanner';
import UpdateBanner from '../../pwa/UpdateBanner';
import InstallModal from '../../pwa/InstallModal';
import UpdateModal from '../../pwa/UpdateModal';
import DisclaimerModal from '../common/DisclaimerModal';

const SIDEBAR_STORAGE_KEY = 'cotton_calc_sidebar_collapsed';

export const AppLayout = ({ currentView, onSelectView, children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Always reset scroll to top when switching views/pages on all screen sizes
  useEffect(() => {
    const el = document.getElementById('main-content-scroll');
    if (el) el.scrollTop = 0;
  }, [currentView]);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      } catch (e) {
        console.warn('Could not save sidebar state', e);
      }
      return next;
    });
  };

  return (
    <div
      className={`app-shell app ${isSidebarCollapsed ? 'collapsed col' : ''} ${
        currentView === 'home' ? 'home-view home' : ''
      }`}
      id="app"
    >
      {/* Desktop Indigo Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={onSelectView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main Connected Frame Area */}
      <div className="main">
        {/* Network & Update Status Alerts */}
        <OfflineBanner />
        <UpdateBanner />

        {/* Top Header Bar */}
        <Header
          currentView={currentView}
          onNavigateHome={() => onSelectView('home')}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleCollapse}
        />

        {/* Scrollable View Area */}
        <main className="view" id="main-content-scroll">
          <div className="wrap">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tabbar */}
      <MobileNavigation
        currentView={currentView}
        onSelectView={onSelectView}
      />

      {/* PWA Installation Guidance Modal */}
      <InstallModal />

      {/* PWA Direct Instant Update Modal */}
      <UpdateModal />

      {/* Global Legal Disclaimer Modal */}
      <DisclaimerModal />
    </div>
  );
};

export default AppLayout;
