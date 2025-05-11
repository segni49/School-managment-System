"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages
    setLoading(true); // Show loading state

    // Ensure fields aren't empty
    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setError("Invalid email or password! Please try again.");
      setLoading(false);
      return;
    }

    setSuccess("Login successful! Redirecting...");
    setLoading(false);
    router.push(`/admin`); // Redirect on success
  };

  return (
    <div className="bg-gradient-to-r flex justify-center items-center min-h-screen from-blue-500 to-purple-50">
      <div className="flex drop-shadow-2xl flex-row rounded-3xl h-100 justify-center items-center">
        <div
          className="flex bg-[url('/image.png')] h-full rounded-l-3xl bg-cover bg-center bg-no-repeat flex-col w-1/2 justify-center items-center"
        >
          <h1 className="text-3xl font-bold text-shadow-amber-50">Welcome</h1>
          <p className="text-xl text-center italic p-2 mt-3">
            A Student Management System for Yetwlid Tesfa Primary and Secondary School.
          </p>
        </div>
        <form onSubmit={handleLogin} className="h-full w-1/2 flex rounded-r-3xl justify-between bg-white flex-col">
          <div className="flex flex-col px-3 gap-10 justify-center items-between">
            <h1 className="font-bold pt-5 text-2xl drop-shadow-2xl text-center">Sign In</h1>

            <div>
              <label className="block pl-5 text-gray-600 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block pl-5 text-gray-600 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="mt-2 text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="mt-6 w-full px-3 bg-blue-500 rounded-br-3xl text-white py-2 font-medium hover:bg-blue-600 transition-all"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}