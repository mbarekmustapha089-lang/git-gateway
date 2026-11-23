import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Plus, 
  Minus,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  cart?: CartItem[];
  lang: Language;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
  onStartShopping?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  cart,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onStartShopping
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  const MIN_ORDER_VALUE = 89.00;

  const t = translations[lang]?.cart || translations.de.cart;
  const cartItems: CartItem[] = items || cart || [];

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const hasMetMinOrder = subtotal >= MIN_ORDER_VALUE;
  const missingAmount = Math.max(0, MIN_ORDER_VALUE - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / MIN_ORDER_VALUE) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VEREIN10' || couponCode.trim().toUpperCase() === 'SPORTWELT10') {
      setDiscountPercent(10);
      setCouponMsg(t.couponSuccess);
    } else {
      setCouponMsg(lang === 'de' ? 'Ungültiger Code. Teste: VEREIN10' : 'Invalid coupon. Try: VEREIN10');
      setDiscountPercent(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-slideover-panel"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">{t.title}</h3>
                <span className="text-xs text-slate-400 font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'Artikel' : 'Artikel'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  🛒
                </div>
                <h4 className="font-bold text-slate-800 text-base">{t.empty}</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">{t.emptySub}</p>
                <button
                  type="button"
                  onClick={() => { 
                    onClose(); 
                    if (onStartShopping) onStartShopping(); 
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 flex items-center justify-center">
                    {item.isCustomKit ? (
                      <div className="text-2xl">👕</div>
                    ) : item.isDtfTransfer && item.dtfTransfer?.logoUrl ? (
                      <img
                        src={item.dtfTransfer.logoUrl}
                        alt={item.dtfTransfer.title}
                        className="w-full h-full object-contain p-1 bg-slate-900"
                        referrerPolicy="no-referrer"
                      />
                    ) : item.isDtfTransfer ? (
                      <div className="text-2xl">🔥</div>
                    ) : item.product?.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item.isCustomKit 
                        ? (item.customJersey?.clubName ? `${item.customJersey.clubName} Trikotsatz` : 'Individueller Vereins-Trikotsatz') 
                        : item.isDtfTransfer 
                        ? (item.dtfTransfer?.title || 'DTF Textiltransfer')
                        : (lang === 'de' ? item.product?.germanName : item.product?.name)}
                    </h4>

                    {/* Meta tags */}
                    <div className="text-[11px] text-slate-500 mt-0.5 space-y-0.5">
                      {item.size && <div>Größe: <strong className="text-slate-700">{item.size}</strong></div>}
                      {item.isCustomKit && item.customJersey && (
                        <div className="text-[10px] text-emerald-700 font-medium">
                          Inkl. Wappen ({item.customJersey.clubCrestPreset}) &amp; Sponsor: {item.customJersey.sponsorText || 'Ohne'}
                        </div>
                      )}
                      {item.isDtfTransfer && item.dtfTransfer && (
                        <div className="text-[10px] text-amber-700 font-medium">
                          DTF Transfer • {item.dtfTransfer.widthCm}×{item.dtfTransfer.heightCm} cm • {item.dtfTransfer.finish}
                        </div>
                      )}
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() => {
                            const minAllowed = (item.isDtfTransfer && item.dtfTransfer?.mode === 'single') ? 20 : 1;
                            if (item.quantity > minAllowed) {
                              onUpdateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-slate-950">
                        {item.totalPrice.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition p-1"
                    title="Entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Gutscheincode (z.B. VEREIN10)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs uppercase font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition shrink-0"
                >
                  Einlösen
                </button>
              </form>
              {couponMsg && (
                <div className={`text-[11px] font-semibold ${discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {couponMsg}
                </div>
              )}

              {/* Minimum Order Value (89€) Progress & Notification */}
              <div className={`p-3 rounded-xl border transition-all ${
                hasMetMinOrder 
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {hasMetMinOrder ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <span>
                      {hasMetMinOrder
                        ? (lang === 'de' ? 'Mindestbestellwert (89,00 €) erreicht!' : 'Minimum order value (€89.00) reached!')
                        : (lang === 'de' ? 'Mindestbestellwert für Kasse: 89,00 €' : 'Minimum order value for checkout: €89.00')}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold">
                    {subtotal.toFixed(2)} € / 89,00 €
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      hasMetMinOrder ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {!hasMetMinOrder && (
                  <p className="text-[11px] text-amber-800 font-semibold mt-1.5 flex items-center justify-between">
                    <span>
                      {lang === 'de'
                        ? `Es fehlen noch ${missingAmount.toFixed(2)} € bis zur Kasse`
                        : `Add €${missingAmount.toFixed(2)} more to checkout`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onStartShopping) onStartShopping();
                      }}
                      className="underline hover:text-amber-950 text-[10px] font-bold"
                    >
                      {lang === 'de' ? '+ Weiter shoppen' : '+ Shop more'}
                    </button>
                  </p>
                )}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-slate-900">{subtotal.toFixed(2)} €</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Vereinsrabatt ({discountPercent}%)</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t.shipping}</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? <strong className="text-emerald-600 font-bold">{t.freeShipping}</strong> : `${shippingCost.toFixed(2)} €`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>{t.total}</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>

              {/* Checkout Button */}
              {hasMetMinOrder ? (
                <button
                  type="button"
                  onClick={onOpenCheckout}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg hover:shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.checkout}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    disabled
                    className="w-full py-4 rounded-xl bg-slate-200 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300 select-none"
                    title={`Mindestbestellwert von 89,00 € erforderlich (noch ${missingAmount.toFixed(2)} €)`}
                  >
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span>
                      {lang === 'de' 
                        ? `Zur Kasse (ab 89,00 € • noch ${missingAmount.toFixed(2)} €)`
                        : `Checkout (min. €89.00 • €${missingAmount.toFixed(2)} left)`}
                    </span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    {lang === 'de' 
                      ? 'Der Mindestbestellwert für den Kassenbereich beträgt 89,00 €.'
                      : 'The minimum order value to proceed to checkout is €89.00.'}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL 256-Bit • Kreditkarten-Zahlung verifiziert</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
