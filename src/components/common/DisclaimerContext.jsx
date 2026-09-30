import React, { createContext, useContext, useState } from 'react';

const DisclaimerContext = createContext();

export const DisclaimerProvider = ({ children }) => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const openDisclaimer = () => setIsDisclaimerOpen(true);
  const closeDisclaimer = () => setIsDisclaimerOpen(false);

  return (
    <DisclaimerContext.Provider
      value={{
        isDisclaimerOpen,
        openDisclaimer,
        closeDisclaimer,
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
