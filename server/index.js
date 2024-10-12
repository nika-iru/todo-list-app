import express from "express";
import todosRouter from "./routes/todos.js";

const app = express();
const port = 3000;

app.get("/", (req,res) => {
    res.send("Hello Todo App!!!");
});

app.use("/api", todosRouter)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});