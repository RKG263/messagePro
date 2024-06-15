'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      {/* Main content */}
     <div className='h-screen'>
     <main className="flex-grow flex h-full flex-col md:flex-row items-center justify-center px-4  md:px-24 py-10 bg-black text-default">
        {/* Left section */}
        <section className=" md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl  md:text-5xl font-bold drop-shadow-lg">
            Empower Your Voice with Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg drop-shadow-md">
            True Feedback - Your opinions matter, your identity protected.
          </p>
        </section>

        {/* Carousel for Messages */}
        <div className="md:w-1/2 flex justify-center  items-center">
          <Carousel
            plugins={[Autoplay({ delay: 2500 })]}
            className="w-full max-w-lg md:max-w-3xl p-10 h-96"
          >
            <CarouselContent className="flex items-center justify-center space-x-4 h-full">
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4 w-full h-full">
                  <Card className="bg-white text-black shadow-xl rounded-lg overflow-hidden h-full transition-transform transform hover:scale-105">
                    <CardHeader className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white p-4">
                      <CardTitle className="text-lg font-semibold">
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start bg-black text-white p-4 space-y-2 h-full">
                      <Mail className="flex-shrink-0 text-default w-6 h-6" />
                      <div className="overflow-auto ">
                        <p className="text-white">{message.content}</p>
                        <p className="text-xs text-gray-300 mt-2">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </main>
     </div>

      {/* Footer */}
    

    </>
  );
}
