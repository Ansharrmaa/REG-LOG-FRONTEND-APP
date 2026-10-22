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
          <div className="w-11 h-11 rounded-2xl bg-[#881337] bg-gradient-to-tr from-rose-950 via-[#881337] to-rose-800 flex items-center justify-center text-white shadow-md shadow-rose-950/25 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-black text-xl italic tracking-tighter text-amber-200">SV</span>
          </div>
          <div>
            <span className="text-2xl font-serif font-extrabold tracking-tight text-slate-900 group-hover:text-rose-900 transition-colors">
              Siya <span className="text-[#881337]">Vastra</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-rose-950/70 -mt-0.5">
              Haute Couture & Heritage
            </span>
          </div>
        </Link>

        {/* Right Actions: Clean Auth State only */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-surface-elevated text-xs font-semibold text-slate-800 border border-rose-900/10 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-[#881337] text-white flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span>{user.fullName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-rose-900 hover:bg-rose-50 transition-colors border border-rose-200/60"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-rose-900 hover:bg-rose-50/80 rounded-xl transition-colors border border-transparent hover:border-rose-200/50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-maroon-solid px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-rose-950/20 transition-all active:scale-[0.98] border border-rose-900/30"
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
