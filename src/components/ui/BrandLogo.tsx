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
import { BotanicalEmblem } from "./Icons";
import { cn } from "@/lib/utils";

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
  /** Classes customizadas para o texto principal */
  textClassName?: string;
  /** Classes customizadas para a tagline */
  taglineClassName?: string;
}

// ─── Componente ───────────────────────────────────────────────────
export function BrandLogo({
  className = "",
  iconClassName = "w-9 h-9",
  hideText = false,
  light = false,
  textClassName = "",
  taglineClassName = "",
}: BrandLogoProps) {
  const textColor = light ? "text-white" : "text-foreground";
  const subColor  = light ? "text-white/60" : "text-muted-foreground";

  const textBlock = !hideText && (
    <div className="leading-none text-center md:text-left hidden sm:flex sm:flex-col" aria-hidden="true">
      <span className={cn(`font-heading text-[17px] font-semibold tracking-[0.18em] uppercase block ${textColor}`, textClassName)}>
        {TEXTS.SITE.name}
      </span>
      <span className={cn(`font-sans text-[9px] tracking-[0.22em] uppercase block -mt-0.5 ${subColor}`, taglineClassName)}>
        {TEXTS.SITE.tagline}
      </span>
    </div>
  );

  // ── type: "emblem" ─────────────────────────────────────────────
  if (BRAND_LOGO.type === "emblem") {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        <BotanicalEmblem className={cn(iconClassName, light ? "text-white" : "text-primary", "transition-transform duration-300 group-hover:scale-105")} />
        {textBlock}
      </div>
    );
  }

  // ── type: "image" ──────────────────────────────────────────────
  if (BRAND_LOGO.type === "image") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
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
    <div className={cn("flex flex-col", className)}>
      <span className={cn(`font-heading text-2xl font-semibold tracking-[0.18em] uppercase block ${textColor}`, textClassName)}>
        {TEXTS.SITE.name}
      </span>
      {!hideText && (
        <span className={cn(`font-sans text-[10px] tracking-[0.22em] uppercase block -mt-0.5 ${subColor}`, taglineClassName)}>
          {TEXTS.SITE.tagline}
        </span>
      )}
    </div>
  );
}
