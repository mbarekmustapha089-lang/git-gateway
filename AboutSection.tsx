import React from 'react';
import { ShieldCheck, Heart, Users, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { Language, AppTheme } from '../types';

interface AboutSectionProps {
  lang: Language;
  theme?: AppTheme;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, theme = 'dark' }) => {
  const isBright = theme === 'bright';

  return (
    <section id="ueber-sportwelt" className={`py-16 relative overflow-hidden transition-colors duration-500 ${
      isBright 
        ? 'bg-slate-50 text-slate-900 border-t border-slate-200' 
        : 'bg-slate-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isBright 
                ? 'bg-red-100 border border-red-300 text-red-800' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'de' ? 'Standort: Happinger Str. 77, 83026 Rosenheim' : 'Workshop: Happinger Str. 77, 83026 Rosenheim'}</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isBright ? 'text-slate-950' : 'text-white'}`}>
              {lang === 'de' ? 'Die Geschichte hinter TH Sportwelt' : 'The Story Behind TH Sportwelt'}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${isBright ? 'text-slate-600' : 'text-slate-300'}`}>
              {lang === 'de' 
                ? 'TH Sportwelt mit Sitz in Rosenheim (Happinger Str. 77) entstand aus der tiefen Leidenschaft für den echten deutschen Amateur- und Jugendfußball. Unser Ziel ist es, jedem Spieler die perfekten Schuhe und Trikots an die Hand zu geben – und jedem Verein hochwertige, individuelle Spielkleidung sowie eigene geschützte Online-Vereinsshops zu fairen Staffelpreisen zu ermöglichen.'
                : 'TH Sportwelt based in Rosenheim (Happinger Str. 77) was born out of pure passion for football culture and grassroots clubs in Germany. Our mission is to equip every player with tournament-grade boots and shirts, while providing local clubs with bespoke customized kits and turnkey protected online club shops.'}
            </p>

            <div className="space-y-3 pt-2">
              {[
                lang === 'de' ? 'Eigene Textilveredelung, DTF-Druck & Flockwerkstatt in Rosenheim' : 'In-house DTF printing and flock workshop in Rosenheim',
                lang === 'de' ? 'Trikotberatung & Shop-Einrichtung für Vorstände, Trainer und Jugendleiter' : 'Jersey consulting & club store setup for coaches and directors',
                lang === 'de' ? 'Direkter Support & Abholung in der Happinger Str. 77, 83026 Rosenheim' : 'Local pickup & direct consultation in Rosenheim',
                lang === 'de' ? 'Nachhaltige Funktionsstoffe & langlebige Sublimationsfarben' : 'Eco-certified breathable athletic performance fabrics'
              ].map((point, idx) => (
                <div key={idx} className={`flex items-center gap-3 text-xs sm:text-sm ${isBright ? 'text-slate-700 font-medium' : 'text-slate-200'}`}>
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-2xl overflow-hidden aspect-[4/5] border shadow-xl ${
                isBright ? 'bg-white border-slate-200 shadow-slate-200/60' : 'bg-slate-800 border-slate-700'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=700&q=80"
                  alt="Football Team Matchday"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className={`rounded-2xl overflow-hidden aspect-[4/5] border shadow-xl mt-6 ${
                isBright ? 'bg-white border-slate-200 shadow-slate-200/60' : 'bg-slate-800 border-slate-700'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=700&q=80"
                  alt="Training Jersey"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
