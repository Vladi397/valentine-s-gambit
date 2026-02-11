import { useEffect, useState } from "react";
import roseImg from "@/assets/rose.png";

interface LoadingStateProps {
  onComplete: () => void;
}

const LoadingState = ({ onComplete }: LoadingStateProps) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => onComplete(), 3200);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-40 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`text-center transition-all duration-1000 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        {/* Cluster of roses */}
        <div className="relative w-64 h-48 mx-auto mb-6">
          {[
            { x: 40, y: 10, s: 1, r: -20 },
            { x: 110, y: 0, s: 1.2, r: 10 },
            { x: 170, y: 15, s: 0.9, r: 25 },
            { x: 60, y: 70, s: 0.8, r: -10 },
            { x: 130, y: 60, s: 1.1, r: 15 },
            { x: 90, y: 110, s: 0.7, r: 5 },
          ].map((r, i) => (
            <img
              key={i}
              src={roseImg}
              alt=""
              className="absolute"
              style={{
                left: r.x,
                top: r.y,
                width: 70 * r.s,
                height: 70 * r.s,
                transform: `rotate(${r.r}deg)`,
                animation: `float 3s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>

        <h1 className="text-7xl md:text-8xl font-script text-valentine-deep text-glow">
          Hello Kami
        </h1>

        <div className="mt-8 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-valentine-rose"
              style={{
                animation: `pulse-soft 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
