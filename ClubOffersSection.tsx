import React, { useState } from 'react';
import { ShieldCheck, Package, Clock, Users, Send, CheckCircle2, Phone, Mail, FileText, Sparkles } from 'lucide-react';
import { Language, ClubInquiry } from '../types';
import { translations } from '../data/translations';
import confetti from 'canvas-confetti';

interface ClubOffersSectionProps {
  lang: Language;
}

export const ClubOffersSection: React.FC<ClubOffersSectionProps> = ({ lang }) => {
  const t = translations[lang].clubInquiry;

  const [formData, setFormData] = useState<ClubInquiry>({
    clubName: '',
    contactPerson: '',
    email: '',
    phone: '',
    league: '',
    city: '',
    estimatedQuantity: 15,
    requestedItemTypes: ['Trikotsatz (Feldspieler + Torwart)'],
    message: '',
    needSampleBox: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleToggleItem = (item: string) => {
    setFormData(prev => {
      const exists = prev.requestedItemTypes.includes(item);
      return {
        ...prev,
        requestedItemTypes: exists
          ? prev.requestedItemTypes.filter(i => i !== item)
          : [...prev.requestedItemTypes, item]
      };
    });
  };

  return (
    <section id="vereinsangebote" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'de' ? 'Exklusiver Service für Vereine in Deutschland' : 'Exclusive Service for Football Clubs in Germany'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            {lang === 'de' ? 'Sportwelt Vereinsbetreuung & Trikotservice' : 'Sportwelt Club Partnership & Team Kits'}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {lang === 'de' 
              ? 'Von der Kreisliga bis zur Jugendförderung: Wir statten kleine und große Vereine in Deutschland mit langlebigen Trikotsätzen und Trainingskleidung aus.' 
              : 'From local amateur leagues to youth academies: We supply bespoke match kits, training gear, and personalized club merch across Germany.'}
          </p>
        </div>

        {/* 3 Pillars for German Clubs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl mb-4 shadow-sm">
              💳
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              {lang === 'de' ? 'Kreditkartenzahlung (SSL)' : 'Credit Cards (SSL)'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'de' 
                ? 'Sichere und schnelle Bezahlung per Kreditkarte (Visa, Mastercard, Amex, Maestro) mit 256-Bit SSL-Verschlüsselung.' 
                : 'Secure and instant payment via Credit Cards (Visa, Mastercard, Amex, Maestro) with 256-bit SSL encryption.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl mb-4 shadow-sm">
              🔄
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              {lang === 'de' ? '4 Jahre Nachbestellgarantie' : '4-Year Re-Order Guarantee'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'de' 
                ? 'Kommt zur Winterpause ein neuer Spieler? Dein Trikotdesign bleibt 4 Jahre zum selben Staffelpreis nachbestellbar.' 
                : 'New signing joins mid-season? Your exact jersey design remains available for repeat orders for 4 full years.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl mb-4 shadow-sm">
              ⚡
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              {lang === 'de' ? 'Wappen & Sponsor Inklusive' : 'Crest & Sponsor Included'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'de' 
                ? 'Alle Druckkosten für Vereinswappen, Brustsponsor und Rückennummern sind bereits im Staffelpreis enthalten.' 
                : 'All printing costs for crests, front sponsors and squad numbers are fully included in the bulk discount price.'}
            </p>
          </div>
        </div>

        {/* Inquiry Form Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto text-3xl shadow-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">{t.successTitle}</h3>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">
                  {t.successDesc}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                  >
                    Weitere Anfrage stellen
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {t.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
                    {t.desc}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        {t.clubName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clubName}
                        onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                        placeholder="z.B. FC Teutonia 1910 e.V."
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        {t.contactPerson} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="Vorname Nachname (z.B. Michael Schmidt)"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="trainer@dein-verein.de"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0171 / 1234567"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        {t.city}
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="z.B. Dortmund / NRW"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Item selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Gewünschte Artikel für die Mannschaft
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        'Trikotsatz (Feldspieler + Torwart)',
                        'Trainingsanzüge / Zips',
                        'Aufwärm-T-Shirts',
                        'Regenjacken / Allwetter'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleToggleItem(item)}
                          className={`p-2.5 rounded-xl border text-left font-medium transition ${
                            formData.requestedItemTypes.includes(item)
                              ? 'bg-emerald-600/30 border-emerald-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>


                  {/* Submit Button & Direct Hotline */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.submitBtn}</span>
                    </button>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <a 
                        href="tel:+4917657940581" 
                        className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-medium transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>+49 176 57940581</span>
                      </a>
                      <span>•</span>
                      <a 
                        href="mailto:th-sportwelt@outlook.de" 
                        className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-medium transition"
                      >
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        <span>th-sportwelt@outlook.de</span>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
