import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const balloons = ["🎈", "🎉", "💖", "✨", "🎊"];

// Pre-generate random values for balloons
const generateBalloonValues = (index) => {
  const seed = index * 98765;
  return {
    x: ((seed * 11) % 100) - 50,
    delay: (seed * 7) % 5,
    duration: 4 + ((seed * 13) % 30) / 10,
  };
};

export default function Intro({ next }) {
  const text = "Hey Riya… I made something for you ❤️";
  const [display, setDisplay] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Falling balloons background */}
      {Array.from({ length: 12 }).map((_, i) => {
        const balloon = balloons[i % balloons.length];
        const random = generateBalloonValues(i);
        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: -100,
              x: random.x,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y:
                typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
              x: random.x + Math.sin(i) * 50,
              rotate: 360,
            }}
            transition={{
              duration: random.duration,
              delay: random.delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute text-5xl pointer-events-none"
          >
            {balloon}
          </motion.div>
        );
      })}

      {/* Decorative side elements - Mobile responsive */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute left-4 md:left-8 top-1/4 text-4xl md:text-6xl"
      >
        💝
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-4 md:right-8 top-1/3 text-4xl md:text-6xl"
      >
        🌹
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute left-4 md:left-12 bottom-1/4 text-4xl md:text-5xl"
      >
        ✨
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute right-4 md:right-16 bottom-1/3 text-4xl md:text-5xl"
      >
        💕
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 relative z-10 px-4"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-400 via-red-300 to-pink-400 bg-clip-text text-transparent animate-glow leading-tight">
          {display}
          <span className="animate-pulse">|</span>
        </h1>

        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={next}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold text-sm sm:text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            Start ✨
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
