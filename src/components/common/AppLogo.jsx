import React from 'react';
import { useTheme } from '../../theme/ThemeContext';

/**
 * AppLogo Component
 * Implements the exact 4-logo state matrix requested:
 * - Light + Expanded  -> LIGHT_MODE_FULL_LOGO (/assets/logos/logo-light-full.png)
 * - Light + Collapsed -> LIGHT_MODE_ICON_LOGO (/assets/logos/logo-light-icon.png)
 * - Dark  + Expanded  -> DARK_MODE_FULL_LOGO  (/assets/logos/logo-dark-full.png)
 * - Dark  + Collapsed -> DARK_MODE_ICON_LOGO  (/assets/logos/logo-dark-icon.png)
 */
export const AppLogo = ({ isCollapsed = false, className = '', isMobile = false }) => {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';

  let src = '';
  let alt = 'CottonCalc Pro';

  if (isMobile) {
    // For mobile header: use the full logo formatted to fit the header bar
    src = isDark ? '/assets/logos/logo-dark-full.png' : '/assets/logos/logo-light-full.png';
  } else if (isCollapsed) {
    src = isDark ? '/assets/logos/logo-dark-icon.png' : '/assets/logos/logo-light-icon.png';
  } else {
    src = isDark ? '/assets/logos/logo-dark-full.png' : '/assets/logos/logo-light-full.png';
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`select-none transition-all duration-300 object-contain ${className}`}
      loading="eager"
    />
  );
};

export default AppLogo;
