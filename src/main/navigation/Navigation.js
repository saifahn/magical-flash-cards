import React from 'react';
import './Navigation.css';
import ManaInput from './ManaInput';
import Colors from './Colors';

const Sorter = props => (
  <button
    onClick={props.sortByCMC}
    className="c-button"
  >
    Sort by CMC
  </button>
);

const ColorSorter = props => (
  <button
    onClick={props.sortByColor}
    className="c-button"
  >
    Sort by Color
  </button>
);

const Navigation = props => (
  <section className="c-navigation">
    <h3>This is where the navigation goes</h3>
    <Colors onClick={props.onClick} />
    <ManaInput setManaFilter={props.setManaFilter} />
    <Sorter sortByCMC={props.sortByCMC} />
    <ColorSorter sortByColor={props.sortByColor} />
    <button
      onClick={props.toggleGrid}
      className="c-button"
    >
      Grid Toggle
    </button>
  </section>
);

export default Navigation;
