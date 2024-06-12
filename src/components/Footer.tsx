import React from 'react'
import Link from 'next/link';
const Footer = () => {
  return (
    <div>
        <footer className="shadow-2xl backdrop-blur-md text-center p-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="mb-4 md:mb-0">
        © 2024 YapNap. All rights reserved.
      </p>
      <div className="flex space-x-4">
        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="hover:underline">
          Terms of Service
        </Link>
        <Link href="/contact-us" className="hover:underline">
          Contact Us
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer
