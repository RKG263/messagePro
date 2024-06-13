"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/Navbar";
import Alluser from "@/components/Alluser";
import Footer from "@/components/Footer";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { Skeleton } from "@/components/ui/skeleton";

// Define the SkeletonCard component
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-4">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[70%]" />
      </div>
    </div>
  );
}

// Define the Quote component
const Quote = () => {
  return (
    <div className="bg-black p-4 rounded-lg text-center mb-8">
      <h1 className="italic text-white">
        "Ever wanted to find someone without them finding you? Anonymously seek
        and ye shall find, without the awkward 'Did you search for me?'
        conversation."
      </h1>
    </div>
  );
};

interface User {
  username?: string;
  // Add other properties if needed
}

// Define the interface for the component props
interface Props {
  user: User[];
}

const Page = () => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const resp = await axios.get("/api/get-all-user");
        setUser(resp.data.result as User[]);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Verification Failed",
          description:
            axiosError.response?.data.message ??
            "An error occurred. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    fetchAllUser();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="p-4 bg-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full border-2 border-gray-300 bg-white h-12 px-5 pr-10 rounded-lg text-sm focus:outline-none"
            />
            <button className="absolute right-3 top-2/4 transform -translate-y-2/4 text-default hover:text-orange-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 19l-3 3m0 0l-3-3m3 3V10m0 0H7m0 0L4 7m3 3m0 0l3 3m-3-3l3-3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow px-4 md:px-20 mx-4 md:mx-20">
        {/* Render the Quote component */}
        <Quote />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {user &&
              user.map((item, key) => {
                if (item?.username) {
                  return <Alluser key={key} username={item?.username} />;
                } else {
                  return null; // or you can render a different component or an empty element
                }
              })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
