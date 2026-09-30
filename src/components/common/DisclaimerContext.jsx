import React, { createContext, useContext, useState, useEffect } from 'react';

const DisclaimerContext = createContext();

const TERMS_VERSION_KEY = 'cotton_calc_terms_accepted_app_version';
const TERMS_DATE_KEY = 'cotton_calc_terms_accepted_date';
const DEFAULT_VERSION = '1.0.0';

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
    const initializeTermsStatus = async () => {
      let currentVer = DEFAULT_VERSION;

      // 1. Fetch current version from version.json
      try {
        const res = await fetch(`/version.json?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache, no-store' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.version) {
            currentVer = String(data.version);
            setAppVersion(currentVer);
          }
        }
      } catch (err) {
        // Fallback to local stored app version if available
        try {
          const localVer = localStorage.getItem('cotton_calc_version');
          if (localVer) {
            currentVer = localVer;
            setAppVersion(localVer);
          }
        } catch {
          // Ignore
        }
      }

      // 2. Check if user has accepted terms for this current version
      try {
        let storedDate = localStorage.getItem(TERMS_DATE_KEY);

        // If storedDate exists but doesn't have time (e.g. from previous date-only format), upgrade it with time
        if (storedDate && !storedDate.includes(':')) {
          try {
            const upgraded = `${storedDate}, ${new Date().toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}`;
            storedDate = upgraded;
            localStorage.setItem(TERMS_DATE_KEY, upgraded);
          } catch {
            // Ignore
          }
        }

        if (storedDate) {
          setAcceptedDate(storedDate);
        }

        if (!acceptedVer) {
          // First-time user: never accepted
          setIsGateOpen(true);
          setIsUpdatedTerms(false);
          setHasAccepted(false);
        } else if (acceptedVer !== currentVer) {
          // Returning user, but app has been updated to a new version!
          setIsGateOpen(true);
          setIsUpdatedTerms(true);
          setHasAccepted(false);
        } else {
          // Already accepted current version
          setIsGateOpen(false);
          setIsUpdatedTerms(false);
          setHasAccepted(true);
        }
      } catch {
        setIsGateOpen(true);
      }
    };

    initializeTermsStatus();
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
    try {
      localStorage.setItem(TERMS_VERSION_KEY, appVersion);
      localStorage.setItem(TERMS_DATE_KEY, formattedDateTime);
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
