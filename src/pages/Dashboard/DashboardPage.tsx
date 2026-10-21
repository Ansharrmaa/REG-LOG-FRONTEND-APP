import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck,
  KeyRound,
  LogOut,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const DashboardPage: React.FC = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshUser();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      <AppHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient from-brand-500/20 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold backdrop-blur-sm border border-brand-500/30">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Verified Customer Profile</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Hello, {user.fullName}!
              </h1>
              <p className="text-slate-300 text-sm max-w-xl">
                Your NovaShop customer session is active and secured with cryptographically signed
                HttpOnly authentication cookies and server-side session tracking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/change-password"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-sm border border-white/10 transition-all active:scale-[0.98]"
              >
                <KeyRound className="w-4 h-4 text-brand-300" />
                <span>Change Password</span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <LoadingSpinner size="sm" light />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Account Details & Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Verified Identity */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Account Details
              </span>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 disabled:opacity-50"
                title="Refresh profile from backend"
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-semibold text-slate-400 block">
                    Full Name
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{user.fullName}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-semibold text-slate-400 block">
                    Registered Email
                  </span>
                  <span className="text-sm font-semibold text-slate-800 break-all">{user.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase font-semibold text-slate-400 block">
                    Mobile Number
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{user.mobileNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Security & Session Status */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Security Overview
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active</span>
              </span>
            </div>

            <div className="space-y-3 pt-1 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-semibold text-slate-800 block">Session Management</span>
                <p className="text-slate-500 leading-relaxed">
                  Authentication token is stored exclusively in a secure, HttpOnly browser cookie. No tokens are readable by client-side JavaScript.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-semibold text-slate-800 block">Session Revocation</span>
                <p className="text-slate-500 leading-relaxed">
                  Logging out or resetting password automatically marks active JWT identifiers (<code className="font-mono text-[11px]">jti</code>) revoked on the server.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Quick Security Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Quick Actions
            </span>

            <div className="space-y-2.5 pt-1">
              <Link
                to="/change-password"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block group-hover:text-brand-700">
                      Change Password
                    </span>
                    <span className="text-[11px] text-slate-400">Update current login credentials</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 hover:border-red-300 hover:bg-red-50/50 transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block group-hover:text-red-700">
                      Sign Out
                    </span>
                    <span className="text-[11px] text-slate-400">Invalidate session across browsers</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
