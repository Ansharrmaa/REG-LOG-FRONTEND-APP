import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
  type?: 'success' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  onClose,
  className = '',
}) => {
  const metaMap = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
    },
  };

  const meta = metaMap[type];

  return (
    <div
      role="status"
      className={`flex items-start justify-between gap-3 p-4 rounded-xl border shadow-sm ${meta.bg} ${className}`}
    >
      <div className="flex items-start gap-2.5">
        {meta.icon}
        <span className="text-sm font-medium leading-snug">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
