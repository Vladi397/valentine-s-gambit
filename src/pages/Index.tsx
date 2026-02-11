import { useState, useCallback, useRef, useEffect } from "react";
import RoseBorder from "@/components/RoseBorder";
import LoadingState from "@/components/LoadingState";
import ChallengeState from "@/components/ChallengeState";
import FinaleState from "@/components/FinaleState";
import FinalView from "@/components/FinalView";

type AppState = "loading" | "challenge" | "finale" | "final";

const Index = () => {
  const [state, setState] = useState<AppState>("loading");
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/romantic-music.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Start music on first user interaction
  const startMusic = useCallback(() => {
    if (!musicStarted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMusicStarted(true);
    }
  }, [musicStarted]);

  const handleReplay = useCallback(() => {
    setState("loading");
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative" onClick={startMusic}>
      <RoseBorder />

      {state === "loading" && (
        <LoadingState onComplete={() => setState("challenge")} />
      )}

      {state === "challenge" && (
        <ChallengeState onYes={() => setState("finale")} />
      )}

      {state === "finale" && (
        <FinaleState onComplete={() => setState("final")} />
      )}

      {state === "final" && <FinalView onReplay={handleReplay} />}

      {/* Music toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (audioRef.current) {
            if (audioRef.current.paused) {
              audioRef.current.play().catch(() => {});
              setMusicStarted(true);
            } else {
              audioRef.current.pause();
            }
          }
        }}
        className="fixed bottom-4 right-4 z-[60] w-10 h-10 rounded-full bg-valentine-rose/80 text-primary-foreground flex items-center justify-center text-lg shadow-lg hover:bg-valentine-rose transition-colors cursor-pointer"
        title="Toggle music"
      >
        {musicStarted && !audioRef.current?.paused ? "🔊" : "🔇"}
      </button>
    </div>
  );
};

export default Index;
