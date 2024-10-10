import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        default: "No Description",
    },

    dueDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started",
    },

    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
    },

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;