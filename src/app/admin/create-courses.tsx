"use client";
import { useState } from "react";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCourse = async () => {
    const response = await fetch("/api/post/admin/create-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, teacherId }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create a New Course</h2>
      <input type="text" placeholder="Course Title" onChange={(e) => setTitle(e.target.value)} className="input-style" />
      <textarea placeholder="Course Description" onChange={(e) => setDescription(e.target.value)} className="input-style"></textarea>
      <input type="text" placeholder="Teacher ID" onChange={(e) => setTeacherId(e.target.value)} className="input-style" />
      <button onClick={handleAddCourse} className="btn-primary">Add Course</button>
      {message && <p className="text-center mt-2">{message}</p>}
    </div>
  );
}