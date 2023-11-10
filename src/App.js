import React, { useEffect, useState } from 'react';
import './GuessGame.css'; // Import the CSS file

function GuessGame() {
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [jsonData, setJsonData] = useState(null);
  const [players, setPlayers] = useState(null);

  const checkGuess = (guess, players) => {
    const higher = getHigherPlayerStat(players);
    setCorrectAnswer(higher[1]);
    setPlayers(getPlayers(jsonData));
    if (guess === correctAnswer) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        return newScore;
      });
    } else {
      setScore(0);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/RABlue27/HR_Guess/main/stats.json');
      const data = await response.json();
      setJsonData(data);
      setPlayers(getPlayers(data));
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function extractPlayerInfo(data, x) {
    return data.slice(x, x + 1).map(entry => ({
      Name: entry.Name,
      Player: entry.Player,
      "HR": entry["HR"]
    }));
  }

  function getPlayers(data) {
    let p1 = extractPlayerInfo(data, Math.floor(Math.random() * data.length));
    let p2 = extractPlayerInfo(data, Math.floor(Math.random() * data.length));
    return [p1, p2];
  }

  function getHigherPlayerStat([p1, p2]) {
    const hr1 = p1[0]["HR"];
    const hr2 = p2[0]["HR"];
    return hr1 > hr2 ? [hr1, 0] : [hr2, 1];
  }

  return (
    <div className="guess-game-container"> {/* Added a class for styling */}
      <h2>Guessing Game</h2>
      <p>High Score: {highScore}</p>
      <p>Current Score: {score}</p>
      <button onClick={() => checkGuess(0, players)}>Guess 0</button>
      <button onClick={() => checkGuess(1, players)}>Guess 1</button>
      {players && (
        <div>
          <p>Correct Answer: {getHigherPlayerStat(players)[0]}</p>
          <p>{JSON.stringify(players)}</p>
        </div>
      )}
    </div>
  );
}

export default GuessGame;
