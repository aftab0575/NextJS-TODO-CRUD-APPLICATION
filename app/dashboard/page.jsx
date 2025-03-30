"use client";
import React from 'react';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Fetch Tasks
  useEffect(() => {
    if (!session) router.push("/authForm");

    async function fetchTasks() {
      const res = await fetch("/api/todo");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    }
    fetchTasks();
  }, [session]);

  //Add task 
  const addTask = async () => {
    if (!task.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
  
    const res = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title: task }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (res.ok) {
      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]); // ✅ Update state correctly
      setTask("");
    } else {
      const errorData = await res.json();
      alert(errorData.error || "Failed to add task");
    }
  };
  
  //Delete task
  const deleteTask = async (id) => {
    await fetch(`/api/todo/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id)); // Remove from UI instantly
  };

  return session ? (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <input
        type="text"
        placeholder="New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 border rounded mt-4"
      />
      <button onClick={addTask} className="w-full bg-blue-600 text-white p-2 mt-2 rounded">
        Add Task
      </button>

      <ul className="mt-4">
        {tasks.map((t) => (
          <li key={t.id} className="flex justify-between items-center p-2 border-b">
            {t.title}
            <div>
              <a href={`/dashboard/edit/${t.id}`} className="text-green-600 mr-2">Edit</a>
              <button onClick={() => deleteTask(t.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={() => signOut()} className="w-full bg-gray-600 text-white p-2 mt-4 rounded">
        Sign Out
      </button>
    </div>
  ) : null;
}
