/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import SetSelector from './SetSelector';

test('it renders correctly', () => {
  const sets = [];
  const wrapper = shallow(<SetSelector sets={sets} />);
  expect(wrapper).toMatchSnapshot();
});
