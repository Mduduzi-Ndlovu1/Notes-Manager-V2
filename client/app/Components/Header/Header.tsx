'use client'

import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext'
import { star,profile, moon } from '@/utils/icons';

import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';

const Header = () => {

  const {user} = useUserContext();
  const {activeTasks, toggleModelForAdd} = useTasks()

  const { name} = user;
  const userId = user._id

  return (
    <header className='px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]'>
      <div>
        <h1 className='text-lg font-medium'>
         <span role='img' aria-label='wave'>👋</span>
          {userId ? `Welcome, ${name}` : 'Welcome to Task Manager V2'}
        </h1>
        <p className='text-sm'>
          {userId ? (
            <>
            You have <span className='font-bold text-[#3aafae]'>{activeTasks.length}</span> tasks pending
            </>
          ): (
            "Please Login or Register to view Tasks"
          )}
        </p>
      </div>
      <div className='h-[50px] flex items-center gap-[10.4rem]'>
          <button className='px-8 py-3 bg-[#3aafae] text-white font-bold rounded-[50px]
          hover:bg-[#00a1f1] hover:text-white transition-all duration-200 ease-in-out'
          onClick={() => {
            if(userId){
              toggleModelForAdd()
            } else {
              // delay for 2 seconds
              toast.error("You must be logged in to add a task");
              setTimeout(() => {
                toast.error("You must be logged in to add a task");
              }, 2000);
              
              window.location.href = '/login'
            }
          }}
          >
            {userId ? 'Add A Task' : 'Login / Register'}
          </button>

          <div className='flex items-center gap-4'>
            <Link
              href=""
              passHref
              target='_blank'
              rel = "noopener noreferrer"
              className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
            >
            {star}
            </Link>
            <Link
              href=""
              passHref
              target='_blank'
              rel = "noopener noreferrer"
              className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
            >
            {moon}
            </Link>
            <Link
              href=""
              passHref
              target='_blank'
              rel = "noopener noreferrer"
              className='h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]'
            >
            {profile}
            </Link>
          </div>
      </div>
    </header>
  )
}

export default Header