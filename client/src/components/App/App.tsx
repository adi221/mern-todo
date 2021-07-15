import React, {useEffect, useState} from 'react';
import {useActions, useAppSelector} from '../../hooks/useReduxSelectors';
import AddTodo from '../AddTodo/AddTodo'
import TodoItem from '../TodoItem/TodoItem';
import {Todo} from '../../types/todoTypes';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isEdittingMode, setIsEdittingMode] = useState<boolean>(false);
  const [edittedItem, setEdittedItem] = useState<Todo | null>(null);

  const {todos, loading, error} = useAppSelector(state => state);
  const {getTodos, updateTodo, addTodo, deleteTodo} = useActions();

  useEffect(() => {
    getTodos();
  }, [])

  
  const deleteTodoHandler = (todoId: string):void =>{
    deleteTodo(todoId)
  }
  
  const updateTodoHandler = (todo: Todo):void =>{
    updateTodo(todo)
  }
  
  const addTodoHandler = (e: React.FormEvent, name: string, description: string): void => {
    e.preventDefault();
    if(!name || !description) return;
    if(isEdittingMode){
      edittedItem && updateTodoHandler({...edittedItem, name, description});
      setIsEdittingMode(false);
      setEdittedItem(null);
    }else{
      addTodo(name, description);
    }
    setName('');
    setDescription('');
  }

  const setNameHandler = (val: string) =>{
    setName(val);
    if(!val && isEdittingMode) setIsEdittingMode(false);
  }

  const setDescHandler = (val: string) =>{
    setDescription(val);
    if(!val && isEdittingMode) setIsEdittingMode(false);
  }

  const setEditModeHandler = (todo: Todo) =>{
    if(isEdittingMode) return;
    setIsEdittingMode(true);
    setDescription(todo.description);
    setName(todo.name);
    setEdittedItem(todo);
  }

  if(loading) return <h1 className="todo-container__title">Loading...</h1>
  if(error) return <h1 className="todo-container__title">Error</h1>

  return (
    <div className="todo-container">
      <h1 className="todo-container__title">Todo List</h1>
      <AddTodo 
        addTodoHandler={addTodoHandler} 
        name={name} 
        onNameChange={(val:string) => setNameHandler(val)}
        description={description} 
        onDescChange={(val:string) => setDescHandler(val)}
        isEdittingMode={isEdittingMode}
        />
      {todos.map((todo: Todo) => {
        return <TodoItem key={todo._id} 
          todo={todo} deleteTodoHandler={deleteTodoHandler} 
          updateTodoHandler={updateTodoHandler}
          setEditModeHandler={(todo:Todo) => setEditModeHandler(todo)}
          />
      })}
    </div>
  );
}

export default App;
