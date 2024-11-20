import { useTasks } from '@/context/taskContext';
import { formatTime } from '@/providers/utilities';
import { item } from '@/utils/animations';
import { edit, star, trash } from '@/utils/icons';
import { Task } from '@/utils/types'
import { motion } from 'framer-motion';
import React from 'react'

interface TaskItemProps {
    task: Task;
}

function TaskItem( {task}: TaskItemProps) {

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "text-red-500";
            case "Medium":
                return "text-yellow-500";
            case "Low":
                return "text-green-500";
            default:
                return "text-purple-500";
        }
    }

    const {getTask, toggleModelForEdit,deleteTask,completeTask,modelMode} = useTasks();
  return (
    <motion.div className='h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white'
     variants = {item}
    >
        <div>
            <h4 className='text-2xl font-bold'>
                {task.title}
            </h4>
            <p>{task.description}</p>
        </div>
        <div className='mt-auto flex justify-between items-center'>
            <p className='text-sm text-gray-400'>{formatTime(task.createdAt)}</p>
            <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>{task.priority}

            </p>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 text-gray-400 text-[1.5rem]'>
                <button className={`${task.completed ? 'text-green-400' : 'text-gray-400'}`}
                    // when clicked it will make it a completed task
                    
                >{star}
                </button>
                <button className='text-[#00a1f1]'
                    onClick={() => {
                        getTask(task._id);
                        toggleModelForEdit(task)
                    }}
                >{edit}</button>
                <button className='text-[#f65314]'
                    onClick={() => deleteTask(task._id)}
                >{trash}</button>
                </div>
            </div>
        </div>
        
    </motion.div>
  )
}

export default TaskItem