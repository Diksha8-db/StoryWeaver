"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Compass } from 'lucide-react';
import Button from './ui/Button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  const navLinks = [
    { name: "Mission", href: "/" },
    { name: "How it works", href: "/#how-it-works" },
    { name: "Archive", href: "/archive" },
    {name : "Stories", href: "/stories"}
  ];

  // handling redirection of explore button
  const handleRedirect = () => {
    setIsOpen(true);
    router.push('/record')
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F9FAFB]/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo Section */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <BookOpen size={20} className="text-[#C26D48] transition-transform group-hover:-rotate-12" />
              <span className="font-serif text-xl font-bold tracking-tight text-gray-900">
                StoryWeaver
              </span>
            </Link>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm font-medium text-gray-500 hover:text-[#C26D48] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200"> 
              {/* Refined Button Component Call */}
              <Button 
                text="Explore" 
                icon={Compass} 
                onClick={handleRedirect} 
              />          
            </div>
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none transition-transform active:scale-90"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Drawer */}
      <div className={`md:hidden transition-all duration-300 ease-in-out bg-white ${isOpen ? 'max-h-80 border-b shadow-lg' : 'max-h-0 overflow-hidden'}`}>
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-gray-600 hover:text-[#C26D48] transition-all border-b border-gray-50 pb-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Button 
              text="Explore Stories" 
              icon={Compass}
              className="w-full" 
              onClick={handleRedirect} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
}