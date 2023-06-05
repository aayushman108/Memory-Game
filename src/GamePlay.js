import React from 'react'
import data from './Data'
import "./GamePlay.css"
import GameTime from './GameTime';

export default function GamePlay() {
  const[winCount, setWinCount]=React.useState(0);
    const items= [...data];
    let toUseItems= [];
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * items.length);
        toUseItems.push(items[randomIndex]);
        items.splice(randomIndex, 1);
    }
    
    toUseItems=[...toUseItems, ...toUseItems]
    console.log(toUseItems)
    
    for(let i = toUseItems.length-1; i > 0; i--){
        let j= Math.floor(Math.random()*(i+1));
        let k= toUseItems[i];
        toUseItems[i]= toUseItems[j];
        toUseItems[j]= k;
    }
    let firstCard= false;
    let secondCard= false;
    let secondCardValue, firstCardValue, firstCard1, secondCard1;
    let winCountt=0;

    function flip(event){
      if(!event.currentTarget.classList.contains("matched")){
        if(!event.currentTarget.classList.contains("flip")){
          event.target.classList.add("flipped");
          event.currentTarget.classList.add("flip")
          if(!firstCard){
            firstCard= event.currentTarget;
            firstCard1=event.target;
            firstCardValue= event.target.getAttribute("data-card-value");
          }else{
            secondCard= event.currentTarget;
            secondCard1= event.target;
            secondCardValue= event.target.getAttribute("data-card-value");
            if(firstCardValue===secondCardValue){
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              firstCard = false;
              winCountt+=1;
              if (winCountt===8){
                setWinCount(winCountt);

              }
            }else{
              let [tempFirst, tempSecond] = [firstCard1, secondCard1];
              let [tempFirst1, tempSecond1] = [firstCard, secondCard]
              firstCard = false;
              secondCard = false;
              setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
                tempFirst1.classList.remove("flip")
                tempSecond1.classList.remove("flip")
              }, 900);
            }
          }
        }else{
          return;
        }
        
      }
    }

    const arrangeItems= toUseItems.map((item)=>(
      <div className="container" onClick={(event)=>flip(event)}>
        <div className="back-side">{item.icons}</div>
        <div className="front-side" data-card-value={item.name}>?</div>
      </div>
    ))

  return (
    <div className="outer-container">
      <GameTime count={winCount}/>
      <div className={`main-container ${winCount===8 && 'hide'}`}>
        {arrangeItems}
      </div>
      {winCount===8 && <h1>Congratulations, You Won!!!</h1>}
    </div>
  )
}
