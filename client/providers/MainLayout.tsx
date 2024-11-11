import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}
function MainLayout({children}: MainLayoutProps) {
  return (
    <div className='main-layout flex flex-col bg-[#EDEDED] border-2 border-white rounded-[1.5rem] w-[calc(100%-20rem)] overflow-auto pr-[2rem]'>{children}</div>
  )
}

export default MainLayout