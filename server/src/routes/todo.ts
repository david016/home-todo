import { Router } from "express";
import * as todoController from "../controllers/todo.controller";

export const router: Router = Router();

router.get("/todos", todoController.getTodos);
router.post("/addTodo", todoController.addTodo);
