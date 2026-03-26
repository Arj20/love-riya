import { motion } from "framer-motion";

const hearts = ["❤️", "��", "💖", "💗", "💝"];

// Pre-generate random values to avoid impure function calls
const generateRandomValues = (index) => {
  const seed = index * 12345;
  return {
    x: ((seed * 7) % 200) - 100,
    x2: ((seed * 13) % 200) - 100,
    duration: 3 + ((seed * 11) % 20) / 10,
  };
};

export default function Final() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      {/* Floating hearts background */}
      {hearts.map((heart, i) => {
        const random = generateRandomValues(i);
        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: random.x,
              y:
                typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: -100,
              x: random.x2,
            }}
            transition={{
              duration: random.duration,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute text-4xl pointer-events-none"
          >
            {heart}
          </motion.div>
        );
      })}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl relative z-10 px-4"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-red-300 to-pink-400 bg-clip-text text-transparent leading-tight"
        >
          Happy Birthday 🎂
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-transparent bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text leading-tight"
        >
          To My Love ❤️
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 mb-12"
        >
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-100">
            I'll love you forever and a day ❤️
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>

          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Thank you for making every day of my life so special
          </p>

          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg sm:text-xl md:text-2xl text-pink-400 font-semibold"
          >
            Now… let's celebrate you 🎉
          </motion.p>
        </motion.div>

        {/* Celebration emojis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-2 sm:gap-4 flex-wrap"
        >
          {["🎊", "✨", "🎈", "🎁", "🍰", "🎉"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ rotate: 360, y: [-10, 10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-3xl sm:text-4xl"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
