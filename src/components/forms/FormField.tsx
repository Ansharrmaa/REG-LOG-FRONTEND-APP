import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  helperText,
  required,
  children,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {children}

      {helperText && !error && (
        <p className="text-xs text-slate-500 leading-normal">{helperText}</p>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
