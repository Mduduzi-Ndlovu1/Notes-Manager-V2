import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
    try {
        const {title, description, dueDate, status, priority} = req.body;

        if(!title || title.trim() === "") {
            return res.status(400).json({message:"Title is required"});
        }
        if(!description || description.trim() === "") {
            return res.status(400).json({message:"Description is required"});
        }
        
        //Remember Other properties have defaults so really its okay XD

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
    res.status(201).json(task);
})

export const getAllTasks = asyncHandler(async (req, res) => {
    try {
        //Check if user exists
        if(!req.user._id) {
            return res.status(404).json({message:"User not found"});
        }
        const tasks = await TaskModel.find({userId : req.user._id});
        return res.status(200).json({
            length : tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// get a single task

export const getTask = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        // Check if Task ID is proved
        if(!id) {
            return res.status(400).json({message:"Id is required"});
        }

        //Fetch Task by ID

        const task = await TaskModel.findById(id);
        if(!task) {
            return res.status(404).json({message:"Task not found"});
        }

        // Check if the logged-in user is authorized to access the task

        if (!task.userId.equals(userId)) {
            return res.status(403).json({message:"Not authorized to view this task"});
        }

        // Return the task
        return res.status(200).json(task);
    } catch (error) {
        console.log("Error in getting task: ", error.message);
        res.status(500).json({ message: error.message });
    }
})  

export const updateTask = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        const {title, description, dueDate, status, priority,completed} = req.body;

        // Check if Task ID is proved
        if(!id) {
            return res.status(400).json({message:"Id is required"});
        }

        //Fetch Task by ID

        const task = await TaskModel.findById(id);
        if(!task) {
            return res.status(404).json({message:"Task not found"});
        }

        // Check if the logged-in user is authorized to access the task

        if (!task.userId.equals(userId)) {
            return res.status(403).json({message:"Not authorized to view this task"});
        }

        // Update the task

        task.title = title || task.title;
        task.description = description || task.description;;
        task.dueDate = dueDate || task.dueDate;;
        task.status = status || task.status;;
        task.priority = priority || task.priority;;
        task.completed = completed || task.completed;;

        await task.save();
        return res.status(200).json(task);

    } catch (error) {
        console.log("Error in updating task: ", error.message);
        res.status(500).json({ message: error.message });
    }
});

// delete a task

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        // Check if Task ID is proved
        if(!id) {
            return res.status(400).json({message:"Id is required"});
        }

        //Fetch Task by ID

        const task = await TaskModel.findById(id);
        if(!task) {
            return res.status(404).json({message:"Task not found"});
        }

        // Check if the logged-in user is authorized to access the task

        if (!task.userId.equals(userId)) {
            return res.status(403).json({message:"Not authorized to view this task"});
        }

        // Delete the task

        await TaskModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Task deleted successfully"});

    } catch (error) {
        console.log("Error in deleting task: ", error.message);
        res.status(500).json({ message: error.message });
    }
});
