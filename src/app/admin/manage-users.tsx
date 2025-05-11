"use client";
import { useState } from "react";

export default function ManageUsers() {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState("");

  const handlePromotion = async () => {
    const response = await fetch("/api/post/admin/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUserId, newRole }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage User Roles</h2>
      <input type="text" placeholder="User ID" onChange={(e) => setSelectedUserId(e.target.value)} className="input-style" />
      <label htmlFor="role-select" className="sr-only">Select Role</label>
      <select id="role-select" onChange={(e) => setNewRole(e.target.value)} className="input-style">
        <option value="ADMIN">Admin</option>
        <option value="TEACHER">Teacher</option>
        <option value="STUDENT">Student</option>
      </select>
      <button onClick={handlePromotion} className="btn-primary">Update Role</button>
      {message && <p className="text-center mt-2">{message}</p>}
    </div>
  );
}