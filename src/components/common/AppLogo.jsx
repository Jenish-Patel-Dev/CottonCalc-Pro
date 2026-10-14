import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import logoDarkFull from '../../assets/logos/logo-dark-full.png';
import logoDarkIcon from '../../assets/logos/logo-dark-icon.png';
import logoLightFull from '../../assets/logos/logo-light-full.png';
import logoLightIcon from '../../assets/logos/logo-light-icon.png';

/**
 * AppLogo Component
 * Implements the exact 4-logo state matrix requested:
 * - Light + Expanded  -> LIGHT_MODE_FULL_LOGO
 * - Light + Collapsed -> LIGHT_MODE_ICON_LOGO
 * - Dark  + Expanded  -> DARK_MODE_FULL_LOGO
 * - Dark  + Collapsed -> DARK_MODE_ICON_LOGO
 */
export const AppLogo = ({ isCollapsed = false, className = '', isMobile = false }) => {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';

  let src = '';
  let alt = 'CottonCalc Pro';

  if (isMobile) {
    src = isDark ? (logoDarkFull || '/assets/logos/logo-dark-full.png') : (logoLightFull || '/assets/logos/logo-light-full.png');
  } else if (isCollapsed) {
    src = isDark ? (logoDarkIcon || '/assets/logos/logo-dark-icon.png') : (logoLightIcon || '/assets/logos/logo-light-icon.png');
  } else {
    src = isDark ? (logoDarkFull || '/assets/logos/logo-dark-full.png') : (logoLightFull || '/assets/logos/logo-light-full.png');
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
