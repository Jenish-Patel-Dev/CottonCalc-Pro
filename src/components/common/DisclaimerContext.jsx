import React, { createContext, useContext, useState, useEffect } from 'react';

const DisclaimerContext = createContext();

// Storage keys
const APP_TERMS_ACCEPTED_KEY = 'cotton_calc_app_installed_terms_accepted';
const WEB_TERMS_ACCEPTED_KEY = 'cotton_calc_web_terms_accepted_session';
const TERMS_DATE_KEY = 'cotton_calc_terms_accepted_date';
const DEFAULT_VERSION = '1.0.0';

/**
 * Detects whether the app is running as an installed PWA / Standalone application
 * or as a normal website in a browser tab.
 */
export const isStandaloneApp = () => {
  try {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
    );
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
    const checkTermsStatus = async () => {
      const isApp = isStandaloneApp();

      // Read or load current version for settings display
      try {
        const savedVer = localStorage.getItem('cotton_calc_version');
        if (savedVer) {
          setAppVersion(savedVer);
        }
        const res = await fetch(`/version.json?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache, no-store' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.version) {
            setAppVersion(String(data.version));
          }
        }
      } catch {
        // Ignore offline / network errors
      }

      // Read stored acceptance timestamp if present
      try {
        const storedDate = localStorage.getItem(TERMS_DATE_KEY);
        if (storedDate) {
          setAcceptedDate(storedDate);
        }
      } catch {}

      if (isApp) {
        // ===================================================================
        // 1. INSTALLED APPLICATION (PWA / Standalone App)
        // Rule: Show popup ONLY on the first time open after installation!
        // Closing and reopening the app will NEVER show the popup again.
        // If the user deletes/uninstalls the app and reinstalls,
        // the OS/browser clears local storage, so it will show on first launch again.
        // ===================================================================
        try {
          let appAccepted = localStorage.getItem(APP_TERMS_ACCEPTED_KEY);

          // Backward compatibility migration if already accepted previously
          if (!appAccepted && localStorage.getItem('cotton_calc_terms_accepted_app_version')) {
            localStorage.setItem(APP_TERMS_ACCEPTED_KEY, 'true');
            appAccepted = 'true';
          }

          if (appAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
          } else {
            // First time launch after installing the app on this device
            setIsGateOpen(true);
            setHasAccepted(false);
          }
        } catch {
          setIsGateOpen(true);
        }
      } else {
        // ===================================================================
        // 2. WEBSITE (Regular Browser Tab Mode)
        // Rule: Every time user opens the website in the browser, popup appears.
        // Tracked via sessionStorage for the active session/tab.
        // ===================================================================
        try {
          const webAccepted = sessionStorage.getItem(WEB_TERMS_ACCEPTED_KEY);
          if (webAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
          } else {
            // Every fresh website visit / opened tab
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
        // Installed App: Permanently saved in localStorage
        localStorage.setItem(APP_TERMS_ACCEPTED_KEY, 'true');
        localStorage.setItem(TERMS_DATE_KEY, formattedDateTime);
      } else {
        // Website: Saved in sessionStorage for the active browser session
        sessionStorage.setItem(WEB_TERMS_ACCEPTED_KEY, 'true');
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
