import {Response,Request} from 'express';
import {ITodo} from '../../types/todo';
import Todo from '../../models/todo';

const getTodos = async(req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).send(todos)
  } catch (error) {
    res.status(401).json({success: false, message: 'Could not find todos'})
  }
}

const addTodo = async(req: Request, res: Response): Promise<void> => {
  try {
    // Pick constructs a type by picking the set of properties from the interface / type
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    const {name, description, status} = body;

    const todo: ITodo = new Todo({
      name,
      description,
      status
    });

    const newTodo: ITodo = await todo.save();

    res.json(newTodo);

  } catch (error) {
    res.status(401).json({success: false, message: 'Could not add new todo'})
  }
}

const updateTodo = async(req: Request, res: Response): Promise<void> => {
  try {
  
    const {id} = req.params;
    
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate({_id : id}, req.body);

    // if specific todo was found
    if(updatedTodo){
      res.status(201).json(updatedTodo);
    }else{
      res.status(401).json({success: false, message: 'Could not update todo'})
    }
  } catch (error) {
    res.status(401).json({success: false, message: 'Could not update todo'})
  }
}

const deleteTodo = async(req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(id);
    res.json({success: false, message: 'Deleted'})
  } catch (error) {
    res.status(401).json({success: false, message: 'Could not delete todo'})
  }
}

export {getTodos, addTodo, deleteTodo, updateTodo};