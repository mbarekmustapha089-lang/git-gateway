import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Building2, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  AlertCircle, 
  Settings, 
  Loader2, 
  Printer 
} from 'lucide-react';
import { CartItem, Language } from '../types';
import confetti from 'canvas-confetti';
import { getPaymentConfig, MerchantPaymentConfig } from '../data/paymentConfig';
import { PaymentSettingsModal } from './PaymentSettingsModal';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  cart?: CartItem[];
  total?: number;
  lang: Language;
  onClearCart?: () => void;
  onSuccess?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  cart,
  total: propTotal,
  lang,
  onClearCart,
  onSuccess
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<MerchantPaymentConfig>(getPaymentConfig());

  const [form, setForm] = useState({
    clubName: '',
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    zip: '',
    city: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardHolder: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      setPaymentConfig(getPaymentConfig());
      setStep('form');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const checkoutItems: CartItem[] = items || cart || [];
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const calculatedTotal = subtotal + shipping;
  const total = typeof propTotal === 'number' && propTotal > 0 ? propTotal : calculatedTotal;

  const MIN_ORDER_VALUE = paymentConfig.minOrderValue || 89.00;
  const hasMetMinOrder = subtotal >= MIN_ORDER_VALUE;
  const missingAmount = Math.max(0, MIN_ORDER_VALUE - subtotal);

  // Card brand detector
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (/^4/.test(clean)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^(6011|65)/.test(clean)) return 'Discover';
    return 'Kreditkarte';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMetMinOrder) return;

    setIsProcessing(true);

    const generatedOrder = `SW-DE-${Math.floor(100000 + Math.random() * 900000)}`;
    const genTxnId = `TXN-CC-DE-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setOrderNumber(generatedOrder);
      setTransactionId(genTxnId);
      setIsProcessing(false);
      setStep('success');

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });

      if (onClearCart) onClearCart();
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
        <div 
          id="checkout-modal"
          className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                    ⚽
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      {lang === 'de' ? 'Sportwelt Express-Kasse' : 'Sportwelt Checkout'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {lang === 'de' ? 'Lieferung innerhalb Deutschlands (3-6 Werktage via DHL)' : 'Shipping within Germany (3-6 days via DHL)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & Encryption Trust Banner (No private IBAN exposed to buyer) */}
              <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs truncate">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                      <span>Sichere 256-Bit SSL-Verschlüsselung</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                    <div className="text-[11px] text-emerald-800 font-medium truncate">
                      3D-Secure 2.0 &amp; zertifizierte Kartenzahlung
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200 hover:border-emerald-200 font-bold text-[11px] flex items-center gap-1 shadow-2xs transition shrink-0 cursor-pointer"
                  title="Gateway-Status anzeigen"
                >
                  <Settings className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Gateway</span>
                </button>
              </div>

              {!hasMetMinOrder && (
                <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block font-bold mb-0.5">
                      {lang === 'de' ? 'Mindestbestellwert von 89,00 € noch nicht erreicht' : 'Minimum order value of €89.00 not reached'}
                    </strong>
                    <span>
                      {lang === 'de'
                        ? `Der Mindestbestellwert für den Kassenbereich beträgt 89,00 €. Ihr aktueller Warenkorb liegt bei ${subtotal.toFixed(2)} € (Es fehlen noch ${missingAmount.toFixed(2)} €).`
                        : `The minimum order amount is €89.00. Your cart subtotal is €${subtotal.toFixed(2)} (Missing €${missingAmount.toFixed(2)}).`}
                    </span>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition cursor-pointer"
                      >
                        {lang === 'de' ? 'Zurück zum Warenkorb / Weiter shoppen' : 'Back to Cart / Continue Shopping'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Optional Club Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'de' ? 'Vereinsname (Optional bei Vereinsbestellung)' : 'Club Name (Optional for football teams)'}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={form.clubName}
                      onChange={(e) => setForm({ ...form, clubName: e.target.value })}
                      placeholder="z.B. SV Vorwärts 1919 e.V."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Michael"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nachname *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Schmidt"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      E-Mail-Adresse für Bestellbestätigung *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="bestellung@fussballverein.de"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Telefonnummer (für DHL Sendungsverfolgung)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0172 / 1234567"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Address in Germany */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Straße &amp; Hausnummer *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.street}
                      onChange={(e) => setForm({ ...form, street: e.target.value })}
                      placeholder="Sportplatzweg 12"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      PLZ *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      placeholder="44137"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Stadt / Ort in Deutschland *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Dortmund"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* Payment Method - Exclusively Credit Card */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Zahlungsart
                    </label>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      256-Bit SSL Verschlüsselt
                    </span>
                  </div>

                  {/* Single Credit Card Payment Option */}
                  <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50 text-slate-900 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-black block">Kreditkarte (SSL 256-Bit)</span>
                          <span className="text-[11px] text-slate-600">Visa • Mastercard • American Express • Maestro</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                        Sichere Zahlung
                      </span>
                    </div>

                    {/* Card inputs */}
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                          Karteninhaber *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.cardHolder}
                          onChange={(e) => setForm({ ...form, cardHolder: e.target.value })}
                          placeholder="Max Mustermann"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase">
                            Kartennummer *
                          </label>
                          <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                            {getCardBrand(form.cardNumber)}
                          </span>
                        </div>
                        <input
                          type="text"
                          required
                          value={form.cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                            const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                            setForm({ ...form, cardNumber: formatted });
                          }}
                          placeholder="4532 •••• •••• 8910"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono tracking-wider focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Gültig bis (MM/YY) *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.cardExpiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                              if (val.length >= 3) {
                                val = `${val.substring(0, 2)}/${val.substring(2)}`;
                              }
                              setForm({ ...form, cardExpiry: val });
                            }}
                            placeholder="MM / YY"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono text-center focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                            Sicherheitscode (CVC) *
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            required
                            value={form.cardCvc}
                            onChange={(e) => setForm({ ...form, cardCvc: e.target.value.replace(/\D/g, '') })}
                            placeholder="CVC"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-mono text-center focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-emerald-200/60 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Ihre Kartendaten werden mit banküblicher 256-Bit SSL-Verschlüsselung und 3D-Secure 2.0 übertragen.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500">Gesamtbetrag (inkl. 19% MwSt.)</span>
                    <div className="text-2xl font-black text-slate-950">{total.toFixed(2)} €</div>
                  </div>

                  <button
                    type="submit"
                    disabled={!hasMetMinOrder || isProcessing}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-sm shadow-xl transition flex items-center justify-center gap-2 ${
                      hasMetMinOrder && !isProcessing
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                        : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed select-none shadow-none'
                    }`}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : hasMetMinOrder ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>
                      {isProcessing
                        ? 'Kartenzahlung wird autorisiert...'
                        : !hasMetMinOrder
                        ? (lang === 'de' ? `Mindestbestellwert 89,00 € (noch ${missingAmount.toFixed(2)} €)` : `Min. €89.00 required (€${missingAmount.toFixed(2)} left)`)
                        : `Mit Kreditkarte (${total.toFixed(2)} €) bezahlen`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Order Confirmation Screen */
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
                🎉
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Vielen Dank für deine Bestellung bei Sportwelt!
              </h3>
              <div className="inline-block p-3 rounded-xl bg-slate-100 text-slate-800 font-mono text-sm font-bold">
                Bestellnummer: {orderNumber}
              </div>

              {/* Verified Payment Confirmation Badge (Professional customer-facing receipt) */}
              <div className="max-w-md mx-auto p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-left text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Kreditkartenzahlung erfolgreich autorisiert</span>
                </div>
                <div className="text-emerald-900 text-[11px] leading-relaxed">
                  Der Gesamtbetrag in Höhe von <strong>{total.toFixed(2)} €</strong> wurde erfolgreich über die gesicherte Verbindung verbucht.
                </div>
                <div className="p-2 bg-white/80 rounded-lg border border-emerald-200 text-[11px] text-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Zahlungsart:</span>
                    <span className="font-semibold">Kreditkarte (SSL 256-Bit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaktions-ID:</span>
                    <span className="font-mono font-bold text-emerald-800">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-700">Bezahlt &amp; Bestätigt</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Wir haben die Auftragsbestätigung und den Zahlungsbeleg an <strong>{form.email || 'deine E-Mail'}</strong> gesendet. Deine Artikel werden sorgfältig kommissioniert und via DHL zugestellt.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left text-xs text-slate-800 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-slate-900">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Lieferadresse:</span>
                </div>
                <div>{form.clubName && `${form.clubName} • `}{form.firstName} {form.lastName}</div>
                <div>{form.street}, {form.zip} {form.city} (Deutschland)</div>
                <div className="pt-1 text-[11px] text-slate-500 font-semibold">
                  Zahlungsart: Kreditkarte (SSL 256-Bit) • Status: Bezahlt
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Beleg drucken</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                >
                  Zurück zum Shop
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Settings / Linked Account Modal (Merchant view) */}
      <PaymentSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          setPaymentConfig(getPaymentConfig());
        }}
      />
    </>
  );
};
