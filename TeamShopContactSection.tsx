import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  Send, 
  Store, 
  Sparkles, 
  Clock, 
  ExternalLink,
  Users,
  Percent,
  HelpCircle,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { Language, AppTheme } from '../types';

interface TeamShopContactSectionProps {
  lang: Language;
  theme?: AppTheme;
}

export const TeamShopContactSection: React.FC<TeamShopContactSectionProps> = ({ lang, theme = 'dark' }) => {
  const isBright = theme === 'bright';

  // Form State
  const [clubName, setClubName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [teamSize, setTeamSize] = useState('20-50');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="vereinsshop-anfrage" className={`py-16 sm:py-20 relative overflow-hidden transition-colors duration-500 ${
      isBright 
        ? 'bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 border-t border-slate-200' 
        : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-t border-slate-800'
    }`}>
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-600/10 border border-red-500/30 text-red-500 shadow-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'Exklusiver Service für Teams & Vereine in Deutschland' : 'Exclusive Service for Teams & Clubs in Germany'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isBright ? 'text-slate-950' : 'text-white'}`}>
            {lang === 'de' ? (
              <>
                Eigener <span className="text-[#d81920]">geschützter Vereinsshop</span> für dein Team
              </>
            ) : (
              <>
                Custom <span className="text-[#d81920]">Secure Club Shop</span> for Your Team
              </>
            )}
          </h2>

          {/* Quick CTA to Inquiry Form */}
          <div className="pt-2 pb-1 flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('vereinsshop-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group border border-red-500/30 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'de' ? 'Jetzt unverbindlich anfragen (100% Kostenlos)' : 'Request Free Club Shop Now'}</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <div className={`text-xs font-semibold flex items-center gap-2 ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{lang === 'de' ? 'Inklusive geschütztem Mitglieder-Login & Vereinsrabatten' : 'Includes secure member login & club discounts'}</span>
            </div>
          </div>

          <p className={`text-base sm:text-lg leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-300'}`}>
            {lang === 'de' 
              ? 'Kein lästiges Zettelsammeln und Geld-Eintreiben mehr! Wir erstellen für euren Verein einen passwortgeschützten Online-Shop mit euren Trikots, Trainingsanzügen und Vereins-Logo zu exklusiven Vereinskonditionen.'
              : 'No more paperwork or collecting cash from parents! We build a turnkey, password-protected online club store for your team featuring your custom kits, gear, and crest at discounted wholesale rates.'}
          </p>

          {/* Location Highlight Badge */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isBright 
                ? 'bg-white border-slate-200 text-slate-800 shadow-sm' 
                : 'bg-slate-800/90 border-slate-700 text-slate-200 shadow-md'
            }`}>
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Standort: <strong>Happinger Str. 77, 83026 Rosenheim</strong> (Bayern, Deutschland)</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Benefits & Direct Contact vs. Quick Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): Contact Cards & Shop Benefits */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Quick Contact Bar */}
            <div className={`p-6 sm:p-7 rounded-3xl border shadow-xl relative overflow-hidden ${
              isBright 
                ? 'bg-white border-slate-200/90 shadow-slate-200/50' 
                : 'bg-slate-800/90 border-slate-700/80 shadow-black/40'
            }`}>
              <div className="flex items-center justify-between gap-4 mb-5 border-b pb-4 border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <h3 className={`text-lg sm:text-xl font-extrabold ${isBright ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'de' ? 'Direkter Kontakt zu TH Sportwelt' : 'Direct Contact with TH Sportwelt'}
                  </h3>
                  <p className={`text-xs sm:text-sm ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                    {lang === 'de' ? 'Sprich direkt mit unserem Team per Anruf, WhatsApp oder E-Mail' : 'Reach out directly by phone, WhatsApp, or email'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              {/* Contact Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Phone & WhatsApp Button */}
                <a
                  href="tel:+4917657940581"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-100 block font-semibold">
                      {lang === 'de' ? 'Telefon & WhatsApp' : 'Phone & WhatsApp'}
                    </span>
                    <span className="text-base font-extrabold tracking-wide">
                      +49 176 57940581
                    </span>
                  </div>
                </a>

                {/* Email Direct Button */}
                <a
                  href="mailto:th-sportwelt@outlook.de?subject=Anfrage%20f%C3%BCr%20einen%20gesch%C3%BCtzten%20Vereinsshop&body=Hallo%20TH%20Sportwelt%20Team%2C%0A%0Awir%20interessieren%20uns%20f%C3%BCr%20einen%20eigenen%20gesch%C3%BCtzten%20Vereinsshop%20f%C3%BCr%20unseren%20Verein.%0A%0AVereinsname%3A%20%0AAnsprechpartner%3A%20%0ATelefonnummer%3A%20%0A%0AViele%20Gr%C3%BC%C3%9Fe"
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all group border border-blue-800/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="text-[11px] uppercase tracking-wider text-blue-200 block font-semibold">
                      {lang === 'de' ? 'E-Mail Anfrage' : 'Email Inquiry'}
                    </span>
                    <span className="text-sm font-extrabold tracking-wide truncate">
                      th-sportwelt@outlook.de
                    </span>
                  </div>
                </a>

              </div>

              {/* Standort Address Box */}
              <div className={`mt-4 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isBright ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900/80 border-slate-700/80 text-slate-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-wider text-red-500">
                      Standort &amp; Werkstatt
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      Happinger Str. 77, 83026 Rosenheim
                    </div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Happinger+Str.+77,+83026+Rosenheim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline shrink-0"
                >
                  <span>{lang === 'de' ? 'In Google Maps öffnen' : 'Open in Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Feature Cards Grid (Why a Secure Club Shop with TH Sportwelt) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className={`p-5 rounded-2xl border ${
                isBright ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/60 border-slate-700/60'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className={`text-sm font-extrabold mb-1.5 ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  {lang === 'de' ? '100% Sicher & Passwortgeschützt' : '100% Secure & Password Protected'}
                </h4>
                <p className={`text-xs leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'de' 
                    ? 'Nur eure registrierten Vereinsmitglieder und Eltern erhalten Zugriff auf die exklusiven Vereinsrabatte.'
                    : 'Only your registered club members and parents can log in to view and order at custom club rates.'}
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${
                isBright ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/60 border-slate-700/60'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-3">
                  <Percent className="w-4 h-4" />
                </div>
                <h4 className={`text-sm font-extrabold mb-1.5 ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  {lang === 'de' ? 'Dauerhafte Club-Rabatte bis zu 40%' : 'Club Discounts up to 40%'}
                </h4>
                <p className={`text-xs leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'de' 
                    ? 'Garantierte Sonderpreise auf Trikotsätze, Hosen, Stutzen, Bälle & hochwertige DTF-Veredelung.'
                    : 'Permanent wholesale pricing on match kits, shorts, training gear, balls & high-end DTF printing.'}
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${
                isBright ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/60 border-slate-700/60'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className={`text-sm font-extrabold mb-1.5 ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  {lang === 'de' ? 'Kein Stress für Trainer & Vorstände' : 'Zero Work for Club Managers'}
                </h4>
                <p className={`text-xs leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'de' 
                    ? 'Jeder Spieler/Elternteil bestellt und bezahlt eigenständig im Shop. Wir veredeln und liefern direkt.'
                    : 'Players or parents order individually online. We print with club crests and ship directly.'}
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${
                isBright ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-800/60 border-slate-700/60'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mb-3">
                  <Store className="w-4 h-4" />
                </div>
                <h4 className={`text-sm font-extrabold mb-1.5 ${isBright ? 'text-slate-900' : 'text-white'}`}>
                  {lang === 'de' ? 'Kostenlose Einrichtung in 24-48h' : 'Free Setup in 24-48h'}
                </h4>
                <p className={`text-xs leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-400'}`}>
                  {lang === 'de' 
                    ? 'Keine Einrichtungsgebühr, keine Mindestvertragslaufzeit. Wir richten den Shop komplett schlüsselfertig ein.'
                    : 'No setup fees, no monthly maintenance. Turnkey deployment with your colors, crests, and sponsors.'}
                </p>
              </div>

            </div>

          </div>

          {/* Right Column (5 cols): Interactive Club Shop Request Form */}
          <div id="vereinsshop-form" className="lg:col-span-5">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
              isBright 
                ? 'bg-white border-slate-200/90 shadow-slate-300/60' 
                : 'bg-slate-800 border-slate-700 shadow-black/60'
            }`}>
              
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-lg font-black ${isBright ? 'text-slate-950' : 'text-white'}`}>
                    {lang === 'de' ? 'Vereinsshop jetzt unverbindlich anfragen' : 'Request Your Free Club Shop'}
                  </h3>
                  <p className={`text-xs ${isBright ? 'text-slate-500' : 'text-slate-400'}`}>
                    {lang === 'de' ? 'Wir melden uns innerhalb von 2 Stunden zurück' : 'We will respond within 2 hours'}
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className={`text-xl font-extrabold ${isBright ? 'text-slate-900' : 'text-white'}`}>
                    {lang === 'de' ? 'Vielen Dank für deine Anfrage!' : 'Thank you for your request!'}
                  </h4>
                  <p className={`text-xs sm:text-sm max-w-sm mx-auto ${isBright ? 'text-slate-600' : 'text-slate-300'}`}>
                    {lang === 'de' 
                      ? `Wir haben deine Anfrage für ${clubName || 'deinen Verein'} erhalten. Unser Team aus Rosenheim wird dich unter ${phone || email} kontaktieren.`
                      : `We received your request for ${clubName || 'your team'}. Our Rosenheim workshop will contact you soon.`}
                  </p>
                  
                  <div className={`p-4 rounded-xl border text-xs text-left ${
                    isBright ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}>
                    <div className="font-bold text-emerald-600 mb-1">✓ Nächste Schritte:</div>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Erstellung deines passwortgeschützten Demo-Shops</li>
                      <li>Telefonische Abstimmung der Vereinskollektion & Veredelung</li>
                      <li>Kostenlose Musterzusendung nach Wunsch</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setClubName('');
                      setContactName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                    }}
                    className="text-xs font-bold text-red-600 hover:underline pt-2 inline-block"
                  >
                    ← Weitere Anfrage stellen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                      {lang === 'de' ? 'Vereinsname / Mannschaft *' : 'Club / Team Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z.B. SV Rosenheim 1860, TSV Kickers..."
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                        isBright 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                          : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                        {lang === 'de' ? 'Ansprechpartner *' : 'Contact Person *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Name & Funktion"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                          isBright 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                            : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                        {lang === 'de' ? 'Telefon / WhatsApp *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+49 176..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                          isBright 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                            : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                      {lang === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vorstand@dein-verein.de"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                        isBright 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                          : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                      {lang === 'de' ? 'Geschätzte Anzahl Mitglieder / Spieler' : 'Estimated Team / Member Count'}
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                        isBright 
                          ? 'bg-slate-50 border-slate-300 text-slate-900' 
                          : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    >
                      <option value="10-25">10 - 25 Spieler (1 Mannschaft / Jugend)</option>
                      <option value="25-60">25 - 60 Spieler (Mehrere Teams / Sparte)</option>
                      <option value="60-150">60 - 150 Mitglieder (Mittlerer Verein)</option>
                      <option value="150+">Über 150 Mitglieder (Gesamtverein / Großverein)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isBright ? 'text-slate-700' : 'text-slate-300'}`}>
                      {lang === 'de' ? 'Wünsche & Anmerkungen (optional)' : 'Notes / Preferences (optional)'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder="z.B. Trikotsätze in Vereinsfarben Blau/Weiß, Trainingsanzüge, DTF-Flock mit Sponsorenlogo..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                        isBright 
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' 
                          : 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <span>Wird übermittelt...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === 'de' ? 'Vereinsshop jetzt kostenlos anfragen' : 'Request Free Club Store'}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> 100% unverbindlich
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Keine Fixkosten
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Direkte Beratung
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
