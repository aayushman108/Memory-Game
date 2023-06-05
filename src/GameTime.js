import React from 'react'
import "./GameTime.css"

function GameTime(props) {
    const [totalSeconds, setTotalSeconds] = React.useState(0); // Initial countdown value in seconds
    React.useEffect(() => {
        const time = setInterval(() => {
        setTotalSeconds((totalSecond) => totalSecond + 1);
        }, 1000);
        // Clean up the timer when the component is unmounted
        if(props.count===8){
          clearInterval(time);
        }
        return () => {
        clearInterval(time);
        };
    }, [props.count]); // Empty dependency array to run the effect only once

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const min= minutes<10? `0${minutes}`: minutes;
    const sec= seconds<10? `0${seconds}`: seconds;
    

  return (
    <div>
      <div className= {`${props.count===8? "new-position" : "time"}`}>
        <p>Time: {min}:{sec}</p>
      </div>
    </div>
  )
}
export default GameTime
