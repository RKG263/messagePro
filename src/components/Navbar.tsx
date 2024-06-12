'use client'
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md backdrop-blur-md bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <Link href="/" className="text-3xl font-bold mb-4 md:mb-0 hover:text-yellow-300 transition duration-300">
      YapNap
    </Link>
    <div className="flex items-center ml-auto"> {/* Use ml-auto here */}
      {session ? (
        <>
          <span className="mr-4">Welcome, {user.username || user.email}</span>
          <Link href="/dashboard">
        <Button
          className="w-full mx-4 md:w-auto bg-white text-black hover:bg-gray-300"
          variant="outline"
        >
          Dashboard
        </Button>
      </Link>
          <Button
            onClick={() => signOut()}
            className="w-full md:w-auto bg-white text-black hover:bg-gray-300"
            variant="outline"
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/sign-in">
          <Button
            className="w-full md:w-auto bg-white text-black hover:bg-gray-300"
            variant="outline"
          >
            Login
          </Button>
        </Link>
      )}
      <Link href="/all-users">
        <Button
          className="w-full mx-4 md:w-auto bg-white text-black hover:bg-gray-300"
          variant="outline"
        >
          Allusers
        </Button>
      </Link>
    </div>
  </div>
</nav>

  );
}

export default Navbar;
