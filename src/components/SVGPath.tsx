"use client";
import { useRef, useEffect } from "react";

export default function SVGPath() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    // Set up dash pattern for a single moving segment
    const segmentLength = length * 1; // visible portion (20% of full path)
    const gapLength = length;          // large gap so only one segment is visible

    path.style.strokeDasharray = `${segmentLength} ${gapLength}`;
    path.style.strokeDashoffset = `${length}`;

    const update = () => {
      const scrollY = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--scroll") || "0"
      );

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const rawProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Move the dash from start (progress=0) to end (progress=1)
      const offset = (1 - progress) * length;
      path.style.strokeDashoffset = `${offset}`;
    };

    update(); // initial position

    const interval = setInterval(update, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <svg className=""
  viewBox="0 0 888 1279"
  preserveAspectRatio="xMinYMin meet"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
    zIndex: -1,
  }}
>
      <path
        className="stroke-blue-600"
        ref={pathRef}
        d="M275.803 0.496704C483.803 24.4967 522.803 319.283 701.803 408.283C880.803 497.283 900.035 421.283 881.803 383.497C863.571 345.71 829.11 356.375 798.803 408.283C750.803 490.497 736.803 556.497 632.803 595.497C528.803 634.497 108.803 646.497 41.803 742.497C-27.3146 841.531 2.80303 956.497 41.803 1026.5C96.2287 1124.18 164.134 1190.82 337.803 1262.5C463.803 1314.5 574.136 1211.5 604.803 1154.5C652.803 1034.5 508.803 900.487 384.803 965.497C305.803 1006.91 301.803 1155.5 366.803 1165.5"
        stroke="black"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}
