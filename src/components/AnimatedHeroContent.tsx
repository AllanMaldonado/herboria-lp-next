// 💡 [React 19 / Next.js] Framer Motion depende intimamente da árvore de renderização do DOM
// no cliente e do 'window', por isso é obrigatório o uso de 'use client' aqui.
"use client";

import { TEXTS } from "@/lib/content";
import { WhatsAppIcon } from "./ui/Icons";
import { trackHeroCTA } from "@/lib/tracking";

export function AnimatedHeroContent() {
  return (
    <div
      className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both"
    >
      {/* Eyebrow */}
      <p
        className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-5 block"
      >
        {TEXTS.HERO.eyebrow}
      </p>

      {/* 💡 [SEO / HTML Semântico] Uso de apenas um <h1> por página, seguindo as melhores práticas de SEO. */}
      {/* Título principal — h1 único da página */}
      <h1
        className="font-heading font-light text-[#2D3B1F] tracking-widest leading-[1.1] mb-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
      >
        {TEXTS.HERO.title}
      </h1>

      {/* Descrição — copy persuasivo */}
      <p
        className="font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-[480px] mb-10 mx-auto lg:mx-0 px-2 lg:px-0"
      >
        {TEXTS.HERO.description}
      </p>

      {/* CTA e Frase de Apoio */}
      <div className="flex flex-col items-center">
        <a
          href={TEXTS.HERO.ctaHref}
          id="hero-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackHeroCTA}
          className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-sans font-semibold text-xs tracking-[0.18em] uppercase px-10 py-5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 active:scale-[0.98] shadow-xl shadow-primary/30 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        >
          <WhatsAppIcon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
          {TEXTS.HERO.cta}
        </a>

        <p className="mt-4 text-[11px] sm:text-xs font-medium text-muted-foreground/80 tracking-wide italic">
          {TEXTS.HERO.ctaHelper}
        </p>
      </div>
    </div>
  );
}
