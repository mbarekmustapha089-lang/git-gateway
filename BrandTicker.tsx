import React from 'react';
import { TOP_BRANDS } from '../data/products';
import { BrandName } from '../types';
import { Sparkles, ExternalLink } from 'lucide-react';

interface BrandTickerProps {
  selectedBrand: BrandName | 'all';
  onSelectBrand: (brand: BrandName | 'all') => void;
}

export const BrandTicker: React.FC<BrandTickerProps> = ({
  selectedBrand,
  onSelectBrand
}) => {
  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Top Marken & Partner:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => onSelectBrand('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedBrand === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            Alle Marken
          </button>

          {TOP_BRANDS.map((brand) => {
            const isSelected = selectedBrand === brand.slug;
            const isSportweltPro = brand.slug === 'Sportwelt' || brand.logoText.toLowerCase().includes('sportwelt');

            if (isSportweltPro) {
              return (
                <a
                  key={brand.slug}
                  href="https://trikotsdesign.de/th-sports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1 rounded-full text-xs font-black transition whitespace-nowrap border bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white border-emerald-600 shadow-xs flex items-center gap-1.5 group"
                  title="Sportwelt Pro - Zu https://trikotsdesign.de/th-sports/"
                >
                  <span>{brand.logoText}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-100 group-hover:translate-x-0.5 transition-transform" />
                </a>
              );
            }

            return (
              <button
                key={brand.slug}
                type="button"
                onClick={() => onSelectBrand(brand.slug as BrandName)}
                className={`px-3.5 py-1 rounded-full text-xs font-extrabold transition whitespace-nowrap border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {brand.logoText}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
