import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Zap, Check } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';
import { SportshirtCanvas } from './SportshirtCanvas';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity?: number, options?: { colorName?: string }) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const [hoveredColor, setHoveredColor] = useState<{ name: string; hex: string } | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const t = translations[lang].productCard;

  const activeColor = hoveredColor || selectedColor;

  const getColorDisplayName = (color: { name: string; hex: string } | null) => {
    if (!color) return '';
    if (lang === 'en') {
      switch (color.hex.toLowerCase()) {
        case '#2563eb': case '#1d4ed8': return 'Blue';
        case '#dc2626': return 'Red';
        case '#18181b': case '#111827': return 'Black';
        case '#ea580c': return 'Orange';
        case '#16a34a': return 'Green';
        case '#ffffff': return 'White';
        default: return color.name;
      }
    }
    return color.name;
  };

  const displayName = lang === 'de' ? product.germanName : product.name;
  const displayDesc = lang === 'de' ? product.germanDescription : product.description;

  const surfaceColors: Record<string, { bg: string; text: string; border: string }> = {
    FG: { bg: 'bg-emerald-500/10', text: 'text-emerald-700', border: 'border-emerald-500/30' },
    SG: { bg: 'bg-blue-500/10', text: 'text-blue-700', border: 'border-blue-500/30' },
    TF: { bg: 'bg-amber-500/10', text: 'text-amber-700', border: 'border-amber-500/30' },
    IN: { bg: 'bg-purple-500/10', text: 'text-purple-700', border: 'border-purple-500/30' },
    MG: { bg: 'bg-teal-500/10', text: 'text-teal-700', border: 'border-teal-500/30' }
  };

  const currentSurface = product.surface ? surfaceColors[product.surface] || surfaceColors.FG : null;

  const savings = product.originalPrice ? (product.originalPrice - product.price) : 0;
  const savingsPercent = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  const isShirtCategory = product.category === 'shirts';
  const isTorwarthose = product.category === 'torwarthose';
  const isHandschoe = product.category === 'handschoe';
  const isContainFit = isHandschoe || isTorwarthose || product.category === 'kurzehose' || product.category === 'socks' || product.category === 'trainingsanzug' || product.category === 'hoodies' || product.category === 'pullovers';

  const handleAdd = () => {
    onAddToCart(product, selectedSize || product.sizes[0] || 'M', 1, {
      colorName: getColorDisplayName(selectedColor)
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image Container with Badges & Wishlist */}
      <div 
        className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center p-2" 
        onClick={() => onQuickView(product)}
      >
        {isShirtCategory && activeColor ? (
          <div className="w-full h-full flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
            <SportshirtCanvas
              color={activeColor.hex}
              brandText={product.brand || 'ERIMA'}
              className="w-full h-full"
            />
          </div>
        ) : (
          <img
            src={product.image}
            alt={displayName}
            className={`w-full h-full ${isContainFit ? 'object-contain p-2.5 bg-white' : 'object-cover object-center'} group-hover:scale-105 transition-transform duration-500`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              if (product.id === 'gk-uhlsport-ergonomic-long' && !target.src.includes('torwarthose-otto')) {
                target.src = '/images/torwarthose/torwarthose-otto.jpg';
              } else if (product.id === 'gk-jako-striker-short' && !target.src.includes('torwarthose-bing1')) {
                target.src = '/images/torwarthose/torwarthose-bing1.webp';
              } else if (product.id === 'gk-erima-three-quarter' && !target.src.includes('torwarthose-bing2')) {
                target.src = '/images/torwarthose/torwarthose-bing2.webp';
              } else if (product.id === 'short-adidas-squadra' && !target.src.includes('kurzhose-5')) {
                target.src = '/images/kurzhose/kurzhose-5.jpg';
              } else if (product.id === 'short-nike-park-iii' && !target.src.includes('kurzhose-4')) {
                target.src = '/images/kurzhose/kurzhose-4.jpg';
              } else if (product.id === 'short-puma-teamfinal' && !target.src.includes('kurzhose-6')) {
                target.src = '/images/kurzhose/kurzhose-6.jpg';
              } else if (product.id === 'short-jako-manchester' && !target.src.includes('kurzhose-2')) {
                target.src = '/images/kurzhose/kurzhose-2.jpg';
              } else if (product.id === 'short-uhlsport-center' && !target.src.includes('kurzhose-3')) {
                target.src = '/images/kurzhose/kurzhose-3.jpg';
              } else if (product.id === 'short-erima-squad' && !target.src.includes('kurzhose-1')) {
                target.src = '/images/kurzhose/kurzhose-1.jpg';
              } else if (product.id === 'sock-jako-lazio' && !target.src.includes('socks-jako')) {
                target.src = '/images/socks/socks-jako.jpg';
              } else if (product.id === 'sock-erima-six-wings' && !target.src.includes('socks-erima')) {
                target.src = '/images/socks/socks-erima.png';
              } else if (product.id === 'sock-nike-matchfit' && !target.src.includes('socks-nike')) {
                target.src = '/images/socks/socks-nike.png';
              }
            }}
          />
        )}

        {/* Top Left Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 pointer-events-none z-10">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase shadow-xs">
              {product.badge}
            </span>
          )}
          {currentSurface && product.surface && (
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase border ${currentSurface.bg} ${currentSurface.text} ${currentSurface.border} backdrop-blur-md shadow-xs`}>
              {product.surface}
            </span>
          )}
        </div>

        {/* Top Right: Discount Pill & Wishlist Toggle */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {savingsPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-black shadow-xs">
              -{savingsPercent}%
            </span>
          )}

          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-xs ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
              }`}
              title={isWishlisted ? 'Von Wunschliste entfernen' : 'Auf Wunschliste speichern'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-slate-900 font-bold text-xs shadow-lg hover:bg-emerald-600 hover:text-white transition flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200 z-10"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{t.quickView}</span>
        </button>
      </div>

      {/* COLOR CHANGING SWATCHES UNDER THE IMAGE */}
      {product.colors && product.colors.length > 0 && (
        <div className="px-4 pt-2.5 pb-1 bg-slate-50/70 border-y border-slate-100 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
            {product.colors.map((col, idx) => {
              const isSelected = selectedColor?.hex === col.hex;
              const isHovered = hoveredColor?.hex === col.hex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col);
                    setHoveredColor(null);
                  }}
                  onMouseEnter={() => setHoveredColor(col)}
                  onMouseLeave={() => setHoveredColor(null)}
                  className={`w-5 h-5 rounded-full border transition shrink-0 flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-emerald-600 ring-offset-1 scale-110'
                      : isHovered
                      ? 'scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: col.hex,
                    borderColor: col.hex.toLowerCase() === '#ffffff' || col.hex.toLowerCase() === '#f8f9fa' ? '#cbd5e1' : 'rgba(0,0,0,0.15)'
                  }}
                  title={col.name}
                >
                  {isSelected && (
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      col.hex.toLowerCase() === '#ffffff' || col.hex.toLowerCase() === '#f8f9fa' ? 'bg-slate-900' : 'bg-white'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
          <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap shrink-0 pl-1">
            {activeColor ? getColorDisplayName(activeColor) : (lang === 'de' ? `${product.colors.length} Farben` : `${product.colors.length} Colors`)}
          </span>
        </div>
      )}

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand & Subcategory */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider">
            {product.brand || 'Sportwelt'}
          </span>
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-emerald-600 cursor-pointer transition mb-2"
        >
          {displayName}
        </h3>

        {/* Short specs */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3">
          {displayDesc}
        </p>

        {/* Quick Size Selector */}
        <div className="mb-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>{t.selectSize}</span>
            <span className="text-emerald-700 font-bold">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-14 overflow-y-auto">
            {product.sizes.slice(0, 5).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  selectedSize === sz
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sz}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span
                onClick={() => onQuickView(product)}
                className="text-[10px] text-slate-400 self-center px-1 font-medium cursor-pointer hover:underline"
              >
                +{product.sizes.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Block with UVP & Savings */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-slate-950">
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-slate-400 font-medium">
                  UVP {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
            {savings > 0 && (
              <div className="text-[10px] text-rose-600 font-bold">
                Du sparst {savings.toFixed(2)} €
              </div>
            )}
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {t.fastDelivery}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3 py-2 rounded-xl text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 shrink-0 ${
              addedAnimation
                ? 'bg-slate-900 scale-95'
                : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md'
            }`}
            title={t.addToCart}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Hinzugefügt!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
