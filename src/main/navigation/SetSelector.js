import React, { Component } from 'react';

export default class SetSelector extends Component {
  handleSetChange = (e) => {
    this.props.handleSetChange(e.target.value);
  }

  render() {
    return (
      <select onChange={this.handleSetChange}>
        <option value="M19">Core Set 2019</option>
        <option value="DOM">Dominaria</option>
        <option value="RIX">Rivals of Ixalan</option>
        <option value="XLN">Ixalan</option>
      </select>
    );
  }
};
