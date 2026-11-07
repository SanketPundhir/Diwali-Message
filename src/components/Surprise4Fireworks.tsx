import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flame, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireFullDiwaliCelebration } from '../utils/effects';

interface Surprise4FireworksProps {
  onNext: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  isHeart?: boolean;
}

export const Surprise4Fireworks: React.FC<Surprise4FireworksProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  const [activeTool, setActiveTool] = useState<'phuljhari' | 'anar' | 'chakri'>('phuljhari');
  const [isSparklerActive, setIsSparklerActive] = useState<boolean>(false);
  const [anarRunning, setAnarRunning] = useState<boolean>(false);
  const [chakriRunning, setChakriRunning] = useState<boolean>(false);
  const [lovePatakaBurned, setLovePatakaBurned] = useState<boolean>(false);
  const [sparkleCount, setSparkleCount] = useState<number>(0);

  // Setup canvas for local interactive sparkler & fireworks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = 280);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 280;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Clear with soft fade for glowing trails
      ctx.fillStyle = 'rgba(255, 250, 252, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;

        if (p.isHeart) {
          // Draw mini heart shape
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.bezierCurveTo(p.x - s, p.y - s, p.x - s * 1.5, p.y + s * 0.5, p.x, p.y + s * 1.5);
          ctx.bezierCurveTo(p.x + s * 1.5, p.y + s * 0.5, p.x + s, p.y - s, p.x, p.y);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Add sparkler particles
  const addSparklerSparks = (x: number, y: number) => {
    romanticAudio.playSparklerSound();
    const colors = ['#facc15', '#f472b6', '#fb923c', '#fda4af', '#eab308', '#ffffff'];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.5 + Math.random() * 2.5,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.03,
        isHeart: Math.random() > 0.7,
      });
    }
    setSparkleCount((c) => c + 1);
  };

  // Sparkler pointer move/touch handler
  const handlePointerSpark = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addSparklerSparks(x, y);
  };

  // Anar (Flowerpot Fountain)
  const triggerAnar = () => {
    if (anarRunning) return;
    setAnarRunning(true);
    romanticAudio.playFireworkBurst();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const originX = canvas.width / 2;
    const originY = canvas.height - 20;

    let frames = 0;
    const interval = setInterval(() => {
      frames++;
      romanticAudio.playSparklerSound();
      const colors = ['#fbbf24', '#facc15', '#f43f5e', '#ec4899', '#fef08a'];

      for (let i = 0; i < 9; i++) {
        const spread = (Math.random() - 0.5) * 1.8;
        const speed = 4 + Math.random() * 6;
        particlesRef.current.push({
          x: originX + (Math.random() * 16 - 8),
          y: originY,
          vx: spread * 2.2,
          vy: -speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 2.5,
          alpha: 1,
          decay: 0.025,
          isHeart: Math.random() > 0.6,
        });
      }

      if (frames > 35) {
        clearInterval(interval);
        setAnarRunning(false);
      }
    }, 55);
  };

  // Chakri (Ground Spinner)
  const triggerChakri = () => {
    if (chakriRunning) return;
    setChakriRunning(true);
    romanticAudio.playSparklerSound();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;

    let angle = 0;
    let frames = 0;
    const interval = setInterval(() => {
      frames++;
      angle += 0.45;
      romanticAudio.playSparklerSound();
      const colors = ['#f472b6', '#c084fc', '#facc15', '#38bdf8', '#fb923c'];

      for (let i = 0; i < 4; i++) {
        const currentAngle = angle + (i * Math.PI) / 2;
        const speed = 3.5 + Math.random() * 2.5;
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(currentAngle) * speed,
          vy: Math.sin(currentAngle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 2,
          alpha: 1,
          decay: 0.028,
        });
      }

      if (frames > 40) {
        clearInterval(interval);
        setChakriRunning(false);
      }
    }, 45);
  };

  // Big Button: BURNNN THE LOVE PATKAAA!
  const handleBurnLovePataka = () => {
    romanticAudio.playFireworkBurst();
    setTimeout(() => romanticAudio.playFireworkBurst(), 400);
    setTimeout(() => romanticAudio.playFireworkBurst(), 900);
    setTimeout(() => romanticAudio.playFireworkBurst(), 1400);

    // Full screen multi-stage celebration fireworks
    fireFullDiwaliCelebration();
    setLovePatakaBurned(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55 }}
      className="w-full max-w-xl mx-auto px-4 py-6 relative z-10"
    >
      <div className="glass-card rounded-3xl p-5 sm:p-8 text-center relative overflow-hidden shadow-2xl">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 text-pink-800 text-xs font-semibold mb-3 border border-pink-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Surprise 4 • Romantic Virtual Fireworks</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        </div>

        <h2 className="font-romantic text-3xl sm:text-5xl text-rose-600 font-bold mb-1">
          Virtual Phuljhari & Pataka Game 🎆
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm font-medium mb-4">
          Safe, eco-friendly, and 100% full of love! Touch or drag below to sparkle with Jaan! ✨
        </p>

        {/* Interactive Tool Switcher */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={() => setActiveTool('phuljhari')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'phuljhari'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                : 'bg-white/80 text-stone-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <span>Sparkler (Phuljhari) ✨</span>
          </button>

          <button
            onClick={() => {
              setActiveTool('anar');
              triggerAnar();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'anar'
                ? 'bg-gradient-to-r from-amber-500 to-rose-400 text-white shadow-md'
                : 'bg-white/80 text-stone-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <span>Anar Fountain 🌋</span>
          </button>

          <button
            onClick={() => {
              setActiveTool('chakri');
              triggerChakri();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTool === 'chakri'
                ? 'bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-md'
                : 'bg-white/80 text-stone-700 hover:bg-purple-50 border border-purple-200'
            }`}
          >
            <span>Chakri Spinner 🌀</span>
          </button>
        </div>

        {/* Canvas Area for Interactive Sparks */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-rose-200/80 bg-gradient-to-b from-pink-50/50 via-rose-50/40 to-amber-50/50 shadow-inner mb-4">
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              setIsSparklerActive(true);
              handlePointerSpark(e);
            }}
            onPointerMove={(e) => {
              if (isSparklerActive || activeTool === 'phuljhari') {
                handlePointerSpark(e);
              }
            }}
            onPointerUp={() => setIsSparklerActive(false)}
            className="w-full h-[240px] sm:h-[260px] cursor-crosshair touch-none"
          />

          {/* Hint Overlay */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-center text-[11px] text-rose-500/80 font-bold pointer-events-none px-2">
            <span>✨ Drag or tap inside this magical box!</span>
            <span>Sparks: {sparkleCount}</span>
          </div>

          {/* Center Graphic according to selected tool */}
          {activeTool === 'anar' && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div className="text-3xl animate-bounce">🏺</div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full">
                Love Anar
              </span>
            </div>
          )}

          {activeTool === 'chakri' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="text-3xl animate-spin" style={{ animationDuration: '1s' }}>
                🌀
              </div>
            </div>
          )}
        </div>

        {/* Big Climax Button: BURNNN THE LOVE PATKAAA! */}
        <div className="my-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBurnLovePataka}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-rose-300/80 hover:shadow-rose-400/90 transition-all flex items-center justify-center gap-2 cursor-pointer border border-rose-200"
          >
            <Zap className="w-5 h-5 text-yellow-200 animate-bounce" />
            <span>BURNNN THE LOVE PATKAAA! 🎇</span>
            <Zap className="w-5 h-5 text-yellow-200 animate-bounce" />
          </motion.button>
        </div>

        {/* Revealed emotional quote after burning pataka */}
        <AnimatePresence>
          {lovePatakaBurned && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-white via-rose-50 to-pink-100 border-2 border-rose-300 shadow-md text-center"
            >
              <div className="text-stone-800 text-sm sm:text-base font-semibold leading-relaxed font-serif-title">
                &ldquo;Patakhe toh sirf aasman mein phootte hain, lekin tumne toh mere dil mein permanent celebration laga rakha hai! ❤️&rdquo;
              </div>
              <div className="font-script text-rose-600 text-lg font-bold mt-1">
                — Mera Bhutki Baccha, tum hi meri sabse badi khushi ho 🥰
              </div>

              {/* Advance Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onNext}
                className="mt-4 px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-md shadow-rose-300 hover:shadow-rose-400 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Take the Cute Love Quiz!</span>
                <span className="text-lg">🧠💕</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
