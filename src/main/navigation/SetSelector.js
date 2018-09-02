import React, { Component } from 'react';

export default class SetSelector extends Component {
  handleSetChange = (e) => {
    this.props.handleSetChange(e.target.value);
  }

  render() {
    return (
      <select onChange={this.handleSetChange}>
        {this.props.sets.map(set => (
          <option key={set.code} value={set.code}>
            {set.name}
          </option>
        ))}
      </select>
    );
  }
};
