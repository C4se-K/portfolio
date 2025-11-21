import { create } from "zustand";

type Mode = "bio" | "projects";

export const useLayoutMode = create<{
  mode: Mode;
  setMode: (m: Mode) => void;
}>((set) => ({
  mode: "bio",
  setMode: (m) => set({ mode: m }),
}));
