"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FluidBlobProps {
  side?: "right" | "left" | "hero";
  className?: string;
  opacity?: number;
  colorStart?: string;
  colorEnd?: string;
  id?: string;
}

export function FluidBlob({
  side = "right",
  className = "",
  opacity = 1,
  colorStart = "#F0E4C8",
  colorEnd = "#E8D4A8",
  id = "blob",
}: FluidBlobProps) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      className={`absolute pointer-events-none overflow-visible ${className}`}
      style={{ opacity, y, willChange: "transform" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 560 560"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        preserveAspectRatio={side === "hero" ? "xMaxYMid slice" : side === "left" ? "xMinYMid meet" : "xMaxYMid meet"}
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        {side === "right" || side === "hero" ? (
          <path
            d="M 560,280 
               C 560,450 450,560 280,560 
               C 200,560 80,520 60,420
               C 40,320 100,260 120,200
               C 140,140 80,60 200,20
               C 300,-20 560,50 560,280 Z"
            fill={`url(#grad-${id})`}
          />
        ) : (
          <path
            d="M 0,280 
               C 0,450 110,560 280,560 
               C 360,560 480,520 500,420
               C 520,320 460,260 440,200
               C 420,140 480,60 360,20
               C 260,-20 0,50 0,280 Z"
            fill={`url(#grad-${id})`}
          />
        )}
      </svg>
    </motion.div>
  );
}
