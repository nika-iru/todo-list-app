import express from "express";
const userRouter = express.Router();
import User from "../models/user.js";

userRouter.post("/users", async (req, res) => {
  const user = req.body;

  const result = await User.create(user);
  return res.status(201).json(result);
});

userRouter.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  let errorMessage = null;

  try {
    const user = await User.findById(id);
    if (user) {
      return res.json(user);
    }

    errorMessage = "User not found";
  } catch (error) {
    errorMessage = "User not found or invalid id.";
  }

  res.status(404).json({ error: errorMessage });
});

export default userRouter;