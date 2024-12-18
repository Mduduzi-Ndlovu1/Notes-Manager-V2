import React from 'react'
import Profile from '../Profile/Profile'
import RadioChart from '../RadioChart/RadioChart'
import { useUserContext } from '@/context/userContext';

function Sidebar() {
  const {logoutUser} = useUserContext();
  return (
    <div className='w-[20rem] mt-[5rem] h-[calc(100%-5rem)]  fixed right-0 top-0 bg-[#f9f9f9] flex flex-col'>
      <Profile />

      <div className='mt-4 mx-6'>
        <RadioChart/>
      </div>

      <button className='mt-auto mb-6 py-6 px-8 mx-6 bg-[#EB4e31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out '
      onClick={() => {
        logoutUser();
        // refer back to log in page
        window.location.href = '/login';
      }}>
        Sign Out
      </button>
    </div>
  )
}

export default Sidebar