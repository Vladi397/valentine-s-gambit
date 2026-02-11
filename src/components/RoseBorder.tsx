import { useMemo } from "react";
import roseImg from "@/assets/rose.png";

interface RosePosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
}

const RoseBorder = () => {
  const roses = useMemo(() => {
    const positions: RosePosition[] = [];
    const roseSize = 70;
    const spacing = 90;

    // Top edge
    for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
      positions.push({
        x, y: -10,
        scale: 0.5 + Math.random() * 0.5,
        rotation: 170 + Math.random() * 40,
        delay: Math.random() * 2,
      });
    }
    // Bottom edge
    for (let x = 0; x < window.innerWidth + spacing; x += spacing) {
      positions.push({
        x, y: window.innerHeight - roseSize + 10,
        scale: 0.5 + Math.random() * 0.5,
        rotation: -10 + Math.random() * 40,
        delay: Math.random() * 2,
      });
    }
    // Left edge
    for (let y = roseSize; y < window.innerHeight - roseSize; y += spacing) {
      positions.push({
        x: -10, y,
        scale: 0.5 + Math.random() * 0.5,
        rotation: 80 + Math.random() * 30,
        delay: Math.random() * 2,
      });
    }
    // Right edge
    for (let y = roseSize; y < window.innerHeight - roseSize; y += spacing) {
      positions.push({
        x: window.innerWidth - roseSize + 10, y,
        scale: 0.5 + Math.random() * 0.5,
        rotation: -100 + Math.random() * 30,
        delay: Math.random() * 2,
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
            width: 70 * rose.scale,
            height: 70 * rose.scale,
            transform: `rotate(${rose.rotation}deg)`,
            animation: `float 3s ease-in-out ${rose.delay}s infinite`,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
          }}
        />
      ))}
    </div>
  );
};

export default RoseBorder;
