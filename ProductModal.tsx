import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, ShieldCheck, Check, RotateCcw, ChevronRight } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';
import { SportshirtCanvas } from './SportshirtCanvas';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddToCart: (product: Product, size: string, quantity: number, options?: { colorName?: string }) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  lang,
  onAddToCart
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null);
  const [hoveredColor, setHoveredColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const t = translations[lang];
  const displayName = lang === 'de' ? product.germanName : product.name;
  const displayDesc = lang === 'de' ? product.germanDescription : product.description;
  const displayFeatures = lang === 'de' ? product.germanFeatures : product.features;

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

  const isShirtCategory = product.category === 'shirts';
  const isTorwarthose = product.category === 'torwarthose';
  const isHandschoe = product.category === 'handschoe';
  const isContainFit = isHandschoe || isTorwarthose || product.category === 'kurzehose' || product.category === 'socks' || product.category === 'trainingsanzug' || product.category === 'hoodies' || product.category === 'pullovers';

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity, {
      colorName: getColorDisplayName(selectedColor)
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="product-quick-view-modal"
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-500 hover:text-slate-900 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery & Color Changer */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-200 relative mb-4 flex items-center justify-center p-3">
              {isShirtCategory && activeColor ? (
                <div className="w-full h-full flex items-center justify-center">
                  <SportshirtCanvas
                    color={activeColor.hex}
                    brandText={product.brand || 'ERIMA'}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <img
                  src={selectedImage}
                  alt={displayName}
                  className={`w-full h-full ${isContainFit ? 'object-contain p-4 bg-white' : 'object-cover object-center'}`}
                  referrerPolicy="no-referrer"
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
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* COLOR CHANGING SWATCHES UNDER THE SHIRT */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>{lang === 'de' ? 'Farbe wählen:' : 'Select color:'}</span>
                  <span className="text-emerald-700 font-extrabold">{getColorDisplayName(activeColor)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, idx) => {
                    const isSelected = selectedColor?.hex === c.hex;
                    const isHovered = hoveredColor?.hex === c.hex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedColor(c);
                          setHoveredColor(null);
                        }}
                        onMouseEnter={() => setHoveredColor(c)}
                        onMouseLeave={() => setHoveredColor(null)}
                        className={`w-7 h-7 rounded-full border transition flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-emerald-600 ring-offset-2 scale-110 shadow-sm'
                            : isHovered
                            ? 'scale-105'
                            : 'hover:scale-105'
                        }`}
                        style={{
                          backgroundColor: c.hex,
                          borderColor: c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#f8f9fa' ? '#cbd5e1' : 'rgba(0,0,0,0.2)'
                        }}
                        title={c.name}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#f8f9fa' ? 'text-slate-900' : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                    selectedImage === img ? 'border-emerald-600 ring-2 ring-emerald-600/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Surface or Material Tag */}
            {product.surfaceLabel && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Untergrund: {product.surfaceLabel}</span>
              </div>
            )}
          </div>

          {/* Right: Info & Purchase */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Subcategory */}
              <div className="text-xs uppercase font-bold tracking-wider text-emerald-600 mb-1">
                {product.subcategory || product.category}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">
                {displayName}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} {lang === 'de' ? 'Bewertungen' : 'reviews'})</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-slate-100">
                <span className="text-3xl font-black text-slate-950">
                  {product.price.toFixed(2)} €
                </span>
                {product.originalPrice && (
                  <span className="text-lg line-through text-slate-400">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">inkl. MwSt., versandkostenfrei ab 50 €</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {displayDesc}
              </p>

              {/* Features list */}
              <div className="mb-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-xs uppercase font-bold text-slate-700 mb-2 tracking-wider">
                  {lang === 'de' ? 'Technische Highlights & Features' : 'Key Specifications'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {displayFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>{lang === 'de' ? 'Größe wählen (EU / International):' : 'Select Size:'}</span>
                  <span className="text-emerald-600">{selectedSize}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition ${
                        selectedSize === sz
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs text-slate-700 font-bold text-sm hover:bg-slate-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-slate-800 text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs text-slate-700 font-bold text-sm hover:bg-slate-100 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-lg transition flex items-center justify-center gap-2 ${
                    isAdded ? 'bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{lang === 'de' ? 'Im Warenkorb!' : 'Added to Cart!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{lang === 'de' ? 'In den Warenkorb' : 'Add to Cart'} • {(product.price * quantity).toFixed(2)} €</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp request for this product */}
              <div className="mt-3">
                <a
                  href={`https://wa.me/4917657940581?text=${encodeURIComponent(`Hallo TH Sportwelt! Ich interessiere mich für: ${displayName} (Größe: ${selectedSize}, Menge: ${quantity}x).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <span>Direkt per WhatsApp anfragen (+49 176 57940581)</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>3-6 Werktage DHL</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>30 Tage Rückgaberecht</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>100% Originalware</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
