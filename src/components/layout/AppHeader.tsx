import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AppHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 glass-surface border-b border-rose-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-maroon-900 via-rose-800 to-rose-700 flex items-center justify-center text-white shadow-md shadow-maroon-900/25 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-black text-xl italic tracking-tighter text-amber-200">SV</span>
          </div>
          <div>
            <span className="text-2xl font-serif font-extrabold tracking-tight text-slate-900 group-hover:text-maroon-800 transition-colors">
              Siya <span className="text-maroon-800">Vastra</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-maroon-900/60 -mt-0.5">
              Haute Couture & Heritage
            </span>
          </div>
        </Link>

        {/* Right Actions: Clean Auth State only */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-surface-elevated text-xs font-semibold text-slate-800 border border-maroon-900/10 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-maroon-800 text-white flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span>{user.fullName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-maroon-800 hover:bg-rose-50 transition-colors border border-rose-200/60"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-maroon-800 hover:bg-white/60 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-maroon-900 via-rose-800 to-maroon-800 hover:from-maroon-950 hover:to-maroon-900 rounded-xl shadow-md shadow-maroon-900/20 transition-all active:scale-[0.98]"
              >
                Join Privé
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
