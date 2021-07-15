import React from 'react';
import App from './App';
import { shallow } from 'enzyme'


test('renders without crashing', () => {
  const component = shallow(<App/>);
  expect(component.length).toBe(1);
});

test('expect title to be `Todo List`', () => {
  const component = shallow(<App/>);
  expect(component.find('h1').text()).toBe('Todo List');
})
