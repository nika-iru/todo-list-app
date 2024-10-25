import express from "express";
import connect from "./database/mongodb-connect.js"

import todosRouter from "./routes/todos.js";
import usersRouter from "./routes/users.js";

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.send("Hello Todo App!!!");
});

app.use("/api", todosRouter)
app.use("/api", usersRouter)

connect();

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});