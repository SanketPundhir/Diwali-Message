import confetti from 'canvas-confetti';

// Customized romantic particle animations

export const fireHeartExplosion = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { x, y },
    colors: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af', '#fb7185'],
    shapes: ['circle'],
    scalar: 1.3,
    ticks: 180,
  });
};

export const fireGoldenGlitter = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 60,
    spread: 90,
    origin: { x, y },
    colors: ['#eab308', '#facc15', '#fef08a', '#fbbf24', '#f59e0b'],
    ticks: 200,
    scalar: 1.1,
  });
};

export const fireRosePetals = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { x, y },
    colors: ['#fda4af', '#f43f5e', '#fb7185', '#e11d48'],
    scalar: 1.5,
    ticks: 240,
    gravity: 0.6,
  });
};

export const fireFullDiwaliCelebration = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 1000 };

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    // pastel pinks, lavenders, goldens
    const colors = ['#f472b6', '#facc15', '#c084fc', '#fb923c', '#fda4af', '#fde047'];

    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }, colors });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }, colors });
  }, 250);
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
