import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, HelpCircle, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireGoldenGlitter, fireHeartExplosion } from '../utils/effects';

interface Surprise5QuizProps {
  onNext: () => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    reaction: string;
    subNote: string;
  }[];
}

export const Surprise5Quiz: React.FC<Surprise5QuizProps> = ({ onNext }) => {
  const questions: Question[] = [
    {
      id: 1,
      question: 'Who is the cutest girl in this world?',
      options: [
        {
          label: 'Meeee! 😎',
          reaction: 'Arey koi shaq hi nahi tha! 💖',
          subNote: 'World ki number 1 cutie pie ho tum Bhutki!',
        },
        {
          label: 'Obviously me! 🥰',
          reaction: 'Obviouslyyy meri jaan! 😍',
          subNote: 'Tumhare jaisa adorable koi doosra exist hi nahi karta!',
        },
        {
          label: 'No doubt, ME! 💅',
          reaction: 'Queen level confidence! 👑',
          subNote: 'Aur sach bhi yahi hai, tumhari adaa sabse alag hai!',
        },
      ],
    },
    {
      id: 2,
      question: 'How much does someone love you?',
      options: [
        {
          label: 'Very much ❤️',
          reaction: 'Very much? Bas itna sa?! 🥺',
          subNote: 'Actually the answer is: INFINITEEEE plus forever!',
        },
        {
          label: 'Infinite ♾️',
          reaction: 'Ekdum 100% Correct! ♾️❤️',
          subNote: 'Dil ke har ek beat mein bas tumhara hi pyaar hai!',
        },
        {
          label: 'Beyond the universe 🌌',
          reaction: 'Out of this world love! 🚀✨',
          subNote: 'Poori galaxy mein bhi mere pyaar ka scale khatam nahi hoga!',
        },
      ],
    },
    {
      id: 3,
      question: 'What should you do right now?',
      options: [
        {
          label: 'Smile 😊',
          reaction: 'Awww, keep that smile forever! 🥰',
          subNote: 'Tumhari yehi smile meri Diwali ka sabse bada gift hai!',
        },
        {
          label: 'Send a flying kiss 😘',
          reaction: 'Catching it directly in my heart! Muuaah! 💋',
          subNote: 'Back to you with 100 extra kisses, Darling Baccha!',
        },
        {
          label: "Hug your phone because I'm inside it! 🫂",
          reaction: 'Warmest virtual hug received! 🤗',
          subNote: 'Kash main sach mein paas hota toh chhodta hi nahi!',
        },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<{ label: string; reaction: string; subNote: string } | null>(null);
  const [answeredMap, setAnsweredMap] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (opt: { label: string; reaction: string; subNote: string }, e: React.MouseEvent) => {
    romanticAudio.playCutePop();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    fireHeartExplosion(x, y);
    setSelectedOption(opt);
    setAnsweredMap((prev) => ({ ...prev, [currentQ.id]: opt.label }));
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      fireGoldenGlitter(0.5, 0.4);
      fireHeartExplosion(0.5, 0.5);
    }
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
          <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
          <span>Surprise 5 • The Cute Love Quiz</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="font-romantic text-3xl sm:text-5xl text-rose-600 font-bold mb-2">
          A Cute Love Quiz ❤️
        </h2>

        {!isCompleted ? (
          <div>
            {/* Question Counter */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    idx === currentQuestionIndex
                      ? 'bg-rose-500 text-white ring-2 ring-rose-300 scale-110 shadow'
                      : answeredMap[q.id]
                      ? 'bg-rose-200 text-rose-800'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {answeredMap[q.id] ? '✓' : idx + 1}
                </div>
              ))}
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="my-3"
              >
                <div className="p-4 rounded-2xl bg-white/75 border border-rose-200 shadow-sm mb-5">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block mb-1">
                    Question {currentQuestionIndex + 1} of 3
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-stone-800 font-serif-title">
                    {currentQ.question}
                  </p>
                </div>

                {/* 3 Options */}
                <div className="flex flex-col gap-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption?.label === option.label;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => handleSelectOption(option, e)}
                        className={`p-4 rounded-2xl font-bold text-base transition-all flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
                            : 'bg-white/80 hover:bg-rose-50/80 text-stone-800 border-rose-200 shadow-sm'
                        }`}
                      >
                        <span className="text-left">{option.label}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Cute reaction after selecting */}
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-rose-100/90 to-pink-100/90 border border-rose-300 text-stone-800"
                  >
                    <div className="font-bold text-rose-700 text-base">
                      {selectedOption.reaction}
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                      {selectedOption.subNote}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextQuestion}
                      className="mt-3 px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>
                        {currentQuestionIndex < questions.length - 1
                          ? 'Next Question 💕'
                          : 'See My Quiz Result! 🏆'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Quiz Completed Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="py-4"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-200 to-rose-200 flex items-center justify-center text-4xl shadow-md border-2 border-white mb-4 animate-bounce">
              🏆
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50 to-pink-100 border-2 border-rose-300 shadow-lg">
              <h3 className="font-romantic text-3xl sm:text-4xl text-rose-600 font-bold mb-3">
                Congratulations, My Bhutki! 💗
              </h3>
              <p className="text-stone-700 font-semibold text-base sm:text-lg leading-relaxed">
                You have officially won unlimited love, infinite pampering, and lifetime hugs from me! 👑🥰
              </p>
              <div className="font-script text-rose-500 text-xl font-bold mt-2">
                Scores: 1000/1000 — You're my favourite girl forever! 🌸
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto group"
            >
              <span>Open Secret Love Letter</span>
              <span className="text-xl group-hover:scale-125 transition-transform">💌</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
