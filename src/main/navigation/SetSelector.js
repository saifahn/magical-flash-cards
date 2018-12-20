import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
    const { handleSetChange } = this.props;
    handleSetChange(e.target.value);
  }

  render() {
    const { sets } = this.props;
    return (
      <Selector className="some-class" onChange={this.handleSetChange}>
        {sets.map(set => (
          <option key={set.code} value={set.code}>
            {set.name}
          </option>
        ))}
      </Selector>
    );
  }
}

SetSelector.propTypes = {
  handleSetChange: PropTypes.func.isRequired,
  sets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SetSelector;
