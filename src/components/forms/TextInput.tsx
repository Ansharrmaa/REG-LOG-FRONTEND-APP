import React, { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={`w-full rounded-xl bg-white text-slate-900 border text-sm transition-all duration-150 placeholder:text-slate-400
            py-2.5 ${leftIcon ? 'pl-10' : 'pl-3.5'} ${rightIcon ? 'pr-10' : 'pr-3.5'}
            ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'
            }
            focus:outline-none disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
