import { useEffect } from "react";

function Dice({ diceType, dice, playGame, rolls, diceShape }) {
  // Every time rolls Change upstream this call the rollDice() Function
  useEffect(() => {
    if (rolls > 0 && !dice.isFrozen) {
      rollDice();
    }
  }, [rolls]);

  // Roll Dice (Generate a Random Number)
  function rollDice() {
    const randomNumber = Math.floor(Math.random() * diceType + 1);
    // console.log(randomNumber);
    playGame(dice.id, "value", randomNumber);
  }

  // A Function to toggle Freeze
  function toggleFreeze() {
    playGame(dice.id, "isFrozen", !dice.isFrozen);
  }

  return (
    <button
      className="dice"
      style={
        dice.isFrozen
          ? { opacity: 0.4, clipPath: diceShape }
          : { clipPath: diceShape }
      }
      onClick={toggleFreeze}
    >
      {dice.value}
    </button>
  );
}

export default Dice;
