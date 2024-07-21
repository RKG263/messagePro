'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 md:p-6 shadow-md backdrop-blur-md bg-black text-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl text-default font-bold hover:text-yellow-300 transition duration-300">
          YapNap
        </Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu className="w-8 h-8 text-white" />
        </button>
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-default"><h2>Welcome, {user.username || user.email}</h2></span>
              <Link href="/dashboard">
                <Button
                  className="bg-black border-2 border-default text-white hover:bg-orange-500"
                  variant="outline"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/get-link-messages">
                <Button
                  className="border-2 border-default bg-black text-white hover:bg-orange-500"
                  variant="outline"
                >
                  Linking
                </Button>
              </Link>
              <Button
                onClick={() => signOut()}
                className="border-2 border-default bg-black text-white hover:bg-default"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="border-2 border-default bg-black text-white hover:bg-default"
                variant="outline"
              >
                Login
              </Button>
            </Link>
          )}
          <Link href="/all-users">
            <Button
              className="border-2 border-default bg-black text-white hover:bg-default"
              variant="outline"
            >
              All Users
            </Button>
          </Link>
        </div>
      </div>

      {/* Sidebar for mobile view */}
      <div
        className={`fixed inset-0 bg-gray-900  transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 md:hidden`}
      >
        <div className="flex justify-between bg-black items-center p-4">
          <Link href="/" className="text-3xl text-default font-bold hover:text-yellow-300 transition duration-300">
            YapNap
          </Link>
          <button
            className="focus:outline-none"
            onClick={toggleMenu}
          >
            <X className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="flex flex-col p-4 bg-black items-center space-y-4 mt-4">
          {session ? (
            <>
              <span className="text-default"><h2>Welcome, {user.username || user.email}</h2></span>
              <Link href="/dashboard" onClick={toggleMenu}>
                <Button
                  className="w-full text-sm bg-black border-2 border-default text-white hover:bg-orange-500"
                  variant="outline"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/get-link-messages" onClick={toggleMenu}>
                <Button
                  className="w-full text-sm border-2 border-default bg-black text-white hover:bg-orange-500"
                  variant="outline"
                >
                  Linking
                </Button>
              </Link>
              <Button
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="w-30 text-sm border-2 border-default bg-black text-white hover:bg-default"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in" onClick={toggleMenu}>
              <Button
                className="w-full text-sm border-2 border-default bg-black text-white hover:bg-default"
                variant="outline"
              >
                Login
              </Button>
            </Link>
          )}
          <Link href="/all-users" onClick={toggleMenu}>
            <Button
              className="w-full text-sm border-2 border-default bg-black text-white hover:bg-default"
              variant="outline"
            >
              All Users
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
