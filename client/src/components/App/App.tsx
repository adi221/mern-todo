import React, {useEffect} from 'react';
import {useActions, useAppSelector} from '../../hooks/useReduxSelectors';
import AddTodo from '../AddTodo/AddTodo'
import TodoItem from '../TodoItem/TodoItem';
import {Todo} from '../../types/todoTypes';

const App: React.FC = () => {
  const {todos, loading, error} = useAppSelector(state => state);
  const {getTodos, updateTodo, addTodo, deleteTodo} = useActions();

  useEffect(() => {
    getTodos();
  }, [])

  const addTodoHandler = (e: React.FormEvent, name: string, description: string): void => {
    e.preventDefault();
    if(!name || !description) return;
    addTodo(name, description);
  }

  const deleteTodoHandler = (todoId: string):void =>{
    deleteTodo(todoId)
  }

  const updateTodoHandler = (todo: Todo):void =>{
    updateTodo(todo)
  }

  return (
    <div className="todo-container">
      <h1 className="todo-container__title">Todo List</h1>
      <AddTodo addTodoHandler={addTodoHandler}/>
      {todos.map((todo: Todo) => {
        return <TodoItem key={todo._id} todo={todo} deleteTodoHandler={deleteTodoHandler} updateTodoHandler={updateTodoHandler}/>
      })}
    </div>
  );
}

export default App;
