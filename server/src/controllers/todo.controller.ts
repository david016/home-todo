import { Request, Response } from "express";
import Todo from "../models/todo";
// import Todo from "../types/todo.interface";

export const addTodo = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const todo = new Todo({
      text: req.body.text,
      isCompleted: req.body.isCompleted,
    });
    todo.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    if (req.query.ids) {
      const todoIds: string = String(req.query.ids);
      const todos = await Todo.where("_id").in(todoIds.split(","));
      res.json(todos);
    } else {
      const todos = await Todo.find();
      res.json(todos);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
