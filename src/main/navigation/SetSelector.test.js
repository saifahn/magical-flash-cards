/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import SetSelector from './SetSelector';

test('it renders correctly', () => {
  const wrapper = shallow(<SetSelector />);
  expect(wrapper).toMatchSnapshot();
});
