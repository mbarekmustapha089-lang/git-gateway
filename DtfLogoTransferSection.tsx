import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  Flame, 
  HelpCircle, 
  Maximize2, 
  Copy, 
  RefreshCw, 
  Scissors, 
  Grid, 
  Shirt, 
  Shield, 
  Check, 
  ChevronRight, 
  Award, 
  Sliders
} from 'lucide-react';
import { Language, DtfTransferFinish, DtfTransferMode, DtfTransferItem, AppTheme } from '../types';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

interface DtfLogoTransferSectionProps {
  lang: Language;
  theme?: AppTheme;
  onAddDtfToCart: (item: DtfTransferItem) => void;
}

// Preset standard sizes in cm
const SIZE_PRESETS = [
  { id: 'crest-chest', nameDe: 'Brustwappen (Standard)', nameEn: 'Chest Crest (Standard)', w: 8, h: 8, popular: true, tag: 'Bestseller Trikot' },
  { id: 'crest-mini', nameDe: 'Ärmel-Logo / Mini', nameEn: 'Sleeve / Mini Badge', w: 6.5, h: 6.5, popular: false, tag: 'Ärmel / Hose' },
  { id: 'crest-pocket', nameDe: 'Brusttasche / Groß', nameEn: 'Pocket / Large Crest', w: 10, h: 10, popular: false, tag: 'Trainingsjacke' },
  { id: 'sponsor-front', nameDe: 'Brustsponsor (Erwachsene)', nameEn: 'Front Sponsor (Adults)', w: 25, h: 8, popular: true, tag: 'Hauptsponsor' },
  { id: 'sponsor-kids', nameDe: 'Brustsponsor (Jugend)', nameEn: 'Front Sponsor (Youth)', w: 20, h: 6.5, popular: false, tag: 'Jugendtrikot' },
  { id: 'back-club', nameDe: 'Rückenbogen Vereinsname', nameEn: 'Back Club Name Arch', w: 28, h: 7.5, popular: false, tag: 'Rückendruck' },
  { id: 'large-a4', nameDe: 'Großformat DIN A4', nameEn: 'Large Print (DIN A4)', w: 28, h: 20, popular: false, tag: 'Hoodie / Tasche' },
  { id: 'custom', nameDe: 'Freie Maßeingabe (cm)', nameEn: 'Custom Dimensions (cm)', w: 12, h: 12, popular: false, tag: 'Millimetergenau' }
];

// Finishes
const FINISH_OPTIONS: { id: DtfTransferFinish; nameDe: string; nameEn: string; descDe: string; descEn: string; extraPerCm2: number; badge?: string }[] = [
  { 
    id: 'standard-dtf', 
    nameDe: 'DTF Premium Ultra-Vibrant', 
    nameEn: 'DTF Premium Ultra-Vibrant', 
    descDe: '100% deckende weiße Unterlegung, brillante Farben, extrem elastisch & 60°C waschbar.', 
    descEn: '100% opaque white backing, vibrant colors, ultra stretchable & 60°C wash proof.',
    extraPerCm2: 0,
    badge: 'Standard'
  },
  { 
    id: 'metallic-gold', 
    nameDe: 'DTF Metallic Gold ✨', 
    nameEn: 'DTF Metallic Gold ✨', 
    descDe: 'Echtes Gold-Schimmern, perfekt für Meistersterne, Jubiläumswappen & Pokale.', 
    descEn: 'Authentic gold metallic shimmer, ideal for championship stars & anniversary crests.',
    extraPerCm2: 0.004,
    badge: 'Edel'
  },
  { 
    id: 'metallic-silver', 
    nameDe: 'DTF Metallic Silber 🥈', 
    nameEn: 'DTF Metallic Silver 🥈', 
    descDe: 'Hochwertiger Silberschein mit metallischer Lichtbrechung.', 
    descEn: 'High-end silver sheen with metallic light refraction.',
    extraPerCm2: 0.004
  },
  { 
    id: 'reflective-3m', 
    nameDe: 'Reflex 3M Silber 🦺', 
    nameEn: 'Reflective 3M Silver 🦺', 
    descDe: 'Stark reflektierend bei Lichteinfall, optimal für Abendsport & Sicherheit.', 
    descEn: 'Highly reflective when hit by lights, optimal for nighttime safety.',
    extraPerCm2: 0.006,
    badge: 'Sicherheit'
  },
  { 
    id: 'silicone-3d', 
    nameDe: '3D Silikon Haptik-Effekt 🛡️', 
    nameEn: '3D Silicone Tactile Finish 🛡️', 
    descDe: 'Erhabenes 0.6mm gummiertes Relief wie bei Profi-Bundesliga-Wappen.', 
    descEn: 'Raised 0.6mm rubberized relief similar to pro league team crests.',
    extraPerCm2: 0.008,
    badge: 'Profi-Look'
  },
  { 
    id: 'neon-glow', 
    nameDe: 'Neon Ultra Glow ⚡', 
    nameEn: 'Neon Ultra Glow ⚡', 
    descDe: 'Intensive Leuchtfarben (Neon-Gelb, Neon-Pink, Neon-Grün) für maximale Aufmerksamkeit.', 
    descEn: 'High-visibility neon colors for maximum contrast and eye-catching appearance.',
    extraPerCm2: 0.005
  }
];

// Gang Sheet Options (Width is standard 56cm for DTF rolls)
const GANG_SHEET_PRESETS = [
  { meters: 0.5, lengthCm: 50, price: 12.90, label: '0,5 Meter (56 × 50 cm)', estCrests: 'ca. 24-28 Brustwappen' },
  { meters: 1.0, lengthCm: 100, price: 19.90, label: '1,0 Meter (56 × 100 cm)', estCrests: 'ca. 50-60 Brustwappen', popular: true },
  { meters: 2.0, lengthCm: 200, price: 37.90, label: '2,0 Meter (56 × 200 cm)', estCrests: 'ca. 110-125 Brustwappen' },
  { meters: 5.0, lengthCm: 500, price: 84.90, label: '5,0 Meter Vereins-Rolle', estCrests: 'ca. 280-320 Brustwappen', discount: 'Bester m² Preis' }
];


export const DtfLogoTransferSection: React.FC<DtfLogoTransferSectionProps> = ({
  lang,
  theme = 'dark',
  onAddDtfToCart
}) => {
  const t = translations[lang]?.dtfStudio || translations.de.dtfStudio;
  const isBright = theme === 'bright';

  const [mode, setMode] = useState<DtfTransferMode>('single');
  const [selectedPreset, setSelectedPreset] = useState<string>('crest-chest');
  const [widthCm, setWidthCm] = useState<number>(8);
  const [heightCm, setHeightCm] = useState<number>(8);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [finish, setFinish] = useState<DtfTransferFinish>('standard-dtf');
  const [quantity, setQuantity] = useState<number>(20);
  
  // Gang sheet state
  const [selectedGangSheet, setSelectedGangSheet] = useState<number>(1.0); // 1 meter
  
  // Preview visual state
  const [previewTab, setPreviewTab] = useState<'film' | 'jersey' | 'hoodie' | 'sheet'>('film');
  const [mockupColor, setMockupColor] = useState<string>('#0f172a'); // slate-900
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [customLogoName, setCustomLogoName] = useState<string>('Eigenes Logo');
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [showAddedAlert, setShowAddedAlert] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle preset selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const found = SIZE_PRESETS.find(p => p.id === presetId);
    if (found && presetId !== 'custom') {
      setWidthCm(found.w);
      setHeightCm(found.h);
    }
  };

  // Handle width change with aspect lock
  const handleWidthChange = (newW: number) => {
    const val = Math.max(1, Math.min(56, newW));
    if (lockAspect && widthCm > 0) {
      const ratio = heightCm / widthCm;
      setHeightCm(Number((val * ratio).toFixed(1)));
    }
    setWidthCm(val);
  };

  // Handle height change with aspect lock
  const handleHeightChange = (newH: number) => {
    const val = Math.max(1, Math.min(100, newH));
    if (lockAspect && heightCm > 0) {
      const ratio = widthCm / heightCm;
      setWidthCm(Number((val * ratio).toFixed(1)));
    }
    setHeightCm(val);
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomLogoUrl(event.target.result as string);
          setCustomLogoName(file.name.replace(/\.[^/.]+$/, ''));
          setIsCustomUpload(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Pricing calculation
  const calculatePricing = () => {
    if (mode === 'gang-sheet') {
      const sheet = GANG_SHEET_PRESETS.find(s => s.meters === selectedGangSheet) || GANG_SHEET_PRESETS[1];
      const selectedFinishObj = FINISH_OPTIONS.find(f => f.id === finish);
      const finishSurcharge = selectedFinishObj ? selectedFinishObj.extraPerCm2 * (56 * sheet.lengthCm) * 0.4 : 0;
      const unitPrice = Number((sheet.price + finishSurcharge).toFixed(2));
      const subtotal = Number((unitPrice * quantity).toFixed(2));
      
      // Calculate how many fit on sheet
      const paddingCm = 0.8;
      const effectiveW = widthCm + paddingCm;
      const effectiveH = heightCm + paddingCm;
      const cols = Math.floor(56 / effectiveW);
      const rows = Math.floor(sheet.lengthCm / effectiveH);
      const estItemsOnSheet = Math.max(1, cols * rows);

      return {
        unitPrice,
        subtotal,
        discountPercent: sheet.meters >= 5 ? 25 : (sheet.meters >= 2 ? 15 : 0),
        estItemsOnSheet,
        costPerSingleTransfer: Number((unitPrice / estItemsOnSheet).toFixed(2))
      };
    } else {
      // Single transfer formula: fixed 2.50 € per piece (plus finish surcharge if selected)
      const areaCm2 = widthCm * heightCm;
      const selectedFinishObj = FINISH_OPTIONS.find(f => f.id === finish);
      const finishExtra = selectedFinishObj ? selectedFinishObj.extraPerCm2 * areaCm2 : 0;
      
      const unitPrice = Number((2.50 + finishExtra).toFixed(2));
      const subtotal = Number((unitPrice * quantity).toFixed(2));

      return {
        unitPrice,
        subtotal,
        discountPercent: 0,
        baseUnitPrice: unitPrice
      };
    }
  };

  const pricing = calculatePricing();

  // Add to cart handler
  const handleAddToCart = () => {
    const item: DtfTransferItem = {
      id: `dtf-${Date.now()}`,
      mode,
      title: mode === 'gang-sheet' 
        ? `DTF Gang Sheet (${selectedGangSheet}m × 56cm) - ${customLogoName}`
        : `DTF Transfer-Logo (${widthCm} × ${heightCm} cm) - ${customLogoName}`,
      logoUrl: customLogoUrl,
      logoName: customLogoName,
      widthCm,
      heightCm,
      sheetLengthMeters: mode === 'gang-sheet' ? selectedGangSheet : undefined,
      sheetWidthCm: 56,
      finish,
      quantity,
      unitPrice: pricing.unitPrice,
      subtotal: pricing.subtotal,
      itemsOnSheet: mode === 'gang-sheet' ? pricing.estItemsOnSheet : undefined,
      placementType: SIZE_PRESETS.find(p => p.id === selectedPreset)?.nameDe || 'Individuell'
    };

    onAddDtfToCart(item);
    setShowAddedAlert(true);

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setShowAddedAlert(false);
    }, 3500);
  };

  return (
    <section id="dtf-transfers-section" className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Visual Accent Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Mode Switch Tabs (Single Transfers vs Gang Sheet) */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-lg mt-4">
            <button
              type="button"
              onClick={() => {
                setMode('single');
                setPreviewTab('film');
                if (quantity < 20) setQuantity(20);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mode === 'single'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>{t.modeSingle}</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode('gang-sheet'); setPreviewTab('sheet'); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mode === 'gang-sheet'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{t.modeGangSheet}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
                Meterware
              </span>
            </button>
          </div>
        </div>

        {/* Builder Studio Grid: Left Configurator / Right Live Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Controls & Upload (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Upload Artwork / Logo */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">{t.uploadTitle}</h3>
                </div>
                {isCustomUpload && (
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Eigenes Motiv geladen
                  </span>
                )}
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-5 text-center cursor-pointer transition bg-slate-950/40 hover:bg-slate-800/40"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center mx-auto transition duration-200">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="mt-3">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition">
                    Datei hierher ziehen oder durchsuchen
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                    {t.uploadHint}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Dimensions & Sizing (or Gang Sheet Length) */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {mode === 'gang-sheet' ? t.meterSheetOption : t.sizeAndDims}
                </h3>
              </div>

              {mode === 'gang-sheet' ? (
                /* Gang sheet length presets */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GANG_SHEET_PRESETS.map((gs) => (
                    <button
                      key={gs.meters}
                      type="button"
                      onClick={() => setSelectedGangSheet(gs.meters)}
                      className={`p-4 rounded-2xl border text-left relative transition ${
                        selectedGangSheet === gs.meters
                          ? 'border-emerald-500 bg-emerald-950/30 text-white ring-1 ring-emerald-500'
                          : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {gs.popular && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] uppercase">
                          Bestseller
                        </span>
                      )}
                      {gs.discount && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase">
                          {gs.discount}
                        </span>
                      )}
                      <div className="font-extrabold text-sm text-white">{gs.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{gs.estCrests}</div>
                      <div className="mt-3 text-emerald-400 font-black text-base">
                        {gs.price.toFixed(2)} € <span className="text-[10px] text-slate-400 font-normal">/ Rolle</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Single transfer size presets & custom cm inputs */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SIZE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`p-2.5 rounded-xl border text-left transition relative ${
                          selectedPreset === preset.id
                            ? 'border-emerald-500 bg-emerald-950/40 text-white ring-1 ring-emerald-500'
                            : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{preset.tag}</div>
                        <div className="text-xs font-bold text-white truncate mt-0.5">
                          {lang === 'de' ? preset.nameDe : preset.nameEn}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 font-mono">
                          {preset.id === 'custom' ? 'Beliebig' : `${preset.w} × ${preset.h} cm`}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Millimeter precise inputs */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          {t.width}
                        </label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="2"
                            max="56"
                            step="0.5"
                            value={widthCm}
                            onChange={(e) => handleWidthChange(parseFloat(e.target.value) || 2)}
                            className="w-20 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white text-center focus:border-emerald-500 focus:outline-none"
                          />
                          <span className="text-xs text-slate-400 font-semibold">cm</span>
                        </div>
                      </div>

                      <span className="text-slate-500 font-black text-sm pt-4">×</span>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          {t.height}
                        </label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="2"
                            max="100"
                            step="0.5"
                            value={heightCm}
                            onChange={(e) => handleHeightChange(parseFloat(e.target.value) || 2)}
                            className="w-20 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white text-center focus:border-emerald-500 focus:outline-none"
                          />
                          <span className="text-xs text-slate-400 font-semibold">cm</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLockAspect(!lockAspect)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                        lockAspect
                          ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>{t.lockAspect}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Finish / Foil Selection */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">{t.finishTitle}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FINISH_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinish(f.id)}
                    className={`p-3.5 rounded-2xl border text-left transition relative ${
                      finish === f.id
                        ? 'border-emerald-500 bg-emerald-950/30 text-white ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {f.badge && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[9px] uppercase">
                        {f.badge}
                      </span>
                    )}
                    <div className="font-bold text-xs text-white">
                      {lang === 'de' ? f.nameDe : f.nameEn}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {lang === 'de' ? f.descDe : f.descEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Quantity & Bulk Discount Tiers */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                    4
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">{t.quantityTitle}</h3>
                </div>

                <span className="text-xs text-emerald-400 font-bold">
                  {mode === 'single' ? 'Mindestbestellmenge: 20 Stück' : (pricing.discountPercent > 0 ? `🎉 ${pricing.discountPercent}% Vereinsrabatt aktiv` : 'Meterware')}
                </span>
              </div>

              {/* Quantity quick buttons & input */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      const minQ = mode === 'single' ? 20 : 1;
                      const step = quantity > 25 ? 5 : 1;
                      setQuantity(Math.max(minQ, quantity - step));
                    }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-300 font-black"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={mode === 'single' ? 20 : 1}
                    max="5000"
                    value={quantity}
                    onChange={(e) => {
                      const minQ = mode === 'single' ? 20 : 1;
                      setQuantity(Math.max(minQ, parseInt(e.target.value) || minQ));
                    }}
                    className="w-16 text-center bg-transparent text-sm font-black text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + (quantity >= 20 ? 5 : 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-300 font-black"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(mode === 'single' ? [20, 30, 50, 100, 250] : [1, 2, 5, 10, 20, 50]).map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                        quantity === qty
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {qty} {mode === 'gang-sheet' ? 'Rollen' : 'Stk.'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature & Info Badges */}
              {mode === 'single' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { tier: 'Mindestmenge', desc: 'Ab 20 Stück bestellbar', active: true },
                    { tier: 'Stückpreis', desc: '2,50 € / Transfer', active: true },
                    { tier: 'Ultra-HD DTF', desc: '100% Farbbrillanz & Deckung', active: false },
                    { tier: 'Express-Druck', desc: 'Versandfertig in 24-48h', active: false }
                  ].map((tItem) => (
                    <div
                      key={tItem.tier}
                      className={`p-2 rounded-xl border text-center transition text-xs ${
                        tItem.active
                          ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold'
                          : 'border-slate-800 bg-slate-950/30 text-slate-400'
                      }`}
                    >
                      <div className="font-extrabold">{tItem.tier}</div>
                      <div className="text-[10px] text-slate-400">{tItem.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Live Visualizer & Add to Cart (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Live Interactive Preview Box */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h3 className="font-extrabold text-sm text-white">{t.previewTitle}</h3>
                </div>

                {/* View switcher tabs */}
                <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('film')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      previewTab === 'film' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PET Folie
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('jersey')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      previewTab === 'jersey' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Trikot
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('hoodie')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      previewTab === 'hoodie' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hoodie
                  </button>
                </div>
              </div>

              {/* Canvas Visual Area */}
              <div 
                className="w-full aspect-square rounded-2xl relative overflow-hidden flex items-center justify-center p-6 transition-all duration-300 border border-slate-800 shadow-inner"
                style={{
                  backgroundColor: previewTab === 'film' ? '#0b1120' : mockupColor,
                  backgroundImage: previewTab === 'film' 
                    ? 'radial-gradient(#1e293b 1px, transparent 1px)' 
                    : undefined,
                  backgroundSize: '16px 16px'
                }}
              >
                {/* Metric grid overlay when on film */}
                {previewTab === 'film' && (
                  <div className="absolute inset-0 border border-emerald-500/20 pointer-events-none flex flex-col justify-between p-2 text-[9px] text-slate-500 font-mono">
                    <div className="flex justify-between">
                      <span>0 cm</span>
                      <span className="text-emerald-400">DTF HOT PEEL FILM</span>
                      <span>56 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>B: {widthCm} cm</span>
                      <span>H: {heightCm} cm</span>
                    </div>
                  </div>
                )}

                {/* Garment Mockup Texture */}
                {previewTab === 'jersey' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <Shirt className="w-80 h-80 text-white stroke-[0.5]" />
                  </div>
                )}

                {/* Centered Logo Preview Element */}
                <div 
                  className="relative transition-all duration-300 flex items-center justify-center group"
                  style={{
                    width: mode === 'gang-sheet' ? '85%' : `${Math.min(90, Math.max(30, widthCm * 3.8))}%`,
                    maxHeight: '85%'
                  }}
                >
                  {mode === 'gang-sheet' ? (
                    /* Gang Sheet Simulation Grid */
                    <div className="w-full grid grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-950/80 border border-dashed border-emerald-500/50 shadow-2xl">
                      {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="aspect-square bg-slate-900/60 rounded-lg p-1.5 border border-slate-800 flex items-center justify-center">
                          {customLogoUrl ? (
                            <img
                              src={customLogoUrl}
                              alt="gang item"
                              className="max-h-full max-w-full object-contain filter drop-shadow-md"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full rounded border border-dashed border-slate-700 flex items-center justify-center text-[9px] text-slate-600 font-mono">
                              Logo
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Single Logo with sheen & badge */
                    <div className="relative">
                      {/* Finish Specific FX */}
                      {customLogoUrl && finish === 'metallic-gold' && (
                        <div className="absolute -inset-1 rounded-2xl bg-amber-400/20 blur-md pointer-events-none" />
                      )}
                      {customLogoUrl && finish === 'reflective-3m' && (
                        <div className="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-md pointer-events-none" />
                      )}
                      {customLogoUrl && finish === 'silicone-3d' && (
                        <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 blur-md pointer-events-none" />
                      )}

                      {customLogoUrl ? (
                        <img
                          src={customLogoUrl}
                          alt={customLogoName}
                          className={`max-h-56 max-w-full object-contain transition duration-300 filter ${
                            finish === 'metallic-gold' ? 'contrast-125 sepia-50 brightness-110 drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]' :
                            finish === 'reflective-3m' ? 'contrast-125 brightness-125 drop-shadow-[0_4px_12px_rgba(147,197,253,0.5)]' :
                            finish === 'silicone-3d' ? 'drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]' :
                            'drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-44 h-44 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-900/50 flex flex-col items-center justify-center gap-2 text-center p-4 transition cursor-pointer"
                        >
                          <Upload className="w-7 h-7 text-slate-500" />
                          <span className="text-xs font-semibold text-slate-400">
                            {lang === 'de' ? 'Noch kein Logo hochgeladen' : 'No logo uploaded yet'}
                          </span>
                        </button>
                      )}

                      {/* Dimension Badge overlay */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold whitespace-nowrap shadow-lg">
                        {widthCm} × {heightCm} cm
                      </div>
                    </div>
                  )}
                </div>

                {/* Peel corner effect on film view */}
                {previewTab === 'film' && (
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-slate-700 via-slate-800 to-transparent border-t border-l border-slate-600 rounded-tl-xl pointer-events-none" />
                )}
              </div>

              {/* Color swatches for apparel preview */}
              {previewTab !== 'film' && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400 font-medium">Textilfarbe:</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { hex: '#0f172a', name: 'Schwarz' },
                      { hex: '#f8fafc', name: 'Weiß' },
                      { hex: '#1e3a8a', name: 'Königsblau' },
                      { hex: '#991b1b', name: 'Rot' },
                      { hex: '#064e3b', name: 'Smaragdgrün' }
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setMockupColor(col.hex)}
                        className={`w-6 h-6 rounded-full border-2 transition ${
                          mockupColor === col.hex ? 'border-emerald-400 scale-110' : 'border-slate-700'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Summary & Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Modus / Produkt</span>
                  <span className="font-bold text-white">
                    {mode === 'gang-sheet' ? `Gang Sheet (${selectedGangSheet}m)` : `${widthCm} × ${heightCm} cm Transfer`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Gewählte Veredelung</span>
                  <span className="font-bold text-emerald-400">
                    {FINISH_OPTIONS.find(f => f.id === finish)?.nameDe}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Menge</span>
                  <span className="font-bold text-white">
                    {quantity} {mode === 'gang-sheet' ? 'Rollen' : 'Stück'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                  <span>{t.pricePerPiece}</span>
                  <span className="font-bold text-white">{pricing.unitPrice.toFixed(2).replace('.', ',')} €</span>
                </div>

                {mode === 'gang-sheet' && pricing.estItemsOnSheet && (
                  <div className="flex justify-between text-emerald-400 font-semibold text-[11px]">
                    <span>Ergibt rechnerisch:</span>
                    <span>ca. {pricing.estItemsOnSheet * quantity} Einzel-Logos ({pricing.costPerSingleTransfer.toFixed(2).replace('.', ',')} € / Stk.)</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>{t.totalPrice}</span>
                  <span className="text-emerald-400 text-lg font-black">{pricing.subtotal.toFixed(2).replace('.', ',')} €</span>
                </div>
              </div>

              {/* Success Alert Banner */}
              {showAddedAlert && (
                <div className="p-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs text-center flex items-center justify-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.addedSuccess}</span>
                </div>
              )}

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl hover:shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart} ({pricing.subtotal.toFixed(2).replace('.', ',')} €)</span>
              </button>

              <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>Kostenloser Dateicheck &amp; DHL Expressversand in 1-2 Werktagen</span>
              </div>
            </div>

            {/* Quick Heat Press Guide Card */}
            <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs space-y-3">
              <h4 className="font-extrabold text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{t.instructionTitle}</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-500 font-bold">1. Temperatur</div>
                  <div className="font-extrabold text-white mt-0.5">{t.instructionTemp}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-500 font-bold">2. Presszeit</div>
                  <div className="font-extrabold text-white mt-0.5">{t.instructionTime}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-500 font-bold">3. Anpressdruck</div>
                  <div className="font-extrabold text-white mt-0.5">{t.instructionPressure}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-500 font-bold">4. Abziehen</div>
                  <div className="font-extrabold text-emerald-400 mt-0.5">{t.instructionPeel}</div>
                </div>
              </div>

              <p className="text-[10px] text-slate-500">
                {t.instructionWash}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
