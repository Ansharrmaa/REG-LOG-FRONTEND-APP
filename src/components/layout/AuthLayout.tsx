import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, Scissors, Star, ArrowLeft } from 'lucide-react';

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
  badge = 'Siya Vastra Privé Access',
}) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-maroon-800 selection:text-white relative overflow-hidden bg-[#fdfaf9]">
      {/* Ambient background glow elements in soft rose/crimson for Glassmorphism */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-200/35 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-rose-100/25 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Dedicated Clean Auth Header — NO store navbar */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[#881337] bg-gradient-to-tr from-rose-950 via-[#881337] to-rose-700 flex items-center justify-center text-white shadow-md shadow-rose-950/25 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-black text-base italic tracking-tighter text-amber-200">SV</span>
          </div>
          <div>
            <span className="text-xl font-serif font-extrabold tracking-tight text-slate-900 group-hover:text-rose-900 transition-colors">
              Siya <span className="text-[#881337]">Vastra</span>
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-maroon-800 px-3 py-1.5 rounded-xl glass-pill hover:bg-white transition-all border border-rose-200/50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Brand Showcase Panel (Visible on lg screens) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 pr-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-rose-200 text-rose-950 text-xs font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 text-[#881337]" />
                <span>{badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Welcome to{' '}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-rose-950 via-[#881337] to-rose-700">
                  Siya Vastra
                </span>
                .
              </h1>

              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Sign in to manage your couture orders, track custom blouse tailoring, synchronize your
                festive wishlist, and unlock private seasonal previews.
              </p>
            </div>

            {/* E-Commerce Customer Perks Cards (Glassmorphism) */}
            <div className="space-y-3.5 glass-surface p-5 rounded-3xl border border-rose-200/40 shadow-lg">
              <div className="flex items-center gap-3.5 text-xs font-medium text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-maroon-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Scissors className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Complimentary Custom Tailoring</div>
                  <div className="text-[11px] text-slate-500">Made-to-measure blouse & fall-pico with sarees</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs font-medium text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-maroon-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">100% Certified Pure Handloom</div>
                  <div className="text-[11px] text-slate-500">Authentic Silk Mark certified heritage weaves</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs font-medium text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-maroon-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Insured Express Pan-India Shipping</div>
                  <div className="text-[11px] text-slate-500">Tamper-evident luxury gift packaging & easy returns</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Rated 4.9/5 by over 25,000 discerning patrons across India</span>
            </div>
          </div>

          {/* Right Auth Form Card with Glassmorphic Elevation */}
          <div className="w-full lg:col-span-7 max-w-xl mx-auto">
            <div className="glass-surface-elevated rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/80 transition-all">
              <div className="mb-6 space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                  {title}
                </h2>
                {subtitle && <p className="text-sm text-slate-600 font-light">{subtitle}</p>}
              </div>

              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
