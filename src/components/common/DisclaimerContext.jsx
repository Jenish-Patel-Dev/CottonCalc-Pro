import React, { createContext, useContext, useState, useEffect } from 'react';

const DisclaimerContext = createContext();

// Clean, independent storage keys
const PWA_INSTALLED_TERMS_KEY = 'cotton_calc_pwa_standalone_accepted_v1';
const WEB_TERMS_SESSION_KEY = 'cotton_calc_web_terms_session_v1';
const TERMS_DATE_KEY = 'cotton_calc_terms_accepted_date';
const DEFAULT_VERSION = '1.0.0';

/**
 * Detects whether the app is currently running as an installed PWA / Standalone app
 */
export const isStandaloneApp = () => {
  try {
    const isDisplayStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches;
    const isIosStandalone = window.navigator.standalone === true;
    const isAndroidApp = document.referrer.includes('android-app://');
    const isUrlPwa =
      window.location.search.includes('mode=pwa') ||
      window.location.search.includes('source=pwa');

    return Boolean(isDisplayStandalone || isIosStandalone || isAndroidApp || isUrlPwa);
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
        // Independent from website! Even if user accepted on website,
        // the installed app MUST ask once when opened for the first time.
        // Once accepted inside the app, closing & reopening NEVER asks again.
        // If deleted and reinstalled, storage is reset by OS -> asks on first open.
        // ===================================================================
        try {
          const appAccepted = localStorage.getItem(PWA_INSTALLED_TERMS_KEY);
          if (appAccepted === 'true') {
            setIsGateOpen(false);
            setHasAccepted(true);
          } else {
            // First time launching the installed app
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
            // Fresh open in browser
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
        // Only set the PWA key when user accepts INSIDE the installed app!
        localStorage.setItem(PWA_INSTALLED_TERMS_KEY, 'true');
        localStorage.setItem(TERMS_DATE_KEY, formattedDateTime);
      } else {
        // On website: only set sessionStorage for current website visit!
        // NEVER set PWA_INSTALLED_TERMS_KEY here, so installed app will always ask on its first open.
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
