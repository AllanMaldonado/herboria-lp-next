"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { StarIcon } from "./ui/Icons";

function Stars() {
  return (
    <div className="flex gap-1 mb-4" role="img" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function TestimonialSection() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Duplicamos os itens para dar mais volume ao carrossel
  const items = [...TEXTS.TESTIMONIALS.items, ...TEXTS.TESTIMONIALS.items];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-secondary/10 overflow-hidden snap-start">
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-12">

        {/* Cabeçalho */}
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-2 block">
            {TEXTS.TESTIMONIALS.tag}
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-2">
            {TEXTS.TESTIMONIALS.title}{" "}
            <em className="text-primary not-italic">{TEXTS.TESTIMONIALS.titleAccent}</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {TEXTS.TESTIMONIALS.subtitle}
          </motion.p>
        </motion.div>

        {/* Carrossel shadcn / Embla */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative px-2 lg:px-10"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {items.map((t, index) => (
                <CarouselItem
                  key={`${t.id}-${index}`}
                  className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full mx-auto w-full bg-white border border-border/30 rounded-2xl p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
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
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Botões de navegação — posicionados externamente ao carrossel */}
            <CarouselPrevious
              className="hidden sm:flex -left-2 sm:-left-4 lg:-left-12 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary bg-background w-8 h-8 sm:w-10 sm:h-10"
              aria-label="Depoimento anterior"
            />
            <CarouselNext
              className="hidden sm:flex -right-2 sm:-right-4 lg:-right-12 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary bg-background w-8 h-8 sm:w-10 sm:h-10"
              aria-label="Próximo depoimento"
            />
          </Carousel>

          {/* Paginação e Instrução Mobile */}
          <div className="flex items-center justify-between sm:justify-center mt-8 pl-4 pr-2 sm:px-0">
            {/* Indicadores de paginação */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir para o depoimento ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    current === i ? "bg-primary" : "bg-primary/25"
                  }`}
                />
              ))}
            </div>

            {/* Navegação mobile (setas no lugar do Deslize) */}
            <div className="flex gap-3 sm:hidden text-primary">
              <button
                onClick={() => api?.scrollPrev()}
                className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-all active:scale-95 bg-background"
                aria-label="Anterior"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-all active:scale-95 bg-background"
                aria-label="Próximo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
