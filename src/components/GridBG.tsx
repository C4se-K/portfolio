"use client";

import React, { useEffect, useRef } from "react";

type Config = {
  gridCount: number;
  speed: number;
  phaseStrength: number;
  lineWidth: number;
  pauseDuration: number;
};

const config: Config = {
  gridCount: 10,
  speed: 0.0009,
  phaseStrength: 0.05,
  lineWidth: 1,
  pauseDuration: 0.5,
};

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function GridRippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = 0,
      height = 0,
      gridSize = 0;
    let time = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      gridSize = width / config.gridCount;
    }

    function drawCell(
      x: number,
      y: number,
      size: number,
      progress: number
    ) {
      const half = size / 2;

      ctx.beginPath();
      ctx.rect(x - half, y - half, size, size);
      ctx.strokeStyle = "#333333ff";
      ctx.lineWidth = config.lineWidth;
      ctx.stroke();

      if (progress > 0.01) {
        ctx.beginPath();
        ctx.moveTo(x, y - half);
        ctx.lineTo(x, y + half);
        ctx.moveTo(x - half, y);
        ctx.lineTo(x + half, y);
        ctx.strokeStyle = `rgba(255,255,255,${progress})`;
        ctx.stroke();
      }
    }

    function loop() {
      ctx.globalAlpha = 0.35; 
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      const cols = config.gridCount;
      const rows = Math.ceil(height / gridSize) + 6;

      for (let i = 0; i < cols; i++) {
        for (let j = -rows / 2; j <= rows / 2; j++) {
          const dx = i - cols / 2 + 0.5;
          const dy = j;

          const x0 = dx * gridSize;
          const y0 = dy * gridSize;

          const dist = Math.sqrt(dx * dx + dy * dy);

          let t = (time - dist * config.phaseStrength) % 1;
          if (t < 0) t += 1;

          const easedT = ease(t);
          const scale = 1 / Math.pow(2, easedT);

          const x = cx + x0 * scale;
          const y = cy + y0 * scale;
          const size = gridSize * scale;

          if (
            x > -size &&
            x < width + size &&
            y > -size &&
            y < height + size
          ) {
            drawCell(x, y, size, easedT);
          }
        }
      }

      time += config.speed;
      animationRef.current = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block"
    />
  );
}
