import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password?: string;
  className?: string;
}

interface Requirement {
  id: string;
  label: string;
  validator: (pwd: string) => boolean;
}

const requirements: Requirement[] = [
  { id: 'length', label: 'At least 8 characters', validator: (p) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter (A-Z)', validator: (p) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter (a-z)', validator: (p) => /[a-z]/.test(p) },
  { id: 'digit', label: 'One numeric digit (0-9)', validator: (p) => /\d/.test(p) },
  { id: 'special', label: 'One special character (!@#$%^&*)', validator: (p) => /[^a-zA-Z0-9]/.test(p) },
];

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password = '',
  className = '',
}) => {
  const metCount = requirements.filter((req) => req.validator(password)).length;
  const strengthPercentage = (metCount / requirements.length) * 100;

  const getStrengthMeta = () => {
    if (metCount === 0) return { label: 'Empty', color: 'bg-slate-200', text: 'text-slate-400' };
    if (metCount <= 2) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-600' };
    if (metCount <= 4) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strengthMeta = getStrengthMeta();

  return (
    <div className={`space-y-2.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Password Requirements</span>
        {password.length > 0 && (
          <span className={`font-semibold ${strengthMeta.text}`}>{strengthMeta.label}</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strengthMeta.color}`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>

      {/* Requirement items */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-xs">
        {requirements.map((req) => {
          const isMet = req.validator(password);
          return (
            <li
              key={req.id}
              className={`flex items-center gap-1.5 transition-colors duration-150 ${
                isMet ? 'text-emerald-700 font-medium' : 'text-slate-400'
              }`}
            >
              {isMet ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              ) : (
                <X className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
              )}
              <span>{req.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
