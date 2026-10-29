function GameSettings({ settings, newSettings, startGame, isStarted }) {
  return (
    <div className="game-settings">
      <select
        name="diceType"
        id="diceType"
        onChange={newSettings}
        value={settings.diceType}
        style={
          isStarted === 1 || isStarted === 2
            ? { pointerEvents: "none", opacity: 0.4 }
            : {}
        }
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
        style={
          isStarted === 1 || isStarted === 2
            ? { pointerEvents: "none", opacity: 0.4 }
            : {}
        }
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="100">100</option>
      </select>
      <button
        onClick={() =>
          startGame(
            isStarted === 1 ? "end " : isStarted === 0 ? "start" : "reset",
          )
        }
        style={
          isStarted !== 0 ? { backgroundColor: "rgba(255 , 0 , 0 , 0.7)" } : {}
        }
      >
        {isStarted === 1 ? "End " : isStarted === 0 ? "Start" : "Reset"} Game
      </button>
    </div>
  );
}

export default GameSettings;
