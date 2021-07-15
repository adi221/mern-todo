import React from 'react';
import TodoItem from './TodoItem';
import { shallow } from 'enzyme'

const defaultProps = {
  todo:{ id: '1', name: 'Todo', description: 'test', status: false },
  deleteTodoHandler: jest.fn(),
  updateTodoHandler: jest.fn(),
  setEditModeHandler: jest.fn(),
}

test('renders without crashing', () => {
  const component = shallow(<TodoItem {...defaultProps}/>);
  expect(component.length).toBe(1);
})

test('should have 3 buttons for each item', () => {
  const component = shallow(<TodoItem {...defaultProps}/>);
  expect(component.find('button').length).toBe(3);
})