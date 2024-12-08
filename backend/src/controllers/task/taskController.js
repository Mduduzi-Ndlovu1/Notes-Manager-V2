import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

// Helper function to check authorization
const checkUserAuthorization = (task, userId) => {
    if (!task.userId.equals(userId)) {
        throw new Error("Not authorized to access this task");
    }
}

export const createTask = asyncHandler(async (req, res) => {
    try {
        const {title, description, dueDate, status, priority} = req.body;

        if(!title || title.trim() === "") {
            return res.status(400).json({message:"Title is required"});
        }
        if(!description || description.trim() === "") {
            return res.status(400).json({message:"Description is required"});
        }

        const task = new TaskModel({
            title, 
            description, 
            dueDate, 
            status, 
            priority,
            userId : req.user._id
        });

        await task.save();
        return res.status(201).json(task);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const getAllTasks = asyncHandler(async (req, res) => {
    try {
        // Check if user exists
        if (!req.user._id) {
            return res.status(404).json({message: "User not found"});
        }

        const tasks = await TaskModel.find({ userId: req.user._id });
        return res.status(200).json({
            length: tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const getTask = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        if(!id) {
            return res.status(400).json({message:"Id is required"});
        }

        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }

        checkUserAuthorization(task, userId);

        return res.status(200).json(task);

    } catch (error) {
        console.log("Error in getting task: ", error.message);
        res.status(500).json({ message: error.message });
    }
});

export const updateTask = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;
        const {title, description, dueDate, status, priority, completed} = req.body;

        if (!id) {
            return res.status(400).json({message: "Id is required"});
        }

        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }

        checkUserAuthorization(task, userId);

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;
        task.priority = priority || task.priority;
        task.completed = completed || task.completed;

        await task.save();
        return res.status(200).json(task);

    } catch (error) {
        console.log("Error in updating task: ", error.message);
        res.status(500).json({ message: error.message });
    }
});

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        if(!id) {
            return res.status(400).json({message: "Id is required"});
        }

        const task = await TaskModel.findById(id);
        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }

        checkUserAuthorization(task, userId);

        await TaskModel.findByIdAndDelete(id);
        return res.status(200).json({message: "Task deleted successfully"});

    } catch (error) {
        console.log("Error in deleting task: ", error.message);
        res.status(500).json({ message: error.message });
    }
});
