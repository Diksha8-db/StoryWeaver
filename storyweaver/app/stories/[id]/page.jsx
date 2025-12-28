"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Play, Pause } from 'lucide-react';

// Mock story data
const mockStory = {
  id: '1',
  title: 'The Origin of Rain',
  elderName: 'Elder Awa',
  recordingDate: '2024',
  audioUrl: '/audio/placeholder.mp3', // Placeholder URL
  coverImage: '/images/indianElder.jpeg', // Placeholder image
  transcript: `Long ago, before the mountains touched the sky, the world was silent. The elders say that the first sound was not a voice, but the wind weaving through the cedar trees, carrying secrets from the North. In those days, the earth was parched and the rivers ran dry. The people waited, their hearts heavy with longing for the sky to open and bless the land with rain.

But the rain did not come from above. Instead, it came from the music. An old man, whose name has been forgotten by all but the oldest stories, sat beneath the great oak tree at the edge of the village. He had no words left to speak, for he had told every tale he knew. So he picked up his flute, carved from a branch that had once sheltered a family of birds, and began to play.

The notes rose like mist from the morning fields, curling upward into the empty sky. Each melody was a prayer, each breath a wish carried on the wind. The villagers gathered, drawn by the sound that seemed to speak the language of longing itself. Children stopped their games. Elders closed their eyes. Even the birds grew still.

As the old man played, the clouds began to gather. Not the dark, angry clouds of storms, but soft, gentle clouds that drifted like white petals across the blue. The music climbed higher, and the clouds drew closer. Then, as the final note hung in the air like a question, the first drop fell.

It struck the dusty earth and sent up a small puff of dust. Then another fell. And another. Soon, the rain came in gentle sheets, washing the world clean. The people raised their faces to the sky, letting the water run down their cheeks like tears of joy. The old man kept playing, and the rain kept falling, until the rivers flowed again and the earth was green once more.

From that day forward, whenever the land thirsted, the people would gather beneath the great oak tree. The oldest among them would take up the flute—the same flute, passed down through generations—and play the song of rain. And always, without fail, the clouds would answer.

This is why we say that rain is not merely water falling from the sky, but music made visible. It is the earth's way of remembering the song that first called it back to life. And those who listen closely can still hear, in the patter of drops on leaves and the rush of water in streams, the echo of that first melody—the song that taught the sky how to weep.`,
  aiContext: `The 'North' often symbolizes the ancestral spirit world in this region's folklore. Winds from that direction are believed to carry messages from departed elders. The flute, in many indigenous traditions, serves as a bridge between the human and spiritual realms, with its breath-controlled sound representing the life force itself.`
};

export default function StoryPlayerPage({ params }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate waveform bars (simulated)
  const waveformBars = Array.from({ length: 60 }, () => 
    Math.random() * 100
  );

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar - Fixed/Sticky on Desktop */}
        <aside className="w-full lg:w-[450px] bg-[#F7F4EF] p-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex flex-col gap-8">
          {/* Back Navigation */}
          <Link 
            href="/archive" 
            className="text-[#8B6F47] font-serif text-lg underline hover:text-[#C26D48] transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back To Archive
          </Link>

          {/* Album Art with Golden Border */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square rounded-xl overflow-hidden border-8 border-[#D4A574] shadow-lg">
              <Image
                src={mockStory.coverImage}
                alt={mockStory.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Waveform Visualization */}
          <div className="flex items-end justify-center gap-1 h-20 px-4">
            {waveformBars.map((height, index) => (
              <div
                key={index}
                className="bg-[#D4A574] rounded-full flex-1 min-w-[3px] transition-all duration-300 hover:opacity-80"
                style={{ height: `${height}%`, minHeight: '8px' }}
              />
            ))}
          </div>

          {/* Metadata */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif font-bold italic text-[#8B6F47]">
              {mockStory.title}
            </h1>
            <p className="text-lg font-serif text-[#8B6F47]/80">
              Recorded by {mockStory.elderName}, {mockStory.recordingDate}
            </p>
          </div>

          {/* Player Controls */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-[#C26D48] hover:bg-[#A85A3A] transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={32} className="text-white ml-1" fill="white" />
              ) : (
                <Play size={32} className="text-white ml-1" fill="white" />
              )}
            </button>
          </div>
        </aside>

        {/* Right Content Area - Scrollable */}
        <main className="flex-1 p-8 lg:p-12 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Story Transcript with Blue Border */}
            <div className="border-2 border-blue-400 rounded-lg p-8 bg-white">
              <div className="font-serif text-[#2C2C2C] leading-relaxed text-lg space-y-6">
                {/* Split transcript into paragraphs for better formatting */}
                {mockStory.transcript.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Context Card - Inline with text */}
              <div className="mt-8 mb-4">
                <div className="bg-[#222222] rounded-lg p-5 shadow-lg">
                  <h3 className="text-xs font-serif font-bold text-white/70 uppercase tracking-wider mb-3">
                    CULTURAL CONTEXT (GEMINI AI)
                  </h3>
                  <p className="text-white/90 font-serif text-sm leading-relaxed">
                    {mockStory.aiContext}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

