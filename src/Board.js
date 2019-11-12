import React, { useState } from 'react';
import Square from "./Square.js";
import wc from './WinningConditions.js';
let winConditions = []
let userOnePlays = []
let userTwoPlays = []
let gameOver = false
let userOneTurn = true
let emptyArray = Array(7).fill(0)
let hoverColumn = -1
let animationRunning = false
let baseSpeed = 1.25;
let allPlays = Array(42).fill(0)
const finalTop = {
  "--finalTop": "500%"
};
const dropTime = {
  "--dropTime": "1.5s"
};
const Board = () => {

  const [updated, setUpdated] = useState(false)
  
  const checkIfWinner = () =>{
    if(winConditions.length == 0){
      winConditions = wc.getAllWinConditions();
    }
    if(userOneTurn){
      if(checkIfUserIsWinner(1)){
        gameOver = true
        hoverColumn = -1
        alert("User One Wins!")
      }
    }
    else{
      if(checkIfUserIsWinner(2)){
        gameOver = true
        hoverColumn = -1
        alert("User Two Wins!")
      }
    }
  }

  const checkIfUserIsWinner = (user) => {
    let userPlays = user == 1 ? userOnePlays : userTwoPlays;
    let userWins = false;
    for(let i = 0; i < winConditions.length; i++){
      let curWinCondition = winConditions[i];
      userWins = true;
      for(let j = 0; j < 4; j++){
        if(!userPlays.includes(curWinCondition[j])){
          userWins = false;
          break;
        }
      }
      if(userWins){
        break;
      }
    }
    return userWins;
  }

  const handleClick = (column) => {
    animationRunning = false
    if(allPlays[column] != 0){
      return;
    }
    if(gameOver){
      return;
    }
    let index = 0
    for(let i = 0; i < 6; i++){
      index = column + (5 - i) * 7;
      if(allPlays[index] === 0){
        if(userOneTurn){
          userOnePlays.push(index)
        }
        else{
          userTwoPlays.push(index)
        }
        break;
      }
    }
    allPlays[index] = userOneTurn ? 1 : 2;
    checkIfWinner();
    if(!gameOver){
      userOneTurn = !userOneTurn
    }
    setUpdated(!updated)
  }

  const runAnimation = (column) => {
    if(animationRunning){
      return;
    }
    let percentage = "0%";
    let time = "0s";
    for(let i = 0; i < 6; i++){
      let sqrDex = (5-i)*7 + column;
      if(allPlays[sqrDex] === 0){
        percentage = ((5-i) * 100 + 100).toString() + "%"
        time = ((baseSpeed/6) * (6-i)).toString() + "s"
        break;
      }
    }
    Object.keys(finalTop).map(key => {
      finalTop[key] = percentage
      const value = finalTop[key];
      document.documentElement.style.setProperty(key, value);
    });
    Object.keys(dropTime).map(key => {
      dropTime[key] = time
      const value = dropTime[key];
      document.documentElement.style.setProperty(key, value);
    });
    animationRunning = true
    setUpdated(!updated)
  }

  const hoverOver = (column) => {
    if(gameOver){
      return;
    }
    hoverColumn = column
    if(animationRunning){
      return;
    }
    setUpdated(!updated)
  }

  const resetGame = () =>{
    gameOver = false
    userOnePlays = []
    userTwoPlays = []
    userOneTurn = true
    hoverColumn = -1
    allPlays = Array(42).fill(0)
    setUpdated(!updated)
  }

  return (
    <div className = "backgroundStuff">
      <h1 className = "glow">Connect Four</h1>
      <button onClick = {resetGame} className = "resetButton">Reset</button>
      <div className = "grid">
        {emptyArray.map((element,i) =>{
              return(
                <Square key = {i.toString()} id = {i} value = {element} handleClick = {handleClick} topSquare = {true} hoverColumn = {gameOver ? -1 : hoverColumn} hoverOver = {hoverOver} userOneTurn = {userOneTurn} runAnimation = {runAnimation}/>)
          })}
        {allPlays.map((element,i) =>{
            return(
              <Square key = {i.toString()} id = {i} value = {element} handleClick = {handleClick} topSquare = {false} hoverColumn = {gameOver ? -1 : hoverColumn} hoverOver = {hoverOver} userOneTurn = {userOneTurn} runAnimation = {runAnimation}/>)
          })}
          
      </div>
      
    </div>
  );
}

export default Board;
