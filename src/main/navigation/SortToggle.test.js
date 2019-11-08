/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import SortToggle from './SortToggle';

test('SortToggle renders correctly', () => {
  const props = {
    sorter: 'test',
    sortBy: [],
    toggleSort: jest.fn(),
    children: '',
  };
  const wrapper = shallow(<SortToggle {...props} />);
  expect(wrapper).toMatchSnapshot();
});
