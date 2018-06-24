/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import SortToggle from './SortToggle';

let toggleSortSpy;
let wrapper;

beforeEach(() => {
  toggleSortSpy = jest.fn();
  // wrapper = shallow(<SortToggle/>);
});

test('SortToggle renders correctly', () => {
  wrapper = shallow(<SortToggle />);
  expect(wrapper).toMatchSnapshot();
});
