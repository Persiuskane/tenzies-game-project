import { useEffect } from "react";
import Dice from "./Dice.jsx";
import Timer from "./Timer.jsx";

function GameBoard({
  settings,
  isStarted,
  playGame,
  setIsWon,
  rolls,
  time,
  setRolls,
}) {
  // Checking if the Game has Won every time a die is Frozen
  const checkFrozen = settings.diceArray.map((dice) => dice.isFrozen); // Getting a array to compare in useEffect
  useEffect(() => {
    checkWinCon();
  }, [JSON.stringify(checkFrozen)]);

  //Update Rols
  function updateRolls() {
    setRolls((prevRolls) => prevRolls + 1);
  }

  // Determine the Dice Shapes
  function determineDiceShape() {
    if (settings.diceType === 6) {
      return "";
    }
    if (settings.diceType === 8) {
      return "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
    }
    if (settings.diceType === 10) {
      return "polygon(50% 0, 0 40%, 0 60%, 50% 100%, 100% 60%, 100% 40%)";
    }
    if (settings.diceType === 20) {
      return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
    }
    if (settings.diceType === 100) {
      return "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)";
    }
  }

  // Function to check If the Game Has Won
  function checkWinCon() {
    let diceValue = 0; // Variable to Compare
    const isWon = settings.diceArray.every((dice) => {
      if (dice.isFrozen === false) return false;

      // Changing the Dice Value if its still zero
      if (diceValue === 0) {
        diceValue = dice.value;
      }

      return dice.value === diceValue; // Comparing the Dice Values
    });
    if (isWon) {
      setIsWon(true);
    }
  }

  // Dermine Dice Shape
  const diceShape = determineDiceShape();

  // Create Dice Array
  const diceList = settings.diceArray.map((e) => (
    <Dice
      key={e.id}
      diceType={settings.diceType}
      dice={e}
      playGame={playGame}
      rolls={rolls}
      diceShape={diceShape}
    />
  ));

  return (
    <div
      className="game-window"
      style={isStarted !== 1 ? { pointerEvents: "none", opacity: 0.4 } : {}}
    >
      <div className="stats">
        <p id="rolls">Rolls: {rolls < 10 ? `0${rolls}` : rolls}</p>
        <Timer time={time} />
      </div>
      <button id="roll-btn" onClick={updateRolls}>
        🎲 Roll
      </button>
      <div
        className="game-board"
        style={rolls === 0 ? { pointerEvents: "none", opacity: 0.4 } : {}}
      >
        {diceList}
      </div>
    </div>
  );
}

export default GameBoard;
