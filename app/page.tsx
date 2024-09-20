"use client"
import { useState } from "react";
import NewsCopilot from "@/components/NewsCopilot";
import AdvanceCopilot from "@/components/AdvanceCopilot";

export default function Home() {
  const [currentCopilot, setCurrentCopilot] = useState<"news" | "advance">("news");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setCurrentCopilot("news")}
          className={`px-4 py-2 rounded ${currentCopilot === "news" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
        >
          News Copilot
        </button>
        <button
          onClick={() => setCurrentCopilot("advance")}
          className={`px-4 py-2 rounded ${currentCopilot === "advance" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
        >
          Advance Copilot
        </button>
      </div>
      {currentCopilot === "news" ? <NewsCopilot /> : <AdvanceCopilot />}
    </div>
  );
}
