import React from 'react';
import Image from 'next/image';

const StoryCard = ({ 
  imageSrc, 
  title, 
  dialect, 
  region, 
  description 
}) => {
  return (
    <div className="
      relative 
      flex flex-col items-center text-center
      w-full max-w-[340px] /* Limits width like the card in the image */
      p-6
      rounded-3xl
      bg-[#BD9E60]
      text-[#FFFFFF]
      shadow-xl hover:shadow-2xl
      transition-shadow duration-300
    ">
      {/* Image Container */}
      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg shadow-sm">
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-serif text-3xl font-bold tracking-wide">
          {title}
        </h3>
        
        <p className="text-sm font-medium opacity-90 tracking-wide uppercase">
          Dialect: {dialect} • Region: {region}
        </p>
        
        <p className="mt-2 text-base leading-relaxed opacity-95">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;