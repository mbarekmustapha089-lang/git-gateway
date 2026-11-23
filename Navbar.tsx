import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  PhoneCall, 
  ShieldCheck,
  Zap,
  Heart,
  Flame,
  Truck,
  RotateCcw,
  Mail,
  MapPin,
  Sun,
  Moon,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Language, ProductCategory, AppTheme } from '../types';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import { WhatsAppButton } from './WhatsAppButton';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme?: AppTheme;
  onToggleTheme?: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenLogoModal: () => void;
  customLogoUrl: string | null;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onScrollToConfigurator: () => void;
  onScrollToDtf?: () => void;
  onScrollToClubOffers: () => void;
  onScrollToAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  theme = 'dark',
  onToggleTheme,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenLogoModal,
  customLogoUrl,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onScrollToConfigurator,
  onScrollToDtf,
  onScrollToClubOffers,
  onScrollToAbout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Sportdeal24 Inspired Top Trust & Hotline Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-none">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4.89 / 5.0 ⭐ Trusted Shops</span>
            </div>
            <span className="text-slate-700 hidden md:inline">•</span>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300 font-medium">
              <Truck className="w-3.5 h-3.5 text-teal-400" />
              <span>Gratis DHL-Versand ab 50 €</span>
            </div>
            <span className="text-slate-700 hidden lg:inline">•</span>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Happinger Str. 77, 83026 Rosenheim</span>
            </div>
            <span className="text-slate-700 hidden xl:inline">•</span>
            <div className="hidden xl:flex items-center gap-1.5 text-emerald-300 font-semibold">
              <span>💶 Kauf auf Rechnung für Vereine</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Direct WhatsApp Action Link */}
            <a
              href="https://wa.me/4917657940581?text=Hallo%20TH%20Sportwelt!%20Ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Fu%C3%9Fball-%20und%20Vereinsangebote."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition shadow-xs"
              title="Direkt per WhatsApp anfragen (+49 176 57940581)"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
              <span className="text-[11px]">WhatsApp: +49 176 57940581</span>
            </a>

            <a
              href="tel:+4917657940581"
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-bold transition"
              title="Telefon-Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>+49 176 57940581</span>
            </a>

            <a
              href="mailto:th-sportwelt@outlook.de"
              className="hidden xl:flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-medium transition text-[11px]"
              title="E-Mail Kundenservice"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>th-sportwelt@outlook.de</span>
            </a>

            <button
              onClick={onOpenLogoModal}
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.nav.customLogo}</span>
            </button>

            {/* Top Bar Quick Theme Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-400/50"
                title={theme === 'dark' ? 'Zu hellem Design wechseln (☀️)' : 'Zu dunklem Design wechseln (🌙)'}
                aria-label={t.nav.themeToggle}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-amber-300 font-semibold">{t.nav.brightMode || 'Hell ☀️'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-300 fill-indigo-300" />
                    <span className="text-indigo-200 font-semibold">{t.nav.darkMode || 'Dunkel 🌙'}</span>
                  </>
                )}
              </button>
            )}

            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => onLanguageChange('de')}
                className={`font-bold transition ${lang === 'de' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              >
                DE
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => onLanguageChange('en')}
                className={`font-bold transition ${lang === 'en' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[96px] sm:min-h-[104px] py-3 gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-2.5 text-left group focus:outline-none py-1"
            >
              <BrandLogo
                customLogoUrl={customLogoUrl}
                isBright={theme === 'bright'}
                size="md"
              />
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-md mx-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.filters.searchPlaceholder}
                className="w-full bg-slate-100 hover:bg-slate-100/90 focus:bg-white text-slate-900 placeholder:text-slate-400 pl-10 pr-8 py-2.5 rounded-full text-xs font-medium border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo Uploader for User */}
            <button
              onClick={onOpenLogoModal}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-1.5 border border-slate-200"
              title="Logo anpassen"
            >
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">{t.nav.customLogo}</span>
            </button>

            {/* Small Theme Toggle Icon Button */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2.5 rounded-xl border transition flex items-center justify-center gap-1.5 font-bold text-xs ${
                  theme === 'bright'
                    ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100 shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200'
                }`}
                title={theme === 'dark' ? 'Klick für helles Design (☀️ Sunlight Mode)' : 'Klick für dunkles Design (🌙 Dark Mode)'}
                aria-label={t.nav.themeToggle}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
                    <span className="hidden xl:inline text-amber-700">Hell ☀️</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-600 fill-indigo-500" />
                    <span className="hidden xl:inline text-indigo-700">Dunkel 🌙</span>
                  </>
                )}
              </button>
            )}

            {/* Eigener Vereinsshop Button */}
            <button
              id="header-vereinsshop-button"
              onClick={() => {
                const el = document.getElementById('vereinsshop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-2 sm:px-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-xs shadow-xs hover:shadow-md transition flex items-center gap-1.5 shrink-0 border border-red-500/30"
              title="Eigener Vereinsshop für dein Team"
            >
              <span className="text-sm">🔒</span>
              <span className="hidden xl:inline whitespace-nowrap font-black">Eigener Vereinsshop</span>
              <span className="hidden md:inline xl:hidden font-bold">Vereinsshop</span>
            </button>

            {/* Trikots Konfigurator Button */}
            <button
              id="header-configurator-button"
              onClick={onScrollToConfigurator}
              className="relative p-2 sm:px-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs shadow-xs hover:shadow-md transition flex items-center gap-1.5 shrink-0 group border border-emerald-500/30"
              title="Trikots Konfigurator (3D Trikotsatz Gestalten)"
            >
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline whitespace-nowrap font-black">Trikots Konfigurator</span>
              <span className="hidden md:inline xl:hidden font-bold">Konfigurator</span>
            </button>

            {/* DFT Bügel-Logos and Transfers Button */}
            <button
              id="header-dtf-transfers-button"
              onClick={() => {
                if (onScrollToDtf) {
                  onScrollToDtf();
                } else {
                  const el = document.getElementById('dtf-transfers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative p-2 sm:px-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs shadow-xs hover:shadow-md transition flex items-center gap-1.5 shrink-0 group border border-amber-400/30"
              title="DFT Bügel-Logos and Transfers"
            >
              <Flame className="w-4 h-4 text-amber-200 fill-amber-300 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline whitespace-nowrap font-black">DFT Bügel-Logos & Transfers</span>
              <span className="hidden md:inline xl:hidden font-bold">DFT Transfers</span>
              <span className="hidden 2xl:inline-block px-1 py-0.5 bg-black/20 rounded text-[9px] font-black tracking-wider uppercase text-amber-100">🔥 Neu</span>
            </button>

            {/* Sportwelt Pro External Link Button */}
            <a
              id="header-sportwelt-pro-button"
              href="https://trikotsdesign.de/th-sports/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 sm:px-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-teal-700 via-emerald-700 to-green-700 hover:from-teal-800 hover:to-green-800 text-white font-extrabold text-xs shadow-xs hover:shadow-md transition flex items-center gap-1.5 shrink-0 group border border-emerald-400/40"
              title="Sportwelt Pro - Zu https://trikotsdesign.de/th-sports/"
            >
              <Zap className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline whitespace-nowrap font-black">Sportwelt Pro</span>
              <span className="hidden md:inline xl:hidden font-bold">Pro</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-button"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition border border-slate-200 flex items-center gap-1.5 font-bold text-xs"
              title={lang === 'de' ? 'Wunschliste / Merkzettel' : 'Wishlist'}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="hidden md:inline">{t.nav.wishlist || 'Wunschliste'}</span>
              {wishlistCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-300 group-hover:text-white uppercase font-semibold">
                  {t.nav.cart}
                </span>
                <span className="font-extrabold text-xs">
                  {cartTotal.toFixed(2)} €
                </span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-black flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Nav Strip - 2 Lines for maximum spacing & clarity */}
        <nav className="hidden lg:flex flex-col gap-2 border-t border-slate-100 py-3 text-xs font-bold">
          {/* Line 1: Hauptkategorien (startet mit "Alle Produkte") + Vereinsangebote & Über uns */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => onSelectCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.nav.all}
              </button>

              <button
                onClick={() => onSelectCategory('deals')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'deals'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-600 hover:bg-rose-50'
                }`}
              >
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{t.nav.deals || 'Hot Deals %'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('balls')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'balls'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{t.nav.balls || '⚽ Bälle ab 10 Stk.'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('shirts')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'shirts'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>👕 {t.nav.shirts}</span>
              </button>

              <button
                onClick={() => onSelectCategory('kurzehose')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'kurzehose'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🩳 {t.nav.kurzehose || 'Kurze Hosen'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('torwarthose')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'torwarthose'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🧤 {t.nav.torwarthose || 'Torwarthosen'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('handschoe')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'handschoe'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🥊 {t.nav.handschoe || 'Handschuhe'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onScrollToClubOffers}
                className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition font-bold flex items-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <span>🏆</span>
                <span>{t.nav.teamwear}</span>
              </button>
              <button
                onClick={onScrollToAbout}
                className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition font-bold flex items-center gap-1.5 border border-slate-200 shadow-2xs"
              >
                <span>ℹ️</span>
                <span>{t.nav.about}</span>
              </button>
            </div>
          </div>

          {/* Line 2: Teamwear, Warmwear, Schutz & Zubehör */}
          <div className="flex items-center justify-between gap-3 w-full pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => onSelectCategory('trainingsanzug')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'trainingsanzug'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🏃 {t.nav.trainingsanzug || 'Trainingsanzüge'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('hoodies')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'hoodies'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🧥 {t.nav.hoodies || 'Hoodies'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('pullovers')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'pullovers'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>👕 {t.nav.pullovers || 'Pullover'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('schinbeinschoe')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'schinbeinschoe'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🛡️ {t.nav.schinbeinschoe || 'Schienbeinschoner'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('socks')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'socks'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🧦 {t.nav.socks || 'Stutzen & Socken'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('teamwear')}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  activeCategory === 'teamwear'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🏆 {t.nav.teamwear || 'Vereinssets'}</span>
              </button>

              <button
                onClick={() => onSelectCategory('accessories')}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 ${
                  activeCategory === 'accessories'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                🎒 {t.nav.accessories}
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-500 font-semibold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Offizielle Veredelung &amp; DTF-Druck in Rosenheim</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="w-full bg-slate-100 text-slate-900 placeholder:text-slate-400 pl-9 pr-4 py-2 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2">
            <button
              onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 text-left text-slate-800"
            >
              {t.nav.all}
            </button>
            <button
              onClick={() => { onSelectCategory('deals'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-rose-50 text-left text-rose-800 font-extrabold flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Hot Deals %</span>
            </button>
            <button
              onClick={() => { onSelectCategory('balls'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-emerald-50 text-left text-emerald-800 font-bold"
            >
              {t.nav.balls || '⚽ Bälle ab 10 Stk.'}
            </button>
            <button
              onClick={() => { onSelectCategory('shirts'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-blue-50 text-left text-blue-800 font-bold"
            >
              👕 {t.nav.shirts}
            </button>
            <button
              onClick={() => { onSelectCategory('kurzehose'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-emerald-50 text-left text-emerald-800 font-bold"
            >
              🩳 {t.nav.kurzehose || 'Kurze Hosen'}
            </button>
            <button
              onClick={() => { onSelectCategory('torwarthose'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-teal-50 text-left text-teal-800 font-bold"
            >
              🧤 {t.nav.torwarthose || 'Torwarthosen'}
            </button>
            <button
              onClick={() => { onSelectCategory('handschoe'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-cyan-50 text-left text-cyan-800 font-bold"
            >
              🥊 {t.nav.handschoe || 'Handschuhe'}
            </button>
            <button
              onClick={() => { onSelectCategory('trainingsanzug'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-indigo-50 text-left text-indigo-800 font-bold"
            >
              🏃 {t.nav.trainingsanzug || 'Trainingsanzüge'}
            </button>
            <button
              onClick={() => { onSelectCategory('hoodies'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-violet-50 text-left text-violet-800 font-bold"
            >
              🧥 {t.nav.hoodies || 'Hoodies'}
            </button>
            <button
              onClick={() => { onSelectCategory('pullovers'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-purple-50 text-left text-purple-800 font-bold"
            >
              👕 {t.nav.pullovers || 'Pullover'}
            </button>
            <button
              onClick={() => { onSelectCategory('schinbeinschoe'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-amber-50 text-left text-amber-800 font-bold"
            >
              🛡️ {t.nav.schinbeinschoe || 'Schienbeinschoner'}
            </button>
            <button
              onClick={() => { onSelectCategory('socks'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-teal-50 text-left text-teal-800 font-bold"
            >
              🧦 {t.nav.socks || 'Stutzen & Socken'}
            </button>
            <button
              onClick={() => { onSelectCategory('teamwear'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-amber-50 text-left text-amber-800"
            >
              🏆 {t.nav.teamwear}
            </button>
            <button
              onClick={() => { onOpenWishlist(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-100 text-left text-slate-800 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.nav.wishlist || 'Merkzettel'} ({wishlistCount})</span>
            </button>

            {onToggleTheme && (
              <button
                onClick={() => { onToggleTheme(); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center justify-between border ${
                  theme === 'bright'
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-slate-800 text-slate-100 border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                  )}
                  <span>{theme === 'dark' ? 'Helles Design (Sunlight ☀️)' : 'Dunkles Design (Night 🌙)'}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-mono">
                  {theme === 'dark' ? 'Hell' : 'Dunkel'}
                </span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                const el = document.getElementById('vereinsshop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>🔒 Eigener Vereinsshop für dein Team (Anfragen)</span>
            </button>
            <button
              onClick={() => { if (onScrollToDtf) onScrollToDtf(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>{t.nav.dtfTransfers || 'DTF Bügel-Logos & Transfers (Neu 🔥)'}</span>
            </button>
            <a
              href="https://trikotsdesign.de/th-sports/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>⚡ Sportwelt Pro Portal (trikotsdesign.de)</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
            </a>
            <button
              onClick={() => { onScrollToConfigurator(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.configurator}</span>
            </button>
            <button
              onClick={() => { onOpenLogoModal(); setMobileMenuOpen(false); }}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.nav.customLogo}</span>
            </button>

            <div className="pt-2 flex items-center justify-between gap-2 text-xs border-t border-slate-100">
              <a
                href="tel:+4917657940581"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 hover:bg-slate-100"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Anrufen / WhatsApp</span>
              </a>
              <a
                href="mailto:th-sportwelt@outlook.de"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 hover:bg-slate-100"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>E-Mail</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
