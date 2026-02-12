import { useMemo } from "react";
import roseImg from "@/assets/rose.png";

interface RosePosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  zIndex: number; // Added to stack them
}

const RoseBorder = () => {
  const roses = useMemo(() => {
    const positions: RosePosition[] = [];
    const roseSize = 80; // Slightly bigger roses
    const spacing = 35; // Much tighter spacing (was 90) for the "stacked" look

    // Helper to add some randomness to the "straight" lines
    const jitter = () => Math.random() * 20 - 10;

    // Top edge
    for (let x = -50; x < window.innerWidth + 50; x += spacing) {
      positions.push({
        x: x + jitter(),
        y: -25 + jitter(),
        scale: 0.6 + Math.random() * 0.6, // vary size more
        rotation: 170 + Math.random() * 60,
        delay: Math.random() * 2,
        zIndex: Math.floor(Math.random() * 10),
      });
    }
    // Bottom edge
    for (let x = -50; x < window.innerWidth + 50; x += spacing) {
      positions.push({
        x: x + jitter(),
        y: window.innerHeight - roseSize + 15 + jitter(),
        scale: 0.6 + Math.random() * 0.6,
        rotation: -10 + Math.random() * 60,
        delay: Math.random() * 2,
        zIndex: Math.floor(Math.random() * 10),
      });
    }
    // Left edge
    for (let y = 0; y < window.innerHeight; y += spacing) {
      positions.push({
        x: -25 + jitter(),
        y: y + jitter(),
        scale: 0.6 + Math.random() * 0.6,
        rotation: 80 + Math.random() * 40,
        delay: Math.random() * 2,
        zIndex: Math.floor(Math.random() * 10),
      });
    }
    // Right edge
    for (let y = 0; y < window.innerHeight; y += spacing) {
      positions.push({
        x: window.innerWidth - roseSize + 15 + jitter(),
        y: y + jitter(),
        scale: 0.6 + Math.random() * 0.6,
        rotation: -100 + Math.random() * 40,
        delay: Math.random() * 2,
        zIndex: Math.floor(Math.random() * 10),
      });
    }

    return positions;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {roses.map((rose, i) => (
        <img
          key={i}
          src={roseImg}
          alt=""
          className="absolute"
          style={{
            left: rose.x,
            top: rose.y,
            width: 80 * rose.scale,
            height: 80 * rose.scale,
            transform: `rotate(${rose.rotation}deg)`,
            zIndex: rose.zIndex,
            // If you absolutely cannot fix the image, uncomment the line below to try to blend the white background (only works on pink bg)
            // mixBlendMode: "multiply", 
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
          }}
        />
      ))}
    </div>
  );
};

export default RoseBorder;