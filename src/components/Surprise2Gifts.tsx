import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireGoldenGlitter, fireHeartExplosion, fireRosePetals } from '../utils/effects';

interface Surprise2GiftsProps {
  onNext: () => void;
}

interface GiftItem {
  id: number;
  icon: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  quote: string;
  effect: 'heart' | 'glitter' | 'kisses' | 'petals' | 'teddy';
  sweetNote: string;
}

export const Surprise2Gifts: React.FC<Surprise2GiftsProps> = ({ onNext }) => {
  const gifts: GiftItem[] = [
    {
      id: 1,
      icon: '🎁',
      title: 'Secret Gift 1',
      color: 'text-rose-500',
      bgColor: 'from-rose-100 to-pink-200',
      borderColor: 'border-rose-300',
      quote: "You're not just special, you're my favourite notification, my favourite person and my favourite everything!",
      effect: 'heart',
      sweetNote: 'Notification sound ho toh bas tumhara ho! ❤️',
    },
    {
      id: 2,
      icon: '💗',
      title: 'Secret Gift 2',
      color: 'text-pink-500',
      bgColor: 'from-amber-100 to-rose-200',
      borderColor: 'border-amber-300',
      quote: 'Agar mujhe har baar ek diya jalane ka mauka mile, toh main har diya tumhari smile ke naam karunga.',
      effect: 'glitter',
      sweetNote: 'Tumhari muskaan se poora aalam roshan hai! ✨',
    },
    {
      id: 3,
      icon: '🥰',
      title: 'Secret Gift 3',
      color: 'text-orange-500',
      bgColor: 'from-peach-100 to-pink-100',
      borderColor: 'border-orange-300',
      quote: 'Bhutki, tumhari ek smile mera poora din beautiful bana sakti hai.',
      effect: 'kisses',
      sweetNote: 'Sach mein, meri cutie pie! 😘',
    },
    {
      id: 4,
      icon: '💌',
      title: 'Secret Gift 4',
      color: 'text-purple-500',
      bgColor: 'from-purple-100 to-pink-100',
      borderColor: 'border-purple-300',
      quote: 'Distance ho ya situation, meri favourite jagah hamesha tumhara dil rahega.',
      effect: 'petals',
      sweetNote: 'Always right there inside your sweet heart! 🌸',
    },
    {
      id: 5,
      icon: '🧸',
      title: 'Secret Gift 5',
      color: 'text-rose-600',
      bgColor: 'from-rose-200 to-amber-100',
      borderColor: 'border-rose-400',
      quote: "You're my cutest problem and my sweetest happiness, Darling!",
      effect: 'teddy',
      sweetNote: 'Mera pyaara, gusse wala chhota teddy bear! 🧸💕',
    },
  ];

  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeGift, setActiveGift] = useState<GiftItem | null>(null);
  const [floatingIcons, setFloatingIcons] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  const handleOpenGift = (gift: GiftItem, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    romanticAudio.playGiftOpen();

    // Trigger individual animation effect
    if (gift.effect === 'heart') {
      fireHeartExplosion(x, y);
    } else if (gift.effect === 'glitter') {
      fireGoldenGlitter(x, y);
    } else if (gift.effect === 'petals') {
      fireRosePetals(x, y);
    } else if (gift.effect === 'kisses') {
      romanticAudio.playKissSound();
      fireHeartExplosion(x, y);
      spawnFlyingIcons('💋');
    } else if (gift.effect === 'teddy') {
      fireGoldenGlitter(x, y);
      spawnFlyingIcons('🧸');
    }

    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }

    setActiveGift(gift);
  };

  const spawnFlyingIcons = (char: string) => {
    const newIcons = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      char,
      x: 35 + Math.random() * 30,
      y: 40 + Math.random() * 20,
    }));
    setFloatingIcons(newIcons);
    setTimeout(() => setFloatingIcons([]), 2000);
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
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 text-rose-800 text-xs font-semibold mb-3 border border-rose-300">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Surprise 2 • Tap to Open Secret Love Boxes</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="font-romantic text-3xl sm:text-5xl text-rose-600 font-bold mb-2">
          Click for Unlimited Love 🎁
        </h2>
        <p className="text-stone-600 text-sm font-medium mb-6">
          Har box mein Bhutki ke liye ek khaas dil ki baat chhipi hui hai... Click them one by one!
        </p>

        {/* Counter Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-rose-200 text-xs font-semibold text-rose-700 mb-6 shadow-sm">
          <span>Love Notes Unlocked:</span>
          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
            {openedGifts.length} / {gifts.length}
          </span>
        </div>

        {/* Gift Boxes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {gifts.map((gift) => {
            const isOpened = openedGifts.includes(gift.id);
            return (
              <motion.button
                key={gift.id}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => handleOpenGift(gift, e)}
                className={`relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${gift.borderColor} ${
                  isOpened
                    ? 'bg-gradient-to-br from-white/90 to-rose-50/90 shadow-md ring-2 ring-rose-300'
                    : 'bg-gradient-to-br from-rose-50 to-pink-100 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Checked badge */}
                {isOpened && (
                  <div className="absolute top-2 right-2 text-rose-500">
                    <CheckCircle2 className="w-4 h-4 fill-rose-100" />
                  </div>
                )}

                {/* Box Icon with bounce */}
                <motion.div
                  animate={isOpened ? { rotate: [0, -6, 6, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-4xl mb-2 filter drop-shadow-sm"
                >
                  {isOpened ? '💖' : gift.icon}
                </motion.div>

                <div className="font-bold text-xs sm:text-sm text-stone-800">
                  {gift.title}
                </div>

                <div className="text-[11px] font-semibold text-rose-600 mt-0.5">
                  {isOpened ? 'Read Again ✨' : 'Tap to Open 🎀'}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Advance Journey Button when at least 2 are opened */}
        {openedGifts.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2 flex flex-col items-center gap-2"
          >
            {openedGifts.length === gifts.length ? (
              <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Yayyy! You found all 5 secret love notes, Meri Jaan!
              </p>
            ) : (
              <p className="text-xs text-stone-500">
                You can explore all {gifts.length} boxes or continue to the next surprise!
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Next: Light the Diyas Together, Jaan!</span>
              <span className="text-xl group-hover:scale-125 transition-transform">🪔</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Floating Kisses / Teddies overlay */}
      {floatingIcons.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 0, y: -120, scale: 1.5 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="fixed pointer-events-none text-3xl z-50"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          {item.char}
        </motion.div>
      ))}

      {/* Modal revealing the clicked gift individually */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveGift(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-white via-pink-50 to-rose-50 rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-rose-300 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setActiveGift(null)}
                aria-label="Close Note"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-rose-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer border border-rose-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-tr from-pink-200 to-rose-100 flex items-center justify-center text-4xl shadow-md border-2 border-white">
                {activeGift.icon}
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeGift.title} Unlocked</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-rose-200/90 shadow-sm my-3">
                <p className="text-stone-800 text-base sm:text-lg font-semibold leading-relaxed font-serif-title">
                  &ldquo;{activeGift.quote}&rdquo;
                </p>
              </div>

              <p className="font-script text-rose-600 text-xl font-bold mb-5">
                {activeGift.sweetNote}
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveGift(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-md shadow-rose-300 hover:shadow-rose-400 transition-all cursor-pointer"
              >
                Awww, I Love You Too! 💖
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
