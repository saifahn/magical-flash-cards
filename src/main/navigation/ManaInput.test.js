/* eslint-env  jest */
import React from 'react';
import { shallow } from 'enzyme';
import ManaInput from './ManaInput';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<ManaInput />);
});

test('it calls setManaFilter correctly on change', () => {
  const setManaFilter = jest.fn();
  wrapper = shallow(<ManaInput setManaFilter={setManaFilter} />);
  const value = '3RB';
  wrapper.find('input').simulate('change', {
    target: { value },
  });
  expect(setManaFilter).toHaveBeenLastCalledWith(value);
});
