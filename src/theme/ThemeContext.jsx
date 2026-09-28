import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'cotton_calc_theme';

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getInitialActiveTheme = (mode) => {
  if (mode === 'dark') return 'dark';
  if (mode === 'light') return 'light';
  return getSystemTheme();
};

export const ThemeProvider = ({ children }) => {
  // 'system' | 'light' | 'dark'
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
    } catch {
      return 'system';
    }
  });

  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY)) || 'system';
    return getInitialActiveTheme(saved);
  });

  const applyThemeToDOM = useCallback((resolvedTheme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#080A1D' : '#F0F2FC');
    }
  }, []);

  // Update theme setting
  const updateTheme = useCallback((newMode) => {
    setThemeMode(newMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (e) {
      console.warn('Could not save theme to localStorage', e);
    }

    const resolved = newMode === 'system' ? getSystemTheme() : newMode;
    setActiveTheme(resolved);
    applyThemeToDOM(resolved);
  }, [applyThemeToDOM]);

  // Synchronize on mount and handle system media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = () => {
      if (themeMode === 'system') {
        const resolved = mediaQuery.matches ? 'dark' : 'light';
        setActiveTheme(resolved);
        applyThemeToDOM(resolved);
      }
    };

    // Ensure DOM matches activeTheme
    const currentResolved = themeMode === 'system' ? getSystemTheme() : themeMode;
    setActiveTheme(currentResolved);
    applyThemeToDOM(currentResolved);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, [themeMode, applyThemeToDOM]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        activeTheme,
        setTheme: updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
