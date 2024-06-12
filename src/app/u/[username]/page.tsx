"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/Footer";
import axios, { AxiosError } from "axios";
import imgurl from "../../../../public/assets/yapnap.png";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { messageSchema } from "@/schemas/messageSchema";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
const Page = () => {
  const [accepting, setAccepting] = useState(false);
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const params = useParams<{ username: string }>();
 

  useEffect(() => {
    // fetch user
    const fetchUser = async () => {
      try {
      
        const res = await axios.post("/api/get-user-by-username", {
          username: params.username,
        });

        setAccepting(res?.data?.result?.isAcceptingMessages);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ??
            "Failed to fetch message settings",
          variant: "destructive",
        });
      }
    };
    fetchUser();
  }, [params]);

  const handleOnSubmit = async () => {
    try {
      if(content.length<5){
        return toast({
          title: "size",
          description: "message must be greater than 5 character",
        });
      }
      const res = await axios.post("/api/send-message", {
        username: params.username,
        content: content,
      });

      toast({
        title: "success",
        description: "message send successfully",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center px-4 py-6 md:px-24 h-full">
        {/* Left side */}
        <section className="flex-1  mt-[-50px] p-6 text-center md:text-left mb-8 md:mb-0 flex flex-col justify-center">
          <div className="max-w-md mx-auto md:mx-0">
            <Image
              src={imgurl}
              alt="Description of image"
              className="mb-2 w-full h-auto rounded-lg shadow-2xl"
            />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Share Your Thoughts
            </h1>
            <p className="text-lg mb-8">Send a message to express yourself!</p>
          </div>
        </section>

        {/* Right side */}
        <section className="flex-1 h-full py-6 px-0 mt-[-120px] bg-transparent shadow-2xl rounded-lg text-gray-800 flex flex-col justify-center">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl text-white font-bold mb-4">
              Write a Message to {params.username}
            </h1>
            <textarea
              placeholder="Type your message here"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="mb-4 h-32 p-4 w-full border rounded-md text-white bg-transparent resize-none"
            />
            <Button
              onClick={handleOnSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-black"
              disabled={!accepting}
            >
              {accepting ? "Send" : "Unavailable"}
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
