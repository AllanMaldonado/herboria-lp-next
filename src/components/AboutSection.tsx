"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp, fadeRight } from "@/lib/animations";
import { IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section ref={ref} id="sobre" className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-[2rem] bg-secondary/20 shadow-2xl border border-border/50"
          >
            <Image
              src={TEXTS.ARTISAN.image.src}
              alt={TEXTS.ARTISAN.image.alt}
              fill
              loading="lazy"
              className="object-cover hover:scale-105 transition-transform duration-700 z-10"
              sizes="(max-width: 768px) 90vw, 400px"
            />
            <motion.div
              initial={{ x: "0%" }}
              animate={inView ? { x: "100%" } : { x: "0%" }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 bg-background z-20"
            />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <motion.span variants={fadeUp} className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
              {TEXTS.ARTISAN.tag}
            </motion.span>
            
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-5 leading-tight">
              {TEXTS.ARTISAN.title}{" "}
              <em className="text-primary not-italic">{TEXTS.ARTISAN.titleAccent}</em>
            </motion.h2>
            
            <motion.p variants={fadeUp} className="font-sans text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              {TEXTS.ARTISAN.subtitle}
            </motion.p>
            
            <div className="space-y-6">
              {TEXTS.ARTISAN.paragraphs.map((p, i) => (
                <motion.p key={i} variants={fadeUp} className="font-sans text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {p}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
