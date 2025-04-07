"use client";
import { useAuth } from "../context/auth-context";

export default function UserCard() {
  const { user, logOut } = useAuth();

  if (!user) {
    return <p>Please sign in to view your details.</p>;
  }

  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {user?.displayName || user?.email}
        </h2>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </div>
      <div className="px-6 py-4">
        <button 
          onClick={logOut}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}