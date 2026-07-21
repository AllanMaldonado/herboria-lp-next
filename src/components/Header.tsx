"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BotanicalEmblem, WhatsAppIcon } from "./ui/Icons";
import { TEXTS } from "@/lib/content";
import { useState, useEffect } from "react";

export function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsAtTop(currentScrollY < heroHeight);

      if (currentScrollY < heroHeight) {
        setIsVisible(false);
      } else {
        const diff = currentScrollY - lastScrollY;
        if (diff > 15) {
          // Scrolling down significantly
          setIsVisible(false);
        } else if (diff < -15) {
          // Scrolling up significantly
          setIsVisible(true);
        }
        // If difference is small (bounce), do nothing and keep current state.
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`top-0 left-0 right-0 z-50 w-full transition-all duration-300 absolute md:fixed bg-transparent md:bg-background/95 md:backdrop-blur-md md:shadow-sm py-5 md:py-2 ${
        !isAtTop && isVisible ? "translate-y-0" : "translate-y-0 md:-translate-y-full"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 transition-all duration-300">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Herboria — Página inicial">
            <BotanicalEmblem className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-105" />
            <div className="leading-none text-center md:text-left hidden sm:flex sm:flex-col gap-1.5">
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.5em] text-muted-foreground uppercase block ml-1">
                {TEXTS.SITE.tagline}
              </span>
              <span className="font-heading text-[17px] font-semibold tracking-[0.18em] text-foreground uppercase block">
                {TEXTS.SITE.name}
              </span>
            </div>
          </Link>
        </div>

        {/* Navegação */}
        <nav className="hidden lg:flex items-center justify-center gap-8" aria-label="Navegação principal">
          {TEXTS.NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const targetId = link.href.replace('/#', '').replace('#', '');
                if (!targetId) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  return;
                }
                const element = document.getElementById(targetId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="font-sans text-[13px] font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        {/* CTA */}
        <div className="hidden md:flex flex-1 justify-end">
          <a
            href={TEXTS.HERO.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sans font-semibold text-[10px] sm:text-xs tracking-[0.18em] uppercase px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{TEXTS.HERO.cta}</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}

