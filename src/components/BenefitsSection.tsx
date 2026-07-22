"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import { SectionHeader } from "./ui/SectionHeader";
import { staggerContainer, fadeUp, fadeRight, IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { WhatsAppIcon } from "./ui/Icons";
import { trackBenefitsCTA } from "@/lib/tracking";
import { scrollToSection } from "@/lib/utils";

export function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="beneficios" ref={ref} className="relative z-10 py-20 lg:py-32 bg-background snap-start">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Imagem */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative w-full h-auto aspect-square lg:aspect-auto lg:min-h-[500px] overflow-hidden rounded-3xl bg-secondary/20 order-2 lg:order-1 mt-8 lg:mt-0 shadow-xl border border-border/50"
          >
            <Image
              src={TEXTS.BENEFITS.image.src}
              alt={TEXTS.BENEFITS.image.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Badge */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg border border-border/20">
              <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{TEXTS.BENEFITS.badge.label}</p>
              <p className="font-heading text-base font-medium text-primary">{TEXTS.BENEFITS.badge.value}</p>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-1 lg:order-2"
          >
            <SectionHeader
              tag={TEXTS.BENEFITS.tag}
              title={TEXTS.BENEFITS.title}
              titleAccent={TEXTS.BENEFITS.titleAccent}
              center={false}
              className="mb-2 lg:mb-2"
            />

            <div className="flex flex-col gap-4 mt-2 mb-8 w-full">
              {TEXTS.BENEFITS.paragraphs.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 bg-secondary/10 p-5 rounded-2xl border border-border/30">
                  <span className="text-primary text-xl leading-none mt-0.5">✦</span>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground text-left">
                    {p}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-6">
              <a
                href={TEXTS.BENEFITS.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  trackBenefitsCTA();
                  if (TEXTS.BENEFITS.ctaHref.startsWith('#')) {
                    e.preventDefault();
                    const targetId = TEXTS.BENEFITS.ctaHref.replace('#', '');
                    scrollToSection(targetId);
                  }
                }}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-sans font-semibold text-xs tracking-[0.18em] uppercase px-9 py-4 rounded-full transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {TEXTS.BENEFITS.cta}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
