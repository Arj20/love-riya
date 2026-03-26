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
import photo10 from "../assets/images/photo-10.webp";
import photo11 from "../assets/images/photo-11.webp";
import photo12 from "../assets/images/photo-12.webp";
import photo13 from "../assets/images/photo-13.webp";
import photo14 from "../assets/images/photo-14.webp";
import photo15 from "../assets/images/photo-15.webp";
import photo16 from "../assets/images/photo-16.webp";
import photo17 from "../assets/images/photo-17.webp";
import photo18 from "../assets/images/photo-18.webp";
import photo19 from "../assets/images/photo-19.webp";
import photo20 from "../assets/images/photo-20.webp";

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
  photo10,
  photo11,
  photo12,
  photo13,
  photo14,
  photo15,
  photo16,
  photo17,
  photo18,
  photo19,
  photo20,
];

export default function Slideshow({ next }) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images for smooth transitions
    const preloadImages = async () => {
      try {
        const promises = images.map(
          (image) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = image;
            }),
        );
        await Promise.all(promises);
        setImagesLoaded(true);
        setLoading(false);
      } catch (err) {
        console.error("Error preloading images:", err);
        setLoading(false);
      }
    };

    if (images.length > 0) {
      preloadImages();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!imagesLoaded || images.length === 0) {
      const timer = setTimeout(() => {
        next();
      }, 2000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < images.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            next();
          }, 2000);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [imagesLoaded, next]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent"
      >
        ✨ Our Moments ✨
      </motion.h2>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"
              />
            </div>
            <p className="text-pink-400 mt-4">Loading memories... 💫</p>
          </motion.div>
        ) : images.length > 0 ? (
          <motion.img
            key={index}
            src={images[index]}
            className="max-h-[50vh] sm:max-h-[60vh] rounded-2xl shadow-2xl shadow-pink-500/30 object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            alt={`Memory ${index + 1}`}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-xl sm:text-2xl text-gray-400 mb-4">
              (Your beautiful photos will go here! 📸)
            </p>
            <p className="text-base sm:text-lg text-gray-500">
              Add images to the array to create a slideshow...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      {images.length > 0 && !loading && (
        <div className="flex gap-2 mt-8 sm:mt-12 flex-wrap justify-center">
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
