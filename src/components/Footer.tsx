import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer className="shadow-2xl backdrop-blur-md text-center p-6 bg-black text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              © 2024 YapNap. All rights reserved.
            </p>
            {/* Social icons */}
            <div className="flex items-center md:items-start"> {/* Center vertically on small screens and start vertically on medium screens */}
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-default mx-2">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-default mx-2">
                <FaFacebook />
              </a>
              <a href="mailto:example@gmail.com" className="text-default mx-2">
                <FaEnvelope />
              </a>
            </div>
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
  );
};

export default Footer;
