import React, { Component } from 'react';
import './Main.css';
import Navigation from './navigation/Navigation';
import Cards from './cards/Cards';
import dummyData from '../data.json';

class Main extends Component {
  state = {
    cards: [],
    filters: {
      mana: '',
    },
    cardsToShow: [],
    grid: true,
  }

  componentDidMount() {
    // const baseUrl = 'https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3ADOM';
    // this.fetchCards(baseUrl);
    this.storeCards(dummyData);
  }

  setManaFilter = (mana) => {
    this.setState(({
      filters: {
        ...this.state.filters,
        mana,
      },
    }), () => {
      this.filterCards();
    });
  }

  formatManaCost = (cost) => {
    const re = /[{}]/g;
    return cost.replace(re, '');
  }

  formatManaCostToColorObject = (cost) => {
    const re = /[\d{}]/g;
    const formattedCost = cost.replace(re, '');
    // make the object
    const manaObject = {
      W: 0,
      U: 0,
      B: 0,
      R: 0,
      G: 0,
    };
    for (let i = 0, n = formattedCost.length; i < n; i += 1) {
      // add one of the appropriate color
      manaObject[formattedCost[i]] += 1;
    }
    return manaObject;
  }

  filterCards() {
    const { cards } = this.state;
    const { mana } = this.state.filters;
    let cardsToShow = cards;
    if (mana) {
      cardsToShow = cardsToShow.filter(card => (
        this.filterCardByMana(card, mana)
      ));
    }
    this.setState({ cardsToShow });
  }

  filterCardByMana = (card, mana) => {
    /**
     * @param card: the card to be filtered
     * @param mana: state.filters.mana
     */
    // if the mana has a generic number
    const genericNum = mana.match(/\d/);
    let filterCMC;
    if (genericNum) {
      filterCMC = (genericNum.length - 1) + parseInt(genericNum, 10);
    } else {
      filterCMC = mana.length;
    }
    // console.log(filterCMC);
    if (filterCMC < card.cmc) {
      return false;
    }
    const cardCost = this.formatManaCostToColorObject(card.mana_cost);
    const manaCost = this.formatManaCostToColorObject(mana);
    const colors = Object.keys(cardCost);
    for (let i = 0, n = colors.length; i < n; i += 1) {
      if (cardCost[colors[i]] > manaCost[colors[i]]) {
        return false;
      }
    }
    // console.log('not filtered');
    return true;
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
      const aColor = assignNumToColor(a);
      const bColor = assignNumToColor(b);
      return aColor - bColor;
    });
    this.setState({ cardsToShow });
  }

  toggleGrid = () => {
    this.setState({ grid: !this.state.grid });
  }

  // fetchCards(url) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => this.storeCards(data))
  //     .catch(error => console.log(error));
  // }

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
          sortByCMC={this.sortByCMC}
          sortByColor={this.sortByColor}
          toggleGrid={this.toggleGrid}
          setManaFilter={this.setManaFilter}
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
