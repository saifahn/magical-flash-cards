import React, { Component } from 'react';
import styled from 'styled-components';

const SortButton = styled('button')`
  background: none;
  border: none;
  font-size: 1rem;
  font-family: Domine;
`;

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
      <SortButton
        onClick={this.handleClick}
        className="c-sort-button"
      >
        sort by {sorter}
      </SortButton>
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
