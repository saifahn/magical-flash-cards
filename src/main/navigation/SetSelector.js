import React, { Component } from 'react';
import styled from 'styled-components';

const Selector = styled('select')`
  text-align-last: center;
  font-family: 'Domine';
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  border: none;
  border-radius: 0px;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export default class SetSelector extends Component {
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
