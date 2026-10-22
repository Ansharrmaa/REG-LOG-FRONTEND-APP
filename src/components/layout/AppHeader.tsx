import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  LogOut,
  KeyRound,
  Heart,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AppHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 glass-surface border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-white/60 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-800/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-black text-xl italic tracking-tighter">SV</span>
          </div>
          <div>
            <span className="text-2xl font-serif font-extrabold tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors">
              Siya <span className="text-amber-700">Vastra</span>
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-amber-900/60 -mt-0.5">
              Haute Couture & Heritage
            </span>
          </div>
        </Link>

        {/* Desktop E-Commerce Category Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <Link to="/" className="hover:text-amber-700 transition-colors">
            Home
          </Link>
          <a href="#featured-collections" className="hover:text-amber-700 transition-colors">
            Heritage Sarees
          </a>
          <a href="#featured-collections" className="hover:text-amber-700 transition-colors">
            Bridal Lehengas
          </a>
          <a href="#featured-collections" className="hover:text-amber-700 transition-colors">
            Artisanal Kurtas
          </a>
          <a
            href="#featured-collections"
            className="inline-flex items-center gap-1.5 text-amber-800 font-semibold hover:text-amber-900 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Festive Edit</span>
          </a>
        </nav>

        {/* Right Actions: Search / Wishlist / Cart / Auth */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <Link
            to="/"
            title="Wishlist"
            className="hidden sm:flex w-10 h-10 rounded-xl glass-pill items-center justify-center text-slate-700 hover:text-amber-700 hover:bg-white transition-all"
          >
            <Heart className="w-4 h-4" />
          </Link>

          {/* Cart Icon with badge */}
          <button
            onClick={() => alert('Your shopping cart is ready. Explore our collections to add pieces!')}
            title="Bag"
            className="relative w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-slate-700 hover:text-amber-700 hover:bg-white transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              0
            </span>
          </button>

          {/* Authentication State */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-surface-elevated text-xs font-semibold text-slate-800 hover:bg-white transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-amber-700 text-white flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline">{user.fullName.split(' ')[0]}</span>
              </Link>

              <Link
                to="/change-password"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors"
                title="Change Password"
              >
                <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                <span>Security</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-red-600 hover:bg-red-50 transition-colors border border-red-200/50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-white/60 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-700 to-orange-600 hover:from-amber-800 hover:to-orange-700 rounded-xl shadow-md shadow-amber-800/15 transition-all"
              >
                Join Privé
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-surface-elevated border-t border-amber-900/10 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-800 py-1"
          >
            Home
          </Link>
          <a
            href="#featured-collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-800 py-1"
          >
            Heritage Sarees
          </a>
          <a
            href="#featured-collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-800 py-1"
          >
            Bridal Lehengas
          </a>
          <a
            href="#featured-collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-800 py-1"
          >
            Artisanal Kurtas
          </a>
          <a
            href="#featured-collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-amber-700 font-semibold py-1"
          >
            Festive Edit 2026
          </a>
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-semibold text-slate-800"
                >
                  Member Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-xs text-red-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-xl glass-pill text-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-amber-700 text-white"
                >
                  Join Privé
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
