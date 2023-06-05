import './App.css';
import React from 'react';
import GamePlay from './GamePlay';

function App() {
  const [start, setStart]= React.useState(false);

  function startGame(){
    setStart(true)
  }

  function stopClicked(){
    setStart(false);
  }

  return (
    <div className="box">
      <button onClick={startGame} className={`start-button ${start===true && "hide"}`}>Start game</button>
      {start===true && 
      <div className="min-box">
        <GamePlay />
        <button className="stop-button" onClick={stopClicked} >New game</button>
      </div>}
    </div>
  );
}

export default App;
