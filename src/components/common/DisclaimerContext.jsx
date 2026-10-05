import React, { createContext, useContext, useState, useEffect } from 'react';

const DisclaimerContext = createContext();

// Strictly isolated keys per environment
export const PWA_ACCEPTED_KEY = 'cotton_calc_pwa_accepted_v5';
export const PWA_DATE_KEY = 'cotton_calc_pwa_date_v5';

export const WEB_ACCEPTED_KEY = 'cotton_calc_web_session_accepted_v5';
export const WEB_DATE_KEY = 'cotton_calc_web_session_date_v5';

const DEFAULT_VERSION = '1.0.0';

/**
 * Strict Standalone PWA detection:
 * Returns true ONLY when actually running inside an installed PWA window.
 * Returns false when running in a standard browser tab.
 */
export const isStandaloneApp = () => {
  try {
    // 0. Native Capacitor Android / iOS App container
    if (typeof window !== 'undefined' && window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform()) {
      return true;
    }
    // 1. Explicit start_url query param set in manifest.webmanifest
    if (window.location.search && (window.location.search.includes('mode=pwa') || window.location.search.includes('source=pwa'))) {
      return true;
    }
    // 2. iOS Safari Add-to-Home-Screen standalone mode
    if (window.navigator.standalone === true) {
      return true;
    }
    // 3. Android WebAPK launch referrer
    if (document.referrer && document.referrer.includes('android-app://')) {
      return true;
    }
    // 4. Standard W3C standalone display mode (Desktop Chrome / Android WebAPK)
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const DisclaimerProvider = ({ children }) => {
  const [appVersion, setAppVersion] = useState(DEFAULT_VERSION);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isUpdatedTerms, setIsUpdatedTerms] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [acceptedDate, setAcceptedDate] = useState('');

  // 1. Listen for new app installation events to guarantee fresh install state
  useEffect(() => {
    const handleAppInstalled = () => {
      try {
        localStorage.removeItem(PWA_ACCEPTED_KEY);
        localStorage.removeItem(PWA_DATE_KEY);
      } catch (e) {
        console.warn('Could not reset PWA terms on install', e);
      }
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);

  // 2. Check terms status for the active environment (PWA vs Website)
  useEffect(() => {
    // Wipe all previous legacy test keys so they never contaminate storage
    try {
      localStorage.removeItem('cotton_calc_app_installed_terms_accepted');
      localStorage.removeItem('cotton_calc_terms_accepted_app_version');
      localStorage.removeItem('cotton_calc_pwa_standalone_accepted_v1');
      localStorage.removeItem('cotton_calc_pwa_accepted_v4');
      localStorage.removeItem('cotton_calc_terms_accepted_date');
      localStorage.removeItem('cotton_calc_terms_accepted_date_v4');
    } catch {}

    const checkTermsStatus = () => {
      const isApp = isStandaloneApp();

      // Read stored app version for display in Settings
      try {
        const localVer = localStorage.getItem('cotton_calc_version');
        if (localVer) setAppVersion(localVer);
      } catch {}

      if (isApp) {
        // ===================================================================
        // 1. INSTALLED PWA MODE
        // Uses ONLY localStorage. Never touches sessionStorage.
        // ===================================================================
        try {
          const appAccepted = localStorage.getItem(PWA_ACCEPTED_KEY);
          const appDate = localStorage.getItem(PWA_DATE_KEY) || '';

          if (appAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
            setAcceptedDate(appDate);
          } else {
            // First time launching this installed app!
            setIsGateOpen(true);
            setHasAccepted(false);
            setAcceptedDate('');
          }
        } catch {
          setIsGateOpen(true);
          setHasAccepted(false);
          setAcceptedDate('');
        }
      } else {
        // ===================================================================
        // 2. WEBSITE (BROWSER TAB) MODE
        // Uses ONLY sessionStorage. Never touches localStorage!
        // Every time user opens the website in browser, popup must appear.
        // ===================================================================
        try {
          const webAccepted = sessionStorage.getItem(WEB_ACCEPTED_KEY);
          const webDate = sessionStorage.getItem(WEB_DATE_KEY) || '';

          if (webAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
            setAcceptedDate(webDate);
          } else {
            // Fresh open of website in browser
            setIsGateOpen(true);
            setHasAccepted(false);
            setAcceptedDate('');
          }
        } catch {
          setIsGateOpen(true);
          setHasAccepted(false);
          setAcceptedDate('');
        }
      }
    };

    checkTermsStatus();
  }, []);

  const acceptTerms = () => {
    const formattedDateTime = new Date().toLocaleString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const isApp = isStandaloneApp();

    try {
      if (isApp) {
        // ===================================================================
        // User accepted INSIDE the installed PWA:
        // Save permanently in localStorage so closing & reopening never asks.
        // ===================================================================
        localStorage.setItem(PWA_ACCEPTED_KEY, 'true');
        localStorage.setItem(PWA_DATE_KEY, formattedDateTime);
      } else {
        // ===================================================================
        // User accepted on the WEBSITE in browser:
        // Save ONLY in sessionStorage for active browser session!
        // NEVER touch localStorage, so installed app will always ask on its first open.
        // ===================================================================
        sessionStorage.setItem(WEB_ACCEPTED_KEY, 'true');
        sessionStorage.setItem(WEB_DATE_KEY, formattedDateTime);
      }
    } catch (e) {
      console.warn('Could not save terms acceptance', e);
    }

    setAcceptedDate(formattedDateTime);
    setHasAccepted(true);
    setIsGateOpen(false);
    setIsUpdatedTerms(false);
  };

  const openReview = () => setIsReviewOpen(true);
  const closeReview = () => setIsReviewOpen(false);

  return (
    <DisclaimerContext.Provider
      value={{
        appVersion,
        isGateOpen,
        isReviewOpen,
        isUpdatedTerms,
        hasAccepted,
        acceptedDate,
        acceptTerms,
        openReview,
        closeReview,
      }}
    >
      {children}
    </DisclaimerContext.Provider>
  );
};

export const useDisclaimer = () => {
  const context = useContext(DisclaimerContext);
  if (!context) {
    throw new Error('useDisclaimer must be used within a DisclaimerProvider');
  }
  return context;
};

export default DisclaimerContext;
