import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Stars } from 'lucide-react';
import { DiyaIcon } from './DiyaIcon';
import { romanticAudio } from '../utils/audio';
import { fireHeartExplosion } from '../utils/effects';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const handleStartJourney = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Start sweet romantic background melody & sound effect
    romanticAudio.startRomanticMusic();
    romanticAudio.playGiftOpen();
    fireHeartExplosion(x, y);

    setTimeout(() => {
      onStart();
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center text-center relative z-10"
    >
      {/* Decorative top badge */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide border border-rose-300 shadow-sm mb-6"
      >
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Diwali Edition • Specially Made For You</span>
        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
      </motion.div>

      {/* Main Glass Card */}
      <div className="glass-card w-full rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        {/* Soft background aura glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Central glowing Diya */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          className="my-3 flex justify-center"
        >
          <div className="relative p-2">
            <DiyaIcon size={96} isLit={true} pulseGlow={true} />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-700/80 uppercase tracking-widest">
              ✨ Happy Diwali ✨
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-romantic text-4xl sm:text-6xl text-rose-600 font-bold mt-4 mb-2 drop-shadow-sm leading-tight"
        >
          Heyyyy My Bhutki Darling Baccha! ❤️
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="font-script text-xl sm:text-2xl text-rose-800 font-semibold mb-3 leading-relaxed"
        >
          Someone has prepared a little world of love, just for you... 🌸
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm sm:text-base text-stone-600 font-medium max-w-md mx-auto mb-8"
        >
          Are you ready for your special Diwali surprise, Jaan? 🪔✨
        </motion.p>

        {/* Two Interactive Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartJourney}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>YESSS, My Love!</span>
            <span className="text-xl group-hover:scale-125 transition-transform">💗</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartJourney}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-300 to-pink-300 text-rose-900 font-bold text-base sm:text-lg shadow-md shadow-amber-200/70 hover:shadow-pink-300/80 transition-all border border-rose-200/80 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Obviouslyyy!</span>
            <span className="text-xl group-hover:scale-125 transition-transform">🥰</span>
          </motion.button>
        </div>

        {/* Romantic foot hint */}
        <div className="mt-8 pt-4 border-t border-rose-100 flex items-center justify-center gap-2 text-xs text-rose-400">
          <Stars className="w-3.5 h-3.5 text-amber-400" />
          <span>Tap either button to unlock the magic & romantic music</span>
          <Stars className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>
    </motion.div>
  );
};
