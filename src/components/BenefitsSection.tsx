"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import { SectionHeader } from "./ui/SectionHeader";
import { staggerContainer, fadeUp, fadeRight } from "@/lib/animations";
import { IN_VIEW_OPTIONS, fadeUpDelayed } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { WhatsAppIcon } from "./ui/Icons";

export function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="beneficios" ref={ref} className="relative z-10 py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Imagem */}
          <motion.div
            style={{ y: yImage }}
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl bg-secondary/20 order-1"
          >
            <Image
              src={TEXTS.BENEFITS.image.src}
              alt={TEXTS.BENEFITS.image.alt}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 440px"
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
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-2"
          >
            <motion.span variants={fadeUp} className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-5 block">
              {TEXTS.BENEFITS.tag}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-5 leading-tight">
              {TEXTS.BENEFITS.title}
              <em className="text-primary not-italic">{TEXTS.BENEFITS.titleAccent}</em>
            </motion.h2>

            {TEXTS.BENEFITS.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="font-sans text-sm leading-relaxed text-muted-foreground mb-4 max-w-sm mx-auto lg:mx-0">
                {p}
              </motion.p>
            ))}

            <motion.div variants={fadeUp} className="mt-6">
              <a
                href={TEXTS.BENEFITS.ctaHref}
                onClick={(e) => {
                  if (TEXTS.BENEFITS.ctaHref.startsWith('#')) {
                    e.preventDefault();
                    const targetId = TEXTS.BENEFITS.ctaHref.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
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
