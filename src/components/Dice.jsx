import { useEffect } from "react";

function Dice({ diceType, dice, playGame, rolls }) {
  useEffect(() => {
    // console.log("...updating Rolls", rolls, dice);
    if (rolls > 0 && !dice.isFrozen) {
      rollDice();
    }
  }, [rolls]);

  function rollDice() {
    const randomNumber = Math.floor(Math.random() * diceType + 1);
    console.log(randomNumber);
    playGame(dice.id, "value", randomNumber);
  }

  function toggleFreeze() {
    playGame(dice.id, "isFrozen", !dice.isFrozen);
  }

  return (
    <button
      className="dice"
      style={dice.isFrozen ? { opacity: 0.4 } : {}}
      onClick={toggleFreeze}
    >
      {dice.value}
    </button>
  );
}

export default Dice;
