import { useEffect } from "react";

function Dice({ diceType, dice, playGame, rolls, checkWinCon }) {
  useEffect(() => {
    // console.log("...updating Rolls", rolls, dice);
    if (rolls > 0 && !dice.isFrozen) {
      rollDice();
    }
  }, [rolls]);

  function diceShape() {
    if (diceType === 6) {
      return "";
    }
    if (diceType === 8) {
      return "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
    }
    if (diceType === 10) {
      return "polygon(50% 0, 0 40%, 0 60%, 50% 100%, 100% 60%, 100% 40%)";
    }
    if (diceType === 20) {
      return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
    }
    if (diceType === 100) {
      return "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)";
    }
  }

  function rollDice() {
    const randomNumber = Math.floor(Math.random() * diceType + 1);
    // console.log(randomNumber);
    playGame(dice.id, "value", randomNumber);
  }

  function toggleFreeze() {
    playGame(dice.id, "isFrozen", !dice.isFrozen);
  }

  return (
    <button
      className="dice"
      style={
        dice.isFrozen
          ? { opacity: 0.4, clipPath: diceShape() }
          : { clipPath: diceShape() }
      }
      onClick={toggleFreeze}
    >
      {dice.value}
    </button>
  );
}

export default Dice;
