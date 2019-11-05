import React, { useState } from 'react';
import Square from "./Square.js";
import wc from './WinningConditions.js';
let winConditions = []
let userOnePlays = []
let userTwoPlays = []
let gameOver = false
let userOneTurn = false

const Board = () => {

  const [allPlays, setAllPlays] = useState(Array(42).fill(0))
  const [updated, setUpdated] = useState(false)
  
  const checkIfWinner = () =>{
    if(winConditions.length == 0){
      winConditions = wc.getAllWinConditions();
    }
    
    if(checkIfUserIsWinner(1)){
      gameOver = true
      alert("User One Wins!")
    }
    else if(checkIfUserIsWinner(2)){
      gameOver = true
      alert("User Two Wins!")
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
    let ap = allPlays
    ap[index] = userOneTurn ? 1 : 2;
    checkIfWinner();
    if(!gameOver){
      userOneTurn = !userOneTurn
    }
    setAllPlays(ap)
    setUpdated(!updated)
  }

  const resetGame = () =>{
    gameOver = false
    userOnePlays = []
    userTwoPlays = []
    userOneTurn = true
    setAllPlays(Array(42).fill(0))
  }

  return (
    <div className = "backgroundStuff">
      <h1 className = "glow">Connect Four</h1>
      <button onClick = {resetGame} className = "resetButton">Reset</button>
      <div className = "grid">
        {allPlays.map((element,i) =>{
            return(
              <Square key = {i.toString()} id = {i} value = {element} handleClick = {handleClick}  />)
          })}
      </div>
    </div>
  );
}

export default Board;
