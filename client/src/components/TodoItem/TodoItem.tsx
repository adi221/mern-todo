import React, {useEffect, useState} from 'react'
import {Todo} from '../../types/todoTypes';

interface TodoItemProps{
  readonly todo: Todo;
  readonly deleteTodoHandler: (todoId: string) => void;
  readonly updateTodoHandler: (todo: Todo) => void;
  readonly setEditModeHandler: (todo: Todo) => void;
}

const TodoItem:React.FC<TodoItemProps> = ({todo, deleteTodoHandler, updateTodoHandler, setEditModeHandler}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const {status, name, description, _id} = todo;

  useEffect(() =>{
    setIsCompleted(status);
  }, [])

  return (
    <div className="todo-container__item">
      <div className={`todo-container__item--content ${isCompleted && 'lined'}`}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="todo-container__item--btns">
        <button className="gold" onClick={() => setEditModeHandler(todo)}>Edit</button>
        <button className='green' onClick={() => {
          updateTodoHandler({...todo, status: !isCompleted});
          setIsCompleted(!isCompleted);
        }}>Complete</button>
        <button className='red' onClick={() => deleteTodoHandler(_id || '')}>Delete</button>
      </div>
    </div>
  )
}

export default TodoItem;
