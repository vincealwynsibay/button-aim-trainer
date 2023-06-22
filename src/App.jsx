import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import "./App.css";
import Select from "./components/Select";
function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [gameState, setGameState] = useState("");
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(15);

  useEffect(() => {
    if (gameState !== "start" || gameState === "lost") return;
    const timer = setInterval(() => {
      setDuration((prevDuration) => prevDuration - 1);
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (duration <= 0) {
      evaluateScore();
      handleRestart();
    }
  }, [duration]);

  const handleDifficulty = (state) => {
    setDifficulty(() => state);
    setGameState("set");
    setScore(0);
  };

  const handleRestart = () => {
    setGameState("set");
    setDifficulty((c) => c);
    setScore(() => 0);
    setDuration(() => 15);
  };

  const evaluateScore = () => {
    let message = "";
    if (score > 25) {
      message =
        "H-Hmph! I suppose... I mean, it's not like I wanted to say it or anything, but... blushes I guess you did a decent job. I mean, it's not like I'm impressed or anything, but... g-good job, I guess. Just don't expect me to say it again, okay?";
    } else if (score > 15) {
      message =
        "Well, I suppose... I mean, it's not like I wanted to say it, but your aim is... okay, I guess. It's not terrible, but it's not amazing either. You hit the mark sometimes, which is... acceptable, I suppose. Don't get too cocky about it, though. There's still plenty of room for improvement. So, yeah, your aim is... passable, I suppose.";
    } else if (score > Math.floor(15 * 0.75)) {
      message =
        "W-What? You... you have bad aim! Yeah, that's right! It's not like I care or anything, but your aim is just terrible. I mean, who misses as often as you do? It's almost impressive in a way. So, yeah, congratulations on having such awful aim. Just don't expect me to feel sorry for you or anything.";
    } else {
      message =
        "You're so bad at this! I can't believe how utterly incompetent you are. It's not like I care or anything, but seriously, could you be any worse? I can't even bear to watch you struggle like this. You should probably just give up already. But hey, it's not like I'm saying this because I care about your progress or anything...";
    }
    alert(message);
  };

  return (
    <div className="app">
      {gameState !== "start" ? (
        <div>
          <h1>Welcome to Button Aim Trainer</h1>
          <p>note: hard mode will have a spinning button</p>
          <Select
            handleState={handleDifficulty}
            currentState={difficulty}
            states={["easy", "hard"]}
          />
        </div>
      ) : (
        <div>
          <p>Duration: {duration}</p>
          <p>Score: {score}</p>
        </div>
      )}
      <Button
        difficulty={difficulty}
        gameState={gameState}
        setGameState={setGameState}
        score={score}
        setScore={setScore}
      />
    </div>
  );
}

export default App;
