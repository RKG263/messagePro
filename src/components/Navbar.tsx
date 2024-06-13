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
    <nav className="p-4 md:p-6 shadow-md backdrop-blur-md bg-black text-white">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <Link href="/" className="text-3xl text-default font-bold mb-4 md:mb-0 hover:text-yellow-300 transition duration-300">
      YapNap
    </Link>
    <div className="flex items-center ml-auto"> {/* Use ml-auto here */}
      {session ? (
        <>
          <span className="mr-4 text-default"><h2>Welcome, {user.username || user.email}</h2></span>
          <Link href="/dashboard">
        <Button
          className="w-full mx-3 md:w-auto bg-black text-white hover:bg-orange-500"
          variant="outline"
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/get-link-messages">
        <Button
          className="w-full mx-4 md:w-auto bg-black text-white hover:bg-orange-500"
          variant="outline"
        >
         Linking
        </Button>
      </Link>
          <Button
            onClick={() => signOut()}
            className="w-full md:w-auto bg-black text-white hover:bg-orange-500"
            variant="outline"
          >
            Logout
          </Button>
        </>
      ) : (
        <Link href="/sign-in">
          <Button
            className="w-full md:w-auto bg-black text-white hover:bg-orange-500"
            variant="outline"
          >
            Login
          </Button>
        </Link>
      )}
      <Link href="/all-users">
        <Button
          className="w-full mx-4 md:w-auto bg-black text-white hover:bg-orange-700"
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
