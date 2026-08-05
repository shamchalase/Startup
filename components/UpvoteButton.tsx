"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";

interface UpvoteButtonProps {
  startupId: string;
  initialUpvotes?: number;
}

export default function UpvoteButton({ startupId, initialUpvotes = 0 }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    try {
      const upvotedList = JSON.parse(localStorage.getItem("upvoted_startups") || "[]");
      if (upvotedList.includes(startupId)) {
        setHasUpvoted(true);
      }
      const customCount = localStorage.getItem(`upvote_count_${startupId}`);
      if (customCount) {
        setUpvotes(parseInt(customCount, 10));
      }
    } catch (e) {
      console.error(e);
    }
  }, [startupId]);

  const handleUpvote = () => {
    try {
      const upvotedList: string[] = JSON.parse(
        localStorage.getItem("upvoted_startups") || "[]"
      );

      let newCount = upvotes;
      let newUpvotedState = false;

      if (hasUpvoted) {
        newCount = Math.max(0, upvotes - 1);
        const updatedList = upvotedList.filter((id) => id !== startupId);
        localStorage.setItem("upvoted_startups", JSON.stringify(updatedList));
      } else {
        newCount = upvotes + 1;
        upvotedList.push(startupId);
        localStorage.setItem("upvoted_startups", JSON.stringify(upvotedList));
        newUpvotedState = true;
      }

      setUpvotes(newCount);
      setHasUpvoted(newUpvotedState);
      localStorage.setItem(`upvote_count_${startupId}`, newCount.toString());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-3 border-black transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none ${
        hasUpvoted
          ? "bg-yellow-400 text-black border-black"
          : "bg-white text-black hover:bg-yellow-100"
      }`}
    >
      <ThumbsUp className={`size-4 ${hasUpvoted ? "fill-black" : ""}`} />
      <span>{hasUpvoted ? "Upvoted" : "Upvote Pitch"}</span>
      <span className="ml-1 px-2 py-0.5 rounded-full bg-black text-white text-xs">
        {upvotes}
      </span>
    </button>
  );
}
