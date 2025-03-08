"use client"; 

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-xl font-bold">UNI-FRIEND SYNC</h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Map
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
            <li>
              <Link href = "/interest" className = "hover:underline">
                Interest
              </Link>
            </li>
            <li>
              <Link href="/setting" className="hover:underline">
                Setting
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}