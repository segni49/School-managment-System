"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {session.user.role === "ADMIN" && <h1 className="text-2xl font-bold">Admin Dashboard</h1>}
      {session.user.role === "TEACHER" && <h1 className="text-2xl font-bold">Teacher Dashboard</h1>}
      {session.user.role === "STUDENT" && <h1 className="text-2xl font-bold">Student Dashboard</h1>}
    
    </div>
  );
}
