"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos_1 = require("../controllers/todos");
var router = express_1.Router();
router.get("/todos", todos_1.getTodos);
router.post("/add-todo", todos_1.addTodo);
router.put("/edit-todo/:id", todos_1.updateTodo);
router.delete("/delete-todo/:id", todos_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=index.js.map