'use client'
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from 'next/link';

interface UserCardProps {
  username: string;
}


const UserCard: React.FC<UserCardProps> = ({ username }) => {


  return (
    <div className='m-5'>
      <Link  href={`/u/${username}`}>
      <Card className="max-w-xl w-40 mx-auto bg-gray-200 rounded-lg shadow-2xl transform transition duration-300 hover:scale-90">
        <CardHeader>
       
          <Avatar className="mx-auto w-30 h-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center text-2xl mt-4">{username}</CardTitle>
        </CardHeader>
      </Card>
      </Link>
    </div>
  );
}

export default UserCard;
