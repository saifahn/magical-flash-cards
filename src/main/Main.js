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
      sortBy: [],
    },
    cardsToShow: [],
    is_grid: false,
  }

  componentDidMount() {
    // const baseUrl = 'https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3ADOM';
    // this.fetchCards(baseUrl);
    this.storeCards(dummyData);
  }

  setManaFilter = (mana) => {
    this.setState({
      filters: {
        ...this.state.filters,
        mana,
      },
    }, () => {
      this.filterCards();
    });
  }

  toggleSort = (toSortBy) => {
    const { sortBy } = this.state.filters;
    const index = sortBy.indexOf(toSortBy);

    if (index === -1) {
      sortBy.push(toSortBy);
    }
    if (index !== -1) {
      sortBy.splice(index, index + 1);
    }
    this.setState({
      filters: {
        ...this.state.filters,
        sortBy,
      },
    }, () => {
      this.filterCards();
    });
  }

  formatManaCostToColorObject = (cost) => {
    const re = /[\d{}]/g;
    const formattedCost = cost.replace(re, '');
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

  filterCards = () => {
    const { cards } = this.state;
    const { mana, sortBy } = this.state.filters;
    // get a copy of this.state.cards as value rather than reference
    let cardsToShow = cards.slice();
    if (mana) {
      cardsToShow = cardsToShow.filter(card => (
        this.filterCardByMana(card, mana)
      ));
    }
    if (sortBy.indexOf('colour') !== -1) {
      cardsToShow = this.sortByColour(cardsToShow);
    }
    if (sortBy.indexOf('cmc') !== -1) {
      cardsToShow = this.sortByCMC(cardsToShow);
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
    return true;
  }

  sortByCMC = (cardsToSort) => {
    const cards = cardsToSort;
    cards.sort((a, b) => (
      a.cmc - b.cmc
    ));
    return cards;
  }

  sortByColour = (cardsToSort) => {
    const assignNumToColour = (card) => {
      /** Function to help in sorting */
      let assignedNum;
      const numColours = card.colors.length;
      // if the card is single coloured, use that colour, otherwise use multicoloured
      const colour = numColours === 1
        ? card.colors[0]
        : 'M';
      switch (colour) {
        case 'W':
          assignedNum = 1;
          break;
        case 'U':
          assignedNum = 2;
          break;
        case 'B':
          assignedNum = 3;
          break;
        case 'R':
          assignedNum = 4;
          break;
        case 'G':
          assignedNum = 5;
          break;
        case 'M':
          assignedNum = 6;
          break;
        default:
          return false;
      }
      return assignedNum;
    };
    const cardsToShow = cardsToSort;
    cardsToShow.sort((a, b) => {
      const aColor = assignNumToColour(a);
      const bColor = assignNumToColour(b);
      return aColor - bColor;
    });
    return cardsToShow;
  }

  toggleGrid = () => {
    this.setState({ is_grid: !this.state.is_grid });
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
    this.setState({ cards }, () => {
      this.filterCards();
    });
  }

  render() {
    return (
      <main>
        <Navigation
          toggleSort={this.toggleSort}
          toggleGrid={this.toggleGrid}
          setManaFilter={this.setManaFilter}
        />
        <Cards
          cards={this.state.cardsToShow}
          is_grid={this.state.is_grid}
        />
      </main>
    );
  }
}

export default Main;
