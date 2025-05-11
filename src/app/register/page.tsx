"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Show loading state

    try {
      const response = await axios.post("/api/register", { email, password});

      console.log("API Response:", response.data); // Debugging log

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setError("");
        setTimeout(() => router.push("/login"), 2000); // Redirect after success
      } else {
        setError(response.data.error || "Registration failed!");
      }
    } catch (err) {
         if(err instanceof Error) {
          console.error("Registration Error:", err); // Debugging
      setError("Registration failed!");
    } } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Register</h2>

        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="mt-2 text-green-500 text-sm text-center">{success}</p>}

        <form onSubmit={handleRegister} className="mt-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
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
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

      

          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition-all"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}