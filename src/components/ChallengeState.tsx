import { useState, useCallback, useRef } from "react";

const QUESTIONS = [
  "Do you want to be my Valentine?",
  "Are you sure?",
  "Are you 100% sure?",
  "Really??",
  "Think about it again...",
  "But I have a Mercedes!",
  "I'll take you to Paris 🗼",
  "I'll cook for you every day 🍝",
  "Please? 🥺",
  "I promise I'll be the best! 💖",
  "Last chance... say YES! 🌹",
];

interface ChallengeStateProps {
  onYes: () => void;
}

const ChallengeState = ({ onYes }: ChallengeStateProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useState(() => {
    setTimeout(() => setVisible(true), 100);
  });

  const moveNoButton = useCallback(() => {
    const padding = 120;
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    const newX = padding + Math.random() * maxX;
    const newY = padding + Math.random() * maxY;
    setNoPos({ x: newX, y: newY });
    setQuestionIndex((prev) => Math.min(prev + 1, QUESTIONS.length - 1));
    setYesScale((prev) => Math.min(prev + 0.9, 10));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex flex-col items-center justify-center z-40 transition-all duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Question */}
      <h2
        className="font-display text-3xl md:text-5xl text-valentine-deep text-center px-8 mb-12 transition-all duration-300 text-glow"
        style={{ fontStyle: "italic" }}
      >
        {QUESTIONS[questionIndex]}
      </h2>

      {/* Yes Button */}
      <button
        onClick={onYes}
        className="bg-valentine-rose text-primary-foreground font-display font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer z-30"
        style={{
          transform: `scale(${yesScale})`,
          padding: "16px 48px",
          fontSize: "1.25rem",
        }}
      >
        Yes! 💕
      </button>

      {/* No Button */}
      <button
        onMouseEnter={moveNoButton}
        onTouchStart={moveNoButton}
        onClick={moveNoButton}
        className="font-display font-bold rounded-full border-2 border-valentine-deep text-valentine-deep px-8 py-3 transition-all duration-100 cursor-pointer z-30 hover:bg-valentine-pink/30"
        style={
          noPos
            ? {
                position: "fixed",
                left: noPos.x,
                top: noPos.y,
                transform: "translate(-50%, -50%)",
              }
            : {
                marginTop: "1.5rem",
              }
        }
      >
        No
      </button>
    </div>
  );
};

export default ChallengeState;
