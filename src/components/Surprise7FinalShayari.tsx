import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Send, Smile, Flame } from 'lucide-react';
import { DiyaIcon } from './DiyaIcon';
import { romanticAudio } from '../utils/audio';
import { fireGoldenGlitter, fireHeartExplosion, fireRosePetals, fireFullDiwaliCelebration } from '../utils/effects';

interface Surprise7FinalShayariProps {
  onRestart: () => void;
  onJumpToStep: (step: number) => void;
}

export const Surprise7FinalShayari: React.FC<Surprise7FinalShayariProps> = ({
  onRestart,
  onJumpToStep,
}) => {
  const [revealedLines, setRevealedLines] = useState<number>(0);
  const [hugModalOpen, setHugModalOpen] = useState<boolean>(false);
  const [hugCount, setHugCount] = useState<number>(1);
  const [kissCount, setKissCount] = useState<number>(0);

  const shayariStanzas = [
    [
      'Na chaand ki khwahish hai,',
      'Na taaron ki farmaish hai...',
      'Meri har Diwali roshan ho jaaye,',
      'Bas tumhari ek muskurahat ki guzarish hai. ✨',
    ],
    [
      'Har diya tumhare naam jala doon,',
      'Har khushi tum par luta doon...',
      'Meri duniya ki sabse pyaari roshni ho tum,',
      'Kaise lafzon mein apna pyaar bata doon? 🪔',
    ],
    [
      'Tum hasti raho, yunhi sharmati raho,',
      'Meri jaan, bas hamesha meri Bhutki banke rehna... 💖',
    ],
  ];

  const totalLines = shayariStanzas.flat().length;

  // Reveal shayari lines with smooth timing
  useEffect(() => {
    if (revealedLines < totalLines) {
      const timer = setTimeout(() => {
        setRevealedLines((prev) => prev + 1);
        if (revealedLines % 4 === 0) {
          romanticAudio.playDiyaChime(revealedLines / 4);
        }
      }, 700);
      return () => clearTimeout(timer);
    } else {
      // Completed reveal celebration
      fireFullDiwaliCelebration();
    }
  }, [revealedLines, totalLines]);

  const handleOneMoreHug = () => {
    romanticAudio.playKissSound();
    fireHeartExplosion(0.5, 0.45);
    fireRosePetals(0.5, 0.55);
    setHugCount((c) => c + 1);
    setHugModalOpen(true);
  };

  const handleSendMoreKisses = () => {
    romanticAudio.playKissSound();
    fireHeartExplosion(0.5, 0.4);
    setKissCount((c) => c + 10);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.65 }}
      className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 relative z-10"
    >
      <div className="glass-card-golden rounded-3xl p-5 sm:p-10 text-center relative overflow-hidden shadow-2xl border-2 border-amber-300">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 text-rose-800 text-xs sm:text-sm font-bold mb-4 border border-rose-300 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>The Grand Finale • Dedicated to Bhutki</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-romantic text-4xl sm:text-6xl text-rose-600 font-bold mb-4 drop-shadow-sm leading-tight"
        >
          One Last Surprise For My Bhutki... ❤️
        </motion.h2>

        {/* Giant Glowing Heart with Tiny Lights */}
        <div className="relative my-6 flex justify-center items-center">
          {/* Outer Ring of Tiny Golden Fairy Lights */}
          <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center">
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              // Heart shape parametric equation for golden dots
              const t = angle;
              const x = 16 * Math.pow(Math.sin(t), 3);
              const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
              const scale = 7.5;

              return (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-amber-300 shadow-sm twinkle-light"
                  style={{
                    transform: `translate(${x * scale}px, ${y * scale}px)`,
                    boxShadow: '0 0 10px #facc15, 0 0 18px #fbbf24',
                    animationDelay: `${(i * 0.15) % 2}s`,
                  }}
                />
              );
            })}

            {/* Inner Two Glowing Diyas and Heart */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 z-10">
              <DiyaIcon size={58} isLit={true} pulseGlow={true} />
              <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl animate-pulse">💖</span>
                <span className="font-script text-xs sm:text-sm font-bold text-rose-600 mt-1">
                  Jaan & Baccha
                </span>
              </div>
              <DiyaIcon size={58} isLit={true} pulseGlow={true} />
            </div>
          </div>
        </div>

        {/* The Original Romantic Shayari revealed line-by-line */}
        <div className="max-w-lg mx-auto p-6 sm:p-8 rounded-3xl bg-white/85 border border-rose-200/90 shadow-md my-4 text-center">
          {shayariStanzas.map((stanza, sIdx) => {
            const stanzaStartIdx = sIdx === 0 ? 0 : sIdx === 1 ? 4 : 8;
            return (
              <div key={sIdx} className="mb-4 last:mb-0 space-y-1.5">
                {stanza.map((line, lIdx) => {
                  const lineGlobalIdx = stanzaStartIdx + lIdx;
                  const isVisible = lineGlobalIdx < revealedLines;
                  return (
                    <motion.p
                      key={lIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`font-script text-lg sm:text-2xl font-bold leading-relaxed ${
                        sIdx === 2
                          ? 'text-rose-600 sm:text-2xl'
                          : 'text-stone-800'
                      }`}
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>
            );
          })}

          {/* Grand Happy Diwali Callout */}
          <AnimatePresence>
            {revealedLines >= totalLines && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 pt-5 border-t-2 border-rose-200"
              >
                <div className="font-romantic text-3xl sm:text-5xl text-rose-600 font-extrabold leading-tight">
                  Happy Diwali, Meri Bhutki Darling Baccha! ❤️😘🪔
                </div>
                <div className="font-sans text-xs sm:text-sm font-bold text-amber-800 mt-2 tracking-wide uppercase">
                  Lots of love, hugs and endless kisses for you! ❤️
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Interactive Action: One More Hug? */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleOneMoreHug}
            className="px-8 py-4 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-rose-300/80 hover:shadow-rose-400/90 transition-all flex items-center justify-center gap-3 cursor-pointer border-2 border-white group"
          >
            <span>One More Hug?</span>
            <span className="text-2xl group-hover:scale-130 transition-transform">🫂</span>
          </motion.button>

          {hugCount > 1 && (
            <p className="text-xs font-bold text-rose-600">
              Total Warm Hugs Shared: {hugCount} 🥰
            </p>
          )}
        </div>

        {/* Quick Surprises Navigator (Replay any surprise) */}
        <div className="mt-8 pt-6 border-t border-rose-200/80">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
            Revisit Any Surprise for Bhutki
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { step: 1, label: 'Diwali Wish 🪔' },
              { step: 2, label: 'Love Gifts 🎁' },
              { step: 3, label: 'Light Diyas ✨' },
              { step: 4, label: 'Virtual Fireworks 🎆' },
              { step: 5, label: 'Love Quiz 🧠' },
              { step: 6, label: 'Secret Letter 💌' },
            ].map((item) => (
              <button
                key={item.step}
                onClick={() => onJumpToStep(item.step)}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={onRestart}
              className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restart Whole Journey</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Heart Hug Modal */}
      <AnimatePresence>
        {hugModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setHugModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-white via-pink-50 to-rose-100 rounded-3xl p-6 sm:p-10 max-w-md w-full border-2 border-rose-400 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="text-6xl sm:text-7xl mb-3 animate-bounce">
                🫂❤️
              </div>

              <h3 className="font-romantic text-3xl sm:text-4xl text-rose-600 font-bold mb-3">
                Mega Virtual Hug!
              </h3>

              <div className="p-4 rounded-2xl bg-white/80 border border-rose-200 text-stone-800 text-base sm:text-lg font-semibold leading-relaxed shadow-sm mb-4">
                &ldquo;Sending you the biggest virtual hug and a million kisses! Muuuaaahhh! 😘❤️&rdquo;
              </div>

              <p className="font-script text-rose-600 text-xl font-bold mb-5">
                Bhutki Darling, you are my heart and soul.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={handleSendMoreKisses}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Shower More Kisses ({kissCount})</span>
                  <span>💋</span>
                </button>
                <button
                  onClick={() => setHugModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-sm border border-stone-200 shadow-xs cursor-pointer"
                >
                  Close & Keep Smiling 😊
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
