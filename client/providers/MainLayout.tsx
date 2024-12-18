"use client"
import Model from '@/app/Components/Model/Model'
import ProfileModel from '@/app/Components/Profile/ProfileModel'
import { useTasks } from '@/context/taskContext'
import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}
function MainLayout({children}: MainLayoutProps) {
  const {isEditing, profileModel} = useTasks();
  return (
    <div className='main-layout flex flex-col bg-[#EDEDED] border-2 border-white rounded-[1.5rem] w-[calc(100%-20rem)] overflow-auto pr-[2rem]'>
      {isEditing && <Model/>}
      {profileModel && <ProfileModel/>}
      {children}
    </div>
  )
}

export default MainLayout