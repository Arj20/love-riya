import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import backgroundMusic from "./assets/music/song.mp3";
import Intro from "./components/Intro";
import Memory from "./components/Memory";
import Interaction from "./components/Interaction";
import Slideshow from "./components/Slideshow";
import Final from "./components/Final";

export default function App() {
  const [step, setStep] = useState(0);
  const audioRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Attempt to play audio only on Slideshow page (step 3)
    if (step === 3 && audioRef.current && !hasPlayedRef.current) {
      const playAudio = () => {
        if (audioRef.current && !hasPlayedRef.current) {
          audioRef.current.play().catch((err) => {
            console.log("Audio play failed:", err);
          });
          hasPlayedRef.current = true;
        }
      };

      // Try to play on first interaction on slideshow page
      document.addEventListener("click", playAudio);
      return () => document.removeEventListener("click", playAudio);
    }
  }, [step]);

  // Keep audio playing even when changing pages
  useEffect(() => {
    if (audioRef.current && hasPlayedRef.current) {
      audioRef.current.play().catch(() => {
        // Silent catch - audio might already be playing
      });
    }
  }, [step]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Intro next={() => setStep(1)} />;
      case 1:
        return <Memory next={() => setStep(2)} />;
      case 2:
        return <Interaction next={() => setStep(3)} />;
      case 3:
        return <Slideshow next={() => setStep(4)} />;
      case 4:
        return <Final />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-b from-black via-zinc-900 to-black">
      <audio ref={audioRef} loop volume={0.3}>
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
