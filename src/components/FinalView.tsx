import roseImg from "@/assets/rose.png";

interface FinalViewProps {
  onReplay: () => void;
}

const FinalView = ({ onReplay }: FinalViewProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-40">
      {/* Decorative roses */}
      <div className="relative mb-8">
        {[
          { x: -80, y: -30, r: -25, s: 0.8 },
          { x: 60, y: -20, r: 20, s: 0.9 },
          { x: -40, y: 40, r: 10, s: 0.6 },
          { x: 40, y: 50, r: -15, s: 0.7 },
        ].map((p, i) => (
          <img
            key={i}
            src={roseImg}
            alt=""
            className="absolute"
            style={{
              left: p.x,
              top: p.y,
              width: 60 * p.s,
              height: 60 * p.s,
              transform: `rotate(${p.r}deg)`,
              animation: `float 3s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <h1 className="font-script text-5xl md:text-7xl text-valentine-deep text-glow mb-4 text-center px-6">
        Congratulations! 🎉
      </h1>
      <p className="font-display text-xl md:text-2xl text-valentine-rose italic text-center px-8 mb-4">
        You will be my Valentine
      </p>
      <p className="font-script text-3xl md:text-4xl text-valentine-red text-glow-gold mb-12">
        I love you ❤️
      </p>

      <button
        onClick={onReplay}
        className="font-display text-sm tracking-widest uppercase text-valentine-deep border border-valentine-deep/40 px-6 py-2 rounded-full hover:bg-valentine-pink/30 transition-colors cursor-pointer"
      >
        Replay ↻
      </button>
    </div>
  );
};

export default FinalView;
