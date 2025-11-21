"use client";

import { useLayoutMode } from "@/hooks/useLayoutMode";

export default function BioPanel() {
  const { setMode } = useLayoutMode();

  return (
    <div className="p-10 h-full flex flex-col justify-center">
      <h1 className="text-4xl font-bold">Your Bio</h1>
      <p className="mt-4 text-neutral-600">
        This is your bio panel.
      </p>

      <button
        onClick={() => setMode("projects")}
        className="mt-10 px-4 py-2 bg-blue-600 text-white rounded"
      >
        View Projects
      </button>
    </div>
  );
}
