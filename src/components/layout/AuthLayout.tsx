import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { AppHeader } from './AppHeader';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  badge = 'Secure E-commerce Authentication',
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      <AppHeader />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero / Brand Trust Panel (visible on lg screens) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 pr-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>{badge}</span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Secure access to your personal{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                  NovaShop
                </span>{' '}
                account.
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed">
                Enjoy seamless order tracking, express checkout, wishlist synchronization, and
                personalized recommendations protected with industry-standard cryptographic sessions.
              </p>
            </div>

            <div className="space-y-3.5 bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/70 shadow-sm">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>HttpOnly persistent cookie session management</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <span>BCrypt credential hashing & single-use OTP reset tokens</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Cross-Site Request Forgery (CSRF) & rate-limiting protection</span>
              </div>
            </div>

            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} NovaShop Inc. All rights reserved. Safe & encrypted.
            </div>
          </div>

          {/* Right Form Card */}
          <div className="w-full lg:col-span-7 max-w-xl mx-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-200/80 transition-all">
              <div className="mb-6 space-y-1.5">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
                {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
              </div>

              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
