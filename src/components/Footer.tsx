"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "./ui/Icons";
import { BrandLogo } from "./ui/BrandLogo";
import { TEXTS } from "@/lib/content";
import { trackFooterCTA, trackScrollToFooter } from "@/lib/tracking";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  // S5: trackScrollToFooter — detecta quando o usuário chega ao footer (alto engajamento)
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { trackScrollToFooter(); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative bg-primary overflow-hidden py-12 lg:py-16 border-t border-white/10 snap-start">
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-8 mb-8 md:mb-10">
          {/* Coluna 1: Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" onClick={(e) => { e.preventDefault(); scrollToSection(""); }} className="group mb-4 md:mb-8" aria-label={`${TEXTS.SITE.name} — Voltar ao topo`}>
              <BrandLogo 
                light 
                className="flex-col md:flex-row items-center gap-4" 
                iconClassName="w-16 h-16 sm:w-20 sm:h-20"
                textClassName="text-2xl sm:text-3xl text-center md:text-left"
                taglineClassName="text-[10px] sm:text-[11px] tracking-[0.45em] sm:tracking-[0.5em] text-center md:text-left"
              />
            </Link>
            <p className="font-heading italic text-2xl sm:text-[22px] text-white max-w-sm leading-snug mb-0 md:mb-8">
              {TEXTS.FOOTER.tagline}
            </p>
          </div>

          {/* Coluna 2: Redes Sociais */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.25em] text-white uppercase mb-6">{TEXTS.FOOTER.socialLabel}</p>
            <div className="flex items-center justify-center md:justify-end gap-6">
              <a href={TEXTS.SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors duration-200 focus-visible:outline-white" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href={TEXTS.SITE.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors duration-200 focus-visible:outline-white" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-heading text-2xl lg:text-3xl font-medium text-white mb-3">
              {TEXTS.FOOTER.cta.title} <em className="not-italic text-white">{TEXTS.FOOTER.cta.titleAccent}</em>
            </h2>
            <p className="font-sans text-sm text-white/90 leading-relaxed">
              {TEXTS.FOOTER.cta.subtitle}
            </p>
          </div>
          <a
            href={TEXTS.FOOTER.cta.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Receber catálogo ${TEXTS.SITE.name} pelo WhatsApp`}
            onClick={trackFooterCTA}
            className="shrink-0 inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-sans font-semibold text-[11px] tracking-[0.18em] uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 whitespace-nowrap"
            style={{ color: "var(--primary)" }}
          >
            <WhatsAppIcon className="w-4 h-4" />
            {TEXTS.FOOTER.cta.cta}
          </a>
        </div>

        {/* Linha Inferior: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-white tracking-wider text-center md:text-left leading-relaxed">
            {TEXTS.FOOTER.copyright}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-1.5 sm:gap-4 mt-4 md:mt-0">
             <a href="https://allanmaldonado.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white hover:text-white transition-colors" aria-label="Desenvolvido por Allan Maldonado">
               <span className="font-sans text-[11px] tracking-wider">Desenvolvido por</span>
               <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
