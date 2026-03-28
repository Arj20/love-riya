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

  // Preload image helper
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };

  // Initial load: preload first 3 images
  useEffect(() => {
    let isMounted = true;

    const preloadFirstImages = async () => {
      if (!isMounted) return;
      try {
        const firstThree = images.slice(0, 3);
        const promises = firstThree.map((image) => preloadImage(image));
        await Promise.all(promises);
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (err) {
        console.error("Error preloading initial images:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (images.length > 0) {
      preloadFirstImages();
    } else if (isMounted) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Lazy load next image in background
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const nextIndex = (index + 1) % images.length;
    preloadImage(images[nextIndex]).catch((err) =>
      console.error("Error preloading next image:", err),
    );
  }, [index, imagesLoaded]);

  // Slideshow interval
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
    <div className="h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent"
      >
        ✨ Our Moments ✨
      </motion.h2>

      {/* Container with fixed space to prevent layout shift */}
      <div className="flex flex-col items-center">
        {/* Image container with fixed height to maintain consistent size */}
        <div className="h-[50vh] sm:h-[60vh] md:h-[65vh] relative overflow-hidden flex items-center justify-center rounded-3xl shadow-lg shadow-pink-500/30">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
                style={{ borderRadius: "32px !important" }}
              >
                <div className="text-center">
                  <div className="inline-block">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"
                    />
                  </div>
                  <p className="text-pink-400 mt-4">Loading memories... 💫</p>
                </div>
              </motion.div>
            ) : images.length > 0 ? (
              <>
                {/* Actual image - use object-contain to show full image */}
                <motion.img
                  key={`image-${index}`}
                  src={images[index]}
                  className="w-full h-full shadow-2xl shadow-pink-500/30 object-contain"
                  style={{ borderRadius: "32px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  alt={`Memory ${index + 1}`}
                />
              </>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-xl sm:text-2xl text-gray-400 mb-4">
                    (Your beautiful photos will go here! 📸)
                  </p>
                  <p className="text-base sm:text-lg text-gray-500">
                    Add images to the array to create a slideshow...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots - Fixed spacing, reserved space below container */}
        {images.length > 0 && !loading && (
          <div className="flex gap-2 mt-8 sm:mt-10 flex-wrap justify-center">
            {images.map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
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
    </div>
  );
}
