import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const LandingPage: React.FC = () => (
  <div className="landing-page min-h-screen flex flex-col items-center bg-[#FFC9B3] text-[#171717]">
    <header className="w-full p-4 flex justify-between items-center">
      <h2 className="text-3xl font-bold">UNI-FriendSync</h2>
      <nav className="flex gap-4">
        <a href="main.html" className="hover:underline">Main</a>
        <a href="about.html" className="hover:underline">About</a>
        <a href="browse.html" className="hover:underline">Browse</a>
        <a href="join.html" className="hover:underline">Join</a>
      </nav>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold mb-2">Welcome to UNI-FriendSync</h1>
      <p className="text-xl mt-4">Connecting LSU Students</p>
      <h2 className="text-2xl mb-4">Interest Based Connections</h2>
      <p className="text-lg mb-6">Find friends on campus and try new activities together.</p>
      <a href="login.html">
        <Button className="bg-[#8359E3] text-white hover:bg-[#6b45c8]">Login</Button>
      </a>
    </main>

    <footer className="w-full text-center py-4 text-sm opacity-75">
      &copy; 2025 UNI-FriendSync | Connecting LSU Students
    </footer>
  </div>
);

export default LandingPage;
