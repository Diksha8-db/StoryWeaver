"use client";

import { Playfair_Display } from "next/font/google";
import {
  AudioLines,
  Smartphone,
  Heart,
  Hourglass,
  Mic,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

// language
const LANGUAGE_MAP = {
  hindi: "hi-IN",
  english: "en-IN",
  bengali: "bn-IN",
  tamil: "ta-IN",
  telugu: "te-IN",
  marathi: "mr-IN",
  urdu: "ur-IN",
};

export default function AudioRecorder() {
  /* =======================
     REFS
  ======================= */
  const mediaRecorderRef = useRef(null);
  const currentStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  /* =======================
     STATE
  ======================= */
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [finalDuration, setFinalDuration] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  // form state (used by UI)
  const [languageName, setLanguageName] = useState("");
  const [region, setRegion] = useState("");
  const [speakerName, setSpeakerName] = useState("");

  /* =======================
     TIMER
  ======================= */
  function startTimer() {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function stopStream() {
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach((t) => t.stop());
      currentStreamRef.current = null;
    }
  }

  /* =======================
     RECORDING CONTROLS
  ======================= */
  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    currentStreamRef.current = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    recorder.start();
    setRecording(true);
    setPaused(false);
    startTimer();
  }

  function pauseRecording() {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    stopStream();
    stopTimer();
    setPaused(true);
  }

  async function resumeRecording() {
    if (!paused) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    currentStreamRef.current = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        audioChunksRef.current.push(e.data);
      }
    };

    recorder.start();
    setPaused(false);
    startTimer();
  }

  function stopRecording() {
    if (!mediaRecorderRef.current) return;

    const recorder = mediaRecorderRef.current;

    recorder.onstop = () => {
      stopStream();
      stopTimer();

      const blob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      setFinalDuration(seconds);
      setAudioBlob(blob);
      setRecording(false);
    };

    recorder.stop();
  }

  /* =======================
     SPEECH TO TEXT
  ======================= */
  async function finishUpload() {
    if (!audioBlob) {
      alert("Please record audio first");
      return;
    }

    try {
      setLoading(true);

      /* =======================
       1️⃣ SPEECH → TEXT
    ======================= */
      const formData = new FormData();
      formData.append("audio", audioBlob);
      const languageCode =
        LANGUAGE_MAP[languageName.trim().toLowerCase()] || "hi-IN";

      formData.append("languageCode", languageCode);

      const transcribeRes = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const transcribeData = await transcribeRes.json();

      if (!transcribeRes.ok) {
        alert(transcribeData.error || "Transcription failed");
        return;
      }

      const transcript = transcribeData.transcript;
      console.log("TRANSCRIPT:", transcript);

      /* =======================
       2️⃣ STORY ANALYSIS
    ======================= */
      const analysisRes = await fetch("/api/story-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const analysisData = await analysisRes.json();

      if (!analysisRes.ok || !analysisData.success) {
        alert("Story analysis failed");
        return;
      }

      const analysis = analysisData.data;

      /* =======================
       3️⃣ UPLOAD AUDIO
    ======================= */
      const audioForm = new FormData();
      audioForm.append("audio", audioBlob);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: audioForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        alert("Audio upload failed");
        return;
      }

      const audioUrl = uploadData.audioUrl;

      /* =======================
       4️⃣ SAVE TO FIRESTORE
    ======================= */
      await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          analysis,
          audioUrl,
          languageCode: languageName || "hi-IN",
          languageName,
          region,
          speakerName,
        }),
      });

      alert("Story uploaded successfully!");

      /* =======================
       5️⃣ RESET STATE
    ======================= */
      setSeconds(0);
      setFinalDuration(null);
      setAudioBlob(null);
      audioChunksRef.current = [];
      setPaused(false);
      setRecording(false);
    } catch (error) {
      console.error("Finish upload error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function formatTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    // 1. OUTER DIV: Beige Background
    <div
      className={`min-h-screen bg-[#EEE3D3] flex items-center justify-center p-4 md:p-8 ${playfair.variable}`}
    >
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
        <h1
          className={`text-4xl md:text-5xl font-bold text-center mb-12 text-[#D4A574] font-[family-name:var(--font-playfair)]`}
        >
          Share Your Story
        </h1>

        {/* Recording Tips Section */}
        <div className="mb-16">
          <h2
            className={`text-xl md:text-2xl font-bold text-[#D4A574] mb-8 text-center font-[family-name:var(--font-playfair)]`}
          >
            Recording Tips
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <Tip icon={AudioLines} label="Quiet Space" />
            <Tip icon={Smartphone} label="Hold Phone Close" />
            <Tip icon={Heart} label="Speak Naturally" />
            <Tip icon={Hourglass} label="Take Your Time" />
          </div>
        </div>

        {/* Recorder Section (Static Visual Only) */}
        <div className="mb-12 flex flex-col items-center">
          <p
            className={`text-lg md:text-xl text-center mb-8 text-black font-[family-name:var(--font-playfair)]`}
          >
            Click the button to start recording.
          </p>

          {/* ONLY THIS BUTTON IS CHANGED */}
          <div className="relative flex flex-col items-center gap-4">
            {/*  Recording timer */}
            {/*  Live recording timer */}
            {recording && (
              <p className="text-red-600 font-semibold text-lg animate-pulse">
                Recording {formatTime(seconds)}
              </p>
            )}

            {/* ⏱ Final duration after stop */}
            {!recording && finalDuration !== null && audioBlob && (
              <p className="text-gray-700 font-medium text-lg">
                Recorded Duration: {formatTime(finalDuration)}
              </p>
            )}

            {/* Animated ring */}
            {recording && (
              <div className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping pointer-events-none"></div>
            )}

            {/* 🎙 Main button */}
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full 
                bg-red-600 hover:bg-red-700 
                flex items-center justify-center 
                shadow-lg ring-4 ring-red-100 
                transition-all duration-200
                ${recording ? "scale-110" : ""}
              `}
            >
              <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </button>

            {/* ⏸ Pause / Resume */}
            {recording && (
              <div className="relative z-10 flex gap-4 mt-4">
                {!paused ? (
                  <button
                    onClick={pauseRecording}
                    className="px-6 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeRecording}
                    className="px-6 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition"
                  >
                    Resume
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-12 space-y-6 max-w-md mx-auto">
          <div>
            <label
              htmlFor="language"
              className="block text-xl font-medium text-black mb-2"
            >
              Language Name
            </label>
            <input
              id="language"
              value={languageName}
              onChange={(e) => setLanguageName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 text-gray-900 rounded-lg bg-gray-50"
              placeholder="Enter language name"
            />
          </div>

          <div>
            <label
              htmlFor="region"
              className="block text-xl font-medium text-black mb-2"
            >
              Region
            </label>
            <input
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900 outline-0"
              placeholder="Enter region"
            />
          </div>

          <div>
            <label
              htmlFor="speaker"
              className="block text-xl font-medium text-black mb-2"
            >
              Speaker Name
            </label>
            <input
              id="speaker"
              value={speakerName}
              onChange={(e) => setSpeakerName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              placeholder="Enter speaker name"
            />
          </div>
        </div>

        {/* Footer - Finish Upload Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={finishUpload}
            disabled={loading}
            className="px-12 py-4 bg-white border-2 border-[#D4A574] text-[#D4A574] rounded-full font-bold text-lg hover:bg-[#D4A574] hover:text-white transition-all duration-200"
          >
            {loading ? "Processing…" : "Finish Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Helper Component */
function Tip({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5E6D3] flex items-center justify-center mb-3 border-2 border-[#E8D5C0]">
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#8B6F47]" />
      </div>
      <p className="text-sm md:text-base text-center text-black font-medium">
        {label}
      </p>
    </div>
  );
}
