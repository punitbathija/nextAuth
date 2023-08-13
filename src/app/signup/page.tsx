"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("user signed up" + res.data);
      router.push("login");
    } catch (error: any) {
      console.log("Sign up failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center align-middle items-center min-h-screen m-auto border-2 border-dotted">
      <h1 className="text-2xl my-4">{loading ? "Loading..." : "Sign Up!"}</h1>
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

      <label htmlFor="username">
        Username
        <br />
        <input
          type="username"
          placeholder="enter a valid username"
          className="outline-none text-black rounded-xl p-2"
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
        />
      </label>
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
        onClick={onSignup}
      >
        {buttonDisabled ? "Invalid" : "Sign Up"}
      </button>
      <br />
      <small>
        Registered? <Link href="/login">Login</Link>
      </small>
    </div>
  );
};

export default page;
