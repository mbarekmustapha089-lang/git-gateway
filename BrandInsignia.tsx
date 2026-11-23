import React from 'react';
import { BrandName } from '../types';

interface BrandInsigniaProps {
  brand: string | BrandName;
  isLight?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandInsignia: React.FC<BrandInsigniaProps> = ({
  brand,
  isLight = false,
  className = '',
  size = 'md'
}) => {
  const brandLower = (brand || '').toLowerCase();
  const fill = isLight ? '#0f172a' : '#ffffff';
  const stroke = fill;

  // Render authentic brand logos as vector SVGs
  const renderLogo = () => {
    switch (brandLower) {
      case 'nike':
        return (
          <g>
            {/* Nike Swoosh */}
            <path
              d="M 2 14 C 10 18 24 19 36 6 C 28 11 16 13 8 10 C 5 9 3 7 1 4 C 0.5 7 1 11 2 14 Z"
              fill={fill}
            />
          </g>
        );

      case 'adidas':
        return (
          <g>
            {/* Adidas 3 Performance Stripes */}
            <polygon points="6,16 11,16 18,3 13,3" fill={fill} />
            <polygon points="14,16 19,16 26,7 21,7" fill={fill} />
            <polygon points="22,16 27,16 32,11 27,11" fill={fill} />
          </g>
        );

      case 'puma':
        return (
          <g>
            {/* Puma Leaping Cat silhouette */}
            <path
              d="M 32 4 C 30 3 27 5 24 6 C 22 7 20 8 18 10 C 16 9 12 8 8 11 C 6 12 4 15 2 16 C 5 15 8 14 11 15 C 13 13 17 12 21 11 C 24 10 27 9 30 7 C 32 6 33 5 32 4 Z"
              fill={fill}
            />
            <circle cx="29" cy="5" r="1.5" fill={fill} />
          </g>
        );

      case 'jako':
        return (
          <g>
            {/* Jako 2-Dots / Rings Teamsport Icon */}
            <circle cx="10" cy="10" r="4.5" fill="none" stroke={stroke} strokeWidth="2.5" />
            <circle cx="24" cy="10" r="4.5" fill="none" stroke={stroke} strokeWidth="2.5" />
          </g>
        );

      case 'erima':
        return (
          <g>
            {/* Erima Wing / 3 Diamond-Cubes */}
            <rect x="5" y="6" width="6" height="6" rx="1" fill={fill} transform="rotate(45 8 9)" />
            <rect x="15" y="6" width="6" height="6" rx="1" fill={fill} transform="rotate(45 18 9)" />
            <rect x="25" y="6" width="6" height="6" rx="1" fill={fill} transform="rotate(45 28 9)" />
          </g>
        );

      case 'derbystar':
        return (
          <g>
            {/* Derbystar Iconic Star */}
            <polygon
              points="17,2 21,11 31,11 23,17 26,27 17,21 8,27 11,17 3,11 13,11"
              fill={fill}
              transform="scale(0.8) translate(3, 1)"
            />
          </g>
        );

      case 'uhlsport':
        return (
          <g>
            {/* Uhlsport Iconic Arch / Goalkeeper Arc */}
            <circle cx="16" cy="10" r="8" fill="none" stroke={stroke} strokeWidth="3" />
            <path d="M 8 10 L 24 10" stroke={stroke} strokeWidth="2.5" />
          </g>
        );

      case 'precision':
        return (
          <g>
            {/* Precision Crosshair Target */}
            <circle cx="17" cy="10" r="6.5" fill="none" stroke={stroke} strokeWidth="2" />
            <line x1="17" y1="1" x2="17" y2="19" stroke={stroke} strokeWidth="2" />
            <line x1="8" y1="10" x2="26" y2="10" stroke={stroke} strokeWidth="2" />
            <circle cx="17" cy="10" r="2" fill={fill} />
          </g>
        );

      case 'torspieler':
        return (
          <g>
            {/* Torspieler Goalie Glove Shield */}
            <path d="M 17 2 L 25 5 L 25 12 C 25 16 17 19 17 19 C 17 19 9 16 9 12 L 9 5 Z" fill="none" stroke={stroke} strokeWidth="2" />
            <path d="M 17 5 L 17 16" stroke={stroke} strokeWidth="1.5" />
            <path d="M 12 9 L 22 9" stroke={stroke} strokeWidth="1.5" />
          </g>
        );

      case 'gripmode':
        return (
          <g>
            {/* Gripmode Dynamic G Badge */}
            <path d="M 23 7 C 21 5 18 4 15 5 C 11 6 9 10 10 14 C 11 17 15 19 19 18 C 22 17 24 14 24 11 L 17 11" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'attono':
        return (
          <g>
            {/* Attono Bold A Triangle */}
            <polygon points="17,3 9,17 13,17 17,9 21,17 25,17" fill={fill} />
            <rect x="13" y="13" width="8" height="2" fill={fill} />
          </g>
        );

      case 'sportwelt':
      default:
        return (
          <g>
            {/* Sportwelt Flash Lightning Bolt */}
            <path
              d="M 12 2 L 6 12 L 14 12 L 10 22 L 22 10 L 14 10 Z"
              fill={fill}
            />
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 34 20"
      className={`inline-block shrink-0 ${className}`}
      style={{ overflow: 'visible' }}
    >
      {renderLogo()}
    </svg>
  );
};
