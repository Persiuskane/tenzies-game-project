import { useState } from "react";
import GameSettings from "./GameSettings.jsx";
import GameBoard from "./GameBoard.jsx";
import settingsData from "../settings.js";

function Game() {
  // Creating State
  const [settings, setSettings] = useState(settingsData);

  const [started, setStarted] = useState(false);

  // Updating State
  function newSettings(e) {
    const { value, name } = e.currentTarget;

    setSettings((prevSettings) => {
      const newArray =
        name === "diceAmount"
          ? Array.from({ length: Number(value) }, (element, index) => {
              return {
                id: index + 1,
                number: 1,
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

  function startAndEndGame() {
    setStarted((prev) => !prev);
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

  return (
    <main>
      <GameSettings
        settings={settings}
        newSettings={newSettings}
        startGame={startAndEndGame}
        isStarted={started}
      />

      <GameBoard settings={settings} isStarted={started} playGame={playGame} />
    </main>
  );
}

export default Game;
