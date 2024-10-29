import express from "express";
import connect from "./database/mongodb-connect.js";
import path from "path";
import todosRouter from "./routes/todos.js";
import usersRouter from "./routes/users.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/js", express.static(path.resolve(__dirname, "routes"))); // Serve spa.js from /js
app.use(express.static(path.resolve(__dirname, "../frontend")));    // Serve frontend files

app.use(express.static("public"));

/* app.get("/", (req,res) => {
    res.send("Hello Todo App!!!");
});
*/

app.use("/api", todosRouter)
app.use("/api", usersRouter)

connect();

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
  });

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});