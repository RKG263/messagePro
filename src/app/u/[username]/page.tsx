'use client'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const imgurl= '@/assets/yapnap.png'
const page = () => {
  return (

   <>
    <div className="flex flex-col h-screen from-teal-400 via-blue-500 to-purple-600 ">
    <Navbar />

    <div className="flex flex-1">
      {/* Left side */}
      <section className="flex-1 p-6 bg-gradient-to-rtext-white">
      <img src={imgurl} alt="Image" className="absolute top-0 left-0 w-10 h-10 object-cover z-0" />
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Share Your Thoughts</h1>
          <p className="text-lg mb-8">Send a message to express yourself!</p>
          {/* Add your content for the left side */}
         
        </div>
      </section>

      {/* Right side */}
      <section className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Write a Message</h1>
          <Input type="text" placeholder="Type your message here" className="mb-4" />
          <Button  className="w-full">Send</Button>
        </div>
      </section>
    </div>
  </div>
   </>
  )
}

export default page
