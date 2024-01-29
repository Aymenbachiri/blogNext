"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const session = useSession();

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }
  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn("credentials", { email, password });
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[300px] flex flex-col gap-5">
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
          onClick={() => signIn("credentials")}
          className="w-[300px] p-4 bg-[#53c28b] font-bold"
        >
          Login
        </button>
        <h1>
          Don&apos;t Have Account,{" "}
          <Link className="underline" href="/dashboard/register">
            Register
          </Link>
        </h1>
      </form>
    </div>
  );
}
