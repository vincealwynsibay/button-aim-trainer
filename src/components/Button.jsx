import React, { useEffect, useRef, useState } from "react";

function Button({ difficulty, gameState, setGameState, setScore }) {
  const buttonRef = useRef();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (gameState !== "start" || difficulty !== "hard") return;
    const timer = setInterval(() => {
      setN((n) => {
        buttonRef.current.style.transform = `rotate(${n * 20}deg)`;
        return n + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleClick = () => {
    setGameState(() => "start");
    setScore((s) => s + 1);
    const xVal = Math.floor(Math.random() * 80) + 10;
    const yVal = Math.floor(Math.random() * 80) + 10;

    buttonRef.current.style.left = xVal + "vw";
    buttonRef.current.style.top = yVal + "vh";
  };

  return (
    <div>
      <button className="btn-aim" ref={buttonRef} onClick={handleClick}>
        Click Me!
      </button>
    </div>
  );
}

export default Button;
