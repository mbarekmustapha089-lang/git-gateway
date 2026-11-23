import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, Language } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  lang: Language;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                {lang === 'de' ? 'Dein Merkzettel' : 'Your Wishlist'}
              </h2>
              <p className="text-xs text-slate-300">
                {wishlist.length}{' '}
                {lang === 'de' ? 'gespeicherte Fußball-Artikel' : 'saved football items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Heart className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                {lang === 'de' ? 'Dein Merkzettel ist noch leer.' : 'Your wishlist is empty.'}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'de'
                  ? 'Klicke auf das Herz bei Fußballschuhen oder T-Shirts, um deine Favoriten für später zu speichern.'
                  : 'Click the heart icon on boots or shirts to save your favorites for later.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {wishlist.map((item) => {
                const displayName = lang === 'de' ? item.germanName : item.name;
                return (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={displayName}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-[11px] font-bold text-emerald-600 uppercase">
                          {item.brand || item.category}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {displayName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-extrabold text-sm text-slate-900">
                            {item.price.toFixed(2)} €
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs line-through text-slate-400">
                              {item.originalPrice.toFixed(2)} €
                            </span>
                          )}
                          {item.discountPercentage && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-black">
                              -{item.discountPercentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(item, item.sizes[0] || 'M');
                          onRemoveFromWishlist(item.id);
                        }}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{lang === 'de' ? 'In den Warenkorb' : 'Add to Cart'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title={lang === 'de' ? 'Entfernen' : 'Remove'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
          >
            {lang === 'de' ? 'Schließen' : 'Close'}
          </button>
          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={() => {
                wishlist.forEach((p) => onAddToCart(p, p.sizes[0] || 'M'));
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <span>{lang === 'de' ? 'Alle in den Warenkorb' : 'Add all to cart'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
