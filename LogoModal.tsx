import React, { useState } from 'react';
import { Upload, Check, RefreshCw, X, Shield, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BrandLogo } from './BrandLogo';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLogoUrl: string | null;
  onSaveLogo: (url: string | null) => void;
  lang: Language;
}

export const LogoModal: React.FC<LogoModalProps> = ({
  isOpen,
  onClose,
  currentLogoUrl,
  onSaveLogo,
  lang
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl);
  const t = translations[lang].logoModal;

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        setSelectedPreset(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const presetLogos = [
    {
      id: 'sportwelt-gold',
      title: 'Sportwelt Gold Crest',
      svg: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white font-black text-xl shadow-md border border-amber-300">
          ⚡
        </div>
      )
    },
    {
      id: 'sportwelt-emerald',
      title: 'Sportwelt Emerald Pro',
      svg: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-black text-xl shadow-md border border-emerald-400">
          ⚽
        </div>
      )
    },
    {
      id: 'sportwelt-midnight',
      title: 'Sportwelt Midnight Shield',
      svg: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center text-amber-400 font-black text-xl shadow-md border border-slate-700">
          🛡️
        </div>
      )
    }
  ];

  const handleSave = () => {
    onSaveLogo(previewUrl);
    onClose();
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setSelectedPreset(null);
    onSaveLogo(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        id="logo-customizer-modal"
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{t.title}</h3>
            <p className="text-sm text-slate-500">{t.desc}</p>
          </div>
        </div>

        {/* Current Preview */}
        <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-2 text-center">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            {t.currentLogo}
          </span>
          <div className="min-h-[80px] py-2 flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Sportwelt Custom Logo"
                className="max-h-20 max-w-full object-contain rounded"
                referrerPolicy="no-referrer"
              />
            ) : (
              <BrandLogo size="md" isBright={true} />
            )}
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t.uploadLabel}
          </label>
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-xl bg-emerald-50/40 hover:bg-emerald-50/80 cursor-pointer transition text-center">
            <Upload className="w-8 h-8 text-emerald-600 mb-2" />
            <span className="text-sm font-medium text-slate-700">
              {lang === 'de' ? 'Klicke hier oder ziehe dein Logo hierher' : 'Click to browse or drag & drop your logo file'}
            </span>
            <span className="text-xs text-slate-400 mt-1">PNG, JPG, SVG, WebP (max. 5MB)</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 rounded-lg hover:bg-slate-100 transition"
          >
            <RefreshCw className="w-4 h-4" />
            {t.resetToDefault}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              {lang === 'de' ? 'Abbrechen' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
