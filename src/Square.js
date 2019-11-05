import React, { useState } from 'react';
import red from './red.png'
import blue from './blue.png'
import blank from './blank.png'


const Square = () => {

  handleClick = () => {
    const {id, handleClick} = this.props
    return handleClick(id);
  }
  return (
      <div className = "square" onClick={this.handleClick}>
        <img className = "face" src = {this.props.value==2 ? blue : this.props.value ==1 ? red : blank } alt = {blank}></img>
      </div>
  );
}

export default Square;
