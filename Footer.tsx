import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Zap, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Language, AppTheme } from '../types';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import { PaymentSettingsModal } from './PaymentSettingsModal';

interface FooterProps {
  lang: Language;
  theme?: AppTheme;
  onOpenLogoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, theme = 'dark', onOpenLogoModal }) => {
  const t = translations[lang].footer;
  const isBright = theme === 'bright';
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <footer className={`text-xs border-t transition-colors duration-500 ${
      isBright 
        ? 'bg-slate-100 text-slate-600 border-slate-300' 
        : 'bg-slate-950 text-slate-400 border-slate-800'
    }`}>
      {/* Top Value Badges */}
      <div className={`border-b py-10 ${isBright ? 'border-slate-200' : 'border-slate-800/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isBright ? 'bg-white border border-slate-200 text-emerald-600 shadow-xs' : 'bg-slate-900 border border-slate-800 text-emerald-400'
            }`}>
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold text-xs ${isBright ? 'text-slate-900' : 'text-white'}`}>{t.fastShipping}</div>
              <div className={`text-[11px] ${isBright ? 'text-slate-500' : 'text-slate-500'}`}>Versandkostenfrei ab 50 €</div>
            </div>
          </div>

          <div 
            onClick={() => setIsPaymentModalOpen(true)}
            className={`flex items-center gap-3.5 cursor-pointer p-1.5 rounded-xl transition ${
              isBright ? 'hover:bg-slate-200/60' : 'hover:bg-slate-900/60'
            }`}
            title="Klicken: Zahlungs- &amp; Sicherheits-Gateway Status anzeigen"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isBright ? 'bg-white border border-slate-200 text-emerald-600 shadow-xs' : 'bg-slate-900 border border-slate-800 text-emerald-400'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold text-xs ${isBright ? 'text-slate-900' : 'text-white'} flex items-center gap-1.5`}>
                <span>{t.securePayment}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className={`text-[11px] ${isBright ? 'text-slate-500' : 'text-slate-500'}`}>
                Kreditkarten (Visa / Mastercard / Amex) • 256-Bit SSL
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isBright ? 'bg-white border border-slate-200 text-emerald-600 shadow-xs' : 'bg-slate-900 border border-slate-800 text-emerald-400'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold text-xs ${isBright ? 'text-slate-900' : 'text-white'}`}>{t.madeInGermany}</div>
              <div className={`text-[11px] ${isBright ? 'text-slate-500' : 'text-slate-500'}`}>Wappen, Nummern & Sponsorendruck</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isBright ? 'bg-white border border-slate-200 text-emerald-600 shadow-xs' : 'bg-slate-900 border border-slate-800 text-emerald-400'
            }`}>
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold text-xs ${isBright ? 'text-slate-900' : 'text-white'}`}>30 Tage Rückgaberecht</div>
              <div className={`text-[11px] ${isBright ? 'text-slate-500' : 'text-slate-500'}`}>Kostenlose Retoure für Standardware</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="space-y-4">
          <BrandLogo size="md" isBright={isBright} />
          <p className={`text-xs leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
            {t.aboutText}
          </p>
          <button
            onClick={onOpenLogoModal}
            className="text-[11px] text-emerald-600 hover:underline font-bold block"
          >
            → Eigenes Logo anpassen / austauschen
          </button>
        </div>

        {/* Categories */}
        <div>
          <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${isBright ? 'text-slate-900' : 'text-white'}`}>
            Kategorien & Shop
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#produkte-katalog" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>Fußballschuhe (FG, SG, TF, IN)</a></li>
            <li><a href="#produkte-katalog" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>Trainings- & Match-Trikots</a></li>
            <li><a href="#trikot-konfigurator" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>Trikot-Konfigurator für Vereine</a></li>
            <li><a href="#vereinsangebote" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>Komplett-Trikotsätze (15er Pack)</a></li>
            <li><a href="#produkte-katalog" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>Grip-Socken & Spielbälle</a></li>
          </ul>
        </div>

        {/* Club Service */}
        <div>
          <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${isBright ? 'text-slate-900' : 'text-white'}`}>
            Vereinsservice
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#vereinsshop-anfrage" className={`${isBright ? 'hover:text-red-600 font-bold text-red-600' : 'hover:text-red-400 font-bold text-red-400'} transition`}>🔒 Eigener Vereinsshop (Kostenlos)</a></li>
            <li><a href="https://trikotsdesign.de/th-sports/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 font-bold text-emerald-400 transition flex items-center gap-1">⚡ Sportwelt Pro Portal ↗</a></li>
            <li><a href="#vereinsangebote" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>Zahlung per Kreditkarte (SSL)</a></li>
            <li><a href="#dtf-transfers" className={`${isBright ? 'hover:text-emerald-700' : 'hover:text-white'} transition`}>DTF Textildruck & Veredelung</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${isBright ? 'text-slate-900' : 'text-white'}`}>
            Kontakt &amp; Standort
          </h4>
          <div className={`space-y-2.5 text-xs ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <div className={`font-bold ${isBright ? 'text-slate-900' : 'text-white'}`}>TH Sportwelt Manufaktur</div>
                <div>Happinger Str. 77</div>
                <div>83026 Rosenheim (Deutschland)</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href="tel:+4917657940581" className="hover:text-emerald-600 transition font-medium">
                +49 176 57940581
              </a>
            </div>
            <div className="pt-1">
              <a
                href="https://wa.me/4917657940581?text=Hallo%20TH%20Sportwelt!%20Ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Angebote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs transition"
              >
                <span>WhatsApp: +49 176 57940581</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <a href="mailto:th-sportwelt@outlook.de" className="hover:text-emerald-600 transition font-medium">
                th-sportwelt@outlook.de
              </a>
            </div>
            <div className={`text-[11px] pt-1 ${isBright ? 'text-slate-500' : 'text-slate-500'}`}>
              {t.customerService}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className={`border-t py-6 text-center text-[11px] ${isBright ? 'border-slate-200 text-slate-500' : 'border-slate-900 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} SPORTWELT GmbH. Alle Rechte vorbehalten.</span>
            <span className="hidden sm:inline">•</span>
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-500/20 transition cursor-pointer"
              title="Klicken für Kreditkarten-Gateway Status"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kreditkarten-Gateway: 256-Bit SSL Gesichert</span>
            </button>
          </div>
          <div className="flex gap-4">
            <span className={`${isBright ? 'hover:text-slate-800' : 'hover:text-slate-400'} cursor-pointer`}>Impressum</span>
            <span className={`${isBright ? 'hover:text-slate-800' : 'hover:text-slate-400'} cursor-pointer`}>Datenschutz</span>
            <span className={`${isBright ? 'hover:text-slate-800' : 'hover:text-slate-400'} cursor-pointer`}>AGB</span>
            <span className={`${isBright ? 'hover:text-slate-800' : 'hover:text-slate-400'} cursor-pointer`}>Widerrufsbelehrung</span>
          </div>
        </div>
      </div>

      <PaymentSettingsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </footer>
  );
};
