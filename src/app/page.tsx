// 💡 [React 19 / Next.js] Diretiva 'use client' informa ao React que este componente 
// precisa de interatividade (hooks como useRef, useEffect, framer-motion) e deve ser renderizado no cliente.
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedHeroContent } from "@/components/AnimatedHeroContent";
import { HeroImages } from "@/components/HeroImages";
import { BenefitsSection } from "@/components/BenefitsSection";
import { BackgroundEffect } from "@/components/BackgroundEffect";

import { CollectionsSection } from "@/components/CollectionsSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { GreenCtaSection } from "@/components/GreenCtaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FaqSection } from "@/components/FaqSection";
import { StarRating } from "@/components/ui/Icons";
import { staggerContainer, fadeUp, IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";



function TrustBar() {
  // 💡 [React] useRef cria uma referência mutável que não causa re-render.
  // 💡 [Framer Motion / Hooks] hooks só funcionam em Client Components.
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section
      ref={ref}
      aria-label="Indicadores de confiança"
      className="relative z-40 mx-auto w-full max-w-7xl border-t border-b sm:border-b-0 border-border/40 px-6 py-10 lg:py-20 lg:px-12"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8"
      >
        {/* Clientes */}
        <motion.div variants={fadeUp} className="sm:border-r border-border/40 sm:pr-10 flex flex-col items-center sm:items-start text-center sm:text-left">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 12, delay: 0.1 }}
            className="font-heading text-4xl font-medium text-foreground block mb-2"
          >
            {TEXTS.TRUST.clients.highlight}
          </motion.span>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">{TEXTS.TRUST.clients.text}</p>
        </motion.div>

        {/* Vendas */}
        <motion.div variants={fadeUp} className="sm:border-r border-border/40 sm:px-10 flex flex-col items-center sm:items-start text-center sm:text-left">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="font-heading text-4xl font-medium text-foreground block mb-2"
          >
            {TEXTS.TRUST.sales.value}
          </motion.span>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">{TEXTS.TRUST.sales.label}</p>
        </motion.div>

        {/* Rating */}
        <motion.div variants={fadeUp} className="sm:pl-10 flex flex-col items-center sm:items-start text-center sm:text-left">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 12, delay: 0.3 }}
            className="font-heading text-4xl font-medium text-foreground block mb-2"
          >
            {TEXTS.TRUST.rating.value}
          </motion.span>
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">{TEXTS.TRUST.rating.label}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.022] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
      />

      <main id="main-content" className="relative flex min-h-screen flex-col bg-background overflow-x-hidden">

        {/* ── TEXTS.HERO & TRUST BAR (Desktop Auto-Center Group) ── */}
        <div className="lg:min-h-[100dvh] flex flex-col snap-start">
          <div className="my-auto w-full flex flex-col">
            <section
              aria-label={TEXTS.SITE_META.ariaHero}
              className="relative z-30 pt-28 pb-16 lg:pt-0 lg:pb-0"
            >
              <BackgroundEffect
                side="hero"
                id="hero-blob"
                className="top-0 -right-[40%] w-[120vw] h-[120vw] sm:-right-[15%] sm:w-[90vw] md:-right-[15%] md:w-[50vw] md:h-[135%] max-w-[1000px] translate-x-12 md:translate-x-8"
                colorStart="#F0E4C8"
                colorEnd="#EDD5AC"
                opacity={0.45}
              />
              <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-24 px-6 lg:px-12 items-center min-h-[50vh] lg:min-h-[550px]">
                <AnimatedHeroContent />
                <HeroImages />
              </div>
            </section>

            {/* ── TEXTS.TRUST BAR ── */}
            <TrustBar />
          </div>
        </div>

        {/* ── TEXTS.BENEFITS ── */}
        <BenefitsSection />

        {/* ── COLLECTIONS ── */}
        <CollectionsSection />

        {/* ── ABOUT TEXTS.ARTISAN ── */}
        <AboutSection />

        {/* ── GREEN CTA ── */}
        <GreenCtaSection />

        {/* ── TEXTS.TESTIMONIALS ── */}
        <TestimonialSection />

        {/* ── TEXTS.FAQ ── */}
        <FaqSection />

      </main>

      <Footer />
    </>
  );
}
