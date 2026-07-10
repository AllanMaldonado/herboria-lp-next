"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

import { staggerContainer, fadeUp } from "@/lib/animations";
import { IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { StarIcon } from "./ui/Icons";

function Stars() {
  return (
    <div className="flex gap-1 mb-4" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function TestimonialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-secondary/10">
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            {TEXTS.TESTIMONIALS.tag}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-5">
            {TEXTS.TESTIMONIALS.title}{" "}
            <em className="text-primary not-italic">{TEXTS.TESTIMONIALS.titleAccent}</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {TEXTS.TESTIMONIALS.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative px-2 lg:px-10"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={32}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="w-full !px-4 !pt-8 !pb-16"
          >
            {[...TEXTS.TESTIMONIALS.items, ...TEXTS.TESTIMONIALS.items].map((t, index) => (
              <SwiperSlide key={`${t.id}-${index}`} className="h-auto">
                <div className="bg-white border border-border/30 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <Stars />
                  <p className="font-heading italic text-base lg:text-lg text-foreground/90 leading-relaxed flex-grow mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="rounded-full object-cover border-2 border-primary/10"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-foreground leading-none mb-1">{t.name}</p>
                      <p className="font-sans text-[9px] text-primary tracking-widest uppercase">{t.tag}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-32 z-50 pointer-events-none">
            <button 
              onClick={() => swiperRef.current?.slidePrev()} 
              className="pointer-events-auto w-10 h-10 rounded-full border border-primary/20 text-primary flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer bg-background"
              aria-label="Anterior"
            >
              ←
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()} 
              className="pointer-events-auto w-10 h-10 rounded-full border border-primary/20 text-primary flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer bg-background"
              aria-label="Próximo"
            >
              →
            </button>
          </div>

          <style>{`
            .swiper-pagination {
              bottom: 16px !important;
              z-index: 40 !important;
            }
            .swiper-pagination-bullet {
              background: var(--primary) !important;
              opacity: 0.25 !important;
              width: 8px !important;
              height: 8px !important;
              border-radius: 8px !important;
              transition: all 0.3s ease !important;
            }
            .swiper-pagination-bullet-active {
              background: var(--primary) !important;
              opacity: 1 !important;
              width: 32px !important;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
