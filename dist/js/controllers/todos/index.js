var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo from '../../models/todo';
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find();
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Could not find todos' });
    }
});
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Pick constructs a type by picking the set of properties from the interface / type
        const body = req.body;
        const todo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        });
        const newTodo = yield todo.save();
        res.json(newTodo);
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Could not add new todo' });
    }
});
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedTodo = yield Todo.findByIdAndUpdate({ _id: id }, req.body);
        // if specific todo was found
        if (updatedTodo) {
            res.status(201).json(updatedTodo);
        }
        else {
            res.status(401).json({ success: false, message: 'Could not update todo' });
        }
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Could not update todo' });
    }
});
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield Todo.findByIdAndRemove(id);
        res.json(200).json({ success: true, message: 'Todo was deleted' });
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Could not delete todo' });
    }
});
export { getTodos, addTodo, deleteTodo, updateTodo };
