"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause } from "lucide-react";
import { useParams } from "next/navigation";

export default function StoryPlayerPage() {
  const {id} = useParams()
  const [story, setStory] = useState(null);
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
    async function fetchStory() {
      const res = await fetch(`/api/stories/${id}`);

      console.log(res)
      const data = await res.json();
      if (data.success) {
        setStory({ id, ...data.story });
      } else {
        console.error(data.error);
      }
    }

    fetchStory();
  }, [id]);

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

  if (story === null) return <p className="p-6 text-red-500">Story not found</p>;

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
                {story.title}
              </h1>
              <p className="text-xs tracking-widest uppercase text-black mt-3">
                {story.speakerName} · {story.region}
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
            <audio ref={audioRef} src={story.audioUrl} />

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
              Language: {story.languageName}
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
                {story.transcript.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>

              {/* Translation */}
              {story.translatedText && (
                <section className="bg-[#F9F6F1] p-6 rounded-xl">
                  <h4 className="text-md lg:text-lg font-semibold tracking-widest uppercase text-[#C26D48] mb-2">
                    Translation
                  </h4>
                  <p className="italic">{story.translatedText}</p>
                </section>
              )}

              {/* Summary + Cultural Notes Group */}
              <section className="flex flex-col gap-12">
                {/* Summary */}
                <div className="border-l-2 border-[#C26D48]/30 pl-6">
                  <h4 className="text-md lg:text-lg tracking-widest uppercase text-[#C26D48] font-semibold mb-2">
                    Summary
                  </h4>
                  <p>{story.summary}</p>
                </div>

                {/* Cultural Notes */}
                {story.culturalNotes?.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-md lg:text-lg font-semibold tracking-widest uppercase text-[#C26D48]">
                      Cultural Notes
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-[#444]">
                      {story.culturalNotes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>
          </div>

          
        </main>
      </div>
    </div>
  );
}
