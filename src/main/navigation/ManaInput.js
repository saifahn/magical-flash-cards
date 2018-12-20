import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  handleKeyDown = (e) => {
    e.preventDefault();
    const { setManaFilter } = this.props;
    const pressed = e.key.toUpperCase();
    const validMana = 'WUBRGC';
    let { value } = e.target;
    if (pressed === 'BACKSPACE') {
      value = value.slice(0, value.length - 1);
    } else if (validMana.includes(pressed)) {
      value += pressed;
    } else {
      console.log('Invalid character');
    }
    e.target.value = value;
    setManaFilter(value);
  }

  render() {
    const placeholder = 'type a mana cost e.g. WWBBB';
    return (
      <Input
        type="text"
        onKeyDown={this.handleKeyDown}
        placeholder={placeholder}
      />
    );
  }
}

ManaInput.propTypes = {
  setManaFilter: PropTypes.func.isRequired,
};
