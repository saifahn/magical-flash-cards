import React, { Component } from 'react';

export default class SortToggle extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { toggleSort, sorter } = this.props;
    toggleSort(sorter);
  }

  render() {
    const { sorter } = this.props;
    return (
      <button
        onClick={this.handleClick}
        className="c-sort-button"
      >
        sort by {sorter}
      </button>
    );
  }
}

// const SortToggle = props => (
//   <button
//     onClick={props.toggleSort}
//     className="c-sort-button"
//   >
//     sort by {props.sorter}
//   </button>
// );
