import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { sortByCMC, sortByColour } from '../utils/sort';
import { filterCardByMana } from '../utils/filter';
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
    const upperBound = new Date().toISOString().slice(0, 10);
    const lowerBound = (upperBound.slice(0, 4) - 5).toString();
    const fetched = data.data;
    const sets = fetched.filter(set => (set.set_type === 'expansion' || set.set_type === 'core' || set.set_type === 'masters') && set.released_at > lowerBound && set.released_at < upperBound);
    this.setState({ sets });
  }

  setManaFilter = (mana) => {
    mana = mana.toUpperCase();
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        mana,
      },
    }), () => {
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
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        sortBy,
      },
    }), () => {
      this.filterCards();
    });
  }

  filterCards = () => {
    const { cards, filters: { mana, sortBy } } = this.state;
    // get a copy of this.state.cards as value rather than reference
    let cardsToShow = cards.slice();
    if (mana) {
      cardsToShow = cardsToShow.filter(card => (
        filterCardByMana(card, mana)
      ));
    }
    if (sortBy.indexOf('colour') !== -1) {
      cardsToShow = sortByColour(cardsToShow);
    }
    if (sortBy.indexOf('cmc') !== -1) {
      cardsToShow = sortByCMC(cardsToShow);
    }
    this.setState({ cardsToShow });
  }

  toggleGrid = () => {
    this.setState(prevState => ({ isGrid: !prevState.isGrid }));
  }

  handleSetChange = (val) => {
    let url = 'https://api.scryfall.com/cards/search?q=%28o%3Aflash+or+t%3Ainstant%29+s%3A';
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
      const { image_uris, name, id, colors, cmc, mana_cost, oracle_text, card_faces } = card;
      return { image_uris, name, id, colors, cmc, mana_cost, oracle_text, card_faces };
    });
    this.setState({ cards }, () => {
      this.filterCards();
    });
  }

  render() {
    const { className } = this.props;
    const { sets, cardsToShow, isGrid, filters: { sortBy } } = this.state;
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
