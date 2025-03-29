"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Show a welcome message for unauthenticated users
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl text-blue-600 font-bold mb-4">
          Welcome to the To-Do App
        </h1>
        <p className="text-gray-600 mb-6">
          Please sign in to manage your tasks.
        </p>
        <div className="flex flex-col space-y-4">
          <a
            href="/authForm"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
