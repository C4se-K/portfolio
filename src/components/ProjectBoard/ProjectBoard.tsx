"use client";

import { useLayoutMode } from "@/hooks/useLayoutMode";

export default function ProjectBoard() {
  const { setMode } = useLayoutMode();

  return (
    <div className="p-10 h-full flex flex-col justify-center">
      <h2 className="text-3xl font-semibold">Projects</h2>

      <button
        onClick={() => setMode("bio")}
        className="mt-10 px-4 py-2 bg-neutral-800 text-white rounded"
      >
        Back to Bio
      </button>
    </div>
  );
}
