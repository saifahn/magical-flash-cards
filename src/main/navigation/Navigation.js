import React from 'react';
import './Navigation.css';
import ManaInput from './ManaInput';
import SortToggle from './SortToggle';
import SetSelector from './SetSelector';
// import Colors from './Colors';

const Navigation = props => (
  <section className="c-navigation">
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
    <SetSelector
      handleSetChange={props.handleSetChange}
      sets={props.sets}
    />
  </section>
);

export default Navigation;
