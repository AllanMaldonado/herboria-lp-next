"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";
import { staggerContainer, fadeUp, fadeRight, IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="sobre" className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden snap-start">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative w-full h-auto aspect-square lg:aspect-auto lg:h-full lg:min-h-0 overflow-hidden rounded-3xl bg-secondary/20 shadow-xl border border-border/50"
          >
            <motion.div style={{ y: yImage }} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image
              src={TEXTS.ARTISAN.image.src}
              alt={TEXTS.ARTISAN.image.alt}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={TEXTS.ARTISAN.image.blurDataURL}
              className="object-cover hover:scale-105 transition-transform duration-700 z-10"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            </motion.div>
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
            <SectionHeader
              tag={TEXTS.ARTISAN.tag}
              title={TEXTS.ARTISAN.title}
              titleAccent={TEXTS.ARTISAN.titleAccent}
              subtitle={TEXTS.ARTISAN.subtitle}
              center={false}
              className="mb-5"
            />
            
            <div className="flex flex-col gap-5 mt-4 w-full">
              {TEXTS.ARTISAN.paragraphs.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-4 p-5 sm:p-6 bg-secondary/10 rounded-2xl border border-border/40 shadow-sm items-start">
                  <span className="text-primary text-base sm:text-lg mt-0.5 shrink-0">✦</span>
                  <p className="font-sans text-[15px] sm:text-base text-muted-foreground leading-loose text-left">
                    {p}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
