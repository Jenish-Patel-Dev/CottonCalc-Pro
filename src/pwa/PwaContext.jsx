import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const PwaContext = createContext();

export const PwaProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [registration, setRegistration] = useState(null);
  const registrationRef = useRef(null);

  // Detect platform
  const getPlatform = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMac = /macintosh|mac os x/.test(userAgent);
    const isWindows = /windows/.test(userAgent);

    if (isIos) return 'ios';
    if (isAndroid) return 'android';
    if (isMac) return 'mac';
    if (isWindows) return 'windows';
    return 'desktop';
  };

  const [platform] = useState(getPlatform);

  // Proactive version check function
  const checkForAppUpdate = async () => {
    // 1. Trigger Service Worker update check
    if (registrationRef.current) {
      try {
        await registrationRef.current.update();
        if (registrationRef.current.waiting) {
          setNeedRefresh(true);
          return;
        }
      } catch (e) {
        // Ignore network errors in background
      }
    }

    // 2. Fetch version.json with cache-busting to verify server version
    try {
      const res = await fetch(`/version.json?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache, no-store' },
      });
      if (res.ok) {
        const data = await res.json();
        const savedVersion = localStorage.getItem('cotton_calc_version');
        if (savedVersion && data.version && savedVersion !== data.version) {
          console.log('[PWA] New version detected on server:', data.version, 'Local:', savedVersion);
          setNeedRefresh(true);
        } else if (!savedVersion && data.version) {
          localStorage.setItem('cotton_calc_version', data.version);
        }
      }
    } catch (e) {
      // Offline or network error
    }
  };

  useEffect(() => {
    // Check if running in standalone mode (already installed app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      setIsInstalled(true);
      setIsInstallable(false);
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Capture appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    // Online / Offline listeners
    const handleOnline = () => {
      setIsOffline(false);
      checkForAppUpdate();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Capture update available event from main.jsx
    const handleSwUpdate = (e) => {
      console.log('[PWA] Service Worker update available event received!');
      setNeedRefresh(true);
      if (e.detail && e.detail.registration) {
        setRegistration(e.detail.registration);
        registrationRef.current = e.detail.registration;
      }
    };
    window.addEventListener('swUpdateAvailable', handleSwUpdate);

    // Initial check for existing registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          setRegistration(reg);
          registrationRef.current = reg;
          if (reg.waiting) {
            setNeedRefresh(true);
          }
        }
      });

      // Reload when new worker takes control
      let refreshing = false;
      const handleControllerChange = () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      };
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    }

    // Check for updates on startup
    const startTimer = setTimeout(() => {
      checkForAppUpdate();
    }, 1200);

    // Check when user returns to app
    const handleFocus = () => checkForAppUpdate();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForAppUpdate();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Periodic background check every 45 seconds
    const intervalId = setInterval(checkForAppUpdate, 45000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('swUpdateAvailable', handleSwUpdate);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(startTimer);
      clearInterval(intervalId);
    };
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        setShowInstallModal(false);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  /**
   * Seamlessly activates the new version:
   * 1. Sends SKIP_WAITING to waiting service worker
   * 2. Clears all old caches
   * 3. Syncs latest version
   * 4. Reloads application to replace old code with new code
   */
  const updateServiceWorker = async () => {
    setIsUpdating(true);
    try {
      const reg = registration || registrationRef.current;
      if (reg && reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // Clear all old caches
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }

      // Sync latest version in storage
      try {
        const res = await fetch(`/version.json?_t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const d = await res.json();
          if (d.version) localStorage.setItem('cotton_calc_version', d.version);
        }
      } catch (e) {
        // Ignore
      }
    } catch (e) {
      console.warn('Update error', e);
    }

    // Short graceful pause then hard reload
    setTimeout(() => {
      window.location.reload(true);
    }, 250);
  };

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isOffline,
        needRefresh,
        isUpdating,
        platform,
        showInstallModal,
        setShowInstallModal,
        triggerInstall,
        updateServiceWorker,
        dismissUpdate: () => setNeedRefresh(false),
      }}
    >
      {children}
    </PwaContext.Provider>
  );
};

export const usePwa = () => {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
};

export default PwaContext;
