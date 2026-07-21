"use client";

/**
 * BackgroundEffect — efeito decorativo de fundo.
 *
 * Componente genérico que substitui o FluidBlob hardcoded.
 * O variant é controlado por src/lib/brand.ts → BRAND_BG_EFFECT.variant
 *
 * Variants:
 *   "blob"  → formas orgânicas fluidas (atual, botânica/beleza)
 *   "glow"  → borrão difuso de luz suave (wellness, SaaS premium)
 *   "grid"  → malha pontilhada estática (tech, fintech)
 *   "none"  → sem efeito (minimalista)
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND_BG_EFFECT } from "@/lib/brand";

interface BackgroundEffectProps {
  side?: "right" | "left" | "hero";
  className?: string;
  /** Override de opacidade — usa brand.ts por padrão */
  opacity?: number;
  /** Override de cor inicial — usa brand.ts por padrão */
  colorStart?: string;
  /** Override de cor final — usa brand.ts por padrão */
  colorEnd?: string;
  /** ID único para gradientes SVG (evita conflitos quando múltiplos na página) */
  id?: string;
  /** Override do variant — usa brand.ts por padrão */
  variant?: "blob" | "glow" | "grid" | "none";
}

export function BackgroundEffect({
  side = "right",
  className = "",
  opacity,
  colorStart,
  colorEnd,
  id = "bg-effect",
  variant,
}: BackgroundEffectProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Resolve valores: prop override > brand.ts
  const resolvedVariant  = variant      ?? BRAND_BG_EFFECT.variant;
  const resolvedOpacity  = opacity      ?? BRAND_BG_EFFECT.opacity;
  const resolvedStart    = colorStart   ?? BRAND_BG_EFFECT.colorStart;
  const resolvedEnd      = colorEnd     ?? BRAND_BG_EFFECT.colorEnd;

  // Variante "none" → renderiza nada
  if (resolvedVariant === "none") return null;

  // ── BLOB ─────────────────────────────────────────────────────────
  if (resolvedVariant === "blob") {
    const blobPath =
      side === "right" || side === "hero"
        ? `M 560,280
           C 560,450 450,560 280,560
           C 200,560 80,520 60,420
           C 40,320 100,260 120,200
           C 140,140 80,60 200,20
           C 300,-20 560,50 560,280 Z`
        : `M 0,280
           C 0,450 110,560 280,560
           C 360,560 480,520 500,420
           C 520,320 460,260 440,200
           C 420,140 480,60 360,20
           C 260,-20 0,50 0,280 Z`;

    return (
      <motion.div
        ref={ref}
        className={`absolute pointer-events-none overflow-visible ${className}`}
        style={{ opacity: resolvedOpacity, y, willChange: "transform" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 560 560"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio={
            side === "hero"
              ? "xMaxYMid slice"
              : side === "left"
              ? "xMinYMid meet"
              : "xMaxYMid meet"
          }
        >
          <defs>
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor={resolvedStart} />
              <stop offset="100%" stopColor={resolvedEnd} />
            </linearGradient>
          </defs>
          <path d={blobPath} fill={`url(#grad-${id})`} />
        </svg>
      </motion.div>
    );
  }

  // ── GLOW ─────────────────────────────────────────────────────────
  if (resolvedVariant === "glow") {
    const glowX = side === "left" ? "15%" : side === "hero" ? "85%" : "85%";
    return (
      <motion.div
        ref={ref}
        className={`absolute pointer-events-none ${className}`}
        style={{ opacity: resolvedOpacity, y, willChange: "transform" }}
        aria-hidden="true"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `radial-gradient(ellipse 70% 60% at ${glowX} 50%, ${resolvedStart}, ${resolvedEnd}, transparent)`,
            filter: "blur(48px)",
          }}
        />
      </motion.div>
    );
  }

  // ── GRID ─────────────────────────────────────────────────────────
  if (resolvedVariant === "grid") {
    return (
      <div
        className={`absolute pointer-events-none ${className}`}
        style={{ opacity: resolvedOpacity }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={`grid-${id}`}
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill={resolvedStart} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
        </svg>
      </div>
    );
  }

  return null;
}
