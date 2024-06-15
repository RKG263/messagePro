'use client'
import React from 'react';
import imgurl from "../../public/assets/mainlogo.png";
import Image from 'next/image';
import dayjs from 'dayjs';
import { Linking } from '@/models/Linking';
import Link from 'next/link';
interface LinkMessageCardProps {
  msg: Linking; 
}

const LinkMessageCard: React.FC<LinkMessageCardProps> = ({ msg }) => {
  
  return (
    <div className="bg-black text-white rounded-lg p-4 m-4 shadow-lg flex">
      <Image
        src={imgurl}
        alt="User Avatar"
        className="w-12 h-12 border-2 border-default rounded-full shadow-md mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">@{msg.username}</p>
          <span className="text-xs text-gray-400">{dayjs(msg.createdAt).format('MMM D, YYYY h:mm A')}</span>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          {msg.message}
        </p>
        <div className="mt-4 flex justify-end">
          <Link href={`/reply-link/${msg._id}`} >
          <button className="bg-black text-white py-1 px-3 rounded hover:bg-orange-600">Reply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkMessageCard;
