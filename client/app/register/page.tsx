"use client"
import React, { useEffect } from "react";
import RegisterForm from "../Components/auth/RegisterForm/RegisterForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";


function page() {
  const { user }= useUserContext();
  const router = useRouter();
  const userId = user?._id ;

  useEffect(() => {
    // redirect to home page if user is already logged in
    if(user && user.Id) {
      router.push('/')
    }
  },[user, router]);

  // return nnull or a loading spinner
  if (user && user._id) {
    return null
  }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}

export default page;
