"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";


import { FluidBlob } from "./FluidBlob";
import { staggerContainer, fadeUp, fadeLeft } from "@/lib/animations";
import { IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { WhatsAppIcon } from "./ui/Icons";

export function GreenCtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section ref={ref} id="galeria" className="relative z-10 py-20 lg:py-32" style={{ background: "var(--primary)" }}>
      {/* Blob original SVG, agora devidamente posicionado e sem overflow hidden no container principal */}
      <FluidBlob
        side="right"
        id="cta-blob"
        className="w-[140vw] h-[140vw] md:w-[90vw] md:h-[90vw] max-w-[1200px] max-h-[1200px] -right-[20%] top-[50%] -translate-y-1/2"
        colorStart="rgba(255,255,255,0.09)"
        colorEnd="rgba(255,255,255,0.02)"
        opacity={1}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texto e Stats */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.span variants={fadeUp} className="font-sans text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase mb-5 block">
              {TEXTS.CTA_SECTION.tag}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight mb-5">
              {TEXTS.CTA_SECTION.title}{" "}
              <em className="not-italic" style={{ color: "rgba(255,255,255,0.70)" }}>
                {TEXTS.CTA_SECTION.titleItalic}
              </em>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-sans text-sm text-white/70 leading-relaxed mb-10 max-w-sm mx-auto lg:mx-0">
              {TEXTS.CTA_SECTION.description}
            </motion.p>
            
            <motion.div variants={fadeUp} className="mb-14 flex items-center justify-center lg:justify-start gap-4">
              <a
                href={TEXTS.CTA_SECTION.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                id="green-cta-whatsapp"
                className="group relative overflow-hidden inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full font-sans font-semibold text-[11px] tracking-[0.18em] uppercase shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                style={{ color: "var(--primary)" }}
              >
                <WhatsAppIcon className="w-4 h-4 relative z-10" />
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
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 pt-8 border-t border-white/15 w-full"
            >
              {TEXTS.CTA_SECTION.stats.slice(0, 2).map((s) => (
                <motion.div key={s.value} variants={fadeUp} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <span className="font-heading text-3xl font-medium text-white block mb-1">{s.value}</span>
                  <span className="font-sans text-[11px] text-white/60 leading-snug uppercase tracking-widest block">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Swiper da Galeria integrado na CTA */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none lg:w-full mx-auto lg:mx-0 lg:ml-auto lg:[clip-path:inset(0_-100vw_0_0)]"
          >
            <div className="relative px-2 lg:px-10 pb-12">
              <Swiper
                modules={[Pagination]}
                slidesPerView="auto"
                spaceBetween={24}
                loop={true}
                pagination={{ el: '.custom-green-pagination', clickable: true }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="green-swiper w-full !px-4 !pt-4 !pb-12 overflow-hidden lg:!overflow-visible"
              >
                {TEXTS.GALLERY.items.map((item, index) => (
                  <SwiperSlide
                    key={`${item.id}-${index}`}
                    className="!w-[85%] lg:!w-[360px] h-auto"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-md border border-white/20 cursor-pointer aspect-[4/5] bg-secondary/20 group h-full">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 380px, 480px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white text-[10px] font-bold tracking-widest uppercase mb-1 font-sans opacity-90 drop-shadow-md">{item.subtitle}</p>
                        <h3 className="text-white font-heading text-2xl mb-1">{item.title}</h3>
                        <p className="text-white/75 text-xs font-sans leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 sm:gap-8 z-50 pointer-events-none w-full">
                <button 
                  onClick={() => swiperRef.current?.slidePrev()} 
                  className="pointer-events-auto w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Anterior"
                  style={{ background: "var(--primary)" }}
                >
                  ←
                </button>
                
                <div className="custom-green-pagination pointer-events-auto flex items-center justify-center gap-2 shrink-0" />
                
                <button 
                  onClick={() => swiperRef.current?.slideNext()} 
                  className="pointer-events-auto w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Próximo"
                  style={{ background: "var(--primary)" }}
                >
                  →
                </button>
              </div>

              <style>{`
                .custom-green-pagination {
                  position: static !important;
                  width: auto !important;
                  transform: none !important;
                  display: flex !important;
                }
                .custom-green-pagination .swiper-pagination-bullet {
                  background: #ffffff !important;
                  opacity: 0.25 !important;
                  width: 8px !important;
                  height: 8px !important;
                  border-radius: 8px !important;
                  transition: all 0.3s ease !important;
                  margin: 0 !important;
                  cursor: pointer;
                }
                .custom-green-pagination .swiper-pagination-bullet-active {
                  background: #ffffff !important;
                  opacity: 1 !important;
                  width: 32px !important;
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
