import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//task creation
router.post("/task/create", protect, createTask);

//get all tasks
router.get("/tasks", protect, getAllTasks);

//get singel Task
router.get("/task/:id", protect, getTask);

//Update a task 
router.patch("/task/:id", protect, updateTask);

//delete a task
router.delete("/task/:id", protect, deleteTask);

export default router;