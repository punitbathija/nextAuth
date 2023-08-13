"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
    } catch (error: any) {
      console.log("Login Failed", error.message);
    } finally {
      setLoading(false);
      router.push("/profile");
    }
    console.log("User logged in");
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="">
      <div className="flex flex-col justify-center align-middle items-center min-h-screen m-auto border-2 border-dotted">
        <h1 className="text-2xl my-4">{loading ? "Loading..." : "Log in!"}</h1>
        <label htmlFor="email">
          Email
          <br />
          <input
            type="email"
            placeholder="enter a valid email address"
            className="outline-none text-black rounded-xl p-2"
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
        </label>
        <br />
        <br />
        <label htmlFor="password">
          Password
          <br />
          <input
            type="password"
            placeholder="enter a valid password"
            className="outline-none text-black rounded-xl p-2"
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </label>
        <br />
        <button
          className="border-2 border-white p-2 hover:bg-white hover:scale-115 hover:text-black hover:border-2 hover:border-l-stone-400  hover:font-bold"
          onClick={onLogin}
        >
          {buttonDisabled ? "Invalid Details" : "Log in"}
        </button>
        <br />
        <small>
          Not registered? <Link href="/signup">Register</Link>
        </small>
      </div>
    </div>
  );
};

export default page;
