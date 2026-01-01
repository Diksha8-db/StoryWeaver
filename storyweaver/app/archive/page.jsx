"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import StoryCard from "@/components/StoryCard";

export default function ArchivePage() {
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const regions = [
    "India",
    "Northeast India",
    "South Asia",
    "Middle East",
    "Central Asia",
    "East Africa",
    "Europe",
    "North America",
  ];

  /* FETCH STORIES FROM BACKEND*/
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (selectedRegion !== "All") {
          params.append("region", selectedRegion);
        }
        if (searchQuery.trim()) {
          params.append("search", searchQuery);
        }

        const res = await fetch(`/api/stories?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch stories");

        const data = await res.json();
        setStories(data.stories || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [selectedRegion, searchQuery]);

  return (
    <div className="min-h-screen flex bg-white">
      {/* SIDEBAR */}
      <aside className="w-72 min-h-screen bg-[#F7F4EF] p-8 flex flex-col gap-10 border-r border-[#E8DCC6] sticky top-0">
        <h2 className="text-3xl font-bold text-[#8B6F47] font-serif">
          Filter Archive
        </h2>

        <div className="h-px bg-[#E8DCC6]" />

        {/* REGION FILTER */}
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
          >
            <h3 className="text-xl font-bold text-[#8B6F47] font-serif">
              Region
            </h3>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                isRegionDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isRegionDropdownOpen && (
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  text={region}
                  variant="region"
                  isSelected={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-12">
        {/* SEARCH */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-[#E8DCC6] focus-within:border-[#8B6F47] transition">
            <Search size={28} className="text-[#8B6F47]" />
            <input
              type="text"
              placeholder="Search stories by languages…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[#8B6F47] placeholder-[#8B6F47]/50 font-serif text-3xl outline-none"
            />
          </div>
        </div>

        {/* STATES */}
        {loading && (
          <p className="text-center text-[#8B6F47] font-serif">
            Loading stories…
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 font-serif">{error}</p>
        )}

        {!loading && stories.length === 0 && (
          <p className="text-center text-gray-400 font-serif">
            No stories found.
          </p>
        )}

        {/* STORIES GRID */}
        {!loading && stories.length > 0 && (
          <section>
            <h2 className="text-4xl font-bold text-[#8B6F47] font-serif mb-8">
              Stories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{
              gridGap : 10
            }}
            >
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  imageSrc={story.coverImage || "/images/indianElder.jpeg"}
                  title={story.title}
                  dialect={story.languageName}
                  region={story.region}
                  description={story.summary}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
