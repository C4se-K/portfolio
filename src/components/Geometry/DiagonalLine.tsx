
import {useRef } from "react";

interface DiagonalLineProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

export default function DiagonalLine({
  className = "",
  stroke = "currentColor",
  strokeWidth = 2,
}: DiagonalLineProps) {

  return (
    <svg
      className={className}
      width="1309" height="534"
      viewBox="0 0 791 508"
      fill="none"
    >
      <path 
        d="M0.5 257.5H707.5V0.5H1101.5V533.5H1308.5" 
        stroke-linecap="round" 
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
