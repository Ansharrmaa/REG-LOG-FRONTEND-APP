import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  isLoading = false,
  disabled,
  variant = 'primary',
  fullWidth = true,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none py-3 px-5 text-sm shadow-sm active:scale-[0.99]';

  const variantMap = {
    primary:
      'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500 shadow-brand-500/20 hover:shadow-md hover:shadow-brand-500/25',
    secondary:
      'bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-700 shadow-slate-900/10',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-red-500/20',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-brand-500 shadow-sm',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantMap[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <LoadingSpinner size="sm" light={variant !== 'outline'} />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </span>
      )}
    </button>
  );
};
