import React, { Component } from 'react';

class ManaInput extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onManaChange = (e) => {
    this.props.setManaFilter(e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.onManaChange}
      />
    );
  }
}

export default ManaInput;
