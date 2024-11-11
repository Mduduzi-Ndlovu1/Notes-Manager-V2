"use client"

import { useTasks } from '@/context/taskContext'
import React from 'react'

function Model() {

    const {task} = useTasks();
  return (
    <div className='fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden'>
        <form action="" className='py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="title">Title</label>
                <input
                    className='bg-[#f9f9f9] p-2 rounded-md border' 
                    type="text" 
                    id='title'
                    placeholder='Task Title'
                    name='title'
                    value={task.title}
                
                /> 
            </div>
        </form>
    </div>
  )
}

export default Model