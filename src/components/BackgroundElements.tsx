import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface BackgroundElementsProps {
  currentStep: number;
  totalSteps: number;
  onRestart: () => void;
  isStarted: boolean;
}

export const BackgroundElements: React.FC<BackgroundElementsProps> = ({
  currentStep,
  totalSteps,
  onRestart,
  isStarted,
}) => {
  const [isMusicActive, setIsMusicActive] = useState<boolean>(true);
  const [isSfxActive, setIsSfxActive] = useState<boolean>(true);
  const [petals] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 14,
      duration: 12 + Math.random() * 14,
      delay: Math.random() * 10,
      rotate: Math.random() * 360,
      isHeart: i % 3 === 0,
    }))
  );

  const [fireflies] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      top: Math.random() * 85,
      size: 4 + Math.random() * 6,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 4,
    }))
  );

  const handleToggleMusic = () => {
    const active = romanticAudio.toggleMusic();
    setIsMusicActive(active);
  };

  const handleToggleSfx = () => {
    const active = romanticAudio.toggleSfx();
    setIsSfxActive(active);
  };

  // Sync state on mount
  useEffect(() => {
    const status = romanticAudio.isMuted();
    setIsMusicActive(!status.music);
    setIsSfxActive(!status.sfx);
  }, []);

  // Fairy lights array (alternating pastel colors: warm gold, soft pink, peach, lavender)
  const lightColors = [
    '#facc15', // gold
    '#f472b6', // pink
    '#fb923c', // peach
    '#c084fc', // lavender
    '#f43f5e', // rose
    '#fde047', // light gold
  ];

  return (
    <>
      {/* Fairy Lights Garland along the top */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none flex justify-between px-2 sm:px-6">
        {/* Soft curving garland wire */}
        <div className="absolute top-0 left-0 right-0 h-4 border-b border-rose-300/40 pointer-events-none" />
        {Array.from({ length: 22 }).map((_, i) => {
          const color = lightColors[i % lightColors.length];
          const delay = (i * 0.25) % 2.5;
          return (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{
                marginTop: `${Math.sin(i * 0.6) * 5 + 4}px`,
              }}
            >
              {/* Wire drop */}
              <div className="w-[1px] h-2 bg-rose-400/50" />
              {/* Light bulb */}
              <div
                className="w-2.5 h-3.5 rounded-full twinkle-light shadow-sm"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}, 0 0 18px ${color}80`,
                  animationDelay: `${delay}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Fireflies */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {fireflies.map((fly) => (
          <div
            key={fly.id}
            className="firefly"
            style={{
              left: `${fly.left}%`,
              top: `${fly.top}%`,
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              animationDuration: `${fly.duration}s`,
              animationDelay: `${fly.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Falling Rose Petals & Floating Tiny Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute opacity-60"
            style={{
              left: `${petal.left}%`,
              top: '-5%',
              animation: `petalFall ${petal.duration}s linear infinite`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            {petal.isHeart ? (
              <span
                className="inline-block text-rose-300/70"
                style={{ fontSize: `${petal.size}px` }}
              >
                ❤️
              </span>
            ) : (
              <svg
                width={petal.size}
                height={petal.size * 1.3}
                viewBox="0 0 30 40"
                style={{
                  transform: `rotate(${petal.rotate}deg)`,
                  filter: 'drop-shadow(0 2px 4px rgba(244, 114, 182, 0.2))',
                }}
              >
                <path
                  d="M 15 0 C 25 10 30 25 15 40 C 0 25 5 10 15 0 Z"
                  fill="#fbcfe8"
                  opacity="0.75"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Floating Header Bar for Audio Controls & Journey Progress */}
      {isStarted && (
        <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6 flex items-center justify-between pointer-events-none">
          {/* Progress Badge */}
          <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs sm:text-sm font-semibold text-rose-700 shadow-sm border border-rose-200/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Surprise {Math.min(currentStep, totalSteps)} of {totalSteps}</span>
            <span className="hidden sm:inline text-rose-400 font-normal">| Jaan's Journey ❤️</span>
          </div>

          {/* Action Buttons: Audio Toggles & Restart */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
            {/* Music Toggle */}
            <button
              onClick={handleToggleMusic}
              title={isMusicActive ? 'Mute Romantic Music' : 'Play Romantic Music'}
              aria-label={isMusicActive ? 'Mute Music' : 'Play Music'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass-card text-xs font-medium text-rose-700 hover:bg-rose-50 transition-all border border-rose-200/80 active:scale-95 shadow-sm"
            >
              <Music className={`w-3.5 h-3.5 ${isMusicActive ? 'text-rose-600 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden md:inline">{isMusicActive ? 'Music On' : 'Music Off'}</span>
            </button>

            {/* SFX Toggle */}
            <button
              onClick={handleToggleSfx}
              title={isSfxActive ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              aria-label={isSfxActive ? 'Mute SFX' : 'Enable SFX'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass-card text-xs font-medium text-amber-700 hover:bg-amber-50 transition-all border border-amber-200/80 active:scale-95 shadow-sm"
            >
              {isSfxActive ? (
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden md:inline">{isSfxActive ? 'SFX On' : 'SFX Muted'}</span>
            </button>

            {/* Restart Journey Button */}
            <button
              onClick={onRestart}
              title="Restart the surprise from beginning"
              aria-label="Restart Journey"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full glass-card text-xs font-medium text-purple-700 hover:bg-purple-50 transition-all border border-purple-200/80 active:scale-95 shadow-sm flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden lg:inline">Restart</span>
            </button>
          </div>
        </header>
      )}
    </>
  );
};
