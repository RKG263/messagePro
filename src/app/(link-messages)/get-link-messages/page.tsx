"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import imgurl from "../../../../public/assets/mainlogo1.png";
import Image from "next/image";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa"; // Import the send icon
import LinkMessageCard from "@/components/LinkMessageCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { User } from "next-auth";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Page = () => {
  const [post, setPost] = useState("");
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const { data: session } = useSession();

  const fetchMessage = async () => {
    try {
      const responce = await axios.get("/api/get-all-link-messages");
      setMessage(responce?.data?.resp);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to fetch message",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessage();
     setIsLoading(false);
  }, []);

  const handleOnSubmit = async () => {
    try {
      const resp = await axios.post("/api/sendlink-messages", {
        message: post,
        username: session?.user?.username,
      });
      toast({
        title: "success",
        description: "posted successfully",
      });
      setPost("");
      fetchMessage();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 mb-8">
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {/* Left section */}
        <section className="bg-black p-4 h-screen rounded-lg shadow-lg mb-4 lg:mb-0 lg:w-1/3 flex flex-col justify-between">
          <div className="flex flex-col items-center mb-4">
            <Image
              src={imgurl}
              alt="User Avatar"
              className="w-80 h-80  rounded-full shadow-md mb-2"
            />
            <h1 className="text-center text-default text-4xl font-extrabold  mb-4">
            Ask
             <br/>
             Ananomously 
             
            </h1>
          </div>

          <nav className="space-y-2">
            {/* Add any other links or elements here if needed */}
          </nav>

          <div className="flex flex-col space-y-3 p-4">
            <Link
              className="block text-center text-white border-2 border-default bg-black  py-2 px-4 rounded hover:bg-orange-700"
              href="/home"
            >
              Home
            </Link>
            <Link
              className="block text-center text-white bg-black border-2 border-default  py-2 px-4 rounded hover:bg-red-600"
              href="/logout"
            >
              Logout
            </Link>
          </div>
        </section>

        {/* Right section */}
        <section className="bg-black p-4 rounded-lg shadow-lg lg:w-2/3  flex flex-col justify-between">
          {/* Add content for the right section here */}
          <ScrollArea
            className="h-4/5 mb-2 w-full rounded-md "
            style={{ height: "85vh" }}
          >
            <div className="p-4">
              { isLoading
                ? dummy.map((item, key) => (
                  <React.Fragment key={key}>
                    <div className="flex items-center p-10 space-x-4 mb-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        
                      </div>
                    </div>
                    <Separator />
                  </React.Fragment>
                ))
                : message.map((item, key) => (
                    <React.Fragment key={key}>
                      <LinkMessageCard msg={item} />
                      <Separator className="bg-default" />
                    </React.Fragment>
                  ))}
            </div>
          </ScrollArea>

          <div className="flex items-center mt-auto mb-7">
            <input
              type="text"
              value={post}
              placeholder="Type your message here..."
              onChange={(e) => setPost(e.target.value)}
              className="flex-1 p-2 rounded-lg border-2 bg-black border-default text-white "
            />
            <button
              className="bg-black text-white border-2 border-default ml-1 py-1 px-2 rounded-lg hover:bg-orange-600 flex items-center justify-center w-11 h-11"
            
              onClick={handleOnSubmit}
              
            >
              <FaPaperPlane className="text-xl text-default" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
