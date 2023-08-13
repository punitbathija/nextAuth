"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center align-middle items-center min-h-screen m-auto border-2 border-dotted">
      <h1 className="text-2xl my-4">Profile</h1>
      <button
        className="border-2 border-white p-2 hover:bg-white hover:scale-115 hover:text-black hover:border-2 hover:border-l-stone-400  hover:font-bold"
        onClick={onLogout}
      >
        Logout
      </button>
      <br />
    </div>
  );
};

export default page;
