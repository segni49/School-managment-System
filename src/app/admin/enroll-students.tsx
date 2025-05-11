"use client";
import { useState } from "react";

export default function EnrollStudent() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");

  const handleEnrollment = async () => {
    const response = await fetch("/api/post/admin/enroll-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, courseId }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Enroll a Student</h2>
      <input type="text" placeholder="Student ID" onChange={(e) => setStudentId(e.target.value)} className="input-style" />
      <input type="text" placeholder="Course ID" onChange={(e) => setCourseId(e.target.value)} className="input-style" />
      <button onClick={handleEnrollment} className="btn-primary">Enroll Student</button>
      {message && <p className="text-center mt-2">{message}</p>}
    </div>
  );
}