import React, { Component } from 'react';
import styled from 'styled-components';


const Input = styled('input')`
  font-size: 1.4rem;
  font-family: 'Lora', serif;
  text-align: center;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 0.5rem;

  &:focus {
    outline: none;
  }
`

export default class ManaInput extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onManaChange = (e) => {
    this.props.setManaFilter(e.target.value);
  }

  render() {
    return (
      <Input
        type="text"
        onChange={this.onManaChange}
      />
    );
  }
}

