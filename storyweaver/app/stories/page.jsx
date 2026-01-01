"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Pause } from "lucide-react";

export default function StoryPlayerPage() {
  const [stories, setStories] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentStory, setCurrentStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformBars, setWaveformBars] = useState([]);
  const audioRef = useRef(null);

  /* Decorative waveform */
  useEffect(() => {
    setWaveformBars(Array.from({ length: 36 }, () => Math.random() * 60 + 20));
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setWaveformBars(
        Array.from({ length: 36 }, () => Math.random() * 60 + 20)
      );
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying]);

  /* Fetch stories */
  useEffect(() => {
    async function fetchStories() {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(data.stories);
      setCurrentStory(data.stories[0]);
      setCurrentIndex(0);
    }

    fetchStories();
  }, []);

  function goToNextStory() {
    if (currentIndex < stories.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentStory(stories[nextIndex]);
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }

  function goToPrevStory() {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentStory(stories[prevIndex]);
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }

  /* Audio control */
  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }

  if (!currentStory) return null;

  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      <div className="flex flex-col lg:flex-row">
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-[420px] lg:h-screen lg:sticky lg:top-0 px-8 py-10 flex flex-col justify-between bg-[#F6F3EE]">
          <Link
            href="/archive"
            className="flex items-center gap-2 text-sm font-serif text-[#8B6F47]"
          >
            <ArrowLeft size={18} />
            Back to Archive
          </Link>

          <div className="flex flex-col items-center text-center gap-8">
            {/* Cover */}
            <div className="relative w-[240px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-xl bg-[#E8DCCB] flex items-center justify-center">
              <span className="text-xl tracking-widest text-[#8B6F47] font-bold">
                ORAL STORY
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-semibold leading-tight text-black mb-3">
                {currentStory.title}
              </h1>
              <p className="text-xs tracking-widest uppercase text-black mt-3">
                {currentStory.speakerName} · {currentStory.region}
              </p>
            </div>

            {/* Waveform */}
            <div className="flex items-end gap-1 h-10">
              {waveformBars.map((h, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-full transition-all ${
                    isPlaying ? "bg-[#C26D48]" : "bg-[#C26D48]/40"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Audio */}
            <audio ref={audioRef} src={currentStory.audioUrl} />

            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-[#C26D48] text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              {isPlaying ? (
                <Pause size={26} />
              ) : (
                <Play size={26} className="ml-1" />
              )}
            </button>

            {/* Meta */}
            <p className="text-sm text-gray-600 tracking-wide">
              Language: {currentStory.languageName}
            </p>
          </div>

          <p className="text-[10px] tracking-[0.3em] text-center text-gray-500">
            ORAL HISTORY ARCHIVE
          </p>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 bg-white flex flex-col">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-14">
            <div className="max-w-3xl mx-auto font-serif text-black flex flex-col gap-10 leading-[1.9]">
              {/* Transcript */}
              <section>
                {currentStory.transcript.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>

              {/* Translation */}
              {currentStory.translatedText && (
                <section className="bg-[#F9F6F1] p-6 rounded-xl">
                  <h4 className="text-md lg:text-lg font-semibold tracking-widest uppercase text-[#C26D48] mb-2">
                    Translation
                  </h4>
                  <p className="italic">{currentStory.translatedText}</p>
                </section>
              )}

              {/* Summary + Cultural Notes Group */}
              <section className="flex flex-col gap-12">
                {/* Summary */}
                <div className="border-l-2 border-[#C26D48]/30 pl-6">
                  <h4 className="text-md lg:text-lg tracking-widest uppercase text-[#C26D48] font-semibold mb-2">
                    Summary
                  </h4>
                  <p>{currentStory.summary}</p>
                </div>

                {/* Cultural Notes */}
                {currentStory.culturalNotes?.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-md lg:text-lg font-semibold tracking-widest uppercase text-[#C26D48]">
                      Cultural Notes
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-[#444]">
                      {currentStory.culturalNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Sticky Bottom Navigation */}
          <div className="sticky bottom-0 bg-white border-t">
            <div className="max-w-3xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
              <button
                onClick={goToPrevStory}
                disabled={currentIndex === 0}
                className={`px-5 py-2.5 rounded-full border text-sm tracking-wide transition
                  ${
                    currentIndex === 0
                      ? "border-gray-500 text-gray-500 cursor-not-allowed"
                      : "border-[#C26D48] text-[#C26D48] hover:bg-[#C26D48] hover:text-white"
                  }`}
              >
                ← Previous
              </button>

              <p className="text-[10px] tracking-widest text-gray-500 uppercase">
                Story {currentIndex + 1} of {stories.length}
              </p>

              <button
                onClick={goToNextStory}
                disabled={currentIndex === stories.length - 1}
                className={`px-5 py-2.5 rounded-full border text-sm tracking-wide transition
                  ${
                    currentIndex === stories.length - 1
                      ? "border-gray-500 text-gray-500 cursor-not-allowed"
                      : "border-[#C26D48] text-[#C26D48] hover:bg-[#C26D48] hover:text-white"
                  }`}
              >
                Next →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
