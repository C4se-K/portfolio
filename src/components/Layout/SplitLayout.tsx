"use client";

import { motion } from "framer-motion";
import BioPanel from "../BioPanel/BioPanel";
import ProjectBoard from "../ProjectBoard/ProjectBoard";
import { useLayoutMode } from "@/hooks/useLayoutMode";

export default function SplitLayout() {
  const { mode } = useLayoutMode();

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <motion.div
        animate={{ flexBasis: mode === "projects" ? "80%" : "20%" }}
        transition={{ type: "spring", stiffness: 70 }}
        className="h-full border-r border-neutral-300"
      >
        <BioPanel />
      </motion.div>

      <motion.div
        animate={{ flexBasis: mode === "bio" ? "10%" : "90%" }}
        transition={{ type: "spring", stiffness: 70 }}
        className="h-full"
      >
        <ProjectBoard />
      </motion.div>
    </div>
  );
}
