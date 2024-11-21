"use client"
import React, { useEffect } from "react";
import RegisterForm from "../Components/auth/RegisterForm/RegisterForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/router";


function page() {
  const { user }= useUserContext();
  const router = useRouter();
  useEffect(() => {
    // redirect to home page if user is already logged in
    if(user && user.Id) {
      router.push('/')
    }
  },[user, router]);

  // return nnull or a loading spinner
  if (user && user) {
    return null
  }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}

export default page;
