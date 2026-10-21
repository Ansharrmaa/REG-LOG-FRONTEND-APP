import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message?: string | null;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200/80 rounded-xl text-red-700 text-sm animate-in fade-in duration-200 ${className}`}
    >
      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      <span className="leading-snug">{message}</span>
    </div>
  );
};
