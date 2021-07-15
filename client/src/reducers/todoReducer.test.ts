import {TodoConstants} from "../constants/todoConstants";
import todoReducer, {initialState, TodoReducerState} from "./todoReducer";
import {Action} from "../actions/todoActions";
import { Todo } from '../types/todoTypes';

describe('GetTodos actions', () => {
  test('sets loading to true when `GET_TODOS_LOADING` is passed', () => {
    const newState = todoReducer(undefined, {
      type: TodoConstants.GET_TODOS_LOADING
    });
 
    expect(newState).toEqual({...initialState, loading: true})
  })

  test('set new todos when `GET_TODOS_SUCCES` is passed', () => {
    const todos: Todo[] = [
      {_id: '1', name: 'abc', description: 'def', status: false},
      {_id: '2', name: 'abca', description: 'defs', status: true},
      {_id: '3', name: 'abcd', description: 'defss', status: false},
    ];
    const newState = todoReducer(undefined, {
      type: TodoConstants.GET_TODOS_SUCCESS,
      payload: {todos},
    });
        
    expect(newState).toEqual({...initialState, todos})
  })

  test('sets error to true when `GET_TODOS_FAIL` is passed', () => {
    const newState = todoReducer(undefined, {
      type: TodoConstants.GET_TODOS_FAIL
    });
 
    expect(newState).toEqual({...initialState, error: true})
  })
})

describe('AddTodo actions', () => {
  test('sets loadingSingleItem to true when `ADD_TODO_LOADING` is passed', () => {
    const newState = todoReducer(undefined, {
      type: TodoConstants.ADD_TODO_LOADING
    });
 
    expect(newState).toEqual({...initialState, loadingSingleItem: true})
  })

  test('set a new todo when `ADD_TODOS_SUCCESS` is passed', () => {
    const newTodo: Todo =  {_id: '1', name: 'abc', description: 'def', status: false};

    const newState = todoReducer(undefined, {
      type: TodoConstants.ADD_TODO_SUCCESS,
      payload: newTodo,
    });
        
    expect(newState).toEqual({...initialState, todos: [...initialState.todos, newTodo]})
  })

  test('sets error to true when `ADD_TODO_FAIL` is passed', () => {
    const newState = todoReducer(undefined, {
      type: TodoConstants.ADD_TODO_FAIL
    });
 
    expect(newState).toEqual({...initialState, error: true})
  })
})

describe('UpdateTodo actions', () => {
  const todo: Todo =  {_id: '1', name: 'abc', description: 'def', status: false};
  const currentState = {...initialState, todos: [todo]}

  test('sets loadingSingleItem to true when `UPDATE_TODO_LOADING` is passed', () => {
    const newState = todoReducer(currentState, {
      type: TodoConstants.UPDATE_TODO_LOADING
    });
 
    expect(newState).toEqual({...currentState, loadingSingleItem: true})
  })

  test('set a new todo when `ADD_TODOS_SUCCESS` is passed', () => {
    const updatedTodo: Todo =  {_id: '1', name: 'abc', description: 'updatedDesc', status: true};

    const newState = todoReducer(currentState, {
      type: TodoConstants.UPDATE_TODO_SUCCESS,
      payload: updatedTodo,
    });
        
    expect(newState).toEqual({...currentState, todos: [updatedTodo]})
  })

  test('sets error to true when `UPDATE_TODO_FAIL` is passed', () => {
    const newState = todoReducer(currentState, {
      type: TodoConstants.UPDATE_TODO_FAIL
    });
 
    expect(newState).toEqual({...currentState, error: true})
  })
})

describe('UpdateTodo actions', () => {
  const todo: Todo =  {_id: '1', name: 'abc', description: 'def', status: false};
  const currentState = {...initialState, todos: [todo]}

  test('sets loadingSingleItem to true when `DELETE_TODO_LOADING` is passed', () => {
    const newState = todoReducer(currentState, {
      type: TodoConstants.DELETE_TODO_LOADING
    });
 
    expect(newState).toEqual({...currentState, loadingSingleItem: true})
  })

  test('set a new todo when `ADD_TODOS_SUCCESS` is passed', () => {
    const newState = todoReducer(currentState, {
      type: TodoConstants.DELETE_TODO_SUCCESS,
      payload: {id: '1'},
    });
        
    expect(newState).toEqual({...currentState, todos: []})
  })

  test('sets error to true when `DELETE_TODO_FAIL` is passed', () => {
    const newState = todoReducer(currentState, {
      type: TodoConstants.DELETE_TODO_FAIL
    });
 
    expect(newState).toEqual({...currentState, error: true})
  })
})