import React from 'react';
import red from './red.png'
import blue from './blue.png'
import blank from './blank.png'
let animationRunning = false
let animationColumn = -1

const dropzoneStyle = (isPreview) => ({
  width: `200px`,
  height: `200px`,
  backgroundColor: `#1DA1F2`,
  backgroundImage: (isPreview) ? 'url(/path/to/image.jpg)' : 'none',
});

// @keyframes fade-in-keyframes {
//   from {opacity: 0}
//   to {opacity: 1}
// }

const Square = (props) => {

  const handleClick = () => {
    
    let column = 0;
    const {id, handleClick, topSquare} = props
    if(topSquare){
      column = id
    }
    else
    {
      let modId = id + 7;
      for(let i = 0; i < 7; i++){
        column = i;
        if((modId-i)%7 == 0){
          break;
        }
      }
    }
    animationRunning = false
    animationColumn = -1
    return handleClick(column);
  }

  const getClass = () => {
    if(!props.topSquare){
      return "square"
    }
    return animationRunning && props.id == animationColumn ? "animationSquare" : "hoverSquare"
  }

  const hoverOver = () => {
    const {id, hoverOver, topSquare} = props
    let animationColumn = 0
    if(topSquare){
      animationColumn = id
    }
    else {
      let modId = id + 7;
      animationColumn = 0;
      for(let i = 0; i < 7; i++){
        animationColumn = i;
        if((modId-i)%7 == 0){
          break;
        }
      }
    }
    return hoverOver(animationColumn)
  }

  const getPiece = () => {
    const{value, topSquare, userOneTurn, hoverColumn, id} = props
    if(topSquare){
      return id != hoverColumn ? blank : userOneTurn ? red : blue
    }
    else {
      if(value === 1){
        return red
      }
      else if(value === 2){
        return blue
      }
      return blank
    }
  }

  const runAnimation = () => {
    animationRunning = true
    const {id, topSquare} = props
    if(topSquare){
      animationColumn = id
    }
    else {
      let modId = id + 7;
      animationColumn = 0;
      for(let i = 0; i < 7; i++){
        animationColumn = i;
        if((modId-i)%7 == 0){
          break;
        }
      }
    }
    return props.runAnimation()
  }

  return (
      <div className = {getClass()} onClick={runAnimation} onMouseOver = {hoverOver} onAnimationEnd={handleClick} >
        <img className = "face" style={{width : '20%'}} src = {getPiece()} alt = {blank}></img>
      </div>
  );
}

export default Square;
