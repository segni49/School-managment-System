"use client";
import { useState } from "react";
import AddCourse from "./create-courses";
import EnrollStudent from "./enroll-students";
import ManageUsers from "./manage-users";
import DashboardOverview from "./overview";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Dashboard Header */}
      <h1 className="text-4xl font-extrabold text-blue-700">Admin Dashboard</h1>

      {/* Control Buttons */}
      <div className="flex gap-6 mt-6">
        <button onClick={() => setActiveSection("overview")} className="btn-secondary">
          Overview
        </button>
        <button onClick={() => setActiveSection("addCourse")} className="btn-primary">
          Manage Courses
        </button>
        <button onClick={() => setActiveSection("enrollStudent")} className="btn-primary">
          Enroll Students
        </button>
        <button onClick={() => setActiveSection("manageUsers")} className="btn-primary">
          Manage Users
        </button>
      </div>

      {/* Render Sections Dynamically */}
      <div className="mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {activeSection === "overview" && <DashboardOverview />}
        {activeSection === "addCourse" && <AddCourse />}
        {activeSection === "enrollStudent" && <EnrollStudent />}
        {activeSection === "manageUsers" && <ManageUsers />}
      </div>
    </div>
  );
}