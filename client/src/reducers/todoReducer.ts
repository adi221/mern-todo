import {Todo} from "../types/todoTypes";
import {Action} from "../actions/todoActions";
import {TodoConstants} from "../constants/todoConstants";

export interface TodoReducerState{
  loading: boolean;
  error: boolean;
  loadingSingleItem: boolean;
  todos: Todo[];
}

export const initialState: TodoReducerState ={
  loading: false,
  error: false,
  loadingSingleItem: false,
  todos: [],
}

const todoReducer = (state: TodoReducerState= initialState, action: Action):TodoReducerState =>{
  switch(action.type){
    // GET_TODOS
    case TodoConstants.GET_TODOS_LOADING:
      return {...state, loading: true }
    case TodoConstants.GET_TODOS_SUCCESS:
      return {...state, loading: false, todos: action.payload.todos }
    case TodoConstants.GET_TODOS_FAIL:
      return {...state, loading: false, error: true }
    // ADD_TODO
    case TodoConstants.ADD_TODO_LOADING:
      return {...state, loadingSingleItem: true }
    case TodoConstants.ADD_TODO_SUCCESS:
      return {...state, loadingSingleItem: false, todos: [action.payload, ...state.todos ] }
    case TodoConstants.ADD_TODO_FAIL:
      return {...state, loadingSingleItem: false, error: true }
    // UPDATE_TODO
    case TodoConstants.UPDATE_TODO_LOADING:
      return {...state, loadingSingleItem: true }
    case TodoConstants.UPDATE_TODO_SUCCESS:
      const updateTodos = state.todos.map(todo =>{
        if(todo._id === action.payload._id){
          todo = {...action.payload}
        }
        return todo;
      })
      return {...state, loadingSingleItem: false, todos: updateTodos}
    case TodoConstants.UPDATE_TODO_FAIL:
      return {...state, loadingSingleItem: false, error: true }
    // DELETE_TODO
    case TodoConstants.DELETE_TODO_LOADING:
      return {...state, loadingSingleItem: true }
    case TodoConstants.DELETE_TODO_SUCCESS:
      const updateTodos2 = state.todos.filter(todo => todo._id !== action.payload.id);
      return {...state, loadingSingleItem: false, todos: updateTodos2}
    case TodoConstants.DELETE_TODO_FAIL:
      return {...state, loadingSingleItem: false, error: true }
    default:
      return state;
  }
}

export default todoReducer;