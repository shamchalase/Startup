"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  startupId: string;
  title: string;
}

export default function ShareButton({ startupId, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/startup/${startupId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        title="Share Startup Pitch"
        className="p-2 rounded-full border-2 border-black bg-white text-black hover:bg-yellow-100 transition-all duration-300 hover:scale-105 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <Share2 className="size-4" />
        )}
      </button>

      {copied && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black text-white text-[10px] font-bold rounded shadow whitespace-nowrap z-20 animate-fade-in">
          Link Copied!
        </span>
      )}
    </div>
  );
}
