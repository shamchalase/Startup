"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  startupId: string;
  title: string;
}

export default function BookmarkButton({ startupId, title }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("saved_startups");
      if (saved) {
        const list: string[] = JSON.parse(saved);
        setIsBookmarked(list.includes(startupId));
      }
    } catch (e) {
      console.error(e);
    }
  }, [startupId]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem("saved_startups");
      let list: string[] = saved ? JSON.parse(saved) : [];

      if (list.includes(startupId)) {
        list = list.filter((id) => id !== startupId);
        setIsBookmarked(false);
      } else {
        list.push(startupId);
        setIsBookmarked(true);
      }
      localStorage.setItem("saved_startups", JSON.stringify(list));
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleBookmark}
        title={isBookmarked ? "Remove Bookmark" : "Bookmark Pitch"}
        className={`p-2 rounded-full border-2 border-black transition-all duration-300 ${
          isBookmarked
            ? "bg-black text-yellow-400 scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            : "bg-white text-black hover:bg-yellow-100 hover:scale-105 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <Bookmark className={`size-4 ${isBookmarked ? "fill-yellow-400" : ""}`} />
      </button>

      {copiedToast && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-[10px] font-bold rounded shadow whitespace-nowrap z-20 animate-fade-in">
          {isBookmarked ? "Saved to Bookmarks!" : "Removed from Bookmarks"}
        </span>
      )}
    </div>
  );
}
