import { useState } from "react";
import Dice from "./Dice.jsx";

function GameBoard({ settings, isStarted, playGame }) {
  const [rolls, setRolls] = useState(0);

  //Update State
  function updateRolls() {
    // console.log("...rollig");

    setRolls((prevRolls) => prevRolls + 1);
  }
  // Create Dice Array
  const diceList = settings.diceArray.map((e) => (
    <Dice
      key={e.id}
      diceType={settings.diceType}
      dice={e}
      playGame={playGame}
      rolls={rolls}
    />
  ));

  return (
    <div
      className="game-window"
      style={!isStarted ? { pointerEvents: "none", opacity: 0.4 } : {}}
    >
      <div className="stats">
        <p id="rolls">Rolls: {rolls < 10 ? `0${rolls}` : rolls}</p>
        <p id="time">Time: 01:02:03</p>
      </div>
      <button id="roll-btn" onClick={updateRolls}>
        🎲 Roll
      </button>
      <div className="game-board">{diceList}</div>
    </div>
  );
}

export default GameBoard;
