import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { sortByCMC, sortByColour } from '../utils/sort';
import { canBeCast, isDesired } from '../utils/filter';
import { media } from '../utils/theme';
import Navigation from './navigation/Navigation';
import CardList from './cards/CardList';
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
    this.storeCards(dummyData);
    this.getSets();
  }

  // TODO: refactor to be a set-up function
  getSets = async () => {
    fetch('https://api.scryfall.com/sets')
      .then(response => response.json())
      .then(async (data) => {
        await this.setSets(data);
        this.handleSetChange(this.state.sets[0].code);
      })
      .catch(error => console.log(error));
  }

  setSets = (data) => {
    const upperBound = new Date().toISOString().slice(0, 10);
    const lowerBound = (upperBound.slice(0, 4) - 5).toString();
    const fetched = data.data;
    const sets = fetched.filter(
      set => (
        set.set_type === 'expansion'
        || set.set_type === 'core'
        || set.set_type === 'masters'
      )
      && set.released_at > lowerBound,
    );
    this.setState({ sets });
  }

  setManaFilter = (inputMana) => {
    const mana = inputMana.toUpperCase();
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
      cardsToShow = cardsToShow.filter(card => canBeCast(card, mana));
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
    let url = 'https://api.scryfall.com/cards/search?q=is%3Abooster+%28o%3Aflash+or+t%3Ainstant%29+s%3A';
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
    const cards = data.data
      .filter(card => (
        isDesired(card.oracle_text, card.type_line)
      ))
      .map((card) => {
        const {
          card_faces,
          cmc,
          colors,
          id,
          image_uris,
          mana_cost,
          name,
          oracle_text,
          power,
          toughness,
          type_line,
        } = card;
        return {
          card_faces,
          cmc,
          colors,
          id,
          image_uris,
          mana_cost,
          name,
          oracle_text,
          power,
          toughness,
          type_line,
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
        <CardList
          cards={cardsToShow}
          isGrid={isGrid}
        />
      </main>
    );
  }
}

Main.propTypes = {
  className: PropTypes.string.isRequired,
};

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
