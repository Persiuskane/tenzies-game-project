import { useEffect, useRef, useState } from "react";
import Dice from "./Dice.jsx";
import Timer from "./timer.jsx";

function GameBoard({ settings, isStarted, playGame, setIsWon, resetGame }) {
  const [rolls, setRolls] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const startTimeRef = useRef(0);

  const checkFrozen = settings.diceArray.map((dice) => dice.isFrozen);
  useEffect(() => {
    checkWinCon();
  }, [JSON.stringify(checkFrozen)]);

  useEffect(() => {
    resetGame(setRolls, startTimeRef, setElapsed);
    if (!isStarted) return;
    // console.log("...Starting Timer");
    startTimeRef.current = performance.now();
    const intervalId = setInterval(() => {
      // console.log("...Setting Interval");
      setElapsed(performance.now() - startTimeRef.current);
    }, 10);
    return () => clearInterval(intervalId);
  }, [isStarted]);

  //Update State
  function updateRolls() {
    // console.log("...rollig");
    setRolls((prevRolls) => prevRolls + 1);
  }

  function checkWinCon() {
    let diceValue = 0;
    const isWon = settings.diceArray.every((dice) => {
      // console.log(dice.id, " - ", dice.isFrozen);

      if (dice.isFrozen === false) {
        // console.log(diceValue, typeof diceValue, `isForzen ${dice.isFrozen}`);
        return false;
      }
      if (diceValue === 0) {
        diceValue = dice.value;
        // console.log("is 0", diceValue, typeof diceValue);
      }
      // console.log("Dice Value=== ", dice.value === diceValue);

      return dice.value === diceValue;
    });
    if (isWon) {
      setIsWon(true);
    }
  }

  // Create Dice Array
  const diceList = settings.diceArray.map((e) => (
    <Dice
      key={e.id}
      diceType={settings.diceType}
      dice={e}
      playGame={playGame}
      rolls={rolls}
      checkWinCon={checkWinCon}
    />
  ));

  return (
    <div
      className="game-window"
      style={!isStarted ? { pointerEvents: "none", opacity: 0.4 } : {}}
    >
      <div className="stats">
        <p id="rolls">Rolls: {rolls < 10 ? `0${rolls}` : rolls}</p>
        <Timer time={elapsed} />
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
