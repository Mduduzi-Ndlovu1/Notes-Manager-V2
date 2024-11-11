"use client"

import { useTasks } from '@/context/taskContext'
import useDetectOutside from '@/hooks/useDetectOutside';
import React, { useEffect } from 'react'

function Model() {

    const {task, handleInput, createTask,isEditing,closeModal} = useTasks();

    const ref = React.useRef(null);

    useDetectOutside({ref, callback: () => {
        if(isEditing) {
            closeModal();
        }
    }})
    // 4:00:09

    useEffect(() => {}, []);

    const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTask(task);
    }
  return (
    <div className='fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden'>
        <form action="" className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md'
        onSubmit={handleSumit}
        ref={ref}
        >
            <div className='flex flex-col gap-2'>
                <label htmlFor="title">Title</label>
                <input
                    className='bg-[#f9f9f9] p-2 rounded-md border' 
                    type="text" 
                    id='title'
                    placeholder='Task Title'
                    name='title'
                    value={task.title}
                    onChange={(e) => handleInput("title")(e)}
                /> 
            </div>
            {/* description */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="description">Description</label>
                <textarea
                    className='bg-[#f9f9f9] p-2 rounded-md border resize-none' 
                    placeholder='Task Desciption'
                    rows={4}
                    name='description'
                    value={task.description}
                    onChange={(e) => handleInput("description")(e)}
                /> 
            </div>
            {/* Priority */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="priority">Priority</label>
                <select
                    className='bg-[#f9f9f9] p-2 rounded-md border cursor-pointer' 
                    name='priority'
                    value={task.priority}
                    onChange={(e) => handleInput("priority")(e)}
                > 
                <option value="low">Low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                </select>
            </div>
            {/* Due Date */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="dueDate">Due Date</label>
                <input
                    className='bg-[#f9f9f9] p-2 rounded-md border' 
                    type="date"
                    name='dueDate'
                    value={task.dueDate}
                    onChange={(e) => handleInput("dueDate")(e)}
                /> 
            </div>

            {/* Task Completed */}
            <div className='flex flex-col gap-1'>
                <label htmlFor="completed">Task Completed</label>
                <div className='flex items-center justify-between bg-[#f9f9f9] p-2 rounded-md border'>
                    <label htmlFor="completed">Completed</label>
                    <div>
                        <select
                        className='bg-[#f9f9f9] p-2 rounded-md border cursor-pointer' 
                        name="completed"
                        value={task.completed ? "true" : "false"}
                        onChange={(e) => handleInput("completed")(e)} 
                        id="">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                </div>
            </div>
            {/* Shows create task button or Edit task button */}
            <div className='mt-8'>
                <button type='submit'>
                    Create Task    
                </button> 
            </div>
        </form>
    </div>
  )
}

export default Model