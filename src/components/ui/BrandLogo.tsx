"use client";

/**
 * BrandLogo — Componente genérico de logo da marca.
 *
 * Lê BRAND_LOGO de src/lib/brand.ts para decidir qual logo exibir.
 * Isso desacopla o logo da Herboria do Header e Footer, permitindo
 * trocar para qualquer outra marca sem alterar esses componentes.
 *
 * Modes:
 *   "emblem" → SVG inline atual (BotanicalEmblem da Herboria)
 *   "image"  → <img> ou next/image com src de BRAND_LOGO.imageSrc
 *   "text"   → apenas texto (nome da marca em fonte heading)
 */

import Image from "next/image";
import { BRAND_LOGO } from "@/lib/brand";
import { TEXTS } from "@/lib/content";

// ─── Emblem interno (específico da Herboria) ───────────────────────
// Quando você criar uma nova LP, este SVG fica aqui mas não será
// utilizado se BRAND_LOGO.type !== "emblem".
function BotanicalEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M20 8C20 8 26.5 14 26.5 20C26.5 26 20 30.5 20 30.5C20 30.5 13.5 26 13.5 20C13.5 14 20 8 20 8Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <line x1="20" y1="8.5" x2="20" y2="29.5" stroke="currentColor" strokeWidth="0.7" />
      {[14, 18, 22].map((y) => (
        <g key={y}>
          <path d={`M20 ${y}C18 ${y-2} 15 ${y-2} 14 ${y-1}`} stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
          <path d={`M20 ${y}C22 ${y-2} 25 ${y-2} 26 ${y-1}`} stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

// ─── Props ────────────────────────────────────────────────────────
interface BrandLogoProps {
  /** Classes aplicadas ao container do logo */
  className?: string;
  /** Classes aplicadas ao SVG/imagem (para tamanho e cor) */
  iconClassName?: string;
  /** Se true, esconde o nome textual da marca (útil no mobile) */
  hideText?: boolean;
  /** Cor do texto (usa currentColor por padrão) */
  light?: boolean;
}

// ─── Componente ───────────────────────────────────────────────────
export function BrandLogo({
  className = "",
  iconClassName = "w-9 h-9",
  hideText = false,
  light = false,
}: BrandLogoProps) {
  const textColor = light ? "text-white" : "text-foreground";
  const subColor  = light ? "text-white/60" : "text-muted-foreground";

  const textBlock = !hideText && (
    <div className="leading-none text-center md:text-left hidden sm:flex sm:flex-col" aria-hidden="true">
      <span className={`font-heading text-[17px] font-semibold tracking-[0.18em] uppercase block ${textColor}`}>
        {TEXTS.SITE.name}
      </span>
      <span className={`font-sans text-[9px] tracking-[0.22em] uppercase block -mt-0.5 ${subColor}`}>
        {TEXTS.SITE.tagline}
      </span>
    </div>
  );

  // ── type: "emblem" ─────────────────────────────────────────────
  if (BRAND_LOGO.type === "emblem") {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <BotanicalEmblem className={`${iconClassName} ${light ? "text-white" : "text-primary"} transition-transform duration-300 group-hover:scale-105`} />
        {textBlock}
      </div>
    );
  }

  // ── type: "image" ──────────────────────────────────────────────
  if (BRAND_LOGO.type === "image") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Image
          src={BRAND_LOGO.imageSrc}
          alt={TEXTS.SITE.name}
          width={BRAND_LOGO.imageWidth}
          height={BRAND_LOGO.imageHeight}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
        {textBlock}
      </div>
    );
  }

  // ── type: "text" ───────────────────────────────────────────────
  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`font-heading text-2xl font-semibold tracking-[0.18em] uppercase block ${textColor}`}>
        {TEXTS.SITE.name}
      </span>
      {!hideText && (
        <span className={`font-sans text-[10px] tracking-[0.22em] uppercase block -mt-0.5 ${subColor}`}>
          {TEXTS.SITE.tagline}
        </span>
      )}
    </div>
  );
}
