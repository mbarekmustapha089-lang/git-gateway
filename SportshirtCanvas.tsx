import React from 'react';
import { BrandInsignia } from './BrandInsignia';

interface SportshirtCanvasProps {
  color: string;
  accentColor?: string;
  brandText?: string;
  showCrest?: boolean;
  crestUrl?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SportshirtCanvas: React.FC<SportshirtCanvasProps> = ({
  color = '#FFFFFF',
  accentColor = '#1e293b',
  brandText = 'ERIMA',
  showCrest = false,
  crestUrl = null,
  className = '',
  size = 'md'
}) => {
  // Determine if base color is very light (e.g. white or off-white) to adjust shading/cuff contrast
  const isLight = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#f8f9fa' || color.toLowerCase() === '#faf5ff' || color.toLowerCase() === '#f5f5f4';

  // Derived accent for collar/sleeves if not provided
  const collarColor = isLight ? '#e2e8f0' : '#0f172a';
  const trimColor = isLight ? '#cbd5e1' : 'rgba(255,255,255,0.25)';
  const currentBrand = (brandText || 'ERIMA').toUpperCase();
  const brandLower = (brandText || 'erima').toLowerCase();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 520"
        className="w-full h-full max-h-[460px] drop-shadow-xl transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Realistic Fabric Gradient Highlight */}
          <linearGradient id="shirtHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.22" />
            <stop offset="12%" stopColor="#fff" stopOpacity={isLight ? '0.25' : '0.12'} />
            <stop offset="50%" stopColor="#fff" stopOpacity={isLight ? '0.35' : '0.18'} />
            <stop offset="88%" stopColor="#fff" stopOpacity={isLight ? '0.25' : '0.12'} />
            <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
          </linearGradient>

          {/* Torso Depth Gradient */}
          <linearGradient id="torsoDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
          </linearGradient>

          {/* Sleeve Shade */}
          <linearGradient id="sleeveLeftShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
          </linearGradient>

          <linearGradient id="sleeveRightShade" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
          </linearGradient>

          {/* Side Breathable Mesh Texture */}
          <pattern id="breathableMesh" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.5" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>

        {/* --- SLEEVE LEFT --- */}
        <g>
          <path
            d="M 140 110 L 40 185 L 75 250 L 145 200 Z"
            fill={color}
            stroke={isLight ? '#cbd5e1' : 'rgba(0,0,0,0.2)'}
            strokeWidth="1.5"
          />
          <path
            d="M 140 110 L 40 185 L 75 250 L 145 200 Z"
            fill="url(#sleeveLeftShade)"
          />
          {/* Left Sleeve Hem Trim */}
          <path
            d="M 40 185 L 75 250"
            stroke={trimColor}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Shoulder Brand Accent / Stripes / Dots */}
          <g transform="translate(68, 170) rotate(35) scale(0.65)">
            {brandLower === 'adidas' ? (
              <g>
                <line x1="0" y1="0" x2="35" y2="0" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3.5" opacity="0.85" />
                <line x1="0" y1="6" x2="35" y2="6" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3.5" opacity="0.85" />
                <line x1="0" y1="12" x2="35" y2="12" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3.5" opacity="0.85" />
              </g>
            ) : brandLower === 'jako' ? (
              <g>
                <circle cx="6" cy="4" r="3.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.85" />
                <circle cx="20" cy="4" r="3.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.85" />
              </g>
            ) : (
              <g>
                <rect x="0" y="0" width="8" height="8" rx="1.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.8" />
                <rect x="12" y="0" width="8" height="8" rx="1.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.8" />
                <rect x="24" y="0" width="8" height="8" rx="1.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.8" />
              </g>
            )}
          </g>
        </g>

        {/* --- SLEEVE RIGHT --- */}
        <g>
          <path
            d="M 360 110 L 460 185 L 425 250 L 355 200 Z"
            fill={color}
            stroke={isLight ? '#cbd5e1' : 'rgba(0,0,0,0.2)'}
            strokeWidth="1.5"
          />
          <path
            d="M 360 110 L 460 185 L 425 250 L 355 200 Z"
            fill="url(#sleeveRightShade)"
          />
          {/* Right Sleeve Hem Trim */}
          <path
            d="M 460 185 L 425 250"
            stroke={trimColor}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Shoulder Brand Accent / Stripes / Dots */}
          <g transform="translate(415, 175) rotate(-35) scale(0.65)">
            {brandLower === 'adidas' ? (
              <g>
                <line x1="0" y1="0" x2="35" y2="0" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3.5" opacity="0.85" />
                <line x1="0" y1="6" x2="35" y2="6" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3.5" opacity="0.85" />
                <line x1="0" y1="12" x2="35" y2="12" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3.5" opacity="0.85" />
              </g>
            ) : brandLower === 'jako' ? (
              <g>
                <circle cx="6" cy="4" r="3.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.85" />
                <circle cx="20" cy="4" r="3.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.85" />
              </g>
            ) : (
              <g>
                <rect x="0" y="0" width="8" height="8" rx="1.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.8" />
                <rect x="12" y="0" width="8" height="8" rx="1.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.8" />
                <rect x="24" y="0" width="8" height="8" rx="1.5" fill={isLight ? '#0f172a' : '#ffffff'} opacity="0.8" />
              </g>
            )}
          </g>
        </g>

        {/* --- MAIN TORSO BODY --- */}
        <g>
          <path
            d="M 140 110 
               Q 200 90, 250 92 
               Q 300 90, 360 110 
               L 355 200 
               L 365 470 
               Q 250 485, 135 470 
               L 145 200 
               Z"
            fill={color}
            stroke={isLight ? '#cbd5e1' : 'rgba(0,0,0,0.18)'}
            strokeWidth="1.5"
          />

          {/* Breathable Athletic Mesh Side Inserts */}
          <path
            d="M 145 200 L 165 215 L 155 472 L 135 470 Z"
            fill="url(#breathableMesh)"
            opacity="0.75"
          />
          <path
            d="M 355 200 L 335 215 L 345 472 L 365 470 Z"
            fill="url(#breathableMesh)"
            opacity="0.75"
          />

          {/* Torso 3D Lighting & Folds */}
          <path
            d="M 140 110 
               Q 200 90, 250 92 
               Q 300 90, 360 110 
               L 355 200 
               L 365 470 
               Q 250 485, 135 470 
               L 145 200 
               Z"
            fill="url(#shirtHighlight)"
          />
          <path
            d="M 140 110 
               Q 200 90, 250 92 
               Q 300 90, 360 110 
               L 355 200 
               L 365 470 
               Q 250 485, 135 470 
               L 145 200 
               Z"
            fill="url(#torsoDepth)"
          />

          {/* Bottom Hem Seam Line */}
          <path
            d="M 137 460 Q 250 475, 363 460"
            stroke={isLight ? '#94a3b8' : 'rgba(255,255,255,0.2)'}
            strokeWidth="2"
            strokeDasharray="4 2"
            fill="none"
          />
        </g>

        {/* --- CREW NECK COLLAR --- */}
        <g>
          {/* Inner Back Neck (dark shadow) */}
          <path
            d="M 195 95 Q 250 120, 305 95 Q 250 82, 195 95 Z"
            fill={isLight ? '#64748b' : '#090d16'}
          />

          {/* Inside Size Tag Label */}
          <rect x="235" y="88" width="30" height="14" rx="2" fill="#ffffff" opacity="0.9" />
          <text x="250" y="99" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f172a">
            L • PRO
          </text>

          {/* Front Ribbed Collar Ring */}
          <path
            d="M 190 95 Q 250 142, 310 95 Q 250 122, 190 95 Z"
            fill={isLight ? '#f1f5f9' : collarColor}
            stroke={isLight ? '#cbd5e1' : 'rgba(0,0,0,0.3)'}
            strokeWidth="1.5"
          />
        </g>

        {/* --- CHEST BRANDING & WAPPEN --- */}
        <g>
          {/* Right Chest: Brand Vector Logo & Wordmark (Authentic Nike, Adidas, Puma, Jako, Erima, Derbystar, Uhlsport, Sportwelt) */}
          <g transform="translate(295, 150)">
            {/* Vector Brand Icon */}
            <g transform="translate(0, 0) scale(1)">
              {brandLower === 'nike' ? (
                <path
                  d="M 2 14 C 10 18 24 19 36 6 C 28 11 16 13 8 10 C 5 9 3 7 1 4 C 0.5 7 1 11 2 14 Z"
                  fill={isLight ? '#0f172a' : '#ffffff'}
                />
              ) : brandLower === 'adidas' ? (
                <g>
                  <polygon points="6,16 11,16 18,3 13,3" fill={isLight ? '#0f172a' : '#ffffff'} />
                  <polygon points="14,16 19,16 26,7 21,7" fill={isLight ? '#0f172a' : '#ffffff'} />
                  <polygon points="22,16 27,16 32,11 27,11" fill={isLight ? '#0f172a' : '#ffffff'} />
                </g>
              ) : brandLower === 'puma' ? (
                <g>
                  <path
                    d="M 32 4 C 30 3 27 5 24 6 C 22 7 20 8 18 10 C 16 9 12 8 8 11 C 6 12 4 15 2 16 C 5 15 8 14 11 15 C 13 13 17 12 21 11 C 24 10 27 9 30 7 C 32 6 33 5 32 4 Z"
                    fill={isLight ? '#0f172a' : '#ffffff'}
                  />
                  <circle cx="29" cy="5" r="1.5" fill={isLight ? '#0f172a' : '#ffffff'} />
                </g>
              ) : brandLower === 'jako' ? (
                <g>
                  <circle cx="10" cy="10" r="4.5" fill="none" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="2.5" />
                  <circle cx="24" cy="10" r="4.5" fill="none" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="2.5" />
                </g>
              ) : brandLower === 'derbystar' ? (
                <polygon
                  points="17,2 21,11 31,11 23,17 26,27 17,21 8,27 11,17 3,11 13,11"
                  fill={isLight ? '#0f172a' : '#ffffff'}
                  transform="scale(0.8) translate(3, 1)"
                />
              ) : brandLower === 'uhlsport' ? (
                <g>
                  <circle cx="17" cy="10" r="8" fill="none" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="3" />
                  <path d="M 9 10 L 25 10" stroke={isLight ? '#0f172a' : '#ffffff'} strokeWidth="2.5" />
                </g>
              ) : brandLower === 'erima' ? (
                <g>
                  <rect x="5" y="6" width="6" height="6" rx="1" fill={isLight ? '#0f172a' : '#ffffff'} transform="rotate(45 8 9)" />
                  <rect x="15" y="6" width="6" height="6" rx="1" fill={isLight ? '#0f172a' : '#ffffff'} transform="rotate(45 18 9)" />
                  <rect x="25" y="6" width="6" height="6" rx="1" fill={isLight ? '#0f172a' : '#ffffff'} transform="rotate(45 28 9)" />
                </g>
              ) : (
                <path
                  d="M 12 2 L 6 12 L 14 12 L 10 22 L 22 10 L 14 10 Z"
                  fill={isLight ? '#0f172a' : '#ffffff'}
                />
              )}
            </g>
            <text
              x="17"
              y="33"
              textAnchor="middle"
              fontSize="9"
              fontWeight="900"
              letterSpacing="1.2"
              fill={isLight ? '#0f172a' : '#ffffff'}
              className="drop-shadow-2xs"
            >
              {currentBrand}
            </text>
          </g>

          {/* Left Chest: Optional Club Crest or Badge */}
          {showCrest && (
            <g transform="translate(170, 155)">
              {crestUrl ? (
                <image
                  href={crestUrl}
                  x="0"
                  y="0"
                  width="44"
                  height="44"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <g>
                  {/* Default Club Shield Badge */}
                  <path
                    d="M 5 0 L 35 0 C 35 25, 20 40, 20 40 C 20 40, 5 25, 5 0 Z"
                    fill="#d81920"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="20" y="16" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">
                    TH
                  </text>
                  <text x="20" y="27" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff">
                    CLUB
                  </text>
                </g>
              )}
            </g>
          )}

          {/* Center Subtle Athletic Chest Seam */}
          <path
            d="M 180 135 Q 250 160, 320 135"
            stroke={isLight ? '#cbd5e1' : 'rgba(255,255,255,0.15)'}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Bottom Left: Authentic Teamsport Engineered Tag */}
          <g transform="translate(145, 435)">
            <rect x="0" y="0" width="34" height="20" rx="3" fill="#0f172a" opacity="0.9" />
            <text x="17" y="9" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#38bdf8">
              QUICK-DRY
            </text>
            <text x="17" y="16" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#ffffff">
              AUTHENTIC
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
