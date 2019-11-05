import React from 'react';
import red from './red.png'
import blue from './blue.png'
import blank from './blank.png'


const Square = (props) => {

  const handleClick = () => {
    const {id, handleClick} = props
    let modId = id + 7;
    let column = 0;
    for(let i = 0; i < 7; i++){
      column = i;
      if((modId-i)%7 == 0){
        break;
      }
    }
    return handleClick(column);
  }
  return (
      <div className = "square" onClick={handleClick}>
        <img className = "face" src = {props.value==2 ? blue : props.value ==1 ? red : blank } alt = {blank}></img>
      </div>
  );
}

export default Square;
