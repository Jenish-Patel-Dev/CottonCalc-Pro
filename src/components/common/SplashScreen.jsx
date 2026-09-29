import React from 'react';

/**
 * Brand SplashScreen component
 * Displays application logo, application name, and elegant loading animation
 * on initial load and refresh.
 */
export const SplashScreen = ({ isFadingOut = false }) => {
  return (
    <div
      id="splash-screen-overlay"
      className={`fixed inset-0 z-[99999] flex items-center justify-center select-none transition-all duration-300 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100'
      }`}
      style={{
        backgroundColor: 'var(--bg)',
      }}
      aria-label="Loading CottonCalc Pro"
    >
      <div className="splash-card flex flex-col items-center text-center gap-4 p-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Animated App Logo */}
        <div className="splash-logo-wrap w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(59,79,224,0.22)]">
          <img
            src="/assets/logos/logo-light-icon.png"
            alt="CottonCalc Pro"
            className="w-full h-full object-contain block animate-pulse duration-1000"
            loading="eager"
          />
        </div>

        {/* App Title & Subtitle */}
        <div className="splash-brand-text flex flex-col gap-1 items-center">
          <h1
            className="splash-title text-2xl sm:text-3xl font-extrabold tracking-tight m-0"
            style={{
              background: 'linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CottonCalc Pro
          </h1>
          <p className="splash-subtitle text-xs sm:text-sm font-semibold text-app-secondary tracking-wide m-0">
            Ginning &amp; Oil Mill Calculator
          </p>
        </div>

        {/* Elegant Liquid Glass Loading Bar */}
        <div
          className="splash-loader-bar w-36 h-1 rounded-full overflow-hidden relative mt-2"
          style={{
            background: 'var(--tint)',
          }}
        >
          <div
            className="splash-loader-indicator absolute top-0 bottom-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--primary), var(--side-accent))',
              width: '45%',
              animation: 'splashShimmer 1.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
