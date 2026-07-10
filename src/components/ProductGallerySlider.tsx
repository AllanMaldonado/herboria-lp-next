"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { SectionHeader } from "./ui/SectionHeader";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";

export function ProductGallerySlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-background relative gallery-section">
      <div className="relative z-20">
        <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.span variants={fadeUp} className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            {TEXTS.GALLERY.tag}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-3">
            {TEXTS.GALLERY.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm text-muted-foreground max-w-md leading-relaxed">
            {TEXTS.GALLERY.subtitle}
          </motion.p>
        </motion.div>

        <div className="flex items-center gap-3 shrink-0">
          <button id="gallery-prev" onClick={() => swiperRef.current?.slidePrev()} aria-label="Slide anterior"
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-sm">←</button>
          <button id="gallery-next" onClick={() => swiperRef.current?.slideNext()} aria-label="Próximo slide"
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 text-sm">→</button>
        </div>
      </div>

      <div className="w-full pl-6 lg:pl-12">
        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
          modules={[Pagination]}
          spaceBetween={14}
          slidesPerView={1.2}
          loop={TEXTS.GALLERY.items.length > 4}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640:  { slidesPerView: 2.1, spaceBetween: 14 },
            1024: { slidesPerView: 3.1, spaceBetween: 18 },
            1280: { slidesPerView: 4.1, spaceBetween: 18 },
          }}
          className="!pb-12"
        >
          {TEXTS.GALLERY.items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer">
                <Image
                  src={item.img}
                  alt={`${item.title} — ${item.subtitle} | Herboria`}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-5 left-5 right-5 translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white/65 text-[10px] font-medium tracking-widest uppercase mb-1 font-sans">{item.subtitle}</p>
                  <h3 className="text-white font-heading text-xl mb-1">{item.title}</h3>
                  <p className="text-white/60 text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .gallery-section .swiper-pagination { bottom: 0 !important; }
        .gallery-section .swiper-pagination-bullet { background: var(--primary); opacity: .3; width: 7px; height: 7px; }
        .gallery-section .swiper-pagination-bullet-active { opacity: 1; width: 22px; border-radius: 4px; }
      `}</style>
      </div>
    </section>
  );
}
