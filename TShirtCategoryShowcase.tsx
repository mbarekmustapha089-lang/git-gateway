import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  Heart, 
  Star, 
  Tag, 
  Layers, 
  Info,
  PhoneCall,
  Flame,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Product, Language, BrandName } from '../types';
import { SportshirtCanvas } from './SportshirtCanvas';
import { TOP_BRANDS } from '../data/products';
import { WhatsAppButton } from './WhatsAppButton';
import { BrandInsignia } from './BrandInsignia';

interface TShirtCategoryShowcaseProps {
  lang: Language;
  onAddToCart: (product: Product, size: string, quantity: number, extraOptions?: { colorName?: string; withCrest?: boolean }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onScrollToConfigurator: () => void;
  selectedBrand?: BrandName | 'all';
  onSelectBrand?: (brand: BrandName | 'all') => void;
}

export const TSHIRT_COLORS = [
  { id: 'white', name: 'Weiß / White', hex: '#FFFFFF', isLight: true, badge: 'Standard' },
  { id: 'royal', name: 'Königsblau / Royal Blue', hex: '#1D4ED8', badge: 'Bestseller' },
  { id: 'red', name: 'Rot / Crimson Red', hex: '#DC2626', badge: 'Vereinsfarbe' },
  { id: 'black', name: 'Schwarz / Deep Black', hex: '#18181B', badge: 'Klassiker' },
  { id: 'green', name: 'Smaragdgrün / Emerald Green', hex: '#16A34A', badge: 'Top-Seller' },
  { id: 'navy', name: 'Marineblau / Navy', hex: '#0F172A' },
  { id: 'yellow', name: 'Sonnengelb / Solar Yellow', hex: '#EAB308' },
  { id: 'orange', name: 'Neon-Orange / Vivid Orange', hex: '#EA580C' },
  { id: 'grey', name: 'Grau Melange / Heather Grey', hex: '#94A3B8' },
  { id: 'bordeaux', name: 'Bordeaux / Dark Maroon', hex: '#881337' }
];

export const TSHIRT_SIZES = [
  { label: '116', type: 'kids' },
  { label: '128', type: 'kids' },
  { label: '140', type: 'kids' },
  { label: '152', type: 'kids' },
  { label: '164', type: 'kids' },
  { label: 'S', type: 'adult' },
  { label: 'M', type: 'adult' },
  { label: 'L', type: 'adult' },
  { label: 'XL', type: 'adult' },
  { label: 'XXL', type: 'adult' },
  { label: '3XL', type: 'adult' }
];

// Brand profiles for each top brand
const BRAND_PROFILES: Record<string, {
  name: string;
  series: string;
  taglineDe: string;
  taglineEn: string;
  badge: string;
  accent: string;
  descriptionDe: string;
  descriptionEn: string;
}> = {
  Nike: {
    name: 'Nike',
    series: 'Dri-FIT Park VII Match & Training Tee',
    taglineDe: 'Dri-FIT Hochleistungs-Funktionsshirt für Vereine',
    taglineEn: 'Dri-FIT High-performance teamwear jersey',
    badge: '⚡ NIKE DRI-FIT',
    accent: '#000000',
    descriptionDe: 'Atmungsaktives Nike Dri-FIT Material leitet Schweiß ab für ein trockenes, angenehmes Tragegefühl bei Training und Spiel.',
    descriptionEn: 'Breathable Nike Dri-FIT technology wicks sweat away to keep you dry and comfortable during matches and intense workouts.'
  },
  adidas: {
    name: 'adidas',
    series: 'Tiro 24 / Entrada Pro Match & Training Shirt',
    taglineDe: 'AEROREADY Hochleistungs-Funktionstrikot für Teams',
    taglineEn: 'AEROREADY High-performance team shirt',
    badge: '🔥 ADIDAS AEROREADY',
    accent: '#000000',
    descriptionDe: 'Feuchtigkeitsabsorbierendes AEROREADY Gewebe mit den 3 ikonischen Streifen für Vereinsmannschaften & Einzelsportler.',
    descriptionEn: 'Moisture-absorbing AEROREADY fabric featuring the 3 iconic stripes for club teams and training squads.'
  },
  Puma: {
    name: 'Puma',
    series: 'teamLIGA Pro Functional Training Shirt',
    taglineDe: 'dryCELL Athletik-Trikot für höchste Performance',
    taglineEn: 'dryCELL athletic jersey for high performance',
    badge: '🐆 PUMA dryCELL',
    accent: '#000000',
    descriptionDe: 'Puma dryCELL Technologie für maximalen Feuchtigkeitstransport und Raglanärmel für uneingeschränkte Bewegungsfreiheit.',
    descriptionEn: 'Puma dryCELL technology for maximum sweat management with raglan sleeves for zero movement restriction.'
  },
  Jako: {
    name: 'Jako',
    series: 'Jako Challenge / Center Teamsport Trikot',
    taglineDe: 'KeepDry Teamsport-Klassiker für deutsche Vereine',
    taglineEn: 'KeepDry teamwear classic for clubs',
    badge: '🇩🇪 JAKO TEAMS',
    accent: '#0047BA',
    descriptionDe: 'Das meistgewählte Vereinstrikot im deutschen Amateursport. Extrem reißfest, formstabil und mit 5 Jahren Nachbestellgarantie.',
    descriptionEn: 'The #1 choice for amateur sports clubs in Germany. Tear-resistant, shape-retaining with 5-year re-order guarantee.'
  },
  Erima: {
    name: 'Erima',
    series: 'Squad Teamsport Funktions T-Shirt',
    taglineDe: 'Quick-Dry Traditions-Funktionsshirt für Teams',
    taglineEn: 'Quick-Dry traditional functional shirt',
    badge: '🔥 ERIMA QUICK-DRY',
    accent: '#E30613',
    descriptionDe: 'Erima Quick-Dry Technologie für optimales Körperklima. Formstabiler Rundhalskragen & reißfeste Teamsport-Nähte.',
    descriptionEn: 'Erima Quick-Dry finish for optimal temperature regulation, reinforced flatlock seams and form-retaining crew neck.'
  },
  Derbystar: {
    name: 'Derbystar',
    series: 'Derbystar Bundesliga Pro Training Shirt',
    taglineDe: 'Bundesliga-Qualität für Training & Vorbereitung',
    taglineEn: 'Bundesliga quality for training & preparation',
    badge: '⭐ DERBYSTAR PRO',
    accent: '#000000',
    descriptionDe: 'Offizielles Trainingsshirt vom Bundesliga-Ballausrüster Derbystar. Strapazierfähig und formstabil bei jedem Flankenlauf.',
    descriptionEn: 'Official training tee from the German Bundesliga matchball supplier. Rugged and ready for intense drills.'
  },
  Uhlsport: {
    name: 'Uhlsport',
    series: 'Uhlsport Stream Pro Match Shirt',
    taglineDe: 'SmartBreathe Matchwear für Torhüter & Feldspieler',
    taglineEn: 'SmartBreathe matchwear for outfield & keepers',
    badge: '🧤 UHLSPORT MATCH',
    accent: '#000000',
    descriptionDe: 'SmartBreathe Micro-Mesh Gewebe für höchste Ventilation auf dem Rasenplatz und in der Halle.',
    descriptionEn: 'SmartBreathe micro-mesh weave providing optimal airflow on grass and indoor pitches.'
  },
  Sportwelt: {
    name: 'Sportwelt',
    series: 'Sportwelt Pro-Match Meister-Trikot 2026',
    taglineDe: 'Unsere hauseigene Premium Manufaktur aus Rosenheim',
    taglineEn: 'Our in-house premium manufacture from Rosenheim',
    badge: '⚡ SPORTWELT ORIGINAL',
    accent: '#059669',
    descriptionDe: 'Handveredelt in unserer Textildruck-Manufaktur in Rosenheim. Höchste Veredelungsqualität mit 2 Jahren Garantie.',
    descriptionEn: 'Hand-finished in our textile printing workshop in Rosenheim, Germany. Premium durability with 2-year guarantee.'
  }
};

export const TShirtCategoryShowcase: React.FC<TShirtCategoryShowcaseProps> = ({
  lang,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onScrollToConfigurator,
  selectedBrand = 'all',
  onSelectBrand
}) => {
  // Active selected brand for the showcase (default to Erima or the parent selectedBrand if not 'all')
  const [activeBrand, setActiveBrand] = useState<BrandName>(
    selectedBrand !== 'all' ? selectedBrand : 'Erima'
  );

  // Sync if parent brand filter changes
  useEffect(() => {
    if (selectedBrand !== 'all' && selectedBrand !== activeBrand) {
      setActiveBrand(selectedBrand);
    }
  }, [selectedBrand]);

  const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]); // Default to White
  const [hoveredColor, setHoveredColor] = useState<typeof TSHIRT_COLORS[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(10);
  const [addCrestFlock, setAddCrestFlock] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Active color on display (hover or selected)
  const activeColor = hoveredColor || selectedColor;

  const currentBrandProfile = BRAND_PROFILES[activeBrand] || BRAND_PROFILES.Erima;

  // Single flagship product data with tiered pricing starting from 10 pieces
  const getBaseUnitPrice = (qty: number) => {
    if (qty >= 20) return 10.90;
    if (qty >= 10) return 12.90;
    return 14.95;
  };

  const basePrice = getBaseUnitPrice(quantity);
  const originalPrice = 29.99;
  const crestPrice = addCrestFlock ? 2.90 : 0;
  const unitPrice = basePrice + crestPrice;
  const totalPrice = unitPrice * quantity;
  const savings = Math.max(0, (originalPrice - basePrice) * quantity);
  const discountPercent = Math.round(((originalPrice - basePrice) / originalPrice) * 100);

  // Mock product object for cart & wishlist compatibility
  const currentProduct: Product = {
    id: `shirt-${activeBrand.toLowerCase()}-functional-teamsport`,
    name: `${currentBrandProfile.name} ${currentBrandProfile.series}`,
    germanName: `${currentBrandProfile.name} ${currentBrandProfile.series} (${selectedColor.name.split(' / ')[0]})`,
    brand: activeBrand,
    category: 'shirts',
    subcategory: 'Teamsport & Training',
    price: unitPrice,
    originalPrice: originalPrice,
    discountPercentage: discountPercent,
    badge: `🔥 -50% ${activeBrand.toUpperCase()} DEAL`,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80'
    ],
    description: lang === 'de' ? currentBrandProfile.descriptionDe : currentBrandProfile.descriptionEn,
    germanDescription: currentBrandProfile.descriptionDe,
    sizes: TSHIRT_SIZES.map(s => s.label),
    colors: TSHIRT_COLORS.map(c => ({ name: c.name, hex: c.hex })),
    inStock: true,
    material: '100% Recyceltes QuickDry / Climacool Polyester (140 g/m²)',
    features: [
      `${activeBrand} Pro Athletic Finish for optimal climate control`,
      'Reinforced shoulder elements for long-lasting team wear',
      'Heat-resistant fabric for easy crest & sponsor flocking',
      'Available in 10 team colors from youth to 3XL'
    ],
    germanFeatures: [
      `${activeBrand} Hochleistungs-Gewebe für optimales Körperklima`,
      'Formstabiler Rundhalskragen & Reißfeste Teamsport-Nähte',
      'Hitzebeständiger Stoff für perfekte Beflockung (Wappen & Sponsor)',
      'In 10 Vereinsfarben von Kindergrößen (116) bis 3XL lieferbar'
    ],
    isFeatured: true,
    isBestSeller: true,
    clubBulkDiscountEligible: true
  };

  const isWishlisted = wishlist.some(p => p.id === currentProduct.id);

  const handleAdd = () => {
    onAddToCart(currentProduct, selectedSize, quantity, {
      colorName: selectedColor.name,
      withCrest: addCrestFlock
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleSelectBrandTab = (brand: BrandName) => {
    setActiveBrand(brand);
    if (onSelectBrand) {
      onSelectBrand(brand);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Brand Switcher Tabs for Top Marken (Nike, Adidas, Puma, Jako, Erima, Derbystar, Uhlsport, Sportwelt) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              {lang === 'de' ? 'Top-Marken Trikot-Auswahl:' : 'Top Brands Selection:'}
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              (Alle Top-Marken mit Live-Farbwechsel verfügbar)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
              🔥 50% VEREINSRABATT
            </span>
          </div>
        </div>

        {/* Top Brands Pill Buttons with Vector Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {TOP_BRANDS.map((brand) => {
            const isSelected = activeBrand === brand.slug;
            const isSportweltPro = brand.slug === 'Sportwelt' || brand.logoText.toLowerCase().includes('sportwelt');

            if (isSportweltPro) {
              return (
                <a
                  key={brand.slug}
                  href="https://trikotsdesign.de/th-sports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-black border cursor-pointer bg-gradient-to-b from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white border-emerald-500 shadow-md group"
                  title="Sportwelt Pro - Zu https://trikotsdesign.de/th-sports/"
                >
                  <div className="h-5 flex items-center justify-center">
                    <BrandInsignia brand={brand.slug} isLight={false} className="w-7 h-4" />
                  </div>
                  <span className="tracking-wider flex items-center gap-1">
                    {brand.logoText}
                    <ExternalLink className="w-3 h-3 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              );
            }

            return (
              <button
                key={brand.slug}
                type="button"
                onClick={() => handleSelectBrandTab(brand.slug as BrandName)}
                className={`py-2.5 px-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-black border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50 scale-[1.03]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="h-5 flex items-center justify-center">
                  <BrandInsignia brand={brand.slug} isLight={!isSelected} className="w-7 h-4" />
                </div>
                <span className="tracking-wider">{brand.logoText}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Single Product Showcase (Sportdeal24 Layout) for Selected Top Brand */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: The Shirt on Display with Color Swatches Under It (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-gradient-to-b from-slate-50/80 to-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
          
          {/* Top Info Bar inside canvas container */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <BrandInsignia brand={activeBrand} isLight={false} className="w-5 h-3.5" />
                <span>{activeBrand.toUpperCase()} TEAMSPORT</span>
              </span>
              <span className="px-2.5 py-0.8 rounded-lg bg-red-100 text-red-700 text-xs font-black">
                -50% RABATT
              </span>
            </div>

            <button
              type="button"
              onClick={() => onToggleWishlist(currentProduct)}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition shadow-xs ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-rose-500 hover:border-rose-300'
              }`}
              title="Auf Wunschliste setzen"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Interactive Sportshirt Display: Shirt that changes color and brand dynamically */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] max-w-lg mx-auto w-full flex items-center justify-center p-4 bg-radial from-slate-100/70 to-transparent rounded-2xl">
            <SportshirtCanvas
              color={activeColor.hex}
              brandText={activeBrand.toUpperCase()}
              showCrest={addCrestFlock}
              className="w-full h-full"
            />

            {/* Quick Live Preview Tag */}
            <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-slate-600 shadow-2xs flex items-center gap-1.5 pointer-events-none">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Live {activeBrand}-Vorschau</span>
            </div>
          </div>

          {/* COLOR SELECTOR UNDER THE SHIRT */}
          <div className="mt-6 pt-6 border-t border-slate-200/90">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Farbe wählen:
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  {activeColor.name}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Klicke auf eine Farbe zum Wechseln
              </span>
            </div>

            {/* Color Swatches Grid / Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {TSHIRT_COLORS.map((c) => {
                const isSelected = selectedColor.id === c.id;
                const isHovered = hoveredColor?.id === c.id;

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c);
                      setHoveredColor(null);
                    }}
                    onMouseEnter={() => setHoveredColor(c)}
                    onMouseLeave={() => setHoveredColor(null)}
                    className={`group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'ring-3 ring-emerald-600 ring-offset-2 scale-110 shadow-md'
                        : isHovered
                        ? 'ring-2 ring-slate-400 ring-offset-1 scale-105'
                        : 'hover:scale-105 shadow-2xs'
                    }`}
                    style={{
                      backgroundColor: c.hex,
                      borderColor: c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#f8f9fa' ? '#cbd5e1' : 'rgba(0,0,0,0.15)',
                      borderWidth: '1px'
                    }}
                    title={c.name}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 ${
                          c.isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      />
                    )}
                    {c.badge && !isSelected && (
                      <span className="absolute -top-1.5 -right-1 px-1 py-0.2 rounded-full bg-slate-900 text-white text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                        ★
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Color Details Chips */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-500 scrollbar-none">
              <span className="font-semibold text-slate-700">Verfügbarkeit:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/50">
                10 Vereinsfarben lagernd
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                Kinder (116) bis 3XL
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Title, Bulk Pricing Calculator, Options & WhatsApp Action (5 cols on lg) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          
          {/* Header Block */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1.5">
              <span className="text-slate-900 font-extrabold uppercase tracking-wider">{activeBrand}</span>
              <span>•</span>
              <span>Offizielle Teamsport-Serie</span>
              <span>•</span>
              <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-slate-800">4.9</span>
                <span className="text-slate-400 text-[10px]">(184)</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug mb-2">
              {activeBrand} {currentBrandProfile.series}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {currentBrandProfile.descriptionDe}
            </p>

            {/* Pricing Section with Sportdeal24 Bulk Staging */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-950">
                      {unitPrice.toFixed(2)} €
                    </span>
                    <span className="text-xs font-medium text-slate-400 line-through">
                      UVP {originalPrice.toFixed(2)} €
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-red-600 flex items-center gap-1 mt-0.5">
                    <span>🔥 Du sparst 50% ({savings.toFixed(2)} € bei {quantity} Stk.)</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Gesamtpreis:</div>
                  <div className="text-xl font-black text-emerald-600">
                    {totalPrice.toFixed(2)} €
                  </div>
                  <div className="text-[10px] text-slate-400">inkl. MwSt. zzgl. Versand</div>
                </div>
              </div>

              {/* Staffelpreise / Volume Discount Indicator */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className={`p-1.5 rounded-lg border ${quantity < 10 ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-600'}`}>
                  <div>1-9 Stück</div>
                  <div className="font-extrabold text-slate-900">14.95 €</div>
                </div>
                <div className={`p-1.5 rounded-lg border ${quantity >= 10 && quantity < 20 ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-600'}`}>
                  <div className="text-emerald-700 font-bold">ab 10 Stück</div>
                  <div className="font-extrabold text-slate-900">12.90 €</div>
                </div>
                <div className={`p-1.5 rounded-lg border ${quantity >= 20 ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-600'}`}>
                  <div className="text-emerald-700 font-bold">ab 20 Stück</div>
                  <div className="font-extrabold text-slate-900">10.90 €</div>
                </div>
              </div>
            </div>

            {/* Customization Addon: Wappen / Crest Flock Option */}
            <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="crest-flock-opt"
                  checked={addCrestFlock}
                  onChange={(e) => setAddCrestFlock(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="crest-flock-opt" className="text-xs text-slate-800 font-bold cursor-pointer">
                  <span>Vereinswappen-Druck (DTF) hinzufügen</span>
                  <span className="block text-[10px] text-slate-500 font-normal">
                    Klublogo auf linker Brustseite (+2.90 € / Stk.)
                  </span>
                </label>
              </div>
              <span className="text-xs font-black text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">
                +2.90 €
              </span>
            </div>

            {/* Size Selector Grid */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Größe wählen:</span>
                <span className="text-emerald-700 font-extrabold">Größe {selectedSize}</span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5">
                {TSHIRT_SIZES.map((sz) => {
                  const isSelected = selectedSize === sz.label;
                  return (
                    <button
                      key={sz.label}
                      type="button"
                      onClick={() => setSelectedSize(sz.label)}
                      className={`py-2 rounded-xl text-xs font-black transition text-center border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {sz.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Input & Action Buttons */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity counter */}
                <div className="flex items-center border border-slate-300 rounded-2xl bg-white overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3.5 py-3 text-slate-600 hover:bg-slate-100 font-black text-sm transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-sm font-black text-slate-900 border-0 focus:ring-0 p-0"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3.5 py-3 text-slate-600 hover:bg-slate-100 font-black text-sm transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm text-white shadow-lg transition flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation
                      ? 'bg-slate-900 scale-[0.98]'
                      : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 shadow-red-500/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>In den Warenkorb gelegt!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>In den Warenkorb • {totalPrice.toFixed(2)} €</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Action Button (User requested direct to WhatsApp to +4917657940581) */}
              <WhatsAppButton
                lang={lang}
                phoneNumber="+4917657940581"
                defaultMessage={`Hallo TH Sportwelt! Ich interessiere mich für das ${activeBrand} Trikot/T-Shirt (${selectedColor.name}, Menge: ${quantity} Stück). Bitte um ein unverbindliches Angebot!`}
                label={`Direkt per WhatsApp bestellen / anfragen (+49 176 57940581)`}
                className="w-full"
              />
            </div>

          </div>

          {/* Trust Guarantees & Hotline */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">3-6 Werktage</span>
                <span className="text-[9px] text-slate-400">DHL Express</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">30 Tage</span>
                <span className="text-[9px] text-slate-400">Rückgaberecht</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">Rechnungskauf</span>
                <span className="text-[9px] text-slate-400">Für Vereine</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Technical Highlights / Specs section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h4 className="font-bold text-slate-900 text-sm">{activeBrand} Performance Gewebe</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hochfunktionelles Polyester leitet Schweiß aktiv vom Körper ab und trocknet 3x schneller als gewöhnliche Baumwolle.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Teamsport-Strapazierfähigkeit</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Formstabiler Rundhalsausschnitt und verstärkte Nähte für harte Zweikämpfe, wöchentliche Trainingseinheiten und Waschmaschinengänge.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Optimale Beflockbarkeit</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Perfekt glatte Oberfläche für DTF-Druck, Vereinswappen, Sponsorenlogos, Spielernamen und Rückennummern.
          </p>
        </div>
      </div>
    </div>
  );
};
