import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Flame, Clock, Truck, RotateCcw } from 'lucide-react';
import { Language, ProductCategory, AppTheme, Product } from '../types';
import { translations } from '../data/translations';

interface HeroBannerProps {
  lang: Language;
  theme?: AppTheme;
  dealProduct?: Product;
  onSelectCategory: (cat: ProductCategory) => void;
  onScrollToConfigurator: () => void;
  onScrollToDtf?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  theme = 'dark',
  dealProduct,
  onSelectCategory,
  onScrollToConfigurator,
  onScrollToDtf
}) => {
  const t = translations[lang].hero;
  const isBright = theme === 'bright';

  // Countdown timer for Deal of the Day
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 38, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative transition-colors duration-500 overflow-hidden border-b ${
      isBright
        ? 'bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 text-slate-900 border-slate-200 shadow-xs'
        : 'bg-slate-950 text-white border-slate-800'
    }`}>
      {/* Background Graphic Patterns & Glows */}
      <div className={`absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] ${isBright ? 'opacity-25' : 'opacity-15'}`} />
      <div className={`absolute top-0 right-1/4 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isBright ? 'bg-emerald-300/30' : 'bg-emerald-500/15'}`} />
      <div className={`absolute -bottom-20 left-10 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isBright ? 'bg-sky-300/25' : 'bg-blue-600/15'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs ${
              isBright
                ? 'bg-emerald-100/90 border border-emerald-300 text-emerald-800'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isBright ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
              <span>{t.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] ${
              isBright ? 'text-slate-950' : 'text-white'
            }`}>
              {t.title}{' '}
              <span className={
                isBright 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300'
              }>
                {t.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
              isBright ? 'text-slate-600 font-medium' : 'text-slate-300'
            }`}>
              {t.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={onScrollToDtf}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm transition-all shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 group"
              >
                <Flame className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>🔥 DTF Bügel-Logos drucken</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('deals')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm transition-all shadow-lg hover:shadow-rose-600/25 flex items-center justify-center gap-2 group"
              >
                <Flame className="w-4 h-4 fill-white text-white" />
                <span>Hot Deals %</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectCategory('balls')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>⚽ Bälle ab 10 Stk.</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onScrollToConfigurator}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm border transition-all flex items-center justify-center gap-2 ${
                  isBright
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700 hover:border-emerald-500/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.ctaConfigurator}</span>
              </button>
            </div>

            {/* USPs / Trust stats */}
            <div className={`grid grid-cols-2 gap-3 pt-4 border-t text-left ${
              isBright ? 'border-slate-200' : 'border-slate-800/80'
            }`}>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className={`text-xs font-bold leading-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                    {t.stats.clubs}
                  </div>
                  <div className={`text-[10px] ${isBright ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
                    Kreis- bis Regionalliga
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-teal-600 shrink-0" />
                <div>
                  <div className={`text-xs font-bold leading-tight ${isBright ? 'text-slate-900' : 'text-white'}`}>
                    {t.stats.speed}
                  </div>
                  <div className={`text-[10px] ${isBright ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
                    DHL Express DE
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Deal des Tages or Teamwear Partner Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {dealProduct ? (
                /* Dynamic Deal Card (shown when an article with deal exists) */
                <div className={`rounded-3xl p-5 border shadow-2xl backdrop-blur-xl relative overflow-hidden group transition-colors ${
                  isBright
                    ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
                    : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700 text-white'
                }`}>
                  {/* Header Deal Tag + Countdown */}
                  <div className="flex items-center justify-between gap-2 mb-3 bg-rose-600/20 border border-rose-500/30 px-3 py-2 rounded-xl">
                    <div className="flex items-center gap-1.5 text-rose-500 text-xs font-black uppercase tracking-wider">
                      <Flame className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
                      <span>DEAL DES TAGES</span>
                    </div>
                    <div className={`flex items-center gap-1 text-[11px] font-mono font-bold ${isBright ? 'text-slate-800' : 'text-slate-200'}`}>
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </div>
                  </div>

                  <div 
                    className={`aspect-[4/3] rounded-2xl overflow-hidden relative mb-4 cursor-pointer ${isBright ? 'bg-slate-100' : 'bg-slate-950'}`}
                    onClick={() => onSelectCategory(dealProduct.category)}
                  >
                    <img
                      src={dealProduct.image}
                      alt={dealProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {dealProduct.discountPercentage && (
                        <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-sm">
                          -{dealProduct.discountPercentage}% RABATT
                        </span>
                      )}
                      {dealProduct.brand && (
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-emerald-400 font-bold text-xs">
                          {dealProduct.brand}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      {dealProduct.brand && <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">{dealProduct.brand}</div>}
                      <div className="text-lg font-black leading-tight">{lang === 'de' ? dealProduct.germanName : dealProduct.name}</div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-black text-emerald-400">{dealProduct.price.toFixed(2).replace('.', ',')} €</span>
                        {dealProduct.originalPrice && (
                          <span className="text-xs line-through text-slate-300 font-medium">
                            UVP {dealProduct.originalPrice.toFixed(2).replace('.', ',')} €
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mini Club Jersey Floating Badge */}
                  <div 
                    onClick={onScrollToConfigurator}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 cursor-pointer transition shadow-md ${
                      isBright 
                        ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-slate-900'
                        : 'bg-emerald-950/80 border-emerald-500/40 hover:bg-emerald-900/90 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-xl shadow-inner shrink-0 text-white">
                        👕
                      </div>
                      <div>
                        <div className={`text-xs font-black flex items-center gap-1.5 ${isBright ? 'text-slate-900' : 'text-white'}`}>
                          <span>Trikotsatz-Aktion für Vereine</span>
                          <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black text-[9px]">-30%</span>
                        </div>
                        <div className={`text-[11px] ${isBright ? 'text-emerald-700 font-semibold' : 'text-emerald-300'}`}>
                          Inkl. Wappen, Sponsor &amp; Rückennummern
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 ${isBright ? 'text-emerald-700' : 'text-emerald-400'}`} />
                  </div>
                </div>
              ) : (
                /* Ausrüster- & Druck-Studio Highlight Card (when no mock articles exist) */
                <div className={`rounded-3xl p-6 border shadow-2xl backdrop-blur-xl relative overflow-hidden group transition-colors ${
                  isBright
                    ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
                    : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border-slate-700 text-white'
                }`}>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      OFFIZIELLER VEREINSAUSRÜSTER
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Deutschland</span>
                  </div>

                  {/* Visual Header */}
                  <div className="relative rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/60 p-5 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">⚽ 👕 🛡️</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                        PREMIUM SERVICE
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white mb-1">
                      {lang === 'de' ? 'Individuelle Vereinsausstattung' : 'Custom Club Gear & Kits'}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'de'
                        ? 'Maßgeschneiderte Trikotsätze, DTF-Textildruck und Teampakete für Amateur- & Profivereine.'
                        : 'Custom match kits, DTF logo printing, and bulk teamwear for sports clubs.'}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2.5 mb-5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                      <span className={isBright ? 'text-slate-700 font-medium' : 'text-slate-300 font-medium'}>
                        {lang === 'de' ? 'DTF Bügel-Logos & Gang Sheet Meterware' : 'DTF transfers & gang sheet printing'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                      <span className={isBright ? 'text-slate-700 font-medium' : 'text-slate-300 font-medium'}>
                        {lang === 'de' ? 'Trikot-Konfigurator mit Sofort-Vorschau' : 'Kit configurator with live preview'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                      <span className={isBright ? 'text-slate-700 font-medium' : 'text-slate-300 font-medium'}>
                        {lang === 'de' ? 'Staffelpreise & Musterbox für Vereine' : 'Bulk club discounts & sizing sample box'}
                      </span>
                    </div>
                  </div>

                  {/* Mini Club Jersey Floating Badge */}
                  <div 
                    onClick={onScrollToConfigurator}
                    className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 cursor-pointer transition shadow-md ${
                      isBright 
                        ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-slate-900'
                        : 'bg-emerald-950/80 border-emerald-500/40 hover:bg-emerald-900/90 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-xl shadow-inner shrink-0 text-white">
                        👕
                      </div>
                      <div>
                        <div className={`text-xs font-black flex items-center gap-1.5 ${isBright ? 'text-slate-900' : 'text-white'}`}>
                          <span>Trikotsatz selbst gestalten</span>
                          <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black text-[9px]">LIVE</span>
                        </div>
                        <div className={`text-[11px] ${isBright ? 'text-emerald-700 font-semibold' : 'text-emerald-300'}`}>
                          Mit Vereinswappen, Sponsor &amp; Nummern
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 ${isBright ? 'text-emerald-700' : 'text-emerald-400'}`} />
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
