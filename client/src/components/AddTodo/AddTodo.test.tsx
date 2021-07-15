import React from 'react';
import AddTodo from './AddTodo';
import { shallow, ShallowWrapper } from 'enzyme'

const defaultProps = {
  addTodoHandler: jest.fn(),
  onNameChange: jest.fn(),
  onDescChange: jest.fn(),
  isEdittingMode: false,
  name: 'test name',
  description: 'test desc'
}

test('renders without crashing', () => {
  const component = shallow(<AddTodo {...defaultProps}/>);
  expect(component.length).toBe(1);
})

describe('check button content, depends on isEdittingMode', () =>{
  test('isEdittingMode is false', () => {
    const component = shallow(<AddTodo {...defaultProps}/>);
    expect(component.find('button').text()).toBe('Add Todo')
  });

  test('isEdittingMode is true', () => {
    const component = shallow(<AddTodo {...defaultProps} isEdittingMode={true} />);
    expect(component.find('button').text()).toBe('Edit Todo')
  })
})

describe('check initial input values, based on defaultProps', () => {
  test('check name input', () => {
    const component = shallow(<AddTodo {...defaultProps} />);
    expect(component.find('input[type="text"]').at(0).prop('value')).toBe(defaultProps.name);
  })

  test('check name input', () => {
    const component = shallow(<AddTodo {...defaultProps}/>);
    expect(component.find('input[type="text"]').at(1).prop('value')).toBe(defaultProps.description);
  })
})

describe('check initial placeholders for inputs', () => {
  test('check name placeholder', () =>{
    const component = shallow(<AddTodo {...defaultProps}/>);
    expect(component.find('input[type="text"]').at(0).prop('placeholder')).toBe('Name');
  })

  test('check description placeholder', () =>{
    const component = shallow(<AddTodo {...defaultProps}/>);
    expect(component.find('input[type="text"]').at(1).prop('placeholder')).toBe('Description');
  })
});

describe('should change state value as described', () =>{
  test('Name input value', () =>{
    const component = shallow(<AddTodo {...defaultProps}/>);

    const onChangeFunc = defaultProps.onNameChange;
    const nameInput = component.find('input[type="text"]').at(0);
    const name = 'John Snow';

    nameInput.simulate('change', {target: {value: name}});
    
    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe(name);
  });

  test('Description input value', () => {
    const component = shallow(<AddTodo {...defaultProps}/>);

    const onChangeFunc = defaultProps.onDescChange;
    const descInput = component.find('input[type="text"]').at(1);
    const description = 'Go to gym at 5';

    descInput.simulate('change', {target: {value: description}});

    expect(onChangeFunc).toHaveBeenCalled();
    expect(onChangeFunc.mock.calls[0][0]).toBe(description)
  })
})

describe('submit form handlers', () =>{
  let component: ShallowWrapper;
  beforeEach(() =>{
    component = shallow(<AddTodo {...defaultProps}/>);
    const form = component.find('form');
    form.simulate('submit');
  })

  test('addTodoHandler should have been called', () =>{
    const onSubmitFunc = defaultProps.addTodoHandler;
    expect(onSubmitFunc).toHaveBeenCalled();
  })

  test('button text should be `Add Todo`', () =>{
    expect(component.find('button').text()).toBe('Add Todo')
  })

  test('name and description should be empty', () =>{
    expect(component.find('input[type="text"]').at(0).text().length).toBe(0)
    expect(component.find('input[type="text"]').at(1).text().length).toBe(0)
  })
})