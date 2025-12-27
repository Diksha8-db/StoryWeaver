"use client";

import React from 'react';
import Link from 'next/link';
import Button from './button'; // Reusing your existing component

const Navbar = () => {
  const navLinks = [
    { name: "Mission", href: "/mission" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Archive", href: "/archive" },
  ];

  return (
    <nav className="w-full bg-white py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-b border-gray-100">
      
      {/* 1. Logo Section */}
      <div className="mb-4 md:mb-0">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-black">
          StoryWeaver
        </Link>
      </div>

      {/* 2. Navigation Links (Centered) */}
      <ul className="flex gap-8 mb-4 md:mb-0 items-center">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className="font-serif text-base font-medium text-gray-900 hover:text-[#C26D48] transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* 3. Action Button (Reused) */}
      <div>
        <Button text="Explore Stories" onClick={() => console.log('Explore clicked')} />
      </div>

    </nav>
  );
};

export default Navbar;