import React from 'react';
import './Colors.css';

const ColorButton = (props) => (
    <div onClick={() => props.onClick(props.children)} className="c-color">{props.children}</div>  
  )


const Colors = (props) => {
  return (
    <div className="c-colors">
      <ColorButton onClick={props.onClick}>W</ColorButton>
      <ColorButton onClick={props.onClick}>U</ColorButton>
      <ColorButton onClick={props.onClick}>B</ColorButton>
      <ColorButton onClick={props.onClick}>R</ColorButton>
      <ColorButton onClick={props.onClick}>G</ColorButton>
    </div>
  )
}

export default Colors;