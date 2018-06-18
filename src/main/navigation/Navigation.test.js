/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Navigation from './Navigation';
import ManaInput from './ManaInput';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Navigation />);
});

test('it renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('it renders a ManaInput component', () => {
  // const mounted = mount(<Navigation />);
  expect(wrapper.find(ManaInput).length).toBe(1);
});
