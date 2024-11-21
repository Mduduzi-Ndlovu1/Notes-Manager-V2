"use client";

import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import useDetectOutside from '@/hooks/useDetectOutside';
import { mail } from '@/utils/icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

function ProfileModal() {
  const ref = useRef(null);

  // Context hooks
  const { closeModal, } = useTasks();
  const { user ,handlerUserInput, updateUser,userState, changePassword} = useUserContext();

  // Detect click outside modal to close
  useDetectOutside({ ref, callback: closeModal });

  // Destructure user details with fallbacks
  const { name = "Guest User", email = "Not Provided", photo = "/default-profile.png" } = user || {};

  //state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePassword = (type: string) =>  (e: any) => {
    if (type === "old") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 h-full w-full bg-black/30 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={ref}
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-4 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
      >
        {/* Header Section */}
        <div className="relative w-full h-[100px] bg-gray-100 rounded-t-lg flex items-center justify-center">
          <div className="relative">
            <Image
              src={photo}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full border border-gray-300"
            />
            <div className="absolute bottom-0 right-0 bg-blue-400 text-white text-sm px-2 py-1 rounded-full shadow-md">
              Verified
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className=" ">
          <h1 className="text-xl font-bold ">{name}</h1>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        {/* user change information section */}

        <form action="" 
        className='mt-4 pt-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10'
        onSubmit={(e) => {
          e.preventDefault();
          updateUser(e, {
            name: userState.name,
            email: userState.email
          });
        }}
        >
          <div className='pt-2 grid grid-cols-[150px_1fr]'>
            <label htmlFor="name" className='text-sm font-medium'>
              Full Name
            </label>
            <input 
              type="text" 
              id='name'
              name='name'
              defaultValue={name}
              onChange={(e) => handlerUserInput("name")(e)}
              className='py-[0.4rem] px-3 font-medium border-2 border-[#323232]/20 bg-[#323232]/5 outline-none focus:border-[#2ECC71] rounded-lg text-sm text-center'
              />
          </div>
          <div className='pt-2 grid grid-cols-[150px_1fr] border-t-2 border-t-[#323232]/10'>
            <label htmlFor="name" className='text-sm font-medium'>
              Email Address
            </label>
            <div>
              <input 
                type="text" 
                id='email'
                name='email'
                defaultValue={email}
                onChange={(e) => handlerUserInput("email")(e)}
                className='w-full py-[0.4rem] pl-9 pr-2 font-medium rounded-lg border-2 border-[#323232]/20 bg-[#323232]/5 outline-none focus:border-[#2ECC71] text-sm text-center'
                />
                <span className='absolute left-0 top-0 bottom-0 flex items-center px-3 text-[#323232]/10'></span>

            </div>
          </div>
          <div className='pt-4 grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="oldPasWord" className='text-sm font-medium'>
                Old Password
              </label>
              <input 
                type="password" 
                id='oldPassword'
                value={oldPassword}
                onChange={handlePassword("old")}
                className='py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/20 bg-[#323232]/5 outline-none focus:border-[#2ECC71] text-sm text-center'
                />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="newPassword" className='text-sm font-medium'>
                New Password
              </label>
              <input 
                type="password" 
                id='newPassword'
                value={newPassword}
                onChange={handlePassword("new")}
                className='py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/20 bg-[#323232]/5 outline-none focus:border-[#2ECC71] text-sm text-center'
                />
            </div>
            
          </div>
          <div className=' flex justify-end'>
              <button type='button' className='py-3 px-4 bg-blue-500 text-white text-sm font-medium rounded-md
                hover:bg-blue-400 transition-all duration-300
              '
              onClick={() => changePassword(oldPassword, newPassword)}
              >
                Change Password
              </button>
            </div>

            <div className='flex justify-end gap-4 border-t-2 border-t-[#323232]/10'>
              <button className='mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300
              '> Cancel </button>

              <button type='submit'
                className='mt-3 py-2 px-4 bg-[#3aafae] text-white text-sm font-medium rounded-md hover:bg-[#2e8d8c]/90 transition-all duration-300'
              >
                Save Changes
              </button>
            </div>
        </form>

        
      </div>
    </div>
  );
}

export default ProfileModal;
