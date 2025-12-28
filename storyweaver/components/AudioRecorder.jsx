'use client';

import { Playfair_Display } from 'next/font/google';
import { AudioLines, Smartphone, Heart, Hourglass, Mic, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

export default function AudioRecorder() {
  return (
    // 1. OUTER DIV: Beige Background
    <div className={`min-h-screen bg-[#EEE3D3] flex items-center justify-center p-4 md:p-8 ${playfair.variable}`}>
      
      {/* 2. INNER DIV: The White Card */}
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden px-8 py-12 md:p-12 relative">

        {/* Header - Back Link */}
        <div className="mb-8">
          <Link href="/" className="text-black underline hover:no-underline">
            <ArrowLeft className="inline-block w-4 h-4 mr-1" />
            Back
          </Link>
        </div>

        {/* Main Heading */}
        <h1 className={`text-4xl md:text-5xl font-bold text-center mb-12 text-[#D4A574] font-[family-name:var(--font-playfair)]`}>
          Share Your Story
        </h1>

        {/* Recording Tips Section */}
        <div className="mb-16">
          <h2 className={`text-xl md:text-2xl font-bold text-[#D4A574] mb-8 text-center font-[family-name:var(--font-playfair)]`}>
            Recording Tips
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Quiet Space */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-3 border-2 border-[#E8D5C0]">
                <AudioLines className="w-10 h-10 md:w-12 md:h-12 text-[#8B6F47]" />
              </div>
              <p className="text-sm md:text-base text-center text-black font-medium">Quiet Space</p>
            </div>

            {/* Hold Phone Close */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-3 border-2 border-[#E8D5C0]">
                <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-[#8B6F47]" />
              </div>
              <p className="text-sm md:text-base text-center text-black font-medium">Hold Phone Close</p>
            </div>

            {/* Speak Naturally */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-3 border-2 border-[#E8D5C0]">
                <Heart className="w-10 h-10 md:w-12 md:h-12 text-[#8B6F47]" />
              </div>
              <p className="text-sm md:text-base text-center text-black font-medium">Speak Naturally</p>
            </div>

            {/* Take Your Time */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-3 border-2 border-[#E8D5C0]">
                <Hourglass className="w-10 h-10 md:w-12 md:h-12 text-[#8B6F47]" />
              </div>
              <p className="text-sm md:text-base text-center text-black font-medium">Take Your Time</p>
            </div>
          </div>
        </div>

        {/* Recorder Section (Static Visual Only) */}
        <div className="mb-12 flex flex-col items-center">
          <p className={`text-lg md:text-xl text-center mb-8 text-black font-[family-name:var(--font-playfair)]`}>
            Click the button to start recording.
          </p>
          <button
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg ring-4 ring-red-100 transition-all duration-200"
            aria-label="Start recording"
          >
            <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </button>
        </div>

        {/* Form Section */}
        <div className="mb-12 space-y-6 max-w-md mx-auto">
          <div>
            <label htmlFor="language" className="block text-xl font-medium text-black mb-2">
              Language Name
            </label>
            <input
              type="text"
              id="language"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-gray-500 text-black bg-gray-50"
              placeholder="Enter language name"
            />
          </div>

          <div>
            <label htmlFor="region" className="block text-xl font-medium text-black mb-2">
              Region
            </label>
            <input
              type="text"
              id="region"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-gray-500 text-black bg-gray-50"
              placeholder="Enter region"
            />
          </div>

          <div>
            <label htmlFor="speaker" className="block text-xl font-medium text-black mb-2">
              Speaker Name
            </label>
            <input
              type="text"
              id="speaker"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#D4A574] transition-colors placeholder-gray-500 text-black bg-gray-50"
              placeholder="Enter speaker name"
            />
          </div>
        </div>

        {/* Footer - Finish Upload Button */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-12 py-4 bg-white border-2 border-[#D4A574] text-[#D4A574] rounded-full font-bold text-lg hover:bg-[#D4A574] hover:text-white transition-all duration-200 font-[family-name:var(--font-playfair)]`}
          >
            Finish Upload
          </button>
        </div>
      </div>
    </div>
  );
}