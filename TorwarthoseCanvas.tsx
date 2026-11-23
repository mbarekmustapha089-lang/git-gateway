import React from 'react';
import { BrandInsignia } from './BrandInsignia';

interface TorwarthoseCanvasProps {
  type?: 'long' | 'short' | 'three-quarter';
  brand?: string;
  color?: string;
  className?: string;
}

export const TorwarthoseCanvas: React.FC<TorwarthoseCanvasProps> = ({
  type = 'long',
  brand = 'Uhlsport',
  color = '#18181B',
  className = ''
}) => {
  const brandName = brand || 'Uhlsport';
  const isShort = type === 'short';
  const isThreeQuarter = type === 'three-quarter';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 480"
        className="w-full h-full max-h-[360px] drop-shadow-xl transition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle lighting / fabric gradient */}
          <linearGradient id="fabricShading" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="30%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#3f3f46" />
            <stop offset="70%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          {/* Padding texture pattern */}
          <pattern id="padHexGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0 4 L 4 0 L 8 4 L 4 8 Z" fill="none" stroke="#52525b" strokeWidth="0.8" opacity="0.6" />
          </pattern>

          {/* Hip & Knee Padding Gradient */}
          <linearGradient id="padGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>

          <filter id="padShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- ELASTIC WAISTBAND WITH DRAWSTRING --- */}
        <path
          d="M 100 45 Q 200 52 300 45 L 306 72 Q 200 80 94 72 Z"
          fill="#18181b"
          stroke="#3f3f46"
          strokeWidth="2"
        />
        {/* Waistband stitch ridges */}
        <line x1="98" y1="54" x2="302" y2="54" stroke="#52525b" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="96" y1="63" x2="304" y2="63" stroke="#52525b" strokeWidth="1" strokeDasharray="4 2" />

        {/* Drawcord eyelets and strings */}
        <circle cx="192" cy="62" r="2.5" fill="#71717a" />
        <circle cx="208" cy="62" r="2.5" fill="#71717a" />
        <path d="M 192 64 Q 185 85 188 95" stroke="#e4e4e7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 208 64 Q 215 85 212 95" stroke="#e4e4e7" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* --- PANTS LEGS SILHOUETTE DEPENDING ON TYPE --- */}
        {isShort ? (
          /* SHORT GOALKEEPER PANTS (Hüftschutz Shorts) */
          <g>
            {/* Outer silhouette */}
            <path
              d="M 94 72 
                 L 80 180 
                 Q 80 230 92 245 
                 L 175 242 
                 L 192 145 
                 L 208 145 
                 L 225 242 
                 L 308 245 
                 Q 320 230 320 180 
                 L 306 72 
                 Z"
              fill="url(#fabricShading)"
              stroke="#27272a"
              strokeWidth="2"
            />
            {/* Leg hems */}
            <path d="M 92 245 L 175 242" stroke="#52525b" strokeWidth="3" />
            <path d="M 225 242 L 308 245" stroke="#52525b" strokeWidth="3" />

            {/* Left Hip EVA Protective Pad */}
            <g filter="url(#padShadow)">
              <path
                d="M 88 100 Q 82 140 88 175 Q 125 185 138 150 Q 140 115 125 95 Q 105 92 88 100 Z"
                fill="url(#padGradient)"
                stroke="#059669"
                strokeWidth="1.5"
              />
              <path
                d="M 88 100 Q 82 140 88 175 Q 125 185 138 150 Q 140 115 125 95 Q 105 92 88 100 Z"
                fill="url(#padHexGrid)"
              />
              {/* Segmented cushion lines */}
              <line x1="86" y1="125" x2="134" y2="120" stroke="#71717a" strokeWidth="1.2" />
              <line x1="87" y1="150" x2="132" y2="152" stroke="#71717a" strokeWidth="1.2" />
            </g>

            {/* Right Hip EVA Protective Pad */}
            <g filter="url(#padShadow)">
              <path
                d="M 312 100 Q 318 140 312 175 Q 275 185 262 150 Q 260 115 275 95 Q 295 92 312 100 Z"
                fill="url(#padGradient)"
                stroke="#059669"
                strokeWidth="1.5"
              />
              <path
                d="M 312 100 Q 318 140 312 175 Q 275 185 262 150 Q 260 115 275 95 Q 295 92 312 100 Z"
                fill="url(#padHexGrid)"
              />
              {/* Segmented cushion lines */}
              <line x1="314" y1="125" x2="266" y2="120" stroke="#71717a" strokeWidth="1.2" />
              <line x1="313" y1="150" x2="268" y2="152" stroke="#71717a" strokeWidth="1.2" />
            </g>
          </g>
        ) : isThreeQuarter ? (
          /* 3/4 GOALKEEPER PANTS (Knieschutz) */
          <g>
            <path
              d="M 94 72 
                 L 76 190 
                 Q 74 270 98 340 
                 L 165 336 
                 L 192 165 
                 L 208 165 
                 L 235 336 
                 L 302 340 
                 Q 326 270 324 190 
                 L 306 72 
                 Z"
              fill="url(#fabricShading)"
              stroke="#27272a"
              strokeWidth="2"
            />
            {/* Ribbed 3/4 calf cuffs */}
            <path d="M 98 340 L 165 336 L 163 355 L 100 358 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <path d="M 235 336 L 302 340 L 300 358 L 237 355 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />

            {/* Hip Pads */}
            <g filter="url(#padShadow)">
              <path
                d="M 84 95 Q 76 135 84 170 Q 120 180 132 145 Q 134 110 120 90 Q 100 88 84 95 Z"
                fill="url(#padGradient)"
                stroke="#059669"
                strokeWidth="1.5"
              />
              <path d="M 84 95 Q 76 135 84 170 Q 120 180 132 145 Q 134 110 120 90 Q 100 88 84 95 Z" fill="url(#padHexGrid)" />
              <path
                d="M 316 95 Q 324 135 316 170 Q 280 180 268 145 Q 266 110 280 90 Q 300 88 316 95 Z"
                fill="url(#padGradient)"
                stroke="#059669"
                strokeWidth="1.5"
              />
              <path d="M 316 95 Q 324 135 316 170 Q 280 180 268 145 Q 266 110 280 90 Q 300 88 316 95 Z" fill="url(#padHexGrid)" />
            </g>

            {/* Left Knee Pad */}
            <g filter="url(#padShadow)">
              <rect x="98" y="245" width="56" height="68" rx="14" fill="url(#padGradient)" stroke="#059669" strokeWidth="1.5" />
              <rect x="98" y="245" width="56" height="68" rx="14" fill="url(#padHexGrid)" />
              <line x1="102" y1="268" x2="150" y2="268" stroke="#71717a" strokeWidth="1.2" />
              <line x1="102" y1="290" x2="150" y2="290" stroke="#71717a" strokeWidth="1.2" />
            </g>

            {/* Right Knee Pad */}
            <g filter="url(#padShadow)">
              <rect x="246" y="245" width="56" height="68" rx="14" fill="url(#padGradient)" stroke="#059669" strokeWidth="1.5" />
              <rect x="246" y="245" width="56" height="68" rx="14" fill="url(#padHexGrid)" />
              <line x1="250" y1="268" x2="298" y2="268" stroke="#71717a" strokeWidth="1.2" />
              <line x1="250" y1="290" x2="298" y2="290" stroke="#71717a" strokeWidth="1.2" />
            </g>
          </g>
        ) : (
          /* LONG GOALKEEPER PANTS (Lange Torwarthose mit Hüft- und Kniedämpfung) */
          <g>
            <path
              d="M 94 72 
                 L 74 190 
                 Q 70 280 94 360 
                 L 115 450 
                 L 155 448 
                 L 172 360 
                 L 192 175 
                 L 208 175 
                 L 228 360 
                 L 245 448 
                 L 285 450 
                 L 306 360 
                 Q 330 280 326 190 
                 L 306 72 
                 Z"
              fill="url(#fabricShading)"
              stroke="#27272a"
              strokeWidth="2"
            />
            {/* Ribbed Ankle Cuffs for boots */}
            <path d="M 115 450 L 155 448 L 153 468 L 117 470 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <path d="M 245 448 L 285 450 L 283 470 L 247 468 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />

            {/* Hip Pads (Dual density EVA) */}
            <g filter="url(#padShadow)">
              <path
                d="M 82 95 Q 74 135 82 170 Q 118 180 130 145 Q 132 110 118 90 Q 98 88 82 95 Z"
                fill="url(#padGradient)"
                stroke="#059669"
                strokeWidth="1.5"
              />
              <path d="M 82 95 Q 74 135 82 170 Q 118 180 130 145 Q 132 110 118 90 Q 98 88 82 95 Z" fill="url(#padHexGrid)" />
              <path
                d="M 318 95 Q 326 135 318 170 Q 282 180 270 145 Q 268 110 282 90 Q 302 88 318 95 Z"
                fill="url(#padGradient)"
                stroke="#059669"
                strokeWidth="1.5"
              />
              <path d="M 318 95 Q 326 135 318 170 Q 282 180 270 145 Q 268 110 282 90 Q 302 88 318 95 Z" fill="url(#padHexGrid)" />
            </g>

            {/* Knee Pads */}
            <g filter="url(#padShadow)">
              <rect x="94" y="240" width="54" height="74" rx="14" fill="url(#padGradient)" stroke="#059669" strokeWidth="1.5" />
              <rect x="94" y="240" width="54" height="74" rx="14" fill="url(#padHexGrid)" />
              <line x1="98" y1="265" x2="144" y2="265" stroke="#71717a" strokeWidth="1.2" />
              <line x1="98" y1="290" x2="144" y2="290" stroke="#71717a" strokeWidth="1.2" />
            </g>

            <g filter="url(#padShadow)">
              <rect x="252" y="240" width="54" height="74" rx="14" fill="url(#padGradient)" stroke="#059669" strokeWidth="1.5" />
              <rect x="252" y="240" width="54" height="74" rx="14" fill="url(#padHexGrid)" />
              <line x1="256" y1="265" x2="302" y2="265" stroke="#71717a" strokeWidth="1.2" />
              <line x1="256" y1="290" x2="302" y2="290" stroke="#71717a" strokeWidth="1.2" />
            </g>
          </g>
        )}

        {/* --- BRAND EMBROIDERY LOGO ON THIGH --- */}
        <g transform="translate(150, 115) scale(0.9)">
          <BrandInsignia brand={brandName} isLight={false} />
        </g>

        {/* --- TECHNICAL LABEL WATERMARK --- */}
        <g opacity="0.8">
          <rect x="156" y="78" width="88" height="18" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
          <text x="200" y="90" fill="#a1a1aa" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            {isShort ? 'TORWART SHORT' : isThreeQuarter ? '3/4 GOALKEEPER' : 'TORWARTHOSE LANG'}
          </text>
        </g>
      </svg>
    </div>
  );
};
