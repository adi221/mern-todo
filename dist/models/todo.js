"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true }
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Todo', todoSchema);
//# sourceMappingURL=todo.js.map