import React from 'react';
import './Navigation.css';
import Colors from './Colors';

const Sorter = props => (
  <button onClick={props.sortByCMC}>Sort by CMC</button>
);

const ColorSorter = props => (
  <button onClick={props.sortByColor}>Sort by Color</button>
);

const Navigation = props => (
  <section className="c-navigation">
    <h3>This is where the navigation goes</h3>
    <Colors onClick={props.onClick} />
    <Sorter sortByCMC={props.sortByCMC} />
    <ColorSorter sortByColor={props.sortByColor} />
    <button onClick={props.toggleGrid}>Grid Toggle</button>
  </section>
);

export default Navigation;
