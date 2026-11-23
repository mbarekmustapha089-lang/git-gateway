import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, RefreshCw, Sparkles, Flame, Heart } from 'lucide-react';
import { Product, ProductCategory, Language, BrandName } from '../types';
import { ProductCard } from './ProductCard';
import { translations } from '../data/translations';

interface ProductGridProps {
  products: Product[];
  lang: Language;
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedBrand: BrandName | 'all';
  onSelectBrand: (brand: BrandName | 'all') => void;
  searchQuery: string;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity?: number, options?: { colorName?: string; withCrest?: boolean }) => void;
  onScrollToConfigurator: () => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  lang,
  activeCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  searchQuery,
  onQuickView,
  onAddToCart,
  onScrollToConfigurator,
  wishlist,
  onToggleWishlist
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [priceMax, setPriceMax] = useState<number>(400);
  const [inStockOnly, setInStockOnly] = useState(false);

  const t = translations[lang].filters;
  const tNav = translations[lang].nav;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Hot Deals category
      if (activeCategory === 'deals') {
        if (!item.discountPercentage && !item.originalPrice && !item.isDealOfDay) {
          return false;
        }
      } else if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) {
        return false;
      }

      // Price filter
      if (item.price > priceMax) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query) || item.germanName.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query) || (item.subcategory && item.subcategory.toLowerCase().includes(query));
        const matchBrand = item.brand ? item.brand.toLowerCase().includes(query) : false;
        const matchDesc = item.description.toLowerCase().includes(query) || item.germanDescription.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchBrand && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      // Default: deals and featured first
      return ((b.isDealOfDay ? 2 : 0) + (b.isFeatured ? 1 : 0)) - ((a.isDealOfDay ? 2 : 0) + (a.isFeatured ? 1 : 0));
    });
  }, [products, activeCategory, selectedBrand, priceMax, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    onSelectBrand('all');
    setPriceMax(400);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const isWishlisted = (id: string) => wishlist.some((p) => p.id === id);

  return (
    <section id="produkte-katalog" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-emerald-700 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Sportwelt Sortiment &amp; Deals 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategory === 'deals' && (lang === 'de' ? '🔥 Hot Deals & Sonderangebote bis zu -60%' : '🔥 Hot Deals & Reductions up to -60%')}
              {activeCategory === 'balls' && (lang === 'de' ? '⚽ Spiel- & Trainingsbälle (ab 10 Stück)' : '⚽ Match & Training Balls (min. 10 balls)')}
              {activeCategory === 'kurzehose' && (lang === 'de' ? '🩳 Kurze Hosen & Spiel-Shorts' : '🩳 Shorts & Match Pants')}
              {activeCategory === 'torwarthose' && (lang === 'de' ? '🧤 Torwarthosen & Polsterhosen' : '🧤 Goalkeeper Pants & Padded Trousers')}
              {activeCategory === 'handschoe' && (lang === 'de' ? '🥊 Torwarthandschuhe & Feldspieler-Handschuhe' : '🥊 Goalkeeper & Player Gloves')}
              {activeCategory === 'trainingsanzug' && (lang === 'de' ? '🏃 Trainingsanzüge & Präsentationsanzüge' : '🏃 Tracksuits & Training Suits')}
              {activeCategory === 'hoodies' && (lang === 'de' ? '🧥 Vereins-Hoodies & Kapuzenpullover' : '🧥 Club Hoodies & Sweatshirts')}
              {activeCategory === 'pullovers' && (lang === 'de' ? '👕 Training-Tops & Pullover' : '👕 Training Pullovers & Sweat Tops')}
              {activeCategory === 'schinbeinschoe' && (lang === 'de' ? '🛡️ Schienbeinschoner & Protektoren' : '🛡️ Shin Guards & Leg Protection')}
              {activeCategory === 'shirts' && (lang === 'de' ? 'Trikots, Trainings- & Fan-T-Shirts' : 'Match Jerseys, Training & Fan Tees')}
              {activeCategory === 'teamwear' && (lang === 'de' ? 'Vereinssets & Club-Kits für deutsche Mannschaften' : 'Teamwear & Club Packs for Squads')}
              {activeCategory === 'accessories' && (lang === 'de' ? 'Fußballzubehör, Taschen & Ausrüstung' : 'Gear, Bags & Equipment')}
              {activeCategory === 'all' && (lang === 'de' ? 'Alle Bälle, Textilien & Vereinsartikel' : 'All Balls, Teamwear & Club Gear')}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              {filteredProducts.length} {t.resultsFound}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs mb-8 space-y-4">
          {/* Main Category Chips - 2 Lines with Generous Spacing */}
          <div className="flex flex-col gap-2">
            {/* Line 1: Hauptkategorien (startet mit "Alle Produkte") */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: tNav.all, highlight: false },
                { id: 'deals', label: '🔥 Hot Deals %', highlight: true },
                { id: 'balls', label: `⚽ ${tNav.balls || 'Bälle ab 10 Stk.'}`, highlight: false },
                { id: 'shirts', label: `👕 ${tNav.shirts}`, highlight: false },
                { id: 'kurzehose', label: `🩳 ${tNav.kurzehose || 'Kurze Hosen'}`, highlight: false },
                { id: 'torwarthose', label: `🧤 ${tNav.torwarthose || 'Torwarthosen'}`, highlight: false },
                { id: 'handschoe', label: `🥊 ${tNav.handschoe || 'Handschuhe'}`, highlight: false }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id as ProductCategory)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? cat.highlight
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : cat.highlight
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 font-black'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Line 2: Teamwear, Warmwear, Schutz & Zubehör */}
            <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-100/60">
              {[
                { id: 'trainingsanzug', label: `🏃 ${tNav.trainingsanzug || 'Trainingsanzüge'}`, highlight: false },
                { id: 'hoodies', label: `🧥 ${tNav.hoodies || 'Hoodies'}`, highlight: false },
                { id: 'pullovers', label: `👕 ${tNav.pullovers || 'Pullover'}`, highlight: false },
                { id: 'schinbeinschoe', label: `🛡️ ${tNav.schinbeinschoe || 'Schienbeinschoner'}`, highlight: false },
                { id: 'socks', label: `🧦 ${tNav.socks || 'Stutzen & Socken'}`, highlight: false },
                { id: 'teamwear', label: `🏆 ${tNav.teamwear || 'Vereinssets'}`, highlight: false },
                { id: 'accessories', label: `🎒 ${tNav.accessories}`, highlight: false }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id as ProductCategory)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? cat.highlight
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : cat.highlight
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 font-black'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Controls: Brand Filter & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {/* Quick Brand Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-500 mr-1">
                {lang === 'de' ? 'Marke:' : 'Brand:'}
              </span>
              {[
                { id: 'all', label: 'Alle' },
                { id: 'Derbystar', label: 'Derbystar' },
                { id: 'adidas', label: 'adidas' },
                { id: 'Nike', label: 'Nike' },
                { id: 'Puma', label: 'Puma' },
                { id: 'Craft', label: 'Craft' },
                { id: 'Joma', label: 'Joma' },
                { id: 'Jako', label: 'Jako' },
                { id: 'Erima', label: 'Erima' },
                { id: 'Uhlsport', label: 'Uhlsport' }
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSelectBrand(b.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    selectedBrand === b.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {b.label}
                </button>
              ))}

              <a
                href="https://trikotsdesign.de/th-sports/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg text-xs font-bold transition bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-2xs"
                title="Sportwelt Pro - Zu https://trikotsdesign.de/th-sports/"
              >
                <span>⚡ Sportwelt Pro ↗</span>
              </a>
            </div>

            {/* Sort & Max Price Slider */}
            <div className="flex items-center gap-3 ml-auto flex-wrap">
              {/* Price filter */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Max: <strong>{priceMax} €</strong></span>
                <input
                  type="range"
                  min="10"
                  max="400"
                  step="10"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-24 accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-0 font-bold focus:ring-0 cursor-pointer text-slate-800"
                >
                  <option value="featured">{t.sortFeatured}</option>
                  <option value="discount">🔥 Höchster Rabatt (%)</option>
                  <option value="price-asc">{t.sortPriceAsc}</option>
                  <option value="price-desc">{t.sortPriceDesc}</option>
                  <option value="rating">{t.sortRating}</option>
                </select>
              </div>

              {/* Reset */}
              {(selectedBrand !== 'all' || priceMax < 400 || inStockOnly || activeCategory !== 'all') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  title={t.reset}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Product Cards Grid or Informative Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onQuickView={onQuickView}
                onAddToCart={(prod, sz, qty, opt) => onAddToCart(prod, sz, qty, opt)}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Empty Catalog State: Ready for admin products */
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl mb-4">
              ⚽
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {lang === 'de' ? 'Aktuell noch keine Artikel im Katalog' : 'No articles available yet'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {lang === 'de' 
                ? 'Alle vorherigen Muster-Artikel wurden gelöscht. Neue Produkte können jederzeit bequem über das Admin-Panel eingepflegt werden.' 
                : 'All previous sample articles have been cleared. New products can be added through the admin panel.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/admin/"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
              >
                {lang === 'de' ? 'Zum Admin-Bereich (/admin)' : 'Go to Admin (/admin)'}
              </a>
              <button
                type="button"
                onClick={onScrollToConfigurator}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition"
              >
                {lang === 'de' ? 'Trikot selbst gestalten' : 'Design Club Kit'}
              </button>
            </div>
          </div>
        ) : (
          /* Filter No Results State */
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              {lang === 'de' ? 'Keine passenden Artikel gefunden' : 'No matching products found'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {lang === 'de' 
                ? 'Versuche andere Filterkriterien oder setze deine Suche zurück.' 
                : 'Try adjusting your search terms or resetting the filter options.'}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 transition"
            >
              {t.reset}
            </button>
          </div>
        )}

        {/* Custom Club Kit Promotion Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700/80">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dein Verein in Deutschland</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              {lang === 'de' ? 'Brauchst du Trikotsätze für deine Mannschaft?' : 'Need tailored match kits for your squad?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {lang === 'de'
                ? 'Nutze unseren interaktiven Trikot-Konfigurator mit sofortiger Wappenvorschau, Sponsorendruck und exklusiven Vereinsrabatten.'
                : 'Use our 3D/2D kit configurator with instant crest rendering, sponsor print and club discounts.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onScrollToConfigurator}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{lang === 'de' ? 'Jetzt Trikot selbst gestalten' : 'Design Club Kit Now'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
