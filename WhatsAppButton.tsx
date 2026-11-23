import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Language } from '../types';

interface WhatsAppButtonProps {
  lang?: Language;
  phoneNumber?: string;
  defaultMessage?: string;
  variant?: 'floating' | 'button' | 'compact' | 'pill';
  label?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  lang = 'de',
  phoneNumber = '+4917657940581',
  defaultMessage,
  variant = 'floating',
  label,
  className = ''
}) => {
  // Format clean number for api.whatsapp.com (e.g. 4917657940581 without + or spaces)
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  
  const greeting = defaultMessage || (lang === 'de'
    ? 'Hallo TH Sportwelt! Ich interessiere mich für Ihre Fußball- und Vereinsangebote / Trikotsätze.'
    : 'Hello TH Sportwelt! I am interested in your football & teamwear / jersey offers.');

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greeting)}`;

  if (variant === 'floating') {
    return (
      <aside aria-label="WhatsApp Kundenservice" className="fixed bottom-6 right-6 z-50 flex items-center group">
        <a
          id="whatsapp-floating-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-white/90 ${className}`}
          title={lang === 'de' ? 'Direkt per WhatsApp chatten (+49 176 57940581)' : 'Chat directly via WhatsApp (+49 176 57940581)'}
          aria-label={lang === 'de' ? 'Direkt WhatsApp Nachricht senden' : 'Send WhatsApp Message'}
        >
          {/* Subtle Ping Animation */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-emerald-600"></span>
          </span>

          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-transparent drop-shadow-xs" />
        </a>

        {/* Hover / Tooltip tag on desktop */}
        <div className="hidden md:flex absolute right-full mr-3 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
          <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-xl border border-slate-700/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>{lang === 'de' ? 'WhatsApp Support (+49 176 57940581)' : 'WhatsApp Chat (+49 176 57940581)'}</span>
          </div>
        </div>
      </aside>
    );
  }

  if (variant === 'pill') {
    return (
      <a
        id="whatsapp-pill-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all active:scale-95 ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-white text-transparent shrink-0" />
        <span>{label || (lang === 'de' ? 'WhatsApp (+49 176 57940581)' : 'WhatsApp Chat')}</span>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        id="whatsapp-compact-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs transition hover:scale-105 ${className}`}
        title="+49 176 57940581"
      >
        <MessageCircle className="w-4 h-4 fill-white text-transparent" />
      </a>
    );
  }

  return (
    <a
      id="whatsapp-action-btn"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-95 ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-white text-transparent shrink-0" />
      <span>{label || (lang === 'de' ? 'Direkt per WhatsApp anfragen' : 'Send WhatsApp Message')}</span>
    </a>
  );
};
