import React from 'react';

interface DiyaIconProps {
  isLit?: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  pulseGlow?: boolean;
}

export const DiyaIcon: React.FC<DiyaIconProps> = ({
  isLit = true,
  size = 64,
  className = '',
  onClick,
  interactive = false,
  pulseGlow = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.05 }}
    >
      {/* Flame aura / ambient glow */}
      {isLit && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full pointer-events-none transition-all duration-700 ${
            pulseGlow ? 'scale-125' : 'scale-100'
          }`}
          style={{
            background:
              'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(244, 114, 182, 0.25) 50%, transparent 80%)',
            filter: 'blur(8px)',
          }}
        />
      )}

      {/* Flame (SVG) */}
      <div
        className={`relative z-10 transition-all duration-700 origin-bottom ${
          isLit ? 'opacity-100 scale-100 diya-flame-active' : 'opacity-0 scale-50'
        }`}
        style={{ height: size * 0.45, width: size * 0.35, marginBottom: -size * 0.04 }}
      >
        <svg viewBox="0 0 100 130" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="flameOuterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="75%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="flameInnerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Outer teardrop flame */}
          <path
            d="M 50 5 C 65 35 90 70 82 102 C 75 125 55 128 50 128 C 45 128 25 125 18 102 C 10 70 35 35 50 5 Z"
            fill="url(#flameOuterGrad)"
          />

          {/* Inner hot core */}
          <path
            d="M 50 40 C 58 60 70 85 65 108 C 60 120 53 122 50 122 C 47 122 40 120 35 108 C 30 85 42 60 50 40 Z"
            fill="url(#flameInnerGrad)"
            opacity="0.95"
          />

          {/* Tiny spark dot */}
          <circle cx="50" cy="85" r="4" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>

      {/* Diya Clay & Gold Body (SVG) */}
      <div className="relative z-10 w-full" style={{ height: size * 0.65 }}>
        <svg viewBox="0 0 160 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="clayBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="40%" stopColor="#ea580c" />
              <stop offset="80%" stopColor="#c2410c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
            <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* Traditional Diya Dish Body */}
          <path
            d="M 12 40 Q 80 18 148 40 Q 155 75 110 88 Q 80 95 50 88 Q 5 75 12 40 Z"
            fill="url(#clayBaseGrad)"
            stroke="#7c2d12"
            strokeWidth="2.5"
          />

          {/* Diya Lip / Rim with Golden shine */}
          <ellipse
            cx="80"
            cy="40"
            rx="68"
            ry="14"
            fill="#d97706"
            stroke="url(#goldRimGrad)"
            strokeWidth="3.5"
          />

          {/* Inner oil pool */}
          <ellipse cx="80" cy="42" rx="56" ry="9" fill="#78350f" opacity="0.85" />

          {/* Traditional decorative beads/engravings */}
          <g fill="#fde047" opacity="0.95">
            <circle cx="40" cy="55" r="2.5" />
            <circle cx="60" cy="62" r="3" />
            <circle cx="80" cy="65" r="3.5" />
            <circle cx="100" cy="62" r="3" />
            <circle cx="120" cy="55" r="2.5" />
          </g>

          {/* Wick spout in the center */}
          <path
            d="M 76 43 Q 80 32 84 43 Z"
            fill="#451a03"
            stroke="#1c1917"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Gentle stand shadow */}
      <div
        className="w-3/4 h-2.5 rounded-full bg-rose-950/15 blur-[2px] -mt-1 pointer-events-none"
      />
    </div>
  );
};
