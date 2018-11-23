import React, { Component } from 'react';
import styled, { css } from 'styled-components';
// import './Main.css';
import { media } from '../utils/theme';
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
    isGrid: false,
    sets: [],
  }

  componentDidMount() {
    // const baseUrl = 'https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3ADOM';
    // this.fetchCards(baseUrl);
    this.getSets();
    this.storeCards(dummyData);
  }

  getSets = () => {
    fetch('https://api.scryfall.com/sets')
      .then(response => response.json())
      .then(data => this.setSets(data))
      .catch(error => console.log(error));
  }

  setSets = (data) => {
    const lowerBound = '2013';
    const upperBound = '2018-10-29';
    const fetched = data.data;
    const sets = fetched.filter(set => (set.set_type === 'expansion' || set.set_type === 'core' || set.set_type === 'masters') && set.released_at > lowerBound && set.released_at < upperBound);
    this.setState({ sets });
  }

  setManaFilter = (inputMana) => {
    const mana = inputMana.toUpperCase();
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
    const { filters: { sortBy } } = this.state;
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
    const { cards, filters: { mana, sortBy } } = this.state;
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
    const { isGrid } = this.state;
    this.setState({ isGrid: !isGrid });
  }

  // fetchCards(url) {
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => this.storeCards(data))
  //     .catch(error => console.log(error));
  // }

  handleSetChange = (val) => {
    let url = 'https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3A'
    url += val;
    this.loadSet(url);
  }

  loadSet = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => this.storeCards(data))
      .catch(error => console.log(error));
  }

  storeCards = (data) => {
    const cards = data.data.map((card) => {
      const {
        image_uris, name, id, colors, cmc, mana_cost, oracle_text, type_line, power, toughness,
      } = card;
      return {
        image_uris, name, id, colors, cmc, mana_cost, oracle_text, type_line, power, toughness,
      };
    });
    this.setState({ cards }, () => {
      this.filterCards();
    });
  }

  render() {
    const { className } = this.props;
    const {
      sets, cardsToShow, isGrid, filters: { sortBy },
    } = this.state;
    return (
      <main className={className}>
        <Navigation
          toggleSort={this.toggleSort}
          toggleGrid={this.toggleGrid}
          setManaFilter={this.setManaFilter}
          handleSetChange={this.handleSetChange}
          sets={sets}
          sortBy={sortBy}
          isGrid={isGrid}
        />
        <Cards
          cards={cardsToShow}
          isGrid={isGrid}
        />
      </main>
    );
  }
}

export default styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  ${media.sm`
    width: calc(100vw - 30px);
    max-width: 560px;
    margin: 0 auto;
  `}

  ${media.lg`
    max-width: 970px;
  `}

  ${media.xl`
    max-width: 1170px;
  `}
`;
