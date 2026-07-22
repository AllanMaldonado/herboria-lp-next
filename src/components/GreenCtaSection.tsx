"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

import { BackgroundEffect } from "./BackgroundEffect";
import { SectionHeader } from "./ui/SectionHeader";
import { staggerContainer, fadeUp, fadeLeft, IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { WhatsAppIcon } from "./ui/Icons";
import { trackGreenCTA } from "@/lib/tracking";

export function GreenCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section ref={ref} id="galeria" className="relative z-10 py-20 lg:py-32 snap-start" style={{ background: "var(--primary)" }}>
      {/* Efeito de fundo decorativo genérico, adaptado para o CTA */}
      <BackgroundEffect
        side="right"
        id="cta-bg-effect"
        className="w-[140vw] h-[140vw] md:w-[90vw] md:h-[90vw] max-w-[1200px] max-h-[1200px] -right-[20%] top-[50%] -translate-y-1/2"
        colorStart="rgba(255,255,255,0.09)"
        colorEnd="rgba(255,255,255,0.02)"
        opacity={1}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Texto e Stats */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          >
            <SectionHeader
              tag={TEXTS.CTA_SECTION.tag}
              title={TEXTS.CTA_SECTION.title}
              titleAccent={TEXTS.CTA_SECTION.titleItalic}
              subtitle={TEXTS.CTA_SECTION.description}
              light={true}
              center={false}
              className="mb-8"
            />
            
            <motion.div variants={fadeUp} className="mb-12">

              <a
                href={TEXTS.CTA_SECTION.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                id="green-cta-whatsapp"
                onClick={trackGreenCTA}
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-sans font-semibold text-xs tracking-[0.18em] uppercase shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                style={{ color: "var(--primary)" }}
              >
                <WhatsAppIcon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{TEXTS.CTA_SECTION.cta}</span>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3.5, ease: "easeInOut" }}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12"
                />
              </a>
            </motion.div>

            {/* Stats compactos */}
            <motion.div
              variants={staggerContainer(0.1)}
              className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/15 w-full"
            >
              {TEXTS.CTA_SECTION.stats.slice(0, 2).map((s) => (
                <motion.div key={s.value} variants={fadeUp} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="font-heading text-3xl font-medium text-white block mb-1">{s.value}</span>
                  <span className="font-sans text-[11px] text-white/80 leading-snug uppercase tracking-widest block">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Bento Grid Visual (Menos texto, mais produto) */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="hidden lg:grid w-full lg:max-w-none mx-auto lg:h-[550px] grid-cols-2 gap-4 mt-0"
          >
            {/* Foto Grande Esquerda (Única no Mobile) */}
            <div className="relative rounded-2xl overflow-hidden col-span-1 row-span-1 lg:row-span-2 group shadow-xl border border-white/10">
              <Image
                src={TEXTS.GALLERY.items[0].img.src}
                placeholder="blur"
                blurDataURL={TEXTS.GALLERY.items[0].img.blurDataURL}
                alt={TEXTS.GALLERY.items[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 90vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white/80 text-[9px] uppercase tracking-widest block mb-0.5">{TEXTS.GALLERY.items[0].subtitle}</span>
                <span className="text-white font-heading text-xl leading-tight">{TEXTS.GALLERY.items[0].title}</span>
              </div>
            </div>

            {/* Foto Superior Direita (Só no Desktop) */}
            <div className="hidden lg:block relative rounded-2xl overflow-hidden col-span-1 row-span-1 group shadow-xl border border-white/10">
              <Image
                src={TEXTS.GALLERY.items[1].img.src}
                placeholder="blur"
                blurDataURL={TEXTS.GALLERY.items[1].img.blurDataURL}
                alt={TEXTS.GALLERY.items[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white/80 text-[9px] uppercase tracking-widest block mb-0.5">{TEXTS.GALLERY.items[1].subtitle}</span>
                <span className="text-white font-heading text-lg leading-tight">{TEXTS.GALLERY.items[1].title}</span>
              </div>
            </div>

            {/* Foto Inferior Direita (Só no Desktop) */}
            <div className="hidden lg:block relative rounded-2xl overflow-hidden col-span-1 row-span-1 group shadow-xl border border-white/10">
              <Image
                src={TEXTS.GALLERY.items[2].img.src}
                placeholder="blur"
                blurDataURL={TEXTS.GALLERY.items[2].img.blurDataURL}
                alt={TEXTS.GALLERY.items[2].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white/80 text-[9px] uppercase tracking-widest block mb-0.5">{TEXTS.GALLERY.items[2].subtitle}</span>
                <span className="text-white font-heading text-lg leading-tight">{TEXTS.GALLERY.items[2].title}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
