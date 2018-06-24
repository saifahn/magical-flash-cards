import React from 'react';
import './Navigation.css';
import ManaInput from './ManaInput';
import SortToggle from './SortToggle';
// import Colors from './Colors';

const Navigation = props => (
  <section className="c-navigation">
    <h3>This is where the navigation goes</h3>
    <ManaInput setManaFilter={props.setManaFilter} />
    <SortToggle
      toggleSort={props.toggleSort}
      sorter="cmc"
    />
    <SortToggle
      toggleSort={props.toggleSort}
      sorter="colour"
    />
    <button
      onClick={props.toggleGrid}
      className="c-button"
    >
      Grid Toggle
    </button>
  </section>
);

export default Navigation;
