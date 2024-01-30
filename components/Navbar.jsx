"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();
  return (
    <div className="flex justify-between items-center h-24">
      <Link href="/" className="font-bold text-2xl">
        Blog
      </Link>
      <div>
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {session.status === "authenticated" && (
            <li className="p-2 border-none bg-[#53c28b] text-white cursor-pointer rounded-sm">
              <button onClick={signOut}>Logout</button>
            </li>
          )}

          {/* {session?.status === "authenticated" ? (
            <li className="p-2 border-none bg-[#53c28b] text-white cursor-pointer rounded-sm">
              <button onClick={signOut}>Logout</button>
            </li>
          ) : (
            <li className="p-2 border-none bg-[#53c28b] text-white cursor-pointer rounded-sm">
              <button onClick={signIn("credentials")}>Logout</button>
            </li>
          )} */}
        </ul>
      </div>
    </div>
  );
}
