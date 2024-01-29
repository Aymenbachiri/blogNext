"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      res.status === 201 && router.push("/dashboard/login");
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <h2 className="text-2xl font-semibold">
          Please sign up to see the dashboard.
        </h2>
        <form onSubmit={handleSubmit} className="w-[300px] flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            required
            className="p-4 bg-transparent border border-[#bbb] text-[#bbb] rounded-md text-xl font-bold"
          />
          <input
            type="text"
            placeholder="Email"
            required
            className="p-4 bg-transparent border border-[#bbb] text-[#bbb] rounded-md text-xl font-bold"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-4 bg-transparent border border-[#bbb] text-[#bbb] rounded-md text-xl font-bold"
          />
          <button
            type="submit"
            className="w-[300px] p-4 bg-[#53c28b] font-bold"
          >
            Register
          </button>

          <h1>{err && "failed to register"} </h1>
        </form>
        <span classNa>- OR -</span>
        <h1>
          Already Have Account
          <Link className="underline ml-4" href="/dashboard/login">
            Login
          </Link>
        </h1>
      </div>
    </>
  );
}
