"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown } from 'lucide-react';
// Importing pre-built components
import Button from '@/components/ui/Button';
import StoryCard from '@/components/StoryCard';

export default function ArchivePage() {
  // Changed initial state to true so it matches the visual design by default
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('Northeast India');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = [
    'Northeast India',
    'North Pacific',
    'South Asia',
    'Middle East',
    'Central Asia',
    'East Africa',
     // Added a few more to demonstrate the wrapping capability
    'Europe',
    'North America'
  ];

  // Sample data for Top Rated Stories
  const topRatedStories = [
    {
      id: 1,
      imageSrc: '/images/mahabharat.jpg',
      title: 'Kurukshetra Yuddha',
      dialect: 'Sanskrit',
      region: 'South Asia',
      description: 'The epic battle of Mahabharata'
    },
    {
      id: 2,
      imageSrc: '/images/battleOfLanka.png',
      title: 'Battle of Lanka',
      dialect: 'Hindi',
      region: 'South Asia',
      description: 'A legendary tale of valor and honor'
    }
  ];

  // Sample data for All Stories Library
  const allStories = [
  {
    id: 1,
    imageSrc: '/images/mahabharat.jpg',
    title: 'The Indian Elephant',
    dialect: 'Hindi',
    region: 'South Asia',
    description: 'Smart, scalable, intuitive, efficient, reliable, modern',
  },
  {
    id: 2,
    imageSrc: '/images/persian.jpg',
    title: 'The Persian War',
    dialect: 'Hindi',
    region: 'South Asia',
    description: 'Smart, scalable, intuitive, efficient, reliable, modern',
  },
  {
    id: 3,
    imageSrc: '/images/Recession.jpg',
    title: 'The Great Recession',
    dialect: 'Hindi',
    region: 'South Asia',
    description: 'Smart, scalable, intuitive, efficient, reliable, modern',
  },
  {
    id: 4,
    imageSrc: '/images/mahabharat.jpg',
    title: 'The Odyssey',
    dialect: 'Hindi',
    region: 'South Asia',
    description: 'Smart, scalable, intuitive, efficient, reliable, modern',
  },
];


  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Sidebar - Filter Archive */}
      {/* Added sticky positioning so sidebar stays visible on scroll */}
      <aside className="w-72 bg-[#F7F4EF] p-8 flex flex-col gap-8 border-r border-[#E8DCC6] sticky top-0 self-start">
        <h2 className="text-3xl font-bold text-[#8B6F47] font-serif">
          Filter Archive
        </h2>
        
        {/* Region Filter */}
        <div className="flex flex-col gap-4">
          <div 
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
          >
            <h3 className="text-xl font-bold text-[#8B6F47] font-serif">
              Region
            </h3>
            <ChevronDown 
              size={20} 
              className={`text-[#8B6F47] transition-transform duration-200 ${isRegionDropdownOpen ? 'rotate-180' : ''}`}
            />
          </div>
          
          {/* Region Buttons Section */}
          {/* CRITICAL CHANGE HERE:
              Changed from 'flex-col' to 'flex flex-wrap' to allow horizontal stacking and wrapping.
              Added 'gap-3' for spacing between buttons.
          */}
          {isRegionDropdownOpen && (
             <div className="flex flex-wrap gap-3 transition-all ease-in-out">
             {regions.map((region) => (
               <Button
                 key={region}
                 text={region}
                 onClick={() => setSelectedRegion(region)}
                 variant="region"
                 isSelected={selectedRegion === region}
               />
             ))}
           </div>
          )}
         
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-12">
        {/* Search Bar */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-[#E8DCC6]">
            <Search size={28} className="text-[#8B6F47]" />
            <input
              type="text"
              placeholder="Search for Harvest Songs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#8B6F47] placeholder-[#8B6F47]/50 font-serif text-3xl outline-none"
            />
          </div>
        </div>

        {/* Top Rated Stories Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#8B6F47] font-serif mb-8">
            Top Rated Stories
          </h2>
          {/* Kept this manual as the data structure differs slightly from the bottom section's requirements (needs images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topRatedStories.map((story) => (
              <div key={story.id} className="flex flex-col cursor-pointer group">
                <div className="relative w-full h-[300px] mb-4 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={story.imageSrc}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#8B6F47] font-serif text-center">
                  {story.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* All Stories Library Section */}
        <section>
          <h2 className="text-4xl font-bold text-[#8B6F47] font-serif mb-8">
            All Stories Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allStories.map((story) => (
              <StoryCard 
                key={story.id}
                imageSrc={story.imageSrc}
                title={story.title}
                dialect={story.dialect}
                region={story.region}
                description={story.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}