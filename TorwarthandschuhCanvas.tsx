import React from 'react';
import { BrandInsignia } from './BrandInsignia';

interface TorwarthandschuhCanvasProps {
  brand?: string;
  primaryColor?: string;
  palmColor?: string;
  styleVariant?: 'predator' | 'supergrip' | 'attrakt' | 'future' | 'absolutgrip' | 'derbystar' | 'fieldplayer';
  className?: string;
}

export const TorwarthandschuhCanvas: React.FC<TorwarthandschuhCanvasProps> = ({
  brand = 'Uhlsport',
  primaryColor = '#EAB308',
  palmColor = '#FFFFFF',
  styleVariant = 'supergrip',
  className = ''
}) => {
  const isFieldplayer = styleVariant === 'fieldplayer';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 420 480"
        className="w-full h-full max-h-[380px] drop-shadow-xl transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glove Backhand Shading */}
          <linearGradient id="gloveBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>

          {/* Silicone Grip Texture pattern for Palm & Punch zones */}
          <pattern id="siliconeGripPattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1" fill="#ffffff" opacity="0.4" />
          </pattern>

          {/* Punch Zone Hex texture */}
          <pattern id="punchHex" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 10 3 L 10 8 L 5 10 L 0 8 L 0 3 Z" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
          </pattern>

          <filter id="gloveShadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {isFieldplayer ? (
          /* ============================================================ */
          /* FLEECE FELDSPIELER HANDSCHUH MIT SILIKON-EINWURF-GRIP         */
          /* ============================================================ */
          <g filter="url(#gloveShadow)">
            {/* Fleece base silhouette */}
            <path
              d="M 120 420 
                 L 115 330 
                 L 100 240 
                 L 80 180 Q 75 140 100 135 Q 125 140 130 180 
                 L 145 110 Q 150 70 175 70 Q 200 70 205 110 
                 L 220 50 Q 225 10 250 10 Q 275 10 280 50 
                 L 295 90 Q 300 55 325 55 Q 350 55 352 95 
                 L 365 170 Q 370 145 390 145 Q 405 145 402 175 
                 L 380 290 
                 L 350 350 
                 L 330 420 
                 Z"
              fill="#18181b"
              stroke="#27272a"
              strokeWidth="2.5"
            />
            {/* Elastic Cuff Band with Double Ribs */}
            <rect x="110" y="400" width="230" height="40" rx="8" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
            <line x1="120" y1="412" x2="330" y2="412" stroke="#52525b" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="120" y1="426" x2="330" y2="426" stroke="#52525b" strokeWidth="1.5" strokeDasharray="5 3" />

            {/* Silicone Throw-In Hexagon Palm Grip Webbing */}
            <path
              d="M 140 200 Q 240 180 340 220 L 320 340 Q 230 360 140 320 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0.8"
            />
            <g opacity="0.85">
              {/* Silicone grip lines on fingers for ball control during throw-ins */}
              <line x1="90" y1="160" x2="115" y2="160" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="95" y1="180" x2="120" y2="180" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

              <line x1="160" y1="90" x2="190" y2="90" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="160" y1="120" x2="190" y2="120" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="162" y1="150" x2="192" y2="150" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

              <line x1="235" y1="40" x2="265" y2="40" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="235" y1="70" x2="265" y2="70" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="237" y1="100" x2="267" y2="100" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

              <line x1="308" y1="80" x2="338" y2="80" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="310" y1="110" x2="340" y2="110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="315" y1="140" x2="345" y2="140" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Brand Logo & Model Patch */}
            <g transform="translate(195, 275) scale(1.1)">
              <BrandInsignia brand={brand} isLight={false} />
            </g>

            <rect x="175" y="365" width="100" height="18" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <text x="225" y="377" fill="#38bdf8" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="1.2">
              FELDSPIELER GRIP
            </text>
          </g>
        ) : (
          /* ============================================================ */
          /* PROFI TORWARTHANDSCHUH (NEGATIVE CUT & REBOUND ZONE)         */
          /* ============================================================ */
          <g filter="url(#gloveShadow)">
            {/* Base Goalkeeper Glove Body */}
            <path
              d="M 125 410 
                 L 115 310 
                 L 90 230 
                 L 60 170 Q 55 125 85 120 Q 115 125 125 165 
                 L 142 95 Q 148 50 178 50 Q 208 50 214 95 
                 L 225 35 Q 230 -5 260 -5 Q 290 -5 295 35 
                 L 305 75 Q 312 35 340 35 Q 368 35 372 80 
                 L 380 155 Q 388 125 410 130 Q 425 140 420 175 
                 L 395 285 
                 L 355 350 
                 L 330 410 
                 Z"
              fill={primaryColor}
              stroke="#0f172a"
              strokeWidth="3"
            />
            {/* Shading overlay */}
            <path
              d="M 125 410 L 115 310 L 90 230 L 60 170 Q 55 125 85 120 Q 115 125 125 165 L 142 95 Q 148 50 178 50 Q 208 50 214 95 L 225 35 Q 230 -5 260 -5 Q 290 -5 295 35 L 305 75 Q 312 35 340 35 Q 368 35 372 80 L 380 155 Q 388 125 410 130 Q 425 140 420 175 L 395 285 L 355 350 L 330 410 Z"
              fill="url(#gloveBackGrad)"
            />

            {/* Negative Cut Fingers Seam Gussets (Contrast breathable mesh) */}
            <line x1="135" y1="170" x2="175" y2="185" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="210" y1="120" x2="225" y2="165" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="295" y1="95" x2="305" y2="155" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="372" y1="135" x2="365" y2="185" stroke="#0f172a" strokeWidth="2.5" />

            {/* 3D Rebound / Punching Zone on Knuckles */}
            <g>
              <rect x="150" y="160" width="180" height="75" rx="14" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="150" y="160" width="180" height="75" rx="14" fill="url(#punchHex)" />
              {/* Silicone Grip Spines / Elements */}
              <circle cx="175" cy="180" r="5" fill="#38bdf8" />
              <circle cx="205" cy="180" r="5" fill="#38bdf8" />
              <circle cx="235" cy="180" r="5" fill="#38bdf8" />
              <circle cx="265" cy="180" r="5" fill="#38bdf8" />
              <circle cx="295" cy="180" r="5" fill="#38bdf8" />

              <circle cx="190" cy="205" r="5" fill="#ef4444" />
              <circle cx="220" cy="205" r="5" fill="#ef4444" />
              <circle cx="250" cy="205" r="5" fill="#ef4444" />
              <circle cx="280" cy="205" r="5" fill="#ef4444" />
            </g>

            {/* Fingertip Latex Wraps */}
            <path d="M 68 140 Q 85 125 102 140" stroke="#0f172a" strokeWidth="3" fill="none" />
            <path d="M 155 70 Q 178 55 201 70" stroke="#0f172a" strokeWidth="3" fill="none" />
            <path d="M 238 18 Q 260 5 282 18" stroke="#0f172a" strokeWidth="3" fill="none" />
            <path d="M 319 55 Q 340 40 361 55" stroke="#0f172a" strokeWidth="3" fill="none" />

            {/* Latex Palm Contour Visible at Edge */}
            <path
              d="M 60 170 Q 55 125 85 120 L 85 130 Q 62 135 68 170 Z"
              fill={palmColor}
              stroke="#0f172a"
              strokeWidth="1"
            />

            {/* Neoprene Extended Wrist Body */}
            <path
              d="M 120 330 Q 230 350 340 330 L 330 425 Q 225 440 120 425 Z"
              fill="#09090b"
              stroke="#27272a"
              strokeWidth="2"
            />

            {/* 360° Dual Fix Velcro Latex Bandage Strap */}
            <rect x="110" y="360" width="235" height="38" rx="8" fill="#18181b" stroke="#eab308" strokeWidth="2" />
            <line x1="120" y1="372" x2="330" y2="372" stroke="#52525b" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="120" y1="386" x2="330" y2="386" stroke="#52525b" strokeWidth="1.5" strokeDasharray="5 3" />

            {/* Brand Logo on Backhand Wrist */}
            <g transform="translate(195, 260) scale(1.2)">
              <BrandInsignia brand={brand} isLight={false} />
            </g>

            {/* Personalization window on wrist strap */}
            <rect x="175" y="368" width="105" height="22" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
            <text x="227" y="383" fill="#facc15" fontSize="10" fontWeight="black" textAnchor="middle" letterSpacing="1.5">
              PRO MATCH LATEX
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
