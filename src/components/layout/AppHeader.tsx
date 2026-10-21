import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, KeyRound } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AppHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
              Nova<span className="text-brand-600">Shop</span>
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400 -mt-1">
              Account Security
            </span>
          </div>
        </Link>

        {/* Auth Navigation */}
        <nav className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span>{user.fullName}</span>
              </Link>

              <Link
                to="/change-password"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Change Password"
              >
                <KeyRound className="w-4 h-4 text-slate-500" />
                <span className="hidden md:inline">Change Password</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-200/60"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm shadow-brand-500/20 transition-all active:scale-[0.99]"
              >
                Create Account
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
