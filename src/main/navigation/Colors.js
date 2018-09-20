import React from 'react';
import './Colors.css';

const ColorButton = props => (
  <button
    type="button"
    onClick={() => props.onClick(props.children)}
    className="c-color"
  >
    {props.children}
  </button>
);


const Colors = props => (
  <div className="c-colors">
    <ColorButton onClick={props.onClick}>W</ColorButton>
    <ColorButton onClick={props.onClick}>U</ColorButton>
    <ColorButton onClick={props.onClick}>B</ColorButton>
    <ColorButton onClick={props.onClick}>R</ColorButton>
    <ColorButton onClick={props.onClick}>G</ColorButton>
  </div>
);

export default Colors;
