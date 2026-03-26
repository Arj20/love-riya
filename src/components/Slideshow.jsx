import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import photo1 from "../assets/images/photo-1.webp";
import photo2 from "../assets/images/photo-2.webp";
import photo3 from "../assets/images/photo-3.webp";
import photo4 from "../assets/images/photo-4.webp";
import photo5 from "../assets/images/photo-5.webp";
import photo6 from "../assets/images/photo-6.webp";
import photo7 from "../assets/images/photo-7.webp";
import photo8 from "../assets/images/photo-8.webp";
import photo9 from "../assets/images/photo-9.webp";

const images = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
  photo9,
];

export default function Slideshow({ next }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setTimeout(next, 2000);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < images.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(next, 2000);
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent"
      >
        ✨ Our Moments ✨
      </motion.h2>

      <AnimatePresence mode="wait">
        {images.length > 0 ? (
          <motion.img
            key={index}
            src={images[index]}
            className="max-h-[60vh] rounded-2xl shadow-2xl shadow-pink-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-2xl text-gray-400 mb-4">
              (Your beautiful photos will go here! 📸)
            </p>
            <p className="text-lg text-gray-500">
              Add images to the array to create a slideshow...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      {images.length > 0 && (
        <div className="flex gap-2 mt-12">
          {images.map((_, i) => (
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
      )}
    </div>
  );
}
