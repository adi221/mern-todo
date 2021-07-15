import moxios from 'moxios';
import {storeFactory} from '../utils/testUtils';
import {getTodos, addTodo, updateTodo, deleteTodo} from './todoActionCreators';
import {Todo} from '../types/todoTypes';
import {TodoReducerState} from '../reducers/todoReducer';
import {Store} from 'redux';

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

describe('addTodo action', () => {
  const todo: Todo = {_id: '111', name: 'testName', description: 'testDesc', status: false}
  beforeEach(() => {
    moxios.install();
  })
  afterEach(() => {
    moxios.uninstall();
  })

  test('should add a new todo item', () => {
    expect.assertions(1);
    const store = storeFactory();
    
    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: todo})
    })

    const expectedState: TodoReducerState = {
      loading: false,
      error: false,
      loadingSingleItem: false,
      todos: [todo]
    }

    return store.dispatch<any>(addTodo(todo.name, todo.description)).then(() =>{
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })

  })
})

describe('updateTodo action', () =>{
  let store: Store;
  const todo: Todo = {_id: '111', name: 'testName', description: 'testDesc', status: false}
  beforeEach(() =>{
    moxios.install();

    // Add a new todo to initalState
    store = storeFactory({todos: [todo]});
  })
  afterEach(() =>{
    moxios.uninstall();
  })

  test('todo`s status should be updated to true', () =>{
    expect.assertions(1);
    const newTodo = {...todo, status: !todo.status}

    const expectedState: TodoReducerState = {
      loading: false,
      error: false,
      loadingSingleItem: false,
      todos: [newTodo]
    }

    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: newTodo});
    })
    
    return store.dispatch<any>(updateTodo(newTodo)).then(() =>{
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })
  });

  test('todo`s name and description should be updated', () =>{
    expect.assertions(1);
    const newTodo = {...todo, name: 'Second', description: 'desc2'}

    const expectedState: TodoReducerState = {
      loading: false,
      error: false,
      loadingSingleItem: false,
      todos: [newTodo]
    }

    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: newTodo});
    })
    
    return store.dispatch<any>(updateTodo(newTodo)).then(() =>{
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })
  })
})

describe('deleteTodo action', () =>{
  let store: Store;
  const todo: Todo = {_id: '111', name: 'testName', description: 'testDesc', status: false}
  beforeEach(() =>{
    moxios.install();
    // Add a new todo to initalState
    store = storeFactory({todos: [todo]});
  })
  afterEach(() =>{
    moxios.uninstall();
  })
  

  test('should delete the todo and return empty todos array after adding one', () =>{
    expect.assertions(1);

    const expectedState: TodoReducerState = {
      loading: false,
      error: false,
      loadingSingleItem: false,
      todos: []
    }

    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 200, response: {success: true, message: 'todo was deleted'}});
    })
    
    return store.dispatch<any>(deleteTodo('111')).then(() =>{
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })

  });

  test('should not delete the todo and return error', () => {
    expect.assertions(1);

    const expectedState: TodoReducerState = {
      loading: false,
      error: true,
      loadingSingleItem: false,
      todos: [todo]
    }

    moxios.wait(() =>{
      const request = moxios.requests.mostRecent();
      request.respondWith({status: 401, response: {success: false, message: 'todoId not found'}});
    })

    return store.dispatch<any>(deleteTodo('121')).then(() =>{
      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    })
    
  })
})