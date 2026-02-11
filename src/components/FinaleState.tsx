import { useEffect, useState, useMemo } from "react";
import mercedesImg from "@/assets/mercedes-cls.png";
import roseImg from "@/assets/rose.png";

interface FinaleStateProps {
  onComplete: () => void;
}

const FinaleState = ({ onComplete }: FinaleStateProps) => {
  const [carProgress, setCarProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
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
      Array.from({ length: 15 }, (_, i) => ({
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        scale: 0.3 + Math.random() * 0.4,
      })),
    []
  );

  useEffect(() => {
    setShowOverlay(true);
    const start = Date.now();
    const duration = 5000;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCarProgress(progress);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 500);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  const trailText = "Congratulations, you will be my valentine, I love you ❤️";
  const visibleChars = Math.floor(carProgress * trailText.length);

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Hearts floating up */}
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

      {/* Falling roses */}
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

      {/* Trail text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-8">
        <p className="font-script text-4xl md:text-6xl text-valentine-deep text-glow">
          {trailText.slice(0, visibleChars)}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* Mercedes */}
      <div
        className="absolute bottom-[15%]"
        style={{
          left: `${carProgress * 120 - 20}%`,
          transition: "none",
        }}
      >
        <img
          src={mercedesImg}
          alt="Mercedes AMG CLS"
          className="w-48 md:w-72 drop-shadow-2xl"
          style={{ transform: "scaleX(-1)" }}
        />
        {/* Smoke trail */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full bg-muted/50"
              style={{
                width: 12 + i * 6,
                height: 12 + i * 6,
                opacity: 0.3 - i * 0.05,
                marginRight: i * 4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinaleState;
