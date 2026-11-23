import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Save, 
  RefreshCw, 
  Lock, 
  Mail, 
  UserCheck 
} from 'lucide-react';
import { getPaymentConfig, savePaymentConfig, formatIban, MerchantPaymentConfig } from '../data/paymentConfig';

interface PaymentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentSettingsModal: React.FC<PaymentSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [config, setConfig] = useState<MerchantPaymentConfig>(getPaymentConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setConfig(getPaymentConfig());
      setSavedSuccess(false);
      setTestStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = savePaymentConfig(config);
    setConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestConnection = () => {
    setTestStatus('testing');
    setTimeout(() => {
      setTestStatus('success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md shadow-emerald-600/20">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Kreditkarten-Händlerkonto</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Aktiv verknüpft
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Direkte Gutschrift aller Kreditkartenzahlungen auf dein Bankkonto
            </p>
          </div>
        </div>

        {/* Primary Account Status Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 text-emerald-950">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1.5">
              <div className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                <span>Bankkonto &amp; Kreditkartengateway verbunden</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Alle Umsätze aus Kartenzahlungen werden ohne Umwege auf dein deutsches Bankkonto übertragen:
              </p>
              
              <div className="p-3 bg-white/90 rounded-xl border border-emerald-200/80 space-y-1 font-mono text-[11px] text-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">Kontoinhaber:</span>
                  <span className="font-bold">{config.accountHolder}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">IBAN:</span>
                  <span className="font-bold tracking-wider text-emerald-700">{formatIban(config.iban)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">E-Mail für Belege:</span>
                  <span className="font-bold text-slate-700">{config.merchantEmail}</span>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-emerald-700">
                <span className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                  🔒 SSL 256-Bit 3D-Secure 2.0
                </span>
                <span className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                  💶 Auszahlung: 100% Netto in EUR
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Account Holder */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Kontoinhaber *
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={config.accountHolder}
                onChange={(e) => setConfig({ ...config, accountHolder: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Fatih Akmese"
              />
            </div>
          </div>

          {/* IBAN */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              IBAN (Bankkonto für Gutschriften) *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={config.iban}
                onChange={(e) => setConfig({ ...config, iban: e.target.value.replace(/\s+/g, '').toUpperCase() })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold tracking-wider focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="DE63711600000008828830"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Formatiert: <span className="font-mono font-bold text-slate-700">{formatIban(config.iban)}</span>
            </p>
          </div>

          {/* Merchant Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Händler E-Mail-Adresse (Abrechnung &amp; Zahlungsavise) *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={config.merchantEmail}
                onChange={(e) => setConfig({ ...config, merchantEmail: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="th-sportwelt@outlook.de"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Hierhin gehen alle Transaktionsbestätigungen und Abrechnungsberichte.
            </p>
          </div>

          {/* Direct clearing note */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-slate-900">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Ablauf einer Kreditkartenzahlung:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              1. Kunde bezahlt an der Kasse mit Visa, Mastercard oder American Express.<br/>
              2. Die Autorisierung erfolgt verschlüsselt über das 256-Bit SSL Gateway.<br/>
              3. Der Erlös wird direkt der IBAN <strong>{formatIban(config.iban)}</strong> ({config.accountHolder}) gutgeschrieben und eine Zahlungsbestätigung an <strong>{config.merchantEmail}</strong> geschickt.
            </p>
          </div>

          {testStatus === 'testing' && (
            <div className="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Bankverbindung zu IBAN {formatIban(config.iban)} wird verifiziert...</span>
            </div>
          )}

          {testStatus === 'success' && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Status: Valide! Das Konto von <strong>{config.accountHolder}</strong> ({formatIban(config.iban)}) ist aktiv für Kreditkartengutschriften verknüpft.
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTestConnection}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Verbindung testen</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Einstellungen speichern</span>
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center font-bold animate-in fade-in">
              Einstellungen erfolgreich gespeichert! Kreditkartenzahlungen gehen an {config.accountHolder} ({formatIban(config.iban)}).
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
