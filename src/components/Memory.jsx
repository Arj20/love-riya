import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  "life was going good before i met you, it became great after you.",
  "I like having tea with you in my evening, that is my comfort zone, but it's you that is comfort.",
  "i have been wrong for most of my life but you are my best decision.",
  "thank you for making everyday of my life so special!!",
];

export default function Memory({ next }) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < memories.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text">
          ✨ Our Memories ✨
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-100 italic">
              "{memories[index]}"
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {memories.map((_, i) => (
            <motion.div
              key={i}
              className={`h-2 rounded-full ${
                i === index ? "bg-pink-500 w-8" : "bg-gray-600 w-2"
              }`}
              animate={{
                backgroundColor: i === index ? "#ec4899" : "#4b5563",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <div className="flex gap-6 justify-center flex-wrap">
          {index < memories.length - 1 ? (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-pink-500 text-pink-400 px-8 py-3 rounded-full font-semibold hover:bg-pink-500/10 transition"
            >
              Next Memory →
            </motion.button>
          ) : (
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50"
            >
              Continue ❤️
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
