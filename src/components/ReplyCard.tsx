import Image from 'next/image';
import React from 'react';
import dayjs from 'dayjs';
import imgurl from "../../public/assets/mainlogo.png";
import { Separator } from './ui/separator';

import { Reply as ReplyType } from '@/models/Linking'; // Assuming Reply type is imported correctly

interface ReplyCardProps {
  rep: ReplyType; // Define props with rep of type ReplyType
}

const ReplyCard: React.FC<ReplyCardProps> = ({ rep }) => {
  return (
    <>
      <div className='bg-black rounded-lg shadow-md p-4 mb-4'>
        {/* User Info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Image
              src={imgurl} // Replace with actual image source
              alt="Profile"
              className="h-10 w-10 bg-blue-500 border-2 border-default rounded-full mr-2"
            />
            <div>
              <p className="font-bold text-white">@{rep.username}</p> {/* Replace with actual user name */}
            </div>
          </div>
          <p className="text-sm text-white">{dayjs(rep.createdAt).format('MMM D, YYYY h:mm A')}</p> {/* Replace with actual date */}
        </div>

        {/* Reply Content */}
        <p className="text-white">{rep.content}</p>
      </div>
      <Separator className="bg-default" />
    </>
  );
};

export default ReplyCard;
