"use client";

import NavBar from "@/components/NavBar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SectionWrapper({ children }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex">
        <div className="min-h-screen bg-blue-500 flex flex-col justify-between">
          <NavBar />
          <div className="p-4 rounded-sm">
            <p className="text-base mb-2 text-white">{session.user?.email}</p>
            <button
              className="bg-red-500 text-white p-1 px-4 rounded-lg shadow-md"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex-grow p-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center justify-center">
      <button
        className="bg-white text-gray-700 p-4 rounded-lg font-bold"
        onClick={() => signIn("google")}
      >
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
}
