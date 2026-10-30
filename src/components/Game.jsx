import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";
import GameSettings from "./GameSettings.jsx";
import GameBoard from "./GameBoard.jsx";
import settingsData from "../settings.js";

function Game() {
  // Creating State
  const [settings, setSettings] = useState(settingsData); // Manage the Default State and settings
  const [started, setStarted] = useState(0); // 0 -> Initial Stage (Called By "reset") , 1 - Running Stage (Called By "start"), 2 - Ended Stage (Called By "End")
  const [rolls, setRolls] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  // Window Size For Confetti
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const startTimeRef = useRef(0);
  let gameWon = false;

  // Use Effect Functions

  // Create the Timer
  useEffect(() => {
    if (started !== 1) return;

    const intervalId = setInterval(() => {
      setElapsed(performance.now() - startTimeRef.current);
    }, 10);
    return () => clearInterval(intervalId);
  }, [started]);

  // Update the Window Size State for Confetti
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

  // Change the Settings
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
      return {
        ...prevSettings,
        [name]: Number(value),
        diceArray: newArray,
      };
    });
  }

  // Function to reset the Game
  function resetGame() {
    startTimeRef.current = 0;
    setRolls(0);
    setSettings(settingsData);
    setElapsed(0);
    startTimeRef.current = 0;
    gameWon = false;
  }

  // Toggle Function to Start and End the Game
  function startEndAndResetGame(action) {
    if (action === "start") {
      startTimeRef.current = performance.now();
      setStarted(1);
      return;
    }
    if (action === "reset") {
      resetGame();
      setStarted(0);
      return;
    }

    setStarted(2);
  }
  // Function to update the Dice Array
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

  // If Statement to check If the Game Has Won
  if (started === 1) {
    let diceValue = 0; // Variable to Compare

    const isWon = settings.diceArray.every((dice) => {
      if (dice.isFrozen === false) return false;

      // Changing the Dice Value if its still zero
      if (diceValue === 0) {
        diceValue = dice.value;
      }
      console.log("Check Won", dice.value === diceValue);

      return dice.value === diceValue; // Comparing the Dice Values
    });
    if (isWon) {
      startEndAndResetGame("end");
      gameWon = true;
    }
  }

  console.log("...Renderd");

  return (
    <main>
      {gameWon ? (
        <Confetti width={windowSize.width} height={windowSize.height} />
      ) : undefined}
      <GameSettings
        settings={settings}
        newSettings={newSettings}
        startGame={startEndAndResetGame}
        isStarted={started}
      />

      <GameBoard
        settings={settings}
        isStarted={started}
        playGame={playGame}
        rolls={rolls}
        time={elapsed}
        setRolls={setRolls}
      />
    </main>
  );
}

export default Game;
