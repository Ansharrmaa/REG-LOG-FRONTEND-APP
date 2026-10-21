import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative flex items-center">
        <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
          <Lock className="w-4 h-4" />
        </div>

        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-xl bg-white text-slate-900 border text-sm transition-all duration-150 placeholder:text-slate-400
            py-2.5 pl-10 pr-11
            ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10'
            }
            focus:outline-none disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />

        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 focus:outline-none rounded transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
