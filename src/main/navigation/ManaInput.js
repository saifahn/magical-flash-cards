import React, { Component } from 'react';
import styled from 'styled-components';
import { media, text } from '../../utils/theme';


const Input = styled('input')`
  font-size: ${text.md};
  font-family: 'Lora', serif;
  text-align: center;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 0.5rem;
  margin: 0 auto 0.75rem;
  width: 100%;

  ${media.sm`
    font-size: ${text.lg};
  `}

  ${media.md`
    font-size: ${text.xl};
  `}

  ${media.lg`
    max-width: 560px;
  `}

  &:focus {
    outline: none;
  }
`;

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
        placeholder="type a mana cost e.g. WWBBB"
      />
    );
  }
}

