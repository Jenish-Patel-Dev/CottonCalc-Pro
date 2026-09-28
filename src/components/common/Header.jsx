import React from 'react';
import { IconArrowLeft, IconFactory } from './Icons';

export const Header = ({ currentView, onNavigateHome }) => {
  return (
    <header className="bg-indigo-700 text-white p-5 shadow-lg relative transition-all duration-300">
      <div className="max-w-md mx-auto flex items-center gap-3">
        {currentView !== 'home' ? (
          <button
            onClick={onNavigateHome}
            aria-label="Back to home"
            className="p-2 -ml-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <IconArrowLeft />
          </button>
        ) : (
          <div className="p-2 bg-white/20 rounded-lg">
            <IconFactory />
          </div>
        )}

        <div>
          <h1 className="text-xl font-bold">
            {currentView === 'home' && 'Ginning Master'}
            {currentView === 'ginning' && 'Cotton Ginning'}
            {currentView === 'oil' && 'Oil Mill'}
          </h1>
          <p className="text-indigo-200 text-xs">
            {currentView === 'home' && 'Select Calculator'}
            {currentView === 'ginning' && 'Output & Cost Parity'}
            {currentView === 'oil' && 'Crushing & Recovery'}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
