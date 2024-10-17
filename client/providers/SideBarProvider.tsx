"use client"
import Sidebar from '@/app/Components/Sidebar/Sidebar'
import { useUserContext } from '@/context/userContext'
import React from 'react'

function SideBarProvider() {
  const userId = useUserContext().user._id
  return (
    <>
      {userId && <Sidebar/>}
    </>
  )
}

export default SideBarProvider