import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  light?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  light = false,
}) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
  };

  const colorClass = light
    ? 'border-white/30 border-t-white'
    : 'border-brand-200 border-t-brand-600';

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full ${sizeMap[size]} ${colorClass} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
