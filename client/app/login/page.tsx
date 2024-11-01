"use client"
import React, { useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function page() {
  const {user} = useUserContext();

  
    const userId = user?._id ;
  
  const router = useRouter()

  useEffect(() => {
    // redirect to home page if user is already logged in
    if(user && userId) {
      router.push('/')
    }
  },[user, router]);

  // return nnull or a loading spinner
  if (user && user) {
    return null
  }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default page;
