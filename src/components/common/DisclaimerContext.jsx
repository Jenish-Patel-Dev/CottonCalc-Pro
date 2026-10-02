import React, { createContext, useContext, useState, useEffect } from 'react';

const DisclaimerContext = createContext();

// Storage keys - isolated per environment
const PWA_TERMS_ACCEPTED_KEY = 'cotton_calc_pwa_accepted_v4';
const WEB_TERMS_SESSION_KEY = 'cotton_calc_web_accepted_v4';
const TERMS_DATE_KEY = 'cotton_calc_terms_accepted_date_v4';
const DEFAULT_VERSION = '1.0.0';

/**
 * Detects whether the application is running in an installed PWA (Standalone) container
 * or as a website in a regular browser tab.
 * 
 * Strict detection: Only returns true for actual standalone PWA mode.
 * Never checks minimal-ui or fullscreen so regular mobile browsers are NEVER confused with PWA.
 */
export const isStandaloneApp = () => {
  try {
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
  const [acceptedDate, setAcceptedDate] = useState(() => {
    try {
      return localStorage.getItem(TERMS_DATE_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    // Clean up any legacy test keys so they never interfere
    try {
      localStorage.removeItem('cotton_calc_app_installed_terms_accepted');
      localStorage.removeItem('cotton_calc_terms_accepted_app_version');
      localStorage.removeItem('cotton_calc_pwa_standalone_accepted_v1');
    } catch {}

    const checkTermsStatus = () => {
      const isApp = isStandaloneApp();

      // Read stored app version for display in Settings
      try {
        const localVer = localStorage.getItem('cotton_calc_version');
        if (localVer) setAppVersion(localVer);
      } catch {}

      // Read stored acceptance timestamp if any
      try {
        const storedDate = localStorage.getItem(TERMS_DATE_KEY);
        if (storedDate) {
          setAcceptedDate(storedDate);
        }
      } catch {}

      if (isApp) {
        // ===================================================================
        // 1. INSTALLED APPLICATION (PWA / Standalone App)
        // Independent from website! Even if accepted on website,
        // the installed app MUST ask once when opened for the first time.
        // Once accepted inside the app, closing & reopening NEVER asks again.
        // If deleted and reinstalled, storage is reset by OS -> asks on first open.
        // ===================================================================
        try {
          const appAccepted = localStorage.getItem(PWA_TERMS_ACCEPTED_KEY);
          if (appAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
          } else {
            // First time opening the installed PWA
            setIsGateOpen(true);
            setHasAccepted(false);
          }
        } catch {
          setIsGateOpen(true);
        }
      } else {
        // ===================================================================
        // 2. WEBSITE (Browser Tab Mode)
        // Every time user opens the website in browser, popup must appear!
        // Scoped strictly to sessionStorage for the active session.
        // ===================================================================
        try {
          const webAccepted = sessionStorage.getItem(WEB_TERMS_SESSION_KEY);
          if (webAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
          } else {
            // Fresh website open / new session
            setIsGateOpen(true);
            setHasAccepted(false);
          }
        } catch {
          setIsGateOpen(true);
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
        // User accepted INSIDE the installed app:
        // Permanently record in localStorage for PWA
        localStorage.setItem(PWA_TERMS_ACCEPTED_KEY, 'true');
        localStorage.setItem(TERMS_DATE_KEY, formattedDateTime);
      } else {
        // User accepted on the WEBSITE:
        // ONLY set sessionStorage for this browser tab session!
        // NEVER touch PWA_TERMS_ACCEPTED_KEY so installed app will always ask on its first open.
        sessionStorage.setItem(WEB_TERMS_SESSION_KEY, 'true');
        localStorage.setItem(TERMS_DATE_KEY, formattedDateTime);
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
