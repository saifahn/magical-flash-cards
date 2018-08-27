/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';
import dummyData from '../data.json';
import testData from '../test_data.json';


let wrapper;

beforeEach(() => {
  wrapper = shallow(<Main />);
});

it('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('there is a filters object on state', () => {
  expect(wrapper.state('filters')).toBeDefined();
});

test('changing mana sets the mana filter', () => {
  const value = 'RRBB';
  wrapper.instance().setManaFilter(value);
  expect(wrapper.state('filters').mana).toBe(value);
});

test('formatManaCostToColorObject converts mana costs to color objects', () => {
  const egCard = dummyData.data[0];
  const egManaCost = egCard.mana_cost;
  const formattedCost = wrapper.instance().formatManaCostToColorObject(egManaCost);
  expect(formattedCost).toEqual({
    W: 1,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
  });
});

test('cards are filtered according to the mana filter', () => {
  const value = 'RRBB';
  wrapper.instance().setManaFilter(value);
  expect(wrapper.state('cardsToShow').length).toBe(10);
});

test('mana filter is case insensitive', () => {
  const value = 'wwuubrrgg';
  wrapper.instance().setManaFilter(value);
  expect(wrapper.state('cardsToShow').length).toBeGreaterThan(0);
});

test('there is a sortBy array property within filters on state', () => {
  expect(wrapper.state('filters').sortBy).toEqual([]);
});

test('calling the toggleSort function with colour toggles sortBy colour', () => {
  const colour = 'colour';
  wrapper.instance().toggleSort(colour);
  expect(wrapper.state('filters').sortBy).toEqual(expect.arrayContaining([colour]));
  wrapper.instance().toggleSort(colour);
  expect(wrapper.state('filters').sortBy).toEqual([]);
});

test('calling the toggleSort function with cmc toggles sortBy cmc', () => {
  const cmc = 'cmc';
  wrapper.instance().toggleSort(cmc);
  expect(wrapper.state('filters').sortBy).toEqual(expect.arrayContaining([cmc]));
  wrapper.instance().toggleSort(cmc);
  expect(wrapper.state('filters').sortBy).toEqual([]);
});

const getCardData = (data) => {
  const cards = data.data.map((card) => {
    const { image_uris, name, id, colors, cmc, mana_cost, oracle_text } = card;
    return { image_uris, name, id, colors, cmc, mana_cost, oracle_text };
  });
  return cards;
};

test('cards are sorted alphabetically if no sortBy values', () => {
  const testCards = getCardData(testData);
  wrapper.instance().storeCards(testData);
  expect(wrapper.state('cardsToShow')).toEqual(testCards);
});

test('cards are sorted cmc -> alpha if cmc is present in sortBy', () => {
  const testCards = getCardData(testData);
  wrapper.instance().storeCards(testData);
  wrapper.instance().toggleSort('cmc');
  const expected = [testCards[0], testCards[1], testCards[2],
    testCards[7], testCards[3], testCards[5], testCards[4], testCards[6]];
  expect(wrapper.state('cardsToShow')).toEqual(expected);
});

test('cards are sorted colour -> alpha if colour is present in sortBy', () => {
  const testCards = getCardData(testData);
  wrapper.instance().storeCards(testData);
  wrapper.instance().toggleSort('colour');
  const expected = [testCards[1], testCards[2], testCards[3],
    testCards[4], testCards[5], testCards[0], testCards[7], testCards[6]];
  expect(wrapper.state('cardsToShow')).toEqual(expected);
});

test('cards are sorted alphabetically if sorted then unsorted', () => {
  const testCards = getCardData(testData);
  wrapper.instance().storeCards(testData);
  wrapper.instance().toggleSort('colour');
  wrapper.instance().toggleSort('colour');
  const expected = [testCards[0], testCards[1], testCards[2],
    testCards[3], testCards[4], testCards[5], testCards[6], testCards[7]];
  expect(wrapper.state('cardsToShow')).toEqual(expected);
});

test('cards are sorted cmc -> colour -> alpha if both colour and cmc present', () => {
  const testCards = getCardData(testData);
  wrapper.instance().storeCards(testData);
  wrapper.instance().toggleSort('colour');
  wrapper.instance().toggleSort('cmc');
  const expected = [testCards[1], testCards[2], testCards[0],
    testCards[7], testCards[3], testCards[5], testCards[4], testCards[6]];
  expect(wrapper.state('cardsToShow')).toEqual(expected);
});

test('componentDidMount should load dummy data and put cards in state if ok', async () => {
  const renderedComponent = await shallow(<Main />);
  await renderedComponent.update();
  expect(renderedComponent.state('cards').length).toEqual(dummyData.data.length);
});
