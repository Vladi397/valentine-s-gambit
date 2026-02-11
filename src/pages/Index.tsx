import { useState, useCallback } from "react";
import RoseBorder from "@/components/RoseBorder";
import LoadingState from "@/components/LoadingState";
import ChallengeState from "@/components/ChallengeState";
import FinaleState from "@/components/FinaleState";
import FinalView from "@/components/FinalView";

type AppState = "loading" | "challenge" | "finale" | "final";

const Index = () => {
  const [state, setState] = useState<AppState>("loading");

  const handleReplay = useCallback(() => {
    setState("loading");
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
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
    </div>
  );
};

export default Index;
