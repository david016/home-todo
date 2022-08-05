import { model, Schema } from "mongoose";
import { TodoDocument } from "../types/todo.interface";
import validator from "validator";

const todoSchema = new Schema<TodoDocument>(
  {
    text: {
      type: String,
      required: [true, "todo is required"],
    },
    isCompleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default model<TodoDocument>("Todo", todoSchema);
