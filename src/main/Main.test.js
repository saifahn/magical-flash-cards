/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';
import dummyData from '../data.json';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Main />);
})

it('should render correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// it('should store data correctly', () => {
//   expect(wrapper.state('cards')[0].name).toEqual(data.data[0].name);
// });

test('there is a filters object on state', () => {
  expect(wrapper.state('filters')).toBeDefined();
});

// test('it handles colour filters being toggled', () => {
//   wrapper.find('Navigation')
//     .prop('onClick')('W');
//   const expected = ['U', 'B', 'R', 'G'];
//   expect(wrapper.state('filters').colors).toEqual(expected);
// });

// test('it filters by colour', () => {
//   const colors = ['W'];
//   wrapper.instance().setState(
//     { filters: { colors } },
//     // callback after setting state
//     () => {
//       wrapper.instance().filterCards();
//     },
//   );
//   expect(wrapper.state('cardsToShow').length).toBe(8);
// });

// test('there is an input field for mana cost', () => {
//   expect(wrapper).toMatchSnapshot();
// });

test('changing mana sets the mana filter', () => {
  const value = 'RRBB';
  wrapper.instance().setManaFilter(value);
  expect(wrapper.state('filters').mana).toBe(value);
});

test('formatManaCost function converts mana costs to be usable', () => {
  const egCard = dummyData.data[0];
  const egManaCost = egCard.mana_cost;
  const formattedCost = wrapper.instance().formatManaCost(egManaCost);
  expect(formattedCost).toBe('1W');
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

// test changing the input calls setManaFilter