import React from 'react'

interface AddTodoProps{
  readonly addTodoHandler: (e: React.FormEvent ,name: string, description: string) => void;
  readonly name: string;
  readonly onNameChange: (val: string) => void;
  readonly description: string;
  readonly onDescChange: (val: string) => void;
  readonly isEdittingMode: boolean;
}

const AddTodo:React.FC<AddTodoProps> = ({addTodoHandler, name, onNameChange, description, onDescChange, isEdittingMode}) => {
  return (
    <form className="todo-container__add" onSubmit={(e) => addTodoHandler(e, name, description)}>
      <div className="todo-container__add--inputs">
        <div className="todo-container__add--form-control">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" value={name} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onNameChange(e.target.value)}/>
        </div>
        <div className="todo-container__add--form-control">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Description" value={description} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDescChange(e.target.value)}/>
        </div>
      </div>
      <button className="todo-container__add--btn">{isEdittingMode ? 'Edit Todo' : 'Add Todo'}</button>
    </form>
  )
}

export default AddTodo;
