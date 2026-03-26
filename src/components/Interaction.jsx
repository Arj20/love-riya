import { useState } from "react";
import { motion } from "framer-motion";

export default function Interaction({ next }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);

  const move = () => {
    setPos({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    });
  };

  const handleYes = () => {
    setYesClicked(true);
    const audio = new Audio("/src/assets/music/song.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
    setTimeout(() => next(), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.h2
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent"
        >
          Do you love me? 😄
        </motion.h2>

        <p className="text-lg text-gray-300 mb-12">
          (be careful with your answer 👀)
        </p>

        <div className="flex gap-6 justify-center flex-wrap relative">
          {/* YES Button */}
          <motion.button
            initial={{ scale: 1 }}
            animate={yesClicked ? { scale: [1, 1.2, 1] } : {}}
            onClick={handleYes}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:shadow-lg hover:shadow-green-500/50 transition-all"
          >
            YES 😍
          </motion.button>

          {/* NO Button - Runs Away */}
          <motion.button
            animate={{
              x: pos.x,
              y: pos.y,
            }}
            transition={{
              type: "spring",
              damping: 8,
              mass: 0.5,
            }}
            onMouseEnter={move}
            className="border-2 border-red-500 text-red-400 px-10 py-4 rounded-full font-bold text-xl hover:border-red-400 transition-colors"
          >
            NO 😏
          </motion.button>
        </div>

        {yesClicked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-2xl"
          >
            <p className="text-pink-400 font-bold animate-glow">
              I knew it! 🎉 ❤️
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
