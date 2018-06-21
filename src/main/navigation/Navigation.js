import React from 'react';
import './Navigation.css';
import ManaInput from './ManaInput';
// import Colors from './Colors';

const Sorter = props => (
  <button
    onClick={props.setSortToCMC}
    className="c-button"
  >
    Sort by CMC
  </button>
);

const ColorSorter = props => (
  <button
    onClick={props.setSortToColor}
    className="c-button"
  >
    Sort by Color
  </button>
);

const Navigation = props => (
  <section className="c-navigation">
    <h3>This is where the navigation goes</h3>
    <ManaInput setManaFilter={props.setManaFilter} />
    <Sorter setSortToCMC={props.setSortToCMC} />
    <ColorSorter setSortToColor={props.setSortToColor} />
    <button
      onClick={props.toggleGrid}
      className="c-button"
    >
      Grid Toggle
    </button>
  </section>
);

export default Navigation;
