"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Use NEXT_PUBLIC_HOST for API calls
  const API_URL = process.env.NEXT_PUBLIC_HOST || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      // Register User
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setIsRegister(false); // Switch to Sign In after successful registration
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Registration failed!");
      }
    } else {
      // Sign In User
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res.error) {
        router.push("/dashboard");
      } else {
        alert("Invalid credentials!");
      }
    }
  };

 
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? "Register" : "Sign In"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-4">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-600 underline"
        >
          {isRegister ? "Sign In" : "Register"}
        </button>
      </p>
    </div>
  );
}
