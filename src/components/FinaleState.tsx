import { useEffect, useState, useMemo, useRef } from "react";
import confetti from "canvas-confetti";
import mercedesImg from "@/assets/mercedes-cls.png";
import roseImg from "@/assets/rose.png";
import leftGif from "@/assets/tenor.gif";
import rightGif from "@/assets/tenor.gif"; // <--- This was missing!

interface FinaleStateProps {
  onComplete: () => void;
}

const FinaleState = ({ onComplete }: FinaleStateProps) => {
  const [carProgress, setCarProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- HEARTS & ROSES (Unchanged) ---
  const hearts = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        x: Math.random() * 100,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        emoji: Math.random() > 0.5 ? "❤️" : "💕",
      })),
    []
  );

  const fallingRoses = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        scale: 0.3 + Math.random() * 0.4,
      })),
    []
  );

  useEffect(() => {
    setShowOverlay(true);

    // 1. Confetti Logic
    const fireConfetti = () => {
      confetti({ particleCount: 80, spread: 100, origin: { x: 0.2, y: 0.5 }, colors: ["#ff69b4", "#ff1493", "#ff6b6b", "#ffd700"] });
      confetti({ particleCount: 80, spread: 100, origin: { x: 0.8, y: 0.5 }, colors: ["#ff69b4", "#ff1493", "#ff6b6b", "#ffd700"] });
    };
    fireConfetti();
    const confettiInterval = setInterval(fireConfetti, 1500);

    // 2. HONK LOGIC (Robust)
    // Create audio object once
    audioRef.current = new Audio("/honk.mp3");
    audioRef.current.volume = 0.5;

    const playHonk = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn("Honk blocked or missing file:", err);
        });
      }
    };

    // Play immediately, then every 1.5s
    playHonk(); 
    const honkInterval = setInterval(playHonk, 1500);

    // 3. Movement Logic
    const start = Date.now();
    const duration = 6000;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCarProgress(progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        clearInterval(confettiInterval);
        clearInterval(honkInterval); 
        confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 }, colors: ["#ff69b4", "#ff1493", "#ff6b6b", "#ffd700", "#ffffff"] });
        setTimeout(onComplete, 500);
      }
    };
    requestAnimationFrame(animate);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(honkInterval);
    };
  }, [onComplete]);

  const trailText = "Congratulations, you will be my valentine, I love you ❤️";
  const visibleChars = Math.floor(carProgress * trailText.length);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Background Hearts */}
      {showOverlay &&
        hearts.map((h, i) => (
          <span
            key={`heart-${i}`}
            className="fixed text-2xl pointer-events-none"
            style={{
              left: `${h.x}%`,
              fontSize: h.size,
              animation: `heartFloat ${h.duration}s ease-out ${h.delay}s infinite`,
              bottom: 0,
            }}
          >
            {h.emoji}
          </span>
        ))}

      {/* Falling Roses */}
      {showOverlay &&
        fallingRoses.map((r, i) => (
          <img
            key={`frose-${i}`}
            src={roseImg}
            alt=""
            className="fixed pointer-events-none"
            style={{
              left: `${r.x}%`,
              width: 60 * r.scale,
              height: 60 * r.scale,
              animation: `fall ${r.duration}s linear ${r.delay}s infinite`,
              top: 0,
            }}
          />
        ))}

      {/* Trail Text with GIFs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center gap-4 md:gap-8 px-8 z-10">
        {/* Left GIF */}
        <img 
          src={leftGif} 
          alt="" 
          className="w-16 h-16 md:w-32 md:h-32 object-contain"
        />

        <p className="font-script text-4xl md:text-6xl text-valentine-deep text-glow font-bold drop-shadow-md text-center">
          {trailText.slice(0, visibleChars)}
          <span className="animate-pulse">|</span>
        </p>

        {/* Right GIF */}
        <img 
          src={rightGif} 
          alt="" 
          className="w-16 h-16 md:w-32 md:h-32 object-contain"
        />
      </div>

      {/* --- THE MERCEDES CONTAINER --- */}
      <div
        className="absolute bottom-[10%]"
        style={{
          left: `${carProgress * 130 - 30}%`,
          transition: "none",
        }}
      >
        <div className="relative">
          {/* THE CAR (Bouncing) */}
          <img
            src={mercedesImg}
            alt="Mercedes AMG CLS"
            className="w-80 md:w-[600px] drop-shadow-2xl z-20 relative"
            style={{
              animation: "drive-bounce 0.15s infinite alternate ease-in-out",
            }}
          />

          {/* --- REALISTIC HEADLIGHT BEAMS --- */}
          {/* Right Headlight (Far side) */}
          <div 
            className="absolute z-10 headlight-cone"
            style={{
                width: "400px",
                height: "100px",
                right: "-350px", // Project out front
                top: "35%", // Align with headlight
                transform: "rotate(5deg)"
            }}
          />
           {/* Left Headlight (Near side) */}
           <div 
            className="absolute z-30 headlight-cone"
            style={{
                width: "400px",
                height: "100px",
                right: "-350px",
                top: "40%", 
                transform: "rotate(5deg)",
                opacity: 0.8
            }}
          />

          {/* --- EXHAUST FUMES --- */}
          <div className="absolute left-[5%] bottom-[15%] z-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={`gas-${i}`}
                className="absolute rounded-full bg-gray-300 blur-md"
                style={{
                  width: 20,
                  height: 20,
                  animation: `fume-move 0.8s linear infinite`,
                  animationDelay: `${i * 0.15}s`,
                  opacity: 0, 
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FinaleState;