import React, {useState} from 'react'

interface AddTodoProps{
  addTodoHandler: (e: React.FormEvent ,name: string, description: string) => void;
}

const AddTodo:React.FC<AddTodoProps> = ({addTodoHandler}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <form className="todo-container__add" onSubmit={(e) => addTodoHandler(e, name, description)}>
      <div className="todo-container__add--inputs">
        <div className="todo-container__add--form-control">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" value={name} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
        </div>
        <div className="todo-container__add--form-control">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Description" value={description} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}/>
        </div>
      </div>
      <button className="todo-container__add--btn">Add Todo</button>
    </form>
  )
}

export default AddTodo;
