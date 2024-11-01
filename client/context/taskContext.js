import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './userContext';
import axios from 'axios';
import { description } from '@/app/Components/RadioChart/RadioChart';


const TasksContext = createContext();

export const TasksProvider = ({ children}) => {

    const {user} = useUserContext();

  
    const userId = user?._id || '';
    


    
    const [ tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState({});

    const [priority, setPriority] = useState("all");
    
    

    // now we fetch the data

    const serverUrl = "http://localhost:8000/api/v1";

    // get individual task
    const getTask = async (taskId) => {
        console.log(taskId)
        if(!taskId){
            console.log("No task id provided");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/task/${taskId}`);
            setTask(res.data);
            
        } catch (error) {
            console.log("Error getting tasks", error);
        }
        setLoading(false)
    }

    
    // get tasks
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.log("Error getting tasks", error);
        }
        setLoading(false)
    }

    // create task
    const createTask = async (task) => {
        setLoading(true);
        try {
            const response = await axios.post(`${serverUrl}/task/create`, task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.log("Error creating task", error);
        }
        setLoading(false)
    }

    // update Tasks

    const updateTask = async (task) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${serverUrl}/task/${task._id}`, task);

            const updatedTasks = tasks.map((t) => (t.id === response.data._id ? response.data : t));
            setTasks(updatedTasks);
        } catch (error) {
            console.log("Error updating task", error);
        }
        setLoading(false)
    }

    // delete tasks

    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`);
            const updatedTasks = tasks.filter((t) => t._id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.log("Error deleting task", error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getTasks();
        
        
    }, [userId])
    return (
        <TasksContext.Provider value={{
            tasks,
            loading,
            task,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority
        }}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasks = () => {
    return useContext(TasksContext);
};