'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { Mail } from 'lucide-react';

import messages from '@/messages.json';
import imgurl from '../../../public/assets/mainlogo1.png';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 md:px-24 py-10 bg-black text-white">
          {/* Left section */}
          <section className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
              Empower Your Voice with Anonymous Feedback
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg drop-shadow-md">
              True Feedback - Your opinions matter, your identity protected.
            </p>
          </section>

          {/* Carousel for Messages - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/2 justify-center items-center">
            <Carousel
              plugins={[Autoplay({ delay: 2500 })]}
              className="w-full max-w-lg md:max-w-3xl p-2 md:p-10 h-64 md:h-96"
            >
              <CarouselContent className="flex items-center justify-center space-x-4 h-full">
                {messages.map((message, index) => (
                  <CarouselItem key={index} className="p-2 w-full h-full">
                    <Card className="bg-white text-black shadow-xl rounded-lg overflow-hidden h-full transition-transform transform hover:scale-105">
                      <CardHeader className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white p-4">
                        <CardTitle className="text-lg font-semibold">
                          {message.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-start bg-black text-white p-4 space-y-2 h-full">
                        <Mail className="flex-shrink-0 text-default w-6 h-6" />
                        <div className="overflow-auto">
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

      {/* About Us Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
              <p className="text-lg mb-6">
                We are dedicated to providing a platform for anonymous feedback,
                ensuring that voices can be heard without fear of exposure.
              </p>
              <p className="text-lg">
                Our mission is to empower individuals and organizations to gather
                honest opinions and insights, fostering a culture of transparency
                and openness.
              </p>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={imgurl}
                  width={600}
                  height={400}
                  alt="About Us Image"
                  layout="responsive"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg mb-6">
                Have questions or feedback? Reach out to us!
              </p>
              <p className="text-lg">
                Email: contact@example.com <br />
                Phone: +1 123-456-7890
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                <p className="text-lg">
                  1234 Main Street <br />
                  City, State 12345 <br />
                  Country
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                <p className="text-lg">
                  Monday - Friday: 9:00 AM - 5:00 PM <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <iframe
                className="w-full h-64 md:h-96 rounded-lg shadow-md"
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156654.35124408858!2d-73.97800335820309!3d40.71272894130982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598fa4b78e1b%3A0x41725c3fda346995!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1623710425697!5m2!1sen!2sin"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto px-4 md:px-24 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} True Feedback. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
