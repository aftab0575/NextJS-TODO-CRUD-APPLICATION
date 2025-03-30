"use client";
import React from "react";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTask() {
  const router = useRouter();
  const { id } = useParams();
  const [task, setTask] = useState("");

  const updateTask = async () => {
    await fetch(`/api/todo/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: task }),
      headers: { "Content-Type": "application/json" },
    });

    router.push("/dashboard"); // Redirect after update
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={updateTask} className="w-full bg-green-600 text-white p-2 mt-4 rounded">
        Update Task
      </button>
    </div>
  );
}
