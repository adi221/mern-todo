import moxios from 'moxios';
import {storeFactory} from '../utils/testUtils';
import {getTodos, addTodo, updateTodo, deleteTodo} from './todoActionCreators';
import {Todo} from '../types/todoTypes';
import {TodoReducerState} from '../reducers/todoReducer';

describe('getTodos action', () => {
  beforeEach(() =>{
    moxios.install();
  })
  afterEach(() =>{
    moxios.uninstall();
  })

  test('sets loading to false and adds todos to reducer', () => {
    expect.assertions(1);

    const todos: Todo[] = [{_id: '1', name: 'testName', description: 'testDesc', status: false}]

    const expectedState: TodoReducerState = {
      loading: false,
      error: false,
      loadingSingleItem: false,
      todos
    }

    const store = storeFactory();
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: todos,
      })
    })

    return store.dispatch<any>(getTodos()).then(() =>{
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })
  })

  test('sets loading to false and sets error to true', () =>{
    expect.assertions(1);
    const store = storeFactory();

    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 401, response: {success: false, message: 'Could not retrieve todos'}});
    })

    const expectedState: TodoReducerState ={
      loading: false,
      error: true,
      loadingSingleItem: false,
      todos: []
    }

    return store.dispatch<any>(getTodos()).then(() => {
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })
  })
})

// describe('deleteTodo action', () =>{
//   beforeEach(() =>{
//     moxios.install();
//   })
//   afterEach(() =>{
//     moxios.uninstall();
//   })

// })