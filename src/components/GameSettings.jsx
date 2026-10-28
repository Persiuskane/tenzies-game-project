function GameSettings({ settings, newSettings, startGame, isStarted }) {
  return (
    <div className="game-settings">
      <select
        name="diceType"
        id="diceType"
        onChange={newSettings}
        value={settings.diceType}
        style={isStarted ? { pointerEvents: "none", opacity: 0.4 } : {}}
      >
        <option value="6">d6</option>
        <option value="8">d8</option>
        <option value="10">d10</option>
        <option value="20">d20</option>
        <option value="100">d100</option>
      </select>
      <select
        name="diceAmount"
        id="diceAmount"
        onChange={newSettings}
        value={settings.diceAmount}
        style={isStarted ? { pointerEvents: "none", opacity: 0.4 } : {}}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="100">100</option>
      </select>
      <button
        onClick={startGame}
        style={isStarted ? { backgroundColor: "rgba(255 , 0 , 0 , 0.7)" } : {}}
      >
        {isStarted ? "End " : "Start "} Game
      </button>
    </div>
  );
}

export default GameSettings;
