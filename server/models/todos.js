import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,   

        ref: 'User', // Reference to the User model
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
  
});

const Todo = model("Todo", todoSchema);

export default Todo;