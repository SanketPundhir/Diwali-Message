import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, ArrowRight, Stamp } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireRosePetals, fireHeartExplosion } from '../utils/effects';

interface Surprise6LoveLetterProps {
  onNext: () => void;
}

export const Surprise6LoveLetter: React.FC<Surprise6LoveLetterProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenLetter = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    romanticAudio.playLetterOpen();
    fireRosePetals(x, y);
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55 }}
      className="w-full max-w-xl mx-auto px-4 py-6 relative z-10"
    >
      <div className="glass-card rounded-3xl p-6 sm:p-9 text-center relative overflow-hidden shadow-2xl">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 text-rose-800 text-xs font-semibold mb-3 border border-rose-300">
          <Mail className="w-3.5 h-3.5 text-rose-500" />
          <span>Surprise 6 • A Heartfelt Personal Letter</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="font-romantic text-3xl sm:text-5xl text-rose-600 font-bold mb-2">
          The Secret Love Letter 💌
        </h2>

        <p className="text-stone-700 text-sm sm:text-base font-semibold mb-6">
          &ldquo;Bhutkiiii Darling Baccha, ek chhoti si baat kehni thi...&rdquo; 💭
        </p>

        {/* Envelope Interactive Box */}
        <div className="relative my-4 flex flex-col items-center justify-center">
          {!isOpen ? (
            /* Closed Envelope View */
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="relative w-72 sm:w-80 h-52 sm:h-56 rounded-3xl bg-gradient-to-br from-rose-200 via-pink-100 to-rose-300 border-2 border-rose-400/80 shadow-xl flex flex-col items-center justify-center p-6 cursor-pointer"
              onClick={handleOpenLetter}
            >
              {/* Envelope Flap Lines */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-28 border-b-2 border-rose-300/80 bg-rose-100/70 [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-sm" />
              </div>

              {/* Heart Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg border-2 border-amber-300 pulse-glow"
              >
                <Heart className="w-8 h-8 fill-white" />
              </motion.div>

              <span className="relative z-10 mt-3 text-xs font-bold text-rose-800 uppercase tracking-widest bg-white/70 px-3 py-1 rounded-full border border-rose-200 shadow-sm">
                Confidential • For Bhutki Only
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenLetter}
                className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Open My Letter</span>
                <span className="text-base">💌</span>
              </motion.button>
            </motion.div>
          ) : (
            /* Unfolded Romantic Letter */
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative w-full max-w-lg rounded-3xl bg-[#fffdfa] border-2 border-amber-300 p-6 sm:p-8 text-left shadow-2xl"
              style={{
                backgroundImage:
                  'radial-gradient(#fed7aa 0.6px, transparent 0.6px), radial-gradient(#fed7aa 0.6px, #fffdfa 0.6px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            >
              {/* Postage Stamp & Seal at corner */}
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <div className="w-10 h-12 border-2 border-dashed border-rose-300 rounded bg-rose-50 flex flex-col items-center justify-center shadow-xs">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="text-[9px] font-bold text-rose-400">100% Love</span>
                </div>
              </div>

              {/* Salutation */}
              <div className="font-script text-2xl sm:text-3xl font-bold text-rose-600 mb-4">
                Meri Pyaari Bhutki Darling, ❤️
              </div>

              {/* Letter Body */}
              <div className="space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  Jaan, pata hai? Har festival apni jagah beautiful hota hai, lekin tumhare hone se meri har ordinary day bhi special ban jaati hai.
                </p>
                <p>
                  Main bas chahta hoon ki tum hamesha khush raho, tumhari aankhon mein kabhi aansu na aayein aur tumhari smile kabhi kam na ho.
                </p>
                <p>
                  Tum meri favourite feeling ho, meri favourite person ho aur meri sabse pyaari si Bhutki ho.
                </p>
                <p className="font-bold text-rose-700 text-base sm:text-lg">
                  Happy Diwali, Meri Darling Baccha! ❤️🪔
                </p>
              </div>

              {/* Signoff */}
              <div className="mt-6 pt-4 border-t border-rose-200/80 flex justify-between items-end">
                <div className="flex gap-1">
                  <span className="text-xl">🪔</span>
                  <span className="text-xl">🌸</span>
                  <span className="text-xl">💖</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-stone-500">Yours forever and ever,</div>
                  <div className="font-script text-2xl font-bold text-rose-600">
                    Your Loving One 💕
                  </div>
                </div>
              </div>

              {/* Floating Hearts Around the Letter */}
              <div className="absolute -top-3 -left-2 text-2xl animate-bounce">💖</div>
              <div className="absolute -bottom-3 -right-2 text-2xl animate-bounce" style={{ animationDelay: '0.8s' }}>
                ❤️
              </div>
            </motion.div>
          )}
        </div>

        {/* Advance to Final Surprise */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                romanticAudio.playGiftOpen();
                fireHeartExplosion(0.5, 0.5);
                onNext();
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>The Grand Final Surprise (Only for You)</span>
              <span className="text-xl group-hover:scale-125 transition-transform">💝</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
