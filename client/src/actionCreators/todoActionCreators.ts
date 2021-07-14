import {Action} from '../actions/todoActions';
import {Todo} from '../types/todoTypes';
import {Dispatch} from 'redux';
import {TodoConstants} from '../constants/todoConstants'; 
import {getTodosApi, addTodoApi, deleteTodoApi, updateTodoApi} from '../services/todoServices'

export const getTodos = ()=> async (dispatch: Dispatch<Action>) =>{
  try {
    dispatch({type: TodoConstants.GET_TODOS_LOADING});
    const {data} = await getTodosApi();
    dispatch({type: TodoConstants.GET_TODOS_SUCCESS, payload: {todos: data}})
  } catch (error) {
    dispatch({type: TodoConstants.GET_TODOS_FAIL});
  }
};

export const addTodo = (name: string, description: string)=> async (dispatch: Dispatch<Action>) =>{
  try {
    dispatch({type: TodoConstants.ADD_TODO_LOADING});

    const todo: Omit<Todo, '_id'> = {
      name,
      description,
      status: false,
    }

    const {data} = await addTodoApi(todo);
    dispatch({type: TodoConstants.ADD_TODO_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: TodoConstants.ADD_TODO_FAIL});
  }
};

export const updateTodo = (todo: Todo)=> async (dispatch: Dispatch<Action>) =>{
  try {
    dispatch({type: TodoConstants.UPDATE_TODO_LOADING});
    const {data} = await updateTodoApi(todo);
    dispatch({type: TodoConstants.UPDATE_TODO_SUCCESS, payload: data})
  } catch (error) {
    dispatch({type: TodoConstants.UPDATE_TODO_FAIL});
  }
};

export const deleteTodo = (id: string)=> async (dispatch: Dispatch<Action>) =>{
  try {
    dispatch({type: TodoConstants.DELETE_TODO_LOADING});
    await deleteTodoApi(id);
    dispatch({type: TodoConstants.DELETE_TODO_SUCCESS, payload: {id}})
  } catch (error) {
    dispatch({type: TodoConstants.UPDATE_TODO_FAIL});
  }
};
