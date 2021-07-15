import React from 'react';
import App from './App';
import { mount, ReactWrapper } from 'enzyme';
import {storeFactory} from '../../utils/testUtils';
import { Provider } from 'react-redux';

const setup = () => {
  const store = storeFactory();
  return mount(<Provider store={store}><App/></Provider>)
}

describe('App renders', () => {
  let component: ReactWrapper;
  beforeEach(() => component = setup());

  test('renders without crashing', () => {
    expect(component.length).toBe(1);
  });
  
  test('expect title to be `Loading...` because initially loading is true', () => {
    expect(component.find('h1').text()).toBe('Loading...');
  })
})

