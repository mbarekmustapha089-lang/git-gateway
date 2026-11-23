import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Upload, 
  ShoppingBag, 
  FileText, 
  Check, 
  Shield, 
  Layers, 
  Palette, 
  Type, 
  Users, 
  Award,
  Info
} from 'lucide-react';
import { JerseyCustomization, Language, JerseyPattern, CollarType } from '../types';
import { JerseyCanvas } from './JerseyCanvas';
import { CLUB_PRESET_CRESTS } from '../data/products';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

interface ClubKitConfiguratorProps {
  lang: Language;
  onAddToCart?: (customization: JerseyCustomization) => void;
  onAddKitToCart?: (customization: JerseyCustomization) => void;
  onRequestOffer?: (customization: JerseyCustomization) => void;
}

const DEFAULT_CUSTOMIZATION: JerseyCustomization = {
  id: 'custom-kit-1',
  templateName: 'Sportwelt Pro Match Kit',
  pattern: 'stripes-vertical',
  primaryColor: '#DC2626', // Team Red
  secondaryColor: '#FFFFFF', // White
  accentColor: '#1E293B', // Dark Slate
  collarColor: '#1E293B',
  collarType: 'vneck',
  sleeveTrimColor: '#1E293B',
  clubName: 'SV KICKERS 1924',
  clubCrestUrl: null,
  clubCrestPreset: 'crest-eagle',
  sponsorText: 'KREISSPARKASSE',
  sponsorLogoUrl: null,
  sponsorColor: '#FFFFFF',
  playerName: 'MÜLLER',
  playerNumber: '10',
  numberColor: '#FFFFFF',
  numberFont: 'athletic',
  sleeveBadge: 'dfb-kreisliga',
  fabricType: 'pro-breathe',
  quantities: {
    s: 0,
    m: 1,
    l: 0,
    xl: 0,
    xxl: 0,
    gk_m: 0,
    gk_l: 0
  },
  unitPrice: 49.90
};

const COLOR_PALETTES = [
  { name: 'Klassisch Rot / Weiß', primary: '#DC2626', secondary: '#FFFFFF', accent: '#1E293B' },
  { name: 'Königsblau / Weiß', primary: '#2563EB', secondary: '#FFFFFF', accent: '#0F172A' },
  { name: 'Schwarz / Gelb', primary: '#111827', secondary: '#FACC15', accent: '#FACC15' },
  { name: 'Smaragdgrün / Weiß', primary: '#16A34A', secondary: '#FFFFFF', accent: '#14532D' },
  { name: 'Edel Schwarz / Gold', primary: '#0F172A', secondary: '#CA8A04', accent: '#EAB308' },
  { name: 'Marineblau / Himmelblau', primary: '#1E3A8A', secondary: '#38BDF8', accent: '#FFFFFF' },
  { name: 'Bordeaux / Gold', primary: '#7F1D1D', secondary: '#EAB308', accent: '#FEF08A' },
  { name: 'Neon Orange / Anthrazit', primary: '#EA580C', secondary: '#1F2937', accent: '#F97316' }
];

export const ClubKitConfigurator: React.FC<ClubKitConfiguratorProps> = ({
  lang,
  onAddToCart,
  onAddKitToCart,
  onRequestOffer
}) => {
  const [config, setConfig] = useState<JerseyCustomization>(DEFAULT_CUSTOMIZATION);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [activeTab, setActiveTab] = useState<'colors' | 'branding' | 'back' | 'sizes'>('colors');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [offerSent, setOfferSent] = useState(false);

  const t = translations[lang].configurator;

  // Calculate total quantities
  const totalOutfield = config.quantities.s + config.quantities.m + config.quantities.l + config.quantities.xl + config.quantities.xxl;
  const totalGoalkeepers = config.quantities.gk_m + config.quantities.gk_l;
  const totalKits = totalOutfield + totalGoalkeepers;

  // Fixed unit price: 49.90 € per jersey (no tiered discounts, 1 to 100 jerseys)
  const unitPrice = 49.90;
  const totalPrice = (totalKits * unitPrice).toFixed(2);

  const handleCrestUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({ ...prev, clubCrestUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSponsorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({ ...prev, sponsorLogoUrl: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuantityChange = (key: keyof typeof config.quantities, val: number) => {
    const rawVal = isNaN(val) ? 0 : Math.max(0, Math.floor(val));
    // Calculate total of all other sizes
    const otherKits = (Object.keys(config.quantities) as Array<keyof typeof config.quantities>).reduce<number>(
      (sum, k) => (k === key ? sum : sum + (config.quantities[k] || 0)),
      0
    );
    // Enforce 0 to 100 total jerseys allowed
    const safeVal = Math.min(100 - otherKits, rawVal);
    setConfig(prev => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [key]: Math.max(0, safeVal)
      }
    }));
  };

  const handleAdd = () => {
    const finalConfig = { ...config, unitPrice };
    if (onAddKitToCart) {
      onAddKitToCart(finalConfig);
    } else if (onAddToCart) {
      onAddToCart(finalConfig);
    }
    setAddedSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleRequestOffer = () => {
    const finalConfig = { ...config, unitPrice };
    if (onRequestOffer) {
      onRequestOffer(finalConfig);
    }
    setOfferSent(true);
    setTimeout(() => setOfferSent(false), 3000);
  };

  return (
    <section id="trikot-konfigurator" className="py-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Main 2-Column Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Visual Canvas & View Switcher (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60 shadow-2xl relative flex flex-col items-center">
              
              {/* Rotation & View Pill */}
              <div className="flex items-center gap-2 mb-4 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveView('front')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeView === 'front'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.viewFront}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('back')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeView === 'back'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.viewBack}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView(prev => prev === 'front' ? 'back' : 'front')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Ansicht drehen"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real-time SVG Canvas */}
              <div className="w-full aspect-[4/5] max-h-[460px] flex items-center justify-center">
                <JerseyCanvas
                  customization={config}
                  view={activeView}
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Quick Badges */}
              <div className="w-full pt-4 mt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sublimations-Druck</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>4 Jahre Nachbestellgarantie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-700/60 shadow-2xl flex flex-col">
            
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-6 p-1 bg-slate-900/80 rounded-xl border border-slate-700/80 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('colors')}
                className={`py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'colors' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1. Design</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('branding')}
                className={`py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'branding' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">2. Wappen</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('back')}
                className={`py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'back' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3. Rücken</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sizes')}
                className={`py-2.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  activeTab === 'sizes' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">4. Größen</span>
              </button>
            </div>

            {/* TAB 1: DESIGN, PATTERNS & COLORS */}
            {activeTab === 'colors' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Preset Club Color Themes */}
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                    Beliebte Vereins-Farbschemata
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {COLOR_PALETTES.map((palette, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          primaryColor: palette.primary,
                          secondaryColor: palette.secondary,
                          accentColor: palette.accent,
                          collarColor: palette.accent,
                          sleeveTrimColor: palette.accent
                        }))}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 transition text-left flex items-center gap-2 group"
                      >
                        <div className="flex -space-x-1.5 overflow-hidden">
                          <div className="w-4 h-4 rounded-full border border-slate-800" style={{ backgroundColor: palette.primary }} />
                          <div className="w-4 h-4 rounded-full border border-slate-800" style={{ backgroundColor: palette.secondary }} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white truncate">
                          {palette.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pattern Selection */}
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                    {t.pattern}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'stripes-vertical', name: 'Längsstreifen' },
                      { id: 'stripes-horizontal', name: 'Querstreifen' },
                      { id: 'geometric-mesh', name: 'High-Tech Mesh' },
                      { id: 'dynamic-sash', name: 'Diagonalschärpe' },
                      { id: 'half-half', name: 'Halb & Halb' },
                      { id: 'modern-hex', name: 'Wabenmuster' },
                      { id: 'solid-clean', name: 'Klassisch Schlicht' },
                      { id: 'gradient-fade', name: 'Farbverlauf' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, pattern: p.id as JerseyPattern }))}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                          config.pattern === p.id
                            ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-inner'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specific Colors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">{t.primaryColor}</label>
                    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-300">{config.primaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">{t.secondaryColor}</label>
                    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                      <input
                        type="color"
                        value={config.secondaryColor}
                        onChange={(e) => setConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-300">{config.secondaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">{t.collarColor}</label>
                    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                      <input
                        type="color"
                        value={config.collarColor}
                        onChange={(e) => setConfig(prev => ({ ...prev, collarColor: e.target.value }))}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-300">{config.collarColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">{t.collarType}</label>
                    <select
                      value={config.collarType}
                      onChange={(e) => setConfig(prev => ({ ...prev, collarType: e.target.value as CollarType }))}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2 px-2.5 text-xs focus:ring-emerald-500"
                    >
                      <option value="vneck">V-Ausschnitt</option>
                      <option value="round">Rundhals</option>
                      <option value="polo">Polo-Kragen (+2 €)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CREST & SPONSOR */}
            {activeTab === 'branding' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Club Crest Upload / Preset */}
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                    {t.clubCrestTitle}
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <label className="flex items-center justify-center gap-2 p-3.5 border border-dashed border-emerald-500/50 hover:border-emerald-400 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 cursor-pointer transition text-xs font-semibold text-emerald-300">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>{t.uploadCrest}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCrestUpload}
                      />
                    </label>

                    {config.clubCrestUrl && (
                      <button
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, clubCrestUrl: null }))}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                      >
                        Hochgeladenes Wappen entfernen
                      </button>
                    )}
                  </div>

                  {/* Preset Badges */}
                  <span className="text-xs text-slate-400 mb-2 block">{t.choosePresetCrest}</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {CLUB_PRESET_CRESTS.map((crest) => (
                      <button
                        key={crest.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, clubCrestPreset: crest.id, clubCrestUrl: null }))}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                          config.clubCrestPreset === crest.id && !config.clubCrestUrl
                            ? 'bg-emerald-600/30 border-emerald-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-xl">{crest.icon}</span>
                        <span className="text-[10px] truncate max-w-full font-medium">{crest.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Front Sponsor */}
                <div className="pt-3 border-t border-slate-700">
                  <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                    {t.sponsorTitle}
                  </label>
                  
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={config.sponsorText}
                        onChange={(e) => setConfig(prev => ({ ...prev, sponsorText: e.target.value.toUpperCase() }))}
                        placeholder={t.sponsorPlaceholder}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2.5 px-3 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">{t.sponsorColor}</label>
                        <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                          <input
                            type="color"
                            value={config.sponsorColor}
                            onChange={(e) => setConfig(prev => ({ ...prev, sponsorColor: e.target.value }))}
                            className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                          />
                          <span className="text-xs font-mono text-slate-300">{config.sponsorColor}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Optional: Sponsor-Logo</label>
                        <label className="flex items-center justify-center gap-2 p-2 border border-slate-700 hover:border-slate-500 rounded-xl bg-slate-900 cursor-pointer text-xs text-slate-300 transition">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{config.sponsorLogoUrl ? 'Logo ändern' : 'Grafik hochladen'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleSponsorUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sleeve Badges */}
                <div className="pt-3 border-t border-slate-700">
                  <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                    {t.sleeveBadge}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'none', label: 'Ohne Badge' },
                      { id: 'dfb-kreisliga', label: '🇩🇪 Kreisliga / Verband' },
                      { id: 'fairplay', label: '🤝 Fair Play Liga' },
                      { id: 'sportwelt-pro', label: '⚡ Sportwelt Pro' }
                    ].map((badge) => (
                      <button
                        key={badge.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, sleeveBadge: badge.id as any }))}
                        className={`p-2.5 rounded-xl border font-semibold transition ${
                          config.sleeveBadge === badge.id
                            ? 'bg-emerald-600/30 border-emerald-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        {badge.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BACK PRINT & NUMBERS */}
            {activeTab === 'back' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-xs text-blue-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Klicke auf &quot;Rückseite&quot; am Trikot, um deine Änderungen live zu sehen.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                      {t.backClubHeader}
                    </label>
                    <input
                      type="text"
                      value={config.clubName}
                      onChange={(e) => setConfig(prev => ({ ...prev, clubName: e.target.value.toUpperCase() }))}
                      placeholder="z.B. SV HAMBURG 1919"
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2.5 px-3 text-sm focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                      {t.backPlayerName}
                    </label>
                    <input
                      type="text"
                      value={config.playerName}
                      onChange={(e) => setConfig(prev => ({ ...prev, playerName: e.target.value.toUpperCase() }))}
                      placeholder="z.B. MÜLLER oder KROOS"
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2.5 px-3 text-sm focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                      {t.backNumber}
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={config.playerNumber}
                      onChange={(e) => setConfig(prev => ({ ...prev, playerNumber: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2 px-3 text-sm font-mono focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                      Druckfarbe (Rücken)
                    </label>
                    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
                      <input
                        type="color"
                        value={config.numberColor}
                        onChange={(e) => setConfig(prev => ({ ...prev, numberColor: e.target.value }))}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-300">{config.numberColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">
                      {t.numberFont}
                    </label>
                    <select
                      value={config.numberFont}
                      onChange={(e) => setConfig(prev => ({ ...prev, numberFont: e.target.value as any }))}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2.5 px-2.5 text-xs focus:ring-emerald-500"
                    >
                      <option value="athletic">Sportlich Modern (Bold)</option>
                      <option value="block">Block Modern</option>
                      <option value="classic">Klassisch Serif</option>
                      <option value="modern">Futuristisch</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SIZES & SQUAD QUANTITIES */}
            {activeTab === 'sizes' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Feldspieler-Größen (Trikot + Hose)
                    </label>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Bestellbar: 1 bis 100 Trikots ({totalKits}/100 gewählt)
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {(['s', 'm', 'l', 'xl', 'xxl'] as const).map((sz) => (
                      <div key={sz} className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center">
                        <span className="text-xs uppercase font-extrabold text-slate-300 block mb-1">
                          {sz.toUpperCase()}
                        </span>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(sz, config.quantities[sz] - 1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={config.quantities[sz]}
                            onChange={(e) => handleQuantityChange(sz, parseInt(e.target.value, 10) || 0)}
                            className="w-9 text-center font-bold text-emerald-400 text-xs bg-slate-950 border border-slate-700 rounded py-0.5"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(sz, config.quantities[sz] + 1)}
                            disabled={totalKits >= 100}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-white font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Torwart */}
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs uppercase font-bold text-amber-400 tracking-wider">
                      🧤 Torwart-Trikotsatz (Gepolstert)
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    {(['gk_m', 'gk_l'] as const).map((sz) => (
                      <div key={sz} className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-center">
                        <span className="text-xs uppercase font-bold text-amber-300 block mb-1">
                          TW {sz === 'gk_m' ? 'Größe M' : 'Größe L/XL'}
                        </span>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(sz, config.quantities[sz] - 1)}
                            className="w-7 h-7 rounded bg-slate-800 text-white font-bold"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={config.quantities[sz]}
                            onChange={(e) => handleQuantityChange(sz, parseInt(e.target.value, 10) || 0)}
                            className="w-12 text-center font-bold text-amber-300 text-sm bg-slate-950 border border-amber-500/30 rounded py-0.5"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(sz, config.quantities[sz] + 1)}
                            disabled={totalKits >= 100}
                            className="w-7 h-7 rounded bg-slate-800 disabled:opacity-30 text-white font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Bottom Pricing & Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{totalKits} {totalKits === 1 ? 'Trikot' : 'Trikots'} im Satz</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px] border border-slate-700">
                    1 – 100 Stück bestellbar
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-white">{totalPrice} €</span>
                  <span className="text-xs text-emerald-400 font-semibold">(49,90 € / Stk.)</span>
                </div>
                {totalKits === 0 && (
                  <div className="text-[11px] text-amber-400 font-medium mt-1">
                    Bitte wähle mindestens 1 Trikot aus (1 bis 100 Stück).
                  </div>
                )}
                {totalKits >= 100 && (
                  <div className="text-[11px] text-amber-400 font-medium mt-1">
                    Maximale Bestellmenge von 100 Trikots erreicht.
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRequestOffer}
                  disabled={totalKits < 1 || totalKits > 100}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-600 hover:border-slate-400 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{offerSent ? 'Angebot generiert! 📄' : 'Angebot als PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={totalKits < 1 || totalKits > 100}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black transition shadow-lg flex items-center justify-center gap-2 ${
                    totalKits < 1 || totalKits > 100
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-900/30'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Trikotsatz hinzugefügt!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.addKitToCart}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
