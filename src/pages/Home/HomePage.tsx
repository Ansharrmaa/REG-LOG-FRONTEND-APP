import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Scissors,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { useAuth } from '@/context/AuthContext';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  tag: string;
  imageUrl: string;
  inStock: boolean;
}

const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Varanasi Pure Katan Silk Saree in Crimson & Antique Zari',
    category: 'Heritage Sarees',
    price: 18499,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 142,
    tag: 'Bestseller',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: '2',
    name: 'Gulbahar Hand-Embroidered Raw Silk Bridal Lehenga Set',
    category: 'Bridal Couture',
    price: 44999,
    originalPrice: 55000,
    rating: 5.0,
    reviewsCount: 89,
    tag: 'Artisan Heirloom',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: '3',
    name: 'Chanderi Tissue Anarkali Suit with Resham Threadwork',
    category: 'Kurta & Sets',
    price: 9499,
    originalPrice: 12999,
    rating: 4.8,
    reviewsCount: 215,
    tag: 'Festive Pick',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
  {
    id: '4',
    name: 'Champagne Georgette Drape Saree with Pearl Scalloped Border',
    category: 'Contemporary Drapes',
    price: 14899,
    originalPrice: 18500,
    rating: 4.9,
    reviewsCount: 96,
    tag: 'Limited Edition',
    imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
  },
];

const CATEGORIES = [
  {
    name: 'Banarasi Silks',
    tagline: 'Centuries-old looms of Kashi',
    count: '140+ Designs',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Bridal & Festive Lehengas',
    tagline: 'Hand-sewn zardozi & marodi work',
    count: '65+ Masterpieces',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Chanderi & Organza Kurtas',
    tagline: 'Effortless daytime & soiree grace',
    count: '90+ Silhouettes',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Artisan Dupattas & Stoles',
    tagline: 'Pashmina, Bandhani & Kalamkari',
    count: '80+ Treasures',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
  },
];

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-900 text-amber-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Festive Couture 2026: Complimentary hand-crafted silk potli on orders above ₹4,999</span>
        <span className="hidden md:inline text-amber-300 font-bold">| Code: SIYAFESTIVE</span>
      </div>

      {/* Main Glassmorphic Navbar */}
      <AppHeader />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-6 pb-20 lg:pt-12 lg:pb-32 px-4 sm:px-6 lg:px-8">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Hero Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-amber-200/60 text-amber-900 text-xs font-semibold shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>The 2026 Royal Heritage Collection</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-[1.15] tracking-tight">
                  Timeless Elegance,{' '}
                  <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800">
                    Handcrafted
                  </span>{' '}
                  for Royalty.
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                  Step into the ethereal world of <strong>Siya Vastra</strong>. Handloom Banarasi silks,
                  bespoke bridal lehengas, and artisanal kurtas spun by India’s finest generational weavers.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#featured-collections"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-700/20 hover:shadow-orange-700/30 hover:scale-[1.02] active:scale-[0.99] transition-all"
                  >
                    <span>Explore Festive Edit</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-surface-elevated text-slate-800 font-semibold text-sm hover:bg-white transition-all shadow-sm"
                    >
                      <span>Go to My Profile</span>
                    </Link>
                  ) : (
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-surface-elevated text-slate-800 font-semibold text-sm hover:bg-white transition-all shadow-sm"
                    >
                      <span>Join The Privé Club</span>
                    </Link>
                  )}
                </div>

                {/* Trust Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-900/10 max-w-xl">
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-900">100%</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Pure Certified Silk</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-900">1,200+</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Artisan Families</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-serif text-slate-900">4.9 ★</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">25,000+ Patrons</div>
                  </div>
                </div>
              </div>

              {/* Right Hero Visual: Layered Glass Cards */}
              <div className="lg:col-span-5 relative">
                {/* Main Hero Showcase Card */}
                <div className="relative rounded-3xl overflow-hidden glass-surface-elevated p-3 shadow-2xl">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                      alt="Siya Vastra Royal Banarasi Silk Saree"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/10" />

                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-surface border border-white/40 text-slate-900 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-amber-800 tracking-wider uppercase text-[11px]">
                          Masterpiece No. 402
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                          <CheckCircle2 className="w-3 h-3" /> Ready to Ship
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-slate-900">
                        Varanasi Heirloom Gold Zari Drape
                      </h4>
                      <p className="text-xs text-slate-600">
                        Woven across 24 days on hand-operated jacquard pit looms.
                      </p>
                    </div>
                  </div>

                  {/* Floating Glass Badges */}
                  <div className="absolute -top-4 -left-4 glass-surface px-4 py-2.5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Festive Preview</div>
                      <div className="text-[10px] text-slate-500">Limited Edition Pieces</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 glass-surface px-4 py-2.5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Silk Mark Certified</div>
                      <div className="text-[10px] text-slate-500">100% Genuine Weaves</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES SECTION ================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50/40 border-y border-amber-900/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
              <div>
                <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">
                  Curated Catalog
                </span>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
                  Explore by Heritage Genre
                </h2>
              </div>
              <p className="text-slate-500 text-sm mt-2 sm:mt-0 max-w-md">
                Every weave tells a sacred story of regional artistry, royal patronage, and enduring tradition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="group relative rounded-3xl overflow-hidden glass-card p-3 cursor-pointer"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full glass-surface text-slate-900">
                      {cat.count}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs text-amber-200/90">{cat.tagline}</p>
                    </div>
                  </div>
                  <div className="px-1 py-1 flex items-center justify-between">
                    <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                      {cat.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BESTSELLERS & CURATED EDITS ================= */}
        <section id="featured-collections" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-amber-800 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> Handpicked Bestsellers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                Coveted Heirloom Creations
              </h2>
              <p className="text-slate-600 text-sm">
                Exquisite bridal sets, classic festive sarees, and contemporary festive wear favored by patrons worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {FEATURED_PRODUCTS.map((product) => {
                const isFavorited = wishlist.includes(product.id);
                const discount = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );

                return (
                  <div
                    key={product.id}
                    className="group glass-card rounded-3xl p-3 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3.5 bg-slate-100">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Tags */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-700 text-white shadow-sm">
                            {product.tag}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white shadow-sm">
                            {discount}% OFF
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Save to Wishlist"
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full glass-surface flex items-center justify-center text-slate-700 hover:text-red-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorited ? 'fill-red-500 text-red-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="px-1 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{product.category}</span>
                          <span className="flex items-center gap-1 text-amber-600 font-semibold">
                            <Star className="w-3 h-3 fill-amber-500" />
                            {product.rating} ({product.reviewsCount})
                          </span>
                        </div>

                        <h3 className="font-serif font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-amber-800 transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="px-1 pt-3 mt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <div>
                        <div className="text-base font-bold font-serif text-slate-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Added "${product.name}" to cart!`)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-amber-700 transition-colors shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= BRAND PROMISES & VALUES ================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass-surface-elevated rounded-3xl p-8 sm:p-12 border border-white/70 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base">
                      Bespoke Tailoring
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Complimentary custom blouse & fall-pico tailoring with every saree purchase.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base">
                      Pure Silk Guarantee
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Silk Mark certified fabrics directly sourced from handloom weaving cooperatives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base">
                      Express Pan-India
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Safe, insured 2-4 day shipping with tamper-evident luxury keepsake boxes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-900 text-base">
                      Effortless Returns
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Hassle-free 7-day doorstep return pickup and instant store credit/refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VIP PRIVÉ NEWSLETTER ================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden glass-surface-elevated p-8 sm:p-14 border border-amber-200/50 shadow-2xl text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl -z-10" />

            <div className="max-w-xl mx-auto space-y-4">
              <span className="text-amber-800 text-xs font-bold tracking-widest uppercase">
                Siya Vastra Privé Circle
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Receive Early Access to Artisan Releases
              </h2>
              <p className="text-slate-600 text-sm">
                Join our private salon to enjoy complimentary styling consultations, secret festive previews,
                and ₹1,500 welcome credit on your first order.
              </p>

              {newsletterSubscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Welcome to Siya Vastra Privé. We have sent your invitation code.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-2xl glass-input text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm shadow-md transition-colors flex-shrink-0"
                  >
                    Join Privé
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 text-xs pt-16 pb-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                Siya <span className="text-amber-500">Vastra</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Celebrating India’s rich textile tapestry through authentic artisanal craftsmanship,
              timeless silken grace, and modern luxury sensibilities.
            </p>
            <div className="text-slate-500 text-[11px]">
              Flagship Studio: Heritage Boulevard, Jaipur & New Delhi
            </div>
          </div>

          {/* Heritage Collections */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide">Collections</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Varanasi Katan Silks</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Kanjeevaram Gold Weaves</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Raw Silk Bridal Lehengas</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Chanderi Tissue Sets</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Hand-painted Kalamkari</a></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide">Client Concierge</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Order Status & Tracking</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Custom Tailoring Guide</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Silk Care & Preservation</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping & Returns Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">WhatsApp Stylist Assistance</a></li>
            </ul>
          </div>

          {/* Account & Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide">My Account</h4>
            <ul className="space-y-2">
              {isAuthenticated ? (
                <>
                  <li><Link to="/dashboard" className="hover:text-amber-400 transition-colors">Member Dashboard</Link></li>
                  <li><Link to="/change-password" className="hover:text-amber-400 transition-colors">Account Security</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="hover:text-amber-400 transition-colors">Sign In</Link></li>
                  <li><Link to="/register" className="hover:text-amber-400 transition-colors">Create Member Account</Link></li>
                  <li><Link to="/forgot-password" className="hover:text-amber-400 transition-colors">Recover Password</Link></li>
                </>
              )}
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Siya Vastra Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Handcrafted with pride in India</span>
            <span>100% Secure Encrypted Transactions</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
