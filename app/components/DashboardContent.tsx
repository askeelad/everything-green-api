"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardContent({
  session,
  users,
}: {
  session: any;
  users: Array<{ id: string; name: string; email: string; password: string }>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      setMessage("User created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => setIsModalOpen(false), 1000);
    } else {
      setMessage("Failed to create user.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Welcome, {session.user?.name || "User"} 🎉
      </h1>
      <p className="text-gray-600 text-center mt-2">Manage Users</p>

      {/* User List */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center">All Users</h2>
        <ul className="mt-4 bg-gray-50 p-4 rounded-lg shadow-inner">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="text-gray-700 border-b py-2">
                <span className="font-semibold">{user.name}</span> -{" "}
                {user.email}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No users found</p>
          )}
        </ul>
      </div>

      {/* Open Create User Modal */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          + Add New User
        </button>
      </div>

      {/* Logout Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* User Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New User</h2>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
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
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create User"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
