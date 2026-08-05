"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";

const CATEGORIES = [
  "All",
  "Tech",
  "AI",
  "Education",
  "Health",
  "Finance",
  "SaaS",
  "E-Commerce",
  "Mobile",
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";

  const handleSelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("query");
    } else {
      params.set("query", category.toLowerCase());
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-4 px-2 no-scrollbar">
      <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black/60 mr-2 shrink-0">
        <Sparkles className="size-3.5 text-primary-100" /> Categories:
      </span>
      {CATEGORIES.map((cat) => {
        const isActive =
          (cat === "All" && !currentQuery) ||
          currentQuery.toLowerCase() === cat.toLowerCase();

        return (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 shrink-0 border-2 border-black ${
              isActive
                ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(255,112,67,1)] scale-105"
                : "bg-white text-black hover:bg-yellow-100 hover:scale-102 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
