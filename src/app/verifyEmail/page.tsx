"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function veifyEmail() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUser = async () => {
    try {
      await axios.post("api/users/verifyEmail", { token });
      setIsVerified(true);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUser();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Verify Token</h1>
      <p className="text-xl">
        {token ? `${token}` : "Please check your email to verify your account"}
      </p>
    </div>
  );
}
