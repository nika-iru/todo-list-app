import express from "express";
const todosRouter = express.Router();
import Todo from "../models/todos.js";


todosRouter.get("/todos/:userId", async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.query.id;

  let errorMessage = null;

    try {
        if (todoId) {
            const todo = await Todo.findOne({ user: userId, _id: todoId });
            if (todo) {
                return res.json(todo);
            }
            errorMessage = "Todo not found";
        } else {
            const todos = await Todo.find({user: userId});
            return res.json(todos);
        }
    } catch (error) {
        errorMessage = "Todo not found or invalid id.";
    }

  res.status(404).json({ error: errorMessage });
});

todosRouter.post("/todos/:userId", async (req, res) => {
    const userId = req.params.userId;
    const todoData = req.body;

    const newTodo = new Todo({
        user: userId,
        ...todoData
    });

    const result = await Todo.create(newTodo);
    return res.status(201).json(result);
});

todosRouter.put("/todos/:userId/:todoId", async (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const todo = req.body;


    const update = await Todo.findOneAndUpdate({ user: userId, _id: todoId }, todo, { new: true });
    return res.status(200).json(update);
});

todosRouter.delete("/todos/:todoId", async (req, res) => {
    const todoId = req.params.id

    try {
        const deletedTodo = await Todo.deleteOne(todoId);
        if (deletedTodo.deletedCount === 0) {
            return res.status(404).send("Todo not found")
        }
        res.status(200).send("Todo has been deleted.")
    } catch (error) {
        res.status(404).send("Todo not found or invalid id.")
    }
});

export default todosRouter;