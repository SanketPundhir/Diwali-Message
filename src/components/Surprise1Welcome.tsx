import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Sun } from 'lucide-react';
import { DiyaIcon } from './DiyaIcon';
import { romanticAudio } from '../utils/audio';
import { fireGoldenGlitter, fireHeartExplosion } from '../utils/effects';

interface Surprise1WelcomeProps {
  onNext: () => void;
}

export const Surprise1Welcome: React.FC<Surprise1WelcomeProps> = ({ onNext }) => {
  const [activeDiyaCount, setActiveDiyaCount] = useState<number>(3);
  const [sweetSmileTaps, setSweetSmileTaps] = useState<number>(0);

  const handleNextClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    romanticAudio.playGiftOpen();
    fireHeartExplosion(x, y);
    onNext();
  };

  const handleCenterDiyaTap = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    romanticAudio.playDiyaChime(sweetSmileTaps);
    fireGoldenGlitter(x, y);
    setSweetSmileTaps((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55 }}
      className="w-full max-w-xl mx-auto px-4 py-6 relative z-10"
    >
      <div className="glass-card-golden rounded-3xl p-6 sm:p-9 text-center relative overflow-hidden shadow-2xl">
        {/* Floating background decorative glowing orbs */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Top small greeting tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 text-xs font-semibold mb-4 border border-amber-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Surprise 1 • The Sacred Diwali Blessing</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-romantic text-4xl sm:text-6xl text-rose-600 font-bold mb-3 drop-shadow-sm leading-tight"
        >
          Happy Diwali, Meri Jaan! ❤️
        </motion.h2>

        {/* Romantic quote box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 sm:p-6 rounded-2xl bg-white/70 border border-rose-200/90 shadow-inner my-4 relative"
        >
          <div className="text-stone-700 text-base sm:text-lg leading-relaxed font-medium">
            &ldquo;Is Diwali meri bas ek hi wish hai... tum hamesha aise hi muskurati raho, kyunki tumhari smile meri duniya ki sabse khoobsurat roshni hai.&rdquo;
          </div>
          <div className="font-script text-rose-500 text-lg mt-2 font-bold">
            — Forever your greatest fan & loving partner 💕
          </div>
        </motion.div>

        {/* Diyas glowing row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="my-5 flex items-center justify-center gap-3 sm:gap-6"
        >
          {/* Diya 1 */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DiyaIcon size={64} isLit={true} />
          </motion.div>

          {/* Center Diya (Special Large & Tap-able) */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCenterDiyaTap}
            className="cursor-pointer relative group flex flex-col items-center"
          >
            <div className="absolute -inset-2 bg-amber-300/30 rounded-full blur-md group-hover:bg-amber-300/60 transition-all pointer-events-none" />
            <DiyaIcon size={88} isLit={true} pulseGlow={true} />
            <span className="text-[11px] font-bold text-amber-700 mt-1 flex items-center gap-1 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300/80">
              <Sun className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              Tap me for sparkles!
            </span>
          </motion.div>

          {/* Diya 3 */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <DiyaIcon size={64} isLit={true} />
          </motion.div>
        </motion.div>

        {sweetSmileTaps > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs text-rose-600 font-semibold mb-2"
          >
            Awww, you showered {sweetSmileTaps} golden sparkle blessings on us! ✨🥰
          </motion.div>
        )}

        {/* Next Surprise Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-bold text-lg shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Next Surprise, Baccha!</span>
            <span className="text-xl group-hover:scale-125 transition-transform">💕</span>
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
