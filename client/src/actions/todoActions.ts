import {TodoConstants} from '../constants/todoConstants';
import {Todo} from '../types/todoTypes';

export interface GetTodosLoadingAction{
  type: TodoConstants.GET_TODOS_LOADING;
}
export interface GetTodosSuccessAction{
  type: TodoConstants.GET_TODOS_SUCCESS;
  payload: {todos: Todo[]};

}
export interface GetTodosFailAction{
  type: TodoConstants.GET_TODOS_FAIL;
}

export interface AddTodoLoadingAction{
  type: TodoConstants.ADD_TODO_LOADING;
}
export interface AddTodoSuccessAction{
  type: TodoConstants.ADD_TODO_SUCCESS;
  payload: Todo;
}
export interface AddTodoFailAction{
  type: TodoConstants.ADD_TODO_FAIL;
}

export interface UpdateTodoLoadingAction{
  type: TodoConstants.UPDATE_TODO_LOADING;
}
export interface UpdateTodoSuccessAction{
  type: TodoConstants.UPDATE_TODO_SUCCESS;
  payload: Todo;
}
export interface UpdateTodoFailAction{
  type: TodoConstants.UPDATE_TODO_FAIL;
}

export interface DeleteTodoLoadingAction{
  type: TodoConstants.DELETE_TODO_LOADING;
}
export interface DeleteTodoSuccessAction{
  type: TodoConstants.DELETE_TODO_SUCCESS;
  payload: {id: string};
}
export interface DeleteTodoFailAction{
  type: TodoConstants.DELETE_TODO_FAIL;
}

export type Action =
  | GetTodosLoadingAction 
  | GetTodosSuccessAction 
  | GetTodosFailAction
  | AddTodoLoadingAction 
  | AddTodoSuccessAction 
  | AddTodoFailAction 
  | UpdateTodoLoadingAction 
  | UpdateTodoSuccessAction 
  | UpdateTodoFailAction 
  | DeleteTodoLoadingAction 
  | DeleteTodoSuccessAction 
  | DeleteTodoFailAction;