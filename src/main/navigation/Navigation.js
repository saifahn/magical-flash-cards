import React, { Component } from 'react';
import './Navigation.css';
import Colors from './Colors';

class Sorter extends Component {
  render() {
    return (
        <button onClick={this.props.sortByCMC}>Sort by CMC</button>
      )
  }
}

class ColorSorter extends Component {
  render() {
    return (
        <button onClick={this.props.sortByColor}>Sort by Color</button>
      )
  }
}

class Navigation extends Component {

  render() {
    return (
      <section className="c-navigation">
        <h3>This is where the navigation goes</h3>
        <Colors onClick={this.props.onClick}/>
        <Sorter sortByCMC={this.props.sortByCMC}/>
        <ColorSorter sortByColor={this.props.sortByColor}/>
        <button onClick={this.props.toggleGrid}>Grid Toggle</button>
      </section>
    )
  }
}

export default Navigation;