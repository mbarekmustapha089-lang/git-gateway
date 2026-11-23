import React from 'react';
import emblemCleanImg from '../assets/images/sportwelt_emblem_clean_opt.png';

interface BrandLogoProps {
  customLogoUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  isBright?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  customLogoUrl,
  className = '',
  size = 'md',
  showSubtitle = true,
  isBright = false
}) => {
  // If user uploaded a custom logo via the modal/local state
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative p-1 rounded-2xl overflow-hidden">
          <img
            src={customLogoUrl}
            alt="Sportwelt Logo"
            className={`${
              size === 'sm' ? 'h-10 max-w-[140px]' :
              size === 'lg' ? 'h-20 max-w-[260px]' :
              size === 'xl' ? 'h-28 max-w-[320px]' :
              size === 'hero' ? 'h-36 max-w-[420px]' :
              'h-14 sm:h-16 max-w-[200px]'
            } object-contain`}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // Official TH SPORTWELT Logo: Dark Blue "TH", Dark Red "SPORTWELT", emblem without white background
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      {/* High-Impact Logo Emblem Without White Background */}
      <div className="relative group shrink-0">
        <div className={`relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
          size === 'sm' ? 'w-10 h-10' :
          size === 'lg' ? 'w-18 h-18 sm:w-20 sm:h-20' :
          size === 'xl' ? 'w-24 h-24 sm:w-28 sm:h-28' :
          size === 'hero' ? 'w-32 h-32 sm:w-36 sm:h-36' :
          'w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16'
        }`}>
          <img
            src={emblemCleanImg}
            alt="TH SPORTWELT Logo"
            className="w-full h-full object-contain filter drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Brand Typography: Dark Blue "TH", Dark Red "SPORTWELT" */}
      <div className="text-left leading-none">
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className={`font-black tracking-tight uppercase transition-colors ${
            size === 'sm' ? 'text-xl' :
            size === 'lg' ? 'text-3xl sm:text-4xl' :
            size === 'xl' ? 'text-4xl sm:text-5xl' :
            size === 'hero' ? 'text-5xl sm:text-6xl' :
            'text-2xl sm:text-3xl md:text-4xl'
          }`}>
            <span className="text-[#0a1e38] drop-shadow-xs">TH </span>
            <span className="text-[#8b0000] drop-shadow-xs">SPORTWELT</span>
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <p className="text-[11px] sm:text-xs uppercase font-black tracking-wider text-slate-600">
              Fußball &amp; Teamsport • DTF Transfer Manufaktur
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
