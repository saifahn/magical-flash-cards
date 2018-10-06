import React, { Component } from 'react';
import styled from 'styled-components';

export const ToggleButton = styled('button')`
  background: none;
  border: none;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  font-family: 'Lora', serif;
  position: relative;
  outline: none;
  color: ${props => (props.isSelected ? 'black' : 'rgba(0, 0, 0, 0.6)')};

  :before {
    content: "";
    position: absolute;
    width: 50%;
    bottom: 1rem;
    border-bottom: ${props => (props.isSelected ? '2px solid black' : 0)};
  }
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
    const { sorter, children, sortBy } = this.props;
    const isSelected = (sortBy.indexOf(sorter) > -1);
    return (
      <ToggleButton
        onClick={this.handleClick}
        className="c-sort-button"
        isSelected={isSelected}
      >
        {children}
      </ToggleButton>
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
