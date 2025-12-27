"use client";

import React from 'react';
// Importing a placeholder icon just in case you need it, as requested
import { Globe } from 'lucide-react'; 

const Button = ({ text, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group
        flex items-center justify-center gap-2
        px-8 py-3
        rounded-full
        border border-[#C26D48]
        bg-[#FFFFFF]
        text-[#C26D48]
        font-serif text-xl font-medium tracking-wide
        transition-all duration-300 ease-in-out
        hover:bg-[#C26D48] hover:text-white
        active:scale-95
      `}
    >
      {/* If an icon is passed, render it. Using Lucide-react. */}
      {Icon && <Icon size={20} />}
      
      <span>{text}</span>
    </button>
  );
};

export default Button;