/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Navigation from './Navigation';
import ManaInput from './ManaInput';
import SortToggle from './SortToggle';

let wrapper;
let toggleSortSpy;
let sets;

beforeEach(() => {
  sets = []
  toggleSortSpy = jest.fn();
});

test('it renders correctly', () => {
  wrapper = shallow(<Navigation sets={sets} />);
  expect(wrapper).toMatchSnapshot();
});

test('it renders a ManaInput component', () => {
  wrapper = shallow(<Navigation sets={sets} />);
  expect(wrapper.find(ManaInput).length).toBe(1);
});

test('it renders two SortToggle components', () => {
  wrapper = shallow(<Navigation sets={sets} />);
  expect(wrapper.find(SortToggle).length).toBe(2);
});

test('clicking colour sorter calls toggleSort with colour', () => {
  wrapper = mount(<Navigation sets={sets} toggleSort={toggleSortSpy} />);
  wrapper.find({ sorter: 'colour' }).simulate('click');
  expect(toggleSortSpy).toHaveBeenLastCalledWith('colour');
});

test('clicking cmc sorter calls toggleSort with cmc', () => {
  wrapper = mount(<Navigation sets={sets} toggleSort={toggleSortSpy} />);
  wrapper.find({ sorter: 'cmc' }).simulate('click');
  expect(toggleSortSpy).toHaveBeenLastCalledWith('cmc');
});
