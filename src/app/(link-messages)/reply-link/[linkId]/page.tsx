"use client";
import React, { useEffect, useState } from "react";
import { HiOutlinePaperAirplane, HiOutlineTrash } from "react-icons/hi"; // Importing icons from react-icons/hi
import { ScrollArea } from "@/components/ui/scroll-area";
import ReplyCard from "@/components/ReplyCard";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import imgurl from "../../../../../public/assets/mainlogo.png";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { ApiResponse } from "./../../../../types/ApiResponse";
import dayjs from "dayjs";
import { Reply } from "./../../../../models/Linking";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

interface PostResult {
  username: string;
  message: string;
  createdAt: string; // Assuming createdAt is a string, adjust as per actual type
}

const Page = () => {
  const { toast } = useToast();
  const params = useParams<{ linkId: string }>();
  const [post, setPost] = useState<PostResult | null>(null); // Adjusted state type for post
  const [reply, setReply] = useState<Reply[]>([]); // Adjusted state type for reply
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch post and replies
  const fetchReply = async () => {
    try {
      const resp = await axios.post("/api/get-all-reply-link", {
        linkId: params.linkId,
      });

      setReply(resp?.data?.resp?.reply);
      setPost(resp?.data?.resp);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(error);
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReply();
  }, [params]);

  // Handle form submission to reply
  const handleOnSubmit = async () => {
    try {
      const resp = await axios.post("/api/reply-link", {
        content: content,
        username: session?.user?.username,
        linkId: params.linkId,
      });
      toast({
        title: "Success",
        description: "Replied successfully",
      });
      setContent("");
      fetchReply();
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

  // Handle deletion of the post
  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/delete-link/${params.linkId}`);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      router.push('/get-link-messages')
      setPost(null); // Clear post data after deletion
      setReply([]); // Clear replies after deletion
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left Section */}
      <section className="w-1/3 p-3 relative">
        <div className="h-full p-6 bg-black rounded-lg shadow-md">
          {/* User Info and Post */}
          <ScrollArea
            className="h-3/4 w-full rounded-md"
            style={{ height: "80%" }}
          >
            {/* Delete Button */}
            {session?.user?.username == post?.username && (
              <button
                onClick={handleDeletePost}
                className="absolute top-4 right-4  text-red-600 hover:text-red-800"
              >
                <HiOutlineTrash size={20} />
              </button>
            )}
            <div className="flex flex-col p-4 mb-4 bg-black text-white rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <Image
                  src={imgurl}
                  alt="Profile"
                  className="w-10 h-10 bg-white border-2 border-default rounded-full mr-2"
                />
                <span className="text-sm font-medium">{post?.username}</span>
              </div>
              <p className="text-sm mb-2">{post?.message}</p>
              <p className="text-xs text-gray-500">
                {dayjs(post?.createdAt).format("MMM D, YYYY h:mm A")}
              </p>
            </div>
          </ScrollArea>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 p-4">
            <Link
              className="block text-center text-white border-2 bg-black border-default py-2 px-4 rounded hover:bg-orange-700"
              href="/"
            >
              Home
            </Link>
            <Link
              className="block text-center text-white bg-black border-2 border-default py-2 px-4 rounded hover:bg-red-600"
              href="/logout"
            >
              Logout
            </Link>
          </div>
        </div>
      </section>

      {/* Right Section */}
      <section className="w-2/3 p-3 flex flex-col">
        {/* Right Bottom Section (Large) */}
        <section className="p-6 h-full bg-black text-white rounded-lg shadow-md relative">
          <ScrollArea
            className="h-3/4 w-full rounded-md "
            style={{ height: "90%" }}
          >
            <div className="p-4 mb-3">
              {/* Display Replies */}
              {reply &&
                reply.map((item, key) => <ReplyCard key={key} rep={item} />)}
            </div>
          </ScrollArea>

          {/* Input Field and Send Button */}
          <div className="absolute bottom-4 left-0 right-0 ml-4 mr-4 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 mx-2 bg-black border-default text-white border-2 rounded-md focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              onClick={handleOnSubmit}
              className="px-4 py-2 border-default bg-black border-2 text-default hover:text-orange-700 rounded-lg"
            >
              <HiOutlinePaperAirplane size={22} />
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
