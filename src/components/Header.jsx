import diceIcon from "../assets/dice-icon.png";

function Header() {
  return (
    <header>
      <img src={diceIcon} alt="Dice Icon" id="icon" />
      <h1>Tenzi Game</h1>
    </header>
  );
}

export default Header;
