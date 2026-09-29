import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Register Service Worker for PWA with instant update detection
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then((registration) => {
        // Case 1: An update is ALREADY downloaded and waiting
        if (registration.waiting) {
          window.dispatchEvent(
            new CustomEvent('swUpdateAvailable', { detail: { registration } })
          );
        }

        // Case 2: A new update is being installed
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                window.dispatchEvent(
                  new CustomEvent('swUpdateAvailable', { detail: { registration } })
                );
              }
            };
          }
        };

        // Proactively check for updates from server immediately
        registration.update().catch(() => {});
      })
      .catch((err) => {
        console.warn('Service worker registration failed: ', err);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
