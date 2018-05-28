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

  componentDidMount() {
    const baseUrl = 'https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3ARIX';
    this.fetchCards(baseUrl);
  }

  onClick = (param) => {
    this.toggleColor(param);
    this.filterCards();
  }

  toggleColor(color) {
    const { colors } = this.state;
    const index = colors.indexOf(color);
    if (index < 0) {
      colors.push(color);
    }
    if (index >= 0) {
      colors.splice(index, 1);
    }
    this.setState({ colors });
  }

  filterCards() {
    const { cards, colors } = this.state;
    const result = cards.filter(card => (
      card.colors.some(color => colors.includes(color))
    ));
    this.setState({ cardsToShow: result });
  }

  sortByCMC = () => {
    const { cardsToShow } = this.state;
    cardsToShow.sort((a, b) => (
      a.cmc - b.cmc
    ));
    this.setState({ cardsToShow });
  }

  sortByColor = () => {
    // function to help in the sort
    const assignNumToColor = (card) => {
      let res;
      switch (card.colors[0]) {
        case 'W':
          res = 1;
          break;
        case 'U':
          res = 2;
          break;
        case 'B':
          res = 3;
          break;
        case 'R':
          res = 4;
          break;
        case 'G':
          res = 5;
          break;
        default:
          return false;
      }
      return res;
    };

    const { cardsToShow } = this.state;
    cardsToShow.sort((a, b) => {
      const aC = assignNumToColor(a);
      const bC = assignNumToColor(b);
      return aC - bC;
    });
    this.setState({ cardsToShow });
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

  storeCards = (data) => {
    const cards = data.data.map((card) => {
      const { image_uris, name, id, colors, cmc, mana_cost, oracle_text } = card;
      return { image_uris, name, id, colors, cmc, mana_cost, oracle_text };
    });
    this.setState({ cards });
    this.setState({ cardsToShow: cards });
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
