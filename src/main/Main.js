import React, { Component } from 'react';
import './Main.css';
import Navigation from './navigation/Navigation';
import Cards from './cards/Cards';

class Main extends Component {
  state = {
    cards: [],
    colors: ['W', 'U', 'B', 'R', 'G'],
    cardsToShow: [],
    grid: true,
  }

  onClick = (param) => {
    this.toggleColor(param);
    this.filterCards();
  }

  toggleColor(color) {
    var colors = this.state.colors;
    const index = colors.indexOf(color);
    if (index < 0) {
      colors.push(color);
    }
    if (index >= 0) {
      colors.splice(index, 1);
    }
    this.setState({ colors: colors });
  }

  filterCards() {
    var cards = this.state.cards;
    var currentColors = this.state.colors;
    const result = cards.filter(function(card) {
      for (var i = 0; i < card.colors.length; i++) {
        if (currentColors.includes(card.colors[i])) {
          return true;
        }
      }
    });
    this.setState({ cardsToShow: result });
  }

  sortByCMC = () => {
    var res = this.state.cardsToShow.sort(function(a, b) {
      return a.cmc - b.cmc;
    });
    this.setState({ cardsToShow: res });
  }

  sortByColor = () => {
    var res = this.state.cardsToShow.sort(function(a, b) {
      const aC = assignNumToColor(a);
      const bC = assignNumToColor(b);
      return aC - bC;
    });

    this.setState({ cardsToShow: res });

    // function to help in the sort
    function assignNumToColor(card) {
      var res;
      switch(card.colors[0]) {
        case "W":
          res = 1;
          break;
        case "U":
          res = 2;
          break;
        case "B":
          res = 3;
          break;
        case "R":
          res = 4;
          break;
        case "G":
          res = 5;
          break;
      }
      return res;
    }

  }

  toggleGrid = () => {
    this.setState({ grid: !this.state.grid });
  }

  fetchCards(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => this.storeCards(data))
      .catch(error => console.log(error));
  }

  storeCards = data => {
    const cards = data.data.map( card => {
      const { image_uris, name, id, colors, cmc, mana_cost, oracle_text } = card;
      return { image_uris, name, id, colors, cmc, mana_cost, oracle_text };
    })
    this.setState({ cards })
    this.setState({ cardsToShow: cards })
  }

  componentDidMount() {
    const baseUrl = `https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3ARIX`;
    this.fetchCards(baseUrl);
  }

  render() {
    return (
      <main>
        <Navigation
          onClick={this.onClick}
          sortByCMC={this.sortByCMC}
          sortByColor={this.sortByColor}
          toggleGrid={this.toggleGrid}
        />
        <Cards
          cards={this.state.cardsToShow}
          grid={this.state.grid}
        />
      </main>
    );
  }
}

export default Main;
