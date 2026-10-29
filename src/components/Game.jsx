import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import GameSettings from "./GameSettings.jsx";
import GameBoard from "./GameBoard.jsx";
import settingsData from "../settings.js";

function Game() {
  // Creating State
  const [settings, setSettings] = useState(settingsData);
  const [started, setStarted] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function getWidowSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", getWidowSize);
    return () => removeEventListener("resize", getWidowSize);
  }, []);

  // Updating State
  function newSettings(e) {
    const { value, name } = e.currentTarget;

    setSettings((prevSettings) => {
      const newArray =
        name === "diceAmount"
          ? Array.from({ length: Number(value) }, (element, index) => {
              return {
                id: index + 1,
                isFrozen: false,
                value: 1,
              };
            })
          : prevSettings.diceArray;
      console.log(newArray);
      return {
        ...prevSettings,
        [name]: Number(value),
        diceArray: newArray,
      };
    });
  }

  function startAndEndGame(won = false) {
    setStarted((prev) => !prev);
    if (won) {
      setIsWon(false);
    }
  }

  function playGame(id, activity, value) {
    setSettings((prevSettings) => {
      const newArray = prevSettings.diceArray.map((dice) =>
        id === dice.id ? { ...dice, [activity]: value } : dice,
      );
      return {
        ...prevSettings,
        diceArray: newArray,
      };
    });
  }

  function toggleWin(boolean) {
    setIsWon(boolean);
    startAndEndGame();
  }

  function resetGame(setRolls, startTimeRef, setElapsed) {
    setRolls(0);
    setSettings(settingsData);
    setElapsed(0);
  }

  return (
    <main>
      {isWon ? (
        <Confetti width={windowSize.width} height={windowSize.height} />
      ) : undefined}
      <GameSettings
        settings={settings}
        newSettings={newSettings}
        startGame={startAndEndGame}
        isStarted={started}
      />

      <GameBoard
        settings={settings}
        isStarted={started}
        playGame={playGame}
        setIsWon={toggleWin}
        resetGame={resetGame}
      />
    </main>
  );
}

export default Game;
