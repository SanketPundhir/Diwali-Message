import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flame, ArrowRight, Check } from 'lucide-react';
import { DiyaIcon } from './DiyaIcon';
import { romanticAudio } from '../utils/audio';
import { fireGoldenGlitter, fireHeartExplosion } from '../utils/effects';

interface Surprise3LightDiyasProps {
  onNext: () => void;
}

interface DiyaData {
  id: number;
  label: string;
  romanticMessage: string;
}

export const Surprise3LightDiyas: React.FC<Surprise3LightDiyasProps> = ({ onNext }) => {
  const diyaList: DiyaData[] = [
    {
      id: 1,
      label: 'Diya 1',
      romanticMessage: 'Diya 1 lit: For your precious smile that lights up my darkest days! ✨',
    },
    {
      id: 2,
      label: 'Diya 2',
      romanticMessage: 'Diya 2 lit: For all your cute nautanki and pyaare tantrums! 🙈',
    },
    {
      id: 3,
      label: 'Diya 3',
      romanticMessage: 'Diya 3 lit: For our endless late-night talks and cozy memories! 🌙',
    },
    {
      id: 4,
      label: 'Diya 4',
      romanticMessage: 'Diya 4 lit: For the warmth and peace your love brings into my soul! 🕊️',
    },
    {
      id: 5,
      label: 'Diya 5',
      romanticMessage: 'Diya 5 lit: For a lifetime of holding your hands in mine! 🤝❤️',
    },
  ];

  const [litDiyas, setLitDiyas] = useState<number[]>([]);
  const [lastMessage, setLastMessage] = useState<string>('');
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleLightDiya = (diya: DiyaData, e: React.MouseEvent) => {
    if (litDiyas.includes(diya.id)) {
      // already lit - replay gentle chime
      romanticAudio.playDiyaChime(diya.id - 1);
      setLastMessage(diya.romanticMessage);
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    romanticAudio.playDiyaChime(diya.id - 1);
    fireGoldenGlitter(x, y);

    // Spawn floating mini hearts from the clicked diya
    const hearts = Array.from({ length: 4 }, (_, i) => ({
      id: Date.now() + i,
      x: (rect.left + rect.width / 2) + (Math.random() * 40 - 20),
      y: rect.top,
    }));
    setFloatingHearts((prev) => [...prev, ...hearts]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !hearts.some((cur) => cur.id === h.id)));
    }, 1800);

    const updated = [...litDiyas, diya.id];
    setLitDiyas(updated);
    setLastMessage(diya.romanticMessage);

    // If this completed all 5 diyas
    if (updated.length === diyaList.length) {
      setTimeout(() => {
        fireHeartExplosion(0.5, 0.4);
        fireGoldenGlitter(0.5, 0.5);
      }, 400);
    }
  };

  const isAllLit = litDiyas.length === diyaList.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55 }}
      className="w-full max-w-xl mx-auto px-4 py-6 relative z-10"
    >
      <div className="glass-card rounded-3xl p-6 sm:p-9 text-center relative overflow-hidden shadow-2xl">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-semibold mb-3 border border-amber-300">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
          <span>Surprise 3 • Interactive Diya Lighting Ceremony</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="font-romantic text-3xl sm:text-5xl text-rose-600 font-bold mb-2">
          Light the Diyas 🪔
        </h2>

        {/* Instruction */}
        <p className="text-stone-700 text-sm sm:text-base font-semibold max-w-md mx-auto mb-4">
          &ldquo;Jaan, meri khushi ke liye in saare diyas ko light karo!&rdquo;
        </p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {diyaList.map((d) => (
            <div
              key={d.id}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                litDiyas.includes(d.id)
                  ? 'bg-amber-500 scale-125 shadow-sm shadow-amber-400'
                  : 'bg-rose-200'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-rose-600 ml-2">
            {litDiyas.length} / 5 Lit
          </span>
        </div>

        {/* Five Diyas Arrangement */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4 p-4 rounded-3xl bg-amber-50/60 border border-amber-200/80 shadow-inner">
          {diyaList.map((diya) => {
            const isLit = litDiyas.includes(diya.id);
            return (
              <motion.div
                key={diya.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleLightDiya(diya, e)}
                className={`flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all ${
                  isLit
                    ? 'bg-gradient-to-t from-amber-100/80 to-yellow-50/80 shadow-md ring-2 ring-amber-300/80'
                    : 'bg-white/60 hover:bg-white/90 border border-dashed border-amber-300/80'
                }`}
              >
                <DiyaIcon size={56} isLit={isLit} pulseGlow={isLit} interactive={true} />
                <div className="mt-2 flex items-center gap-1 text-[11px] font-bold">
                  {isLit ? (
                    <span className="text-amber-800 flex items-center gap-0.5">
                      <Check className="w-3 h-3 text-emerald-600" /> Lit ✨
                    </span>
                  ) : (
                    <span className="text-rose-500">Tap to light 🪔</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Romantic message on click */}
        <AnimatePresence mode="wait">
          {lastMessage && (
            <motion.div
              key={lastMessage}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-3.5 my-3 rounded-2xl bg-white/80 border border-rose-200 text-stone-800 text-sm font-medium shadow-sm"
            >
              {lastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* After All 5 are lit: Grand Golden Reveal */}
        {isAllLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="mt-6 pt-4 border-t border-amber-200 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white font-bold text-sm shadow-md mb-4 animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Yayyyy! You just made my little world brighter! ❤️</span>
            </div>

            {/* Special Mega Heart Diya */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-br from-amber-100 via-rose-50 to-pink-100 border-2 border-amber-400 shadow-xl max-w-md w-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-rose-500 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow">
                Special Heart Diya
              </div>

              <div className="flex justify-center mb-2">
                <DiyaIcon size={84} isLit={true} pulseGlow={true} />
              </div>

              <p className="font-romantic text-2xl sm:text-3xl text-rose-600 font-bold leading-tight">
                &ldquo;You're the light of my life, Bhutki Darling!&rdquo; 🪔✨
              </p>
              <p className="text-stone-600 text-xs mt-2">
                Tumhari roshni ke bina mera har tyauhaar adhoora hai.
              </p>
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Let's Burn Virtual Patakas, Baccha!</span>
              <span className="text-xl group-hover:scale-125 transition-transform">🎆</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Floating mini hearts during diya light */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -70, scale: 1.2 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="fixed pointer-events-none text-rose-500 font-bold z-50 text-xl"
          style={{ left: heart.x, top: heart.y }}
        >
          ❤️
        </motion.div>
      ))}
    </motion.div>
  );
};
