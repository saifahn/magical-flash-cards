import React, { Component } from 'react';
import styled from 'styled-components';
import { media, text } from '../../utils/theme';

const Selector = styled.select`
  width: 100%;
  padding: 0.25rem 0 0.25rem 0.5rem;
  font-size: ${text.lg};
  font-family: 'Lora', serif;
  border-radius: 0px;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: rgba(0, 0, 0, 0.1);
  outline: none;
  margin: auto;

  ${media.sm`
    font-size: ${text.lg};
  `}

  ${media.md`
    font-size: ${text.xl};
  `}

  ${media.lg`
    max-width: 560px;
  `}
  
  option {
    font-size: ${text.md};
  }
`;

class SetSelector extends Component {
  handleSetChange = (e) => {
    this.props.handleSetChange(e.target.value);
  }

  render() {
    return (
      <Selector className="some-class" onChange={this.handleSetChange}>
        {this.props.sets.map(set => (
          <option key={set.code} value={set.code}>
            {set.name}
          </option>
        ))}
      </Selector>
    );
  }
}

// const SetSelector = styled(Selector)`
//   border: 1px solid #ccc;
//   width: 120px;
//   border-radius: 0;
//   background: rgba(0, 0, 0, 0.1);

// select {
//   margin: 50px;
//   width: 150px;
//   padding: 5px 35px 5px 5px;
//   font-size: 16px;
//   border: 1px solid #ccc;
//   height: 34px;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   appearance: none;
//   }
// `;

export default SetSelector;
