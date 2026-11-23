import React from 'react';
import { JerseyCustomization } from '../types';
import { CLUB_PRESET_CRESTS } from '../data/products';

interface JerseyCanvasProps {
  customization: JerseyCustomization;
  view: 'front' | 'back';
  className?: string;
}

export const JerseyCanvas: React.FC<JerseyCanvasProps> = ({
  customization,
  view,
  className = ''
}) => {
  const {
    pattern,
    primaryColor,
    secondaryColor,
    accentColor,
    collarColor,
    collarType,
    sleeveTrimColor,
    clubName,
    clubCrestUrl,
    clubCrestPreset,
    sponsorText,
    sponsorLogoUrl,
    sponsorColor,
    playerName,
    playerNumber,
    numberColor,
    numberFont,
    sleeveBadge
  } = customization;

  const selectedPreset = CLUB_PRESET_CRESTS.find(c => c.id === clubCrestPreset) || CLUB_PRESET_CRESTS[0];

  const fontClasses = {
    modern: 'font-sans font-black tracking-tight',
    classic: 'font-serif font-bold tracking-normal',
    block: 'font-mono font-black tracking-wider',
    athletic: 'font-sans font-extrabold tracking-widest'
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 550"
        className="w-full h-full max-h-[500px] drop-shadow-2xl transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Fabric Lighting & Shadow */}
          <linearGradient id="jerseyShade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
            <stop offset="15%" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="85%" stopColor="#fff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
          </linearGradient>

          <linearGradient id="foldDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>

          {/* Patterns */}
          <pattern id="pat-stripes-vertical" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="20" height="40" fill={primaryColor} />
            <rect x="20" width="20" height="40" fill={secondaryColor} />
          </pattern>

          <pattern id="pat-stripes-horizontal" width="40" height="36" patternUnits="userSpaceOnUse">
            <rect width="40" height="18" fill={primaryColor} />
            <rect y="18" width="40" height="18" fill={secondaryColor} />
          </pattern>

          <pattern id="pat-modern-hex" width="30" height="52" patternUnits="userSpaceOnUse">
            <rect width="30" height="52" fill={primaryColor} />
            <path
              d="M 15 0 L 30 8.6 L 30 26 L 15 34.6 L 0 26 L 0 8.6 Z"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2.5"
              strokeOpacity="0.75"
            />
            <path
              d="M 15 52 L 30 43.4 L 30 26 L 15 34.6 L 0 26 L 0 43.4 Z"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="2.5"
              strokeOpacity="0.75"
            />
          </pattern>

          <pattern id="pat-geometric-mesh" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={primaryColor} />
            <polygon points="0,0 20,40 40,0" fill={secondaryColor} fillOpacity="0.8" />
            <polygon points="0,40 20,0 40,40" fill={accentColor} fillOpacity="0.5" />
          </pattern>

          {/* Clip Paths */}
          <clipPath id="bodyClip">
            <path d="M 140,85 C 170,105 330,105 360,85 L 395,200 L 340,210 L 340,480 C 340,495 325,505 305,505 L 195,505 C 175,505 160,495 160,480 L 160,210 L 105,200 Z" />
          </clipPath>

          <clipPath id="leftSleeveClip">
            <path d="M 140,85 L 160,210 L 60,260 L 35,170 Z" />
          </clipPath>

          <clipPath id="rightSleeveClip">
            <path d="M 360,85 L 340,210 L 440,260 L 465,170 Z" />
          </clipPath>
        </defs>

        {/* --- LEFT SLEEVE --- */}
        <g id="left-sleeve">
          <path
            d="M 140,85 L 160,210 L 60,260 L 35,170 Z"
            fill={secondaryColor}
            className="transition-colors duration-300"
          />
          {/* Sleeve Trim Cuff */}
          <path
            d="M 60,260 L 35,170 L 45,150 L 72,242 Z"
            fill={sleeveTrimColor}
          />
          {/* Sleeve Badge */}
          {sleeveBadge !== 'none' && (
            <g transform="translate(68, 185) scale(0.65)">
              <circle cx="20" cy="20" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
              <text x="20" y="24" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                {sleeveBadge === 'dfb-kreisliga' ? 'DFB' : sleeveBadge === 'verband' ? 'LIGA' : 'PRO'}
              </text>
            </g>
          )}
          {/* Sleeve Shade */}
          <path d="M 140,85 L 160,210 L 60,260 L 35,170 Z" fill="url(#jerseyShade)" opacity="0.4" />
        </g>

        {/* --- RIGHT SLEEVE --- */}
        <g id="right-sleeve">
          <path
            d="M 360,85 L 340,210 L 440,260 L 465,170 Z"
            fill={secondaryColor}
            className="transition-colors duration-300"
          />
          {/* Right Sleeve Cuff */}
          <path
            d="M 440,260 L 465,170 L 455,150 L 428,242 Z"
            fill={sleeveTrimColor}
          />
          <path d="M 360,85 L 340,210 L 440,260 L 465,170 Z" fill="url(#jerseyShade)" opacity="0.4" />
        </g>

        {/* --- MAIN TORSO BODY --- */}
        <g id="torso-body" clipPath="url(#bodyClip)">
          {/* Base Fill */}
          <rect x="100" y="50" width="300" height="460" fill={primaryColor} />

          {/* Pattern Overlay */}
          {pattern === 'stripes-vertical' && (
            <rect x="100" y="50" width="300" height="460" fill="url(#pat-stripes-vertical)" />
          )}

          {pattern === 'stripes-horizontal' && (
            <rect x="100" y="50" width="300" height="460" fill="url(#pat-stripes-horizontal)" />
          )}

          {pattern === 'modern-hex' && (
            <rect x="100" y="50" width="300" height="460" fill="url(#pat-modern-hex)" />
          )}

          {pattern === 'geometric-mesh' && (
            <rect x="100" y="50" width="300" height="460" fill="url(#pat-geometric-mesh)" />
          )}

          {pattern === 'dynamic-sash' && (
            <polygon
              points="140,80 190,80 340,430 340,490 290,490 140,140"
              fill={secondaryColor}
            />
          )}

          {pattern === 'half-half' && (
            <rect x="250" y="50" width="150" height="460" fill={secondaryColor} />
          )}

          {pattern === 'gradient-fade' && (
            <g>
              <linearGradient id="gradFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="60%" stopColor={secondaryColor} />
                <stop offset="100%" stopColor={accentColor} />
              </linearGradient>
              <rect x="100" y="50" width="300" height="460" fill="url(#gradFade)" />
            </g>
          )}

          {/* Side Ventilation Mesh Stripes */}
          <rect x="160" y="210" width="10" height="270" fill={accentColor} opacity="0.9" />
          <rect x="330" y="210" width="10" height="270" fill={accentColor} opacity="0.9" />

          {/* Light & Shadow 3D realism */}
          <rect x="100" y="50" width="300" height="460" fill="url(#jerseyShade)" opacity="0.5" />
          <rect x="100" y="50" width="300" height="460" fill="url(#foldDepth)" opacity="0.6" />
        </g>

        {/* --- BODY OUTLINE & STITCHING --- */}
        <path
          d="M 140,85 C 170,105 330,105 360,85 L 395,200 L 340,210 L 340,480 C 340,495 325,505 305,505 L 195,505 C 175,505 160,495 160,480 L 160,210 L 105,200 Z"
          fill="none"
          stroke="#000"
          strokeOpacity="0.25"
          strokeWidth="2.5"
        />

        {/* --- FRONT VIEW CONTENT --- */}
        {view === 'front' && (
          <g id="front-graphics">
            {/* Club Crest (Left Chest) */}
            <g id="club-crest" transform="translate(195, 160)">
              {clubCrestUrl ? (
                <image
                  href={clubCrestUrl}
                  x="-20"
                  y="-20"
                  width="40"
                  height="40"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <g>
                  <circle cx="0" cy="0" r="22" fill={selectedPreset.color} stroke="#ffffff" strokeWidth="2.5" className="drop-shadow" />
                  <text x="0" y="7" fontSize="20" textAnchor="middle" dominantBaseline="central">
                    {selectedPreset.icon}
                  </text>
                </g>
              )}
            </g>

            {/* Sportwelt Brand Logo (Right Chest) */}
            <g id="brand-logo" transform="translate(305, 160)">
              <path
                d="M -12,-8 L 4,-8 L -4,2 L 12,2 L -10,14 L -4,4 L -14,4 Z"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="0.8"
                className="drop-shadow-sm"
              />
            </g>

            {/* Front Sponsor */}
            <g id="front-sponsor" transform="translate(250, 275)">
              {sponsorLogoUrl ? (
                <image
                  href={sponsorLogoUrl}
                  x="-80"
                  y="-35"
                  width="160"
                  height="70"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <g>
                  {sponsorText && (
                    <>
                      <rect
                        x="-100"
                        y="-22"
                        width="200"
                        height="44"
                        rx="6"
                        fill="#000000"
                        fillOpacity="0.12"
                      />
                      <text
                        x="0"
                        y="7"
                        fill={sponsorColor}
                        fontSize="17"
                        fontWeight="900"
                        fontFamily="sans-serif"
                        letterSpacing="1.5"
                        textAnchor="middle"
                        className="drop-shadow-sm uppercase"
                      >
                        {sponsorText}
                      </text>
                    </>
                  )}
                </g>
              )}
            </g>

            {/* Club Name or City Bottom Hem (Subtle) */}
            <text
              x="250"
              y="475"
              fill="#ffffff"
              fillOpacity="0.4"
              fontSize="11"
              fontWeight="bold"
              letterSpacing="2"
              textAnchor="middle"
            >
              SPORTWELT MATCHWEAR • GERMANY
            </text>
          </g>
        )}

        {/* --- BACK VIEW CONTENT --- */}
        {view === 'back' && (
          <g id="back-graphics">
            {/* Top Club Name / City */}
            <text
              x="250"
              y="160"
              fill={numberColor}
              fontSize="20"
              fontWeight="900"
              letterSpacing="3"
              textAnchor="middle"
              className="drop-shadow-sm uppercase font-sans"
            >
              {clubName || 'SV SPORTWELT'}
            </text>

            {/* Big Squad Number */}
            <text
              x="250"
              y="280"
              fill={numberColor}
              fontSize="115"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="middle"
              className={`drop-shadow-md ${fontClasses[numberFont]}`}
              stroke="#000000"
              strokeWidth="1.5"
              strokeOpacity="0.2"
            >
              {playerNumber || '10'}
            </text>

            {/* Player Name */}
            {playerName && (
              <text
                x="250"
                y="365"
                fill={numberColor}
                fontSize="18"
                fontWeight="800"
                letterSpacing="2"
                textAnchor="middle"
                className="drop-shadow-sm uppercase font-sans"
              >
                {playerName}
              </text>
            )}

            {/* Authenticity Tag at Bottom */}
            <g transform="translate(305, 460)">
              <rect width="24" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <text x="12" y="11" fontSize="7" fontWeight="bold" fill="#334155" textAnchor="middle">
                PRO
              </text>
            </g>
          </g>
        )}

        {/* --- COLLAR & NECKLINE --- */}
        <g id="collar">
          {collarType === 'round' && (
            <path
              d="M 195,78 C 220,120 280,120 305,78 C 295,95 205,95 195,78 Z"
              fill={collarColor}
              stroke="#000"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
          )}

          {collarType === 'vneck' && (
            <path
              d="M 195,78 L 250,130 L 305,78 L 285,78 L 250,115 L 215,78 Z"
              fill={collarColor}
              stroke="#000"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
          )}

          {collarType === 'polo' && (
            <g>
              <polygon points="195,78 230,130 250,85" fill={collarColor} stroke="#00000033" strokeWidth="1" />
              <polygon points="305,78 270,130 250,85" fill={collarColor} stroke="#00000033" strokeWidth="1" />
              <rect x="246" y="85" width="8" height="40" fill={collarColor} stroke="#00000033" strokeWidth="1" />
              <circle cx="250" cy="98" r="2" fill="#fff" />
              <circle cx="250" cy="114" r="2" fill="#fff" />
            </g>
          )}

          {/* Inner Neck Hole Shadow */}
          <ellipse cx="250" cy="78" rx="55" ry="16" fill="#1e293b" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
