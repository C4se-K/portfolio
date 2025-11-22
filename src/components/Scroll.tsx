"use client";

import { useEffect, useState } from "react";

/* ---------------------------------------------
   1. BASE RECT STATES (A, C, E)
--------------------------------------------- */

type RectState = { w: number; h: number; x: number; y: number };

const STATES = {
  A: { w: 35, h: 130, x: 15, y: 30 }, // section 1
  C: { w: 90, h: 60,  x: 5,  y: 15  }, // section 2
  E: { w: 50, h: 45,  x: 25, y: 30  }, // section 3
};

/* ---------------------------------------------
   2. CARD STACK OFFSETS PER STATE
   3 cards, each with its own scale + offset
--------------------------------------------- */
const CARD_OFFSETS = {
  A: [
    { scale: 1.00, x: 0,  y: 0  },
    { scale: 0.94, x: -2,  y: 2  },
    { scale: 0.88, x: -4,  y: 4  },
  ],
  C: [
    { scale: 1.00, x: -2, y: 1  },
    { scale: 0.94, x: 1,  y: 3  },
    { scale: 0.88, x: 5,  y: 5  },
  ],
  E: [
    { scale: 1.00, x: 0,  y: 0  },
    { scale: 0.94, x: -1, y: 1  },
    { scale: 0.88, x: -2, y: 2  },
  ],
};

/* ---------------------------------------------
   3. TRANSITION WINDOW (short + snappy)
--------------------------------------------- */
const TRANSITION_WINDOW = 0.18;

/* ---------------------------------------------
   4. HELPERS
--------------------------------------------- */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

const interpolate = (a: RectState, b: RectState, t: number): RectState => ({
  w: a.w + (b.w - a.w) * t,
  h: a.h + (b.h - a.h) * t,
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

const interpolateCard = (a: any[], b: any[], t: number) =>
  a.map((A, i) => ({
    scale: A.scale + (b[i].scale - A.scale) * t,
    x: A.x + (b[i].x - A.x) * t,
    y: A.y + (b[i].y - A.y) * t,
  }));

/* ---------------------------------------------
   MAIN COMPONENT
--------------------------------------------- */

export default function Scroll() {
  const [rect, setRect] = useState<RectState>(STATES.A);
  const [cardOffsets, setCardOffsets] = useState(CARD_OFFSETS.A);
  const [frozenTransform, setFrozenTransform] = useState<string | null>(null);


  const [checkpoints, setCheckpoints] = useState<{
    sec1Bottom: number;
    sec2Bottom: number;
    transitionSize: number;
  } | null>(null);

  /* -----------------------------------------------------
     DOM-SAFE SECTION MEASUREMENT (Bulletproof)
  ----------------------------------------------------- */
  useEffect(() => {
    const tryMeasure = () => {
      const s1 = document.querySelector("#greeting");
      const s2 = document.querySelector("#projects");
      const s3 = document.querySelector("#contacts");

      if (!(s1 && s2 && s3)) {
        requestAnimationFrame(tryMeasure);
        return;
      }

      const vh = window.innerHeight;
      const EARLY = window.innerHeight * 0.50; 

      const sec1Bottom =
        s1.getBoundingClientRect().top + window.scrollY + s1.clientHeight - EARLY;

      const sec2Bottom =
        s2.getBoundingClientRect().top + window.scrollY + s2.clientHeight;

      setCheckpoints({
        sec1Bottom,
        sec2Bottom,
        transitionSize: vh * TRANSITION_WINDOW,
      });
    };

    requestAnimationFrame(tryMeasure);
    window.addEventListener("resize", tryMeasure);

    return () => window.removeEventListener("resize", tryMeasure);
  }, []);

  /* -----------------------------------------------------
     SCROLL LOGIC (A → B → C → D → E)
  ----------------------------------------------------- */
  useEffect(() => {
    if (!checkpoints) return;

    const { sec1Bottom, sec2Bottom, transitionSize } = checkpoints;

    const onScroll = () => {
      const y = window.scrollY;

      // --------- A (static) ----------
      if (y < sec1Bottom) {
        setRect(STATES.A);
        setFrozenTransform(`
          translate(${STATES.A.x}vw, ${STATES.A.y}vh)
        `);
      }

      // --------- B (A→C transition) ----------
      if (y < sec1Bottom + transitionSize) {
        setFrozenTransform(null);
        const t = easeOutQuint(
          clamp01((y - sec1Bottom) / transitionSize)
        );
        setRect(interpolate(STATES.A, STATES.C, t));
        setCardOffsets(interpolateCard(CARD_OFFSETS.A, CARD_OFFSETS.C, t));
        return;
      }

      // --------- C (static) ----------
      if (y < sec2Bottom) {
        setRect(STATES.C);
        setFrozenTransform(`
          translate(${STATES.C.x}vw, ${STATES.C.y}vh)
        `);
      }

      // --------- D (C→E transition) ----------
      if (y < sec2Bottom + transitionSize) {
        setFrozenTransform(null);
        const t = easeOutQuint(
          clamp01((y - sec2Bottom) / transitionSize)
        );
        setRect(interpolate(STATES.C, STATES.E, t));
        setCardOffsets(interpolateCard(CARD_OFFSETS.C, CARD_OFFSETS.E, t));
        return;
      }

      // --------- E (static) ----------
      setRect(STATES.E);
      setFrozenTransform(`
        translate(${STATES.E.x}vw, ${STATES.E.y}vh)
      `);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [checkpoints]);

  /* -----------------------------------------------------
     RENDER 3D CARD STACK
  ----------------------------------------------------- */

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
         style={{ 
          transformOrigin: "center center",
          perspectiveOrigin: "0% 50%", 
          perspective: "2000px" }}
    >
      {cardOffsets.map((card, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 rounded-3xl"
          style={{
            
            backgroundColor: "rgb(37 99 235)",
            width: `${rect.w * card.scale}vw`,
            height: `${rect.h * card.scale}vh`,
            
            transform: `
              
              translate(${rect.x + card.x}vw, ${rect.y - card.y}vh)
              rotateX(10deg)
              rotateY(${-i * 4}deg)
              translateZ(${-i * 50}px)
              
            `,
            transition: "width 0.25s, height 0.25s, transform 0.35s cubic-bezier(.16,1,.3,1)",
            boxShadow: `0 ${6 + i * 4}px ${20 + i * 6}px rgba(0,0,0,0.15)`
          }}
        />
      ))}
    </div>
  );
}
