"use client";

import Link from 'next/link';
import { Mic, RefreshCcw, Sparkles, Archive } from 'lucide-react';

export default function Page() {
  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Featured stories data
  const featuredStories = [
    {
      id: 'origin-of-rain',
      title: 'The Origin of Rain',
      description: 'A story from the Munda people of Jharkhand, India, about the creation of rain and its importance to life.',
      imageUrl: '/images/rainingInHills.jpg'
    },
    {
      id: 'sacred-buffalo-song',
      title: 'The Sacred Buffalo Song',
      description: 'A traditional song from the Toda community of the Nilgiri Hills, celebrating the sacred buffaloes and their role in their culture.',
      imageUrl: '/images/sacred_cow.png'
    },
    {
      id: 'secrets-of-the-forest',
      title: 'Secrets of the Forest',
      description: 'An ancient tale from the Gond tribe of Madhya Pradesh, India, revealing the hidden wisdom and spirits residing within the forest.',
      imageUrl: '/images/ForestImage.jpg'
    },
    {
      id: 'star-weaver',
      title: 'The Star Weaver',
      description: 'A mythical narrative from the Kuki people of Northeast India, describing a celestial being who weaves the stars into constellations.',
      imageUrl: '/images/NightSky.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-playfair)' }}>
              StoryWeaver
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={(e) => handleSmoothScroll(e, 'hero')}
                className="text-gray-700 hover:text-[#C07049] transition-colors duration-200 font-medium"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Mission
              </button>
              <button
                onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
                className="text-gray-700 hover:text-[#C07049] transition-colors duration-200 font-medium"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                How it works
              </button>
              <Link
                href="/archive"
                className="text-gray-700 hover:text-[#C07049] transition-colors duration-200 font-medium"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Archive
              </Link>
              <button
                onClick={(e) => handleSmoothScroll(e, 'featured-stories')}
                className="px-6 py-2 bg-[#C07049] text-white rounded-md hover:bg-[#A85D3A] transition-colors duration-200 font-medium"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Explore Stories
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gray-900">
        {/* Background Image Placeholder */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: 'url(/images/indianElder.jpeg)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Before a voice is lost, we listen.
          </h1>
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Preserving endangered dialects with Generative AI
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Stat 1 */}
            <div className="text-center">
              <div 
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
              >
                3000+
              </div>
              <h3 
                className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-700 mb-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Endangered Languages
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Currently at risk of vanishing globally.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div 
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
              >
                14 Days
              </div>
              <h3 
                className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-700 mb-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Frequency of Extinction
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                One unique dialect disappears every two weeks.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div 
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
              >
                Forever
              </div>
              <h3 
                className="text-sm md:text-base font-semibold uppercase tracking-wider text-gray-700 mb-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Stories Archived
              </h3>
              <p 
                className="text-sm md:text-base text-gray-600"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Digitized and secured on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
            style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
          >
            How It Works?
          </h2>

          {/* Steps */}
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 border-t-2 border-dashed border-[#C07049] opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {/* Step 01 - Capture */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div 
                    className="absolute -top-4 -left-4 text-6xl md:text-7xl font-bold opacity-20"
                    style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                  >
                    01
                  </div>
                  <div className="relative w-20 h-20 rounded-full bg-[#C07049] flex items-center justify-center">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                >
                  Capture
                </h3>
                <p 
                  className="text-sm md:text-base text-gray-600 max-w-xs"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  App records high-fidelity audio offline.
                </p>
              </div>

              {/* Step 02 - Transcribe */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div 
                    className="absolute -top-4 -left-4 text-6xl md:text-7xl font-bold opacity-20"
                    style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                  >
                    02
                  </div>
                  <div className="relative w-20 h-20 rounded-full bg-[#C07049] flex items-center justify-center">
                    <RefreshCcw className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                >
                  Transcribe
                </h3>
                <p 
                  className="text-sm md:text-base text-gray-600 max-w-xs"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Google Speech-to-Text captures phonetics.
                </p>
              </div>

              {/* Step 03 - Contextualize */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div 
                    className="absolute -top-4 -left-4 text-6xl md:text-7xl font-bold opacity-20"
                    style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                  >
                    03
                  </div>
                  <div className="relative w-20 h-20 rounded-full bg-[#C07049] flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                >
                  Contextualize
                </h3>
                <p 
                  className="text-sm md:text-base text-gray-600 max-w-xs"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Gemini translates idioms & cultural meaning.
                </p>
              </div>

              {/* Step 04 - Archive */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div 
                    className="absolute -top-4 -left-4 text-6xl md:text-7xl font-bold opacity-20"
                    style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                  >
                    04
                  </div>
                  <div className="relative w-20 h-20 rounded-full bg-[#C07049] flex items-center justify-center">
                    <Archive className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
                >
                  Archive
                </h3>
                <p 
                  className="text-sm md:text-base text-gray-600 max-w-xs"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Preserved forever in the global library.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
          >
            Start recording your story now!
          </h2>
          <p 
            className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Tap the button to begin recording—your voice deserves to be heard, and your story deserves to last forever.
          </p>
          <Link
            href="/record"
            className="inline-block px-8 py-4 bg-[#C07049] text-white rounded-full hover:bg-[#A85D3A] transition-colors duration-200 font-medium text-lg"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Go to Recording page
          </Link>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section id="featured-stories" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16"
            style={{ color: '#C07049', fontFamily: 'var(--font-playfair)' }}
          >
            Featured Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 
                    className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#C07049] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {story.title}
                  </h3>
                  <p 
                    className="text-sm text-gray-600 leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {story.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p 
            className="text-sm text-gray-600"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            © 2025 StoryWeaver. Preserving voices, one story at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
