import React, { useState, useRef, useEffect } from 'react';
import { IconCheck } from './Icons';

/**
 * Premium iOS Liquid Glass LOV (List Of Values / Select Dropdown)
 * Matches the design with left badge/code, label, and right checkmark.
 */
export const GlassSelect = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  align = 'right', // 'right' | 'left'
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Trigger Button - Matches Image 1 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 min-h-[34px] cursor-pointer ${buttonClassName}`}
        style={{
          background: 'var(--surf2)',
          borderColor: 'var(--line)',
          color: 'var(--text)',
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5 truncate">
          {selectedOption?.badge && (
            <span
              className="font-mono text-[11px] font-extrabold tracking-wide"
              style={{ color: 'var(--gold)' }}
            >
              {selectedOption.badge}
            </span>
          )}
          <span className="truncate text-xs font-bold" style={{ color: 'var(--text)' }}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--muted)', flexShrink: 0 }}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Popover Menu - Matches Image 1 */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute mt-1.5 min-w-[180px] w-max max-w-[280px] rounded-2xl p-1.5 z-50 animate-in zoom-in-95 duration-150 border ${
            align === 'left' ? 'left-0' : 'right-0'
          } ${dropdownClassName}`}
          style={{
            background: 'var(--surf)',
            borderColor: 'var(--line)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45), var(--shadow)',
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between gap-3 rounded-xl transition-colors cursor-pointer"
                style={{
                  background: isSelected ? 'var(--tint)' : 'transparent',
                  color: 'var(--text)',
                  fontWeight: isSelected ? 800 : 600,
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {opt.badge && (
                    <span
                      className="font-mono text-[11px] font-extrabold tracking-wider"
                      style={{
                        color: isSelected ? 'var(--gold)' : 'var(--muted)',
                      }}
                    >
                      {opt.badge}
                    </span>
                  )}
                  {opt.icon && <span className="text-sm">{opt.icon}</span>}
                  <span className="truncate" style={{ color: 'var(--text)' }}>
                    {opt.label}
                  </span>
                </div>
                {isSelected && (
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}>
                    <IconCheck size={14} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GlassSelect;
