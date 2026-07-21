"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";

/**
 * ProductGallerySlider — carrossel horizontal da linha de produtos.
 * Utiliza shadcn/Embla Carousel (sem Swiper).
 *
 * Status: componente disponível mas não incluído no page.tsx.
 * Pode ser ativado inserindo <ProductGallerySlider /> entre as seções.
 */
export function ProductGallerySlider() {
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-background relative">
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-12 mb-12">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
        </div>
      </div>

      {/* Carrossel com overflow lateral intencional */}
      <div className="w-full pl-6 lg:pl-12">
        <Carousel
          opts={{
            align: "start",
            loop: TEXTS.GALLERY.items.length > 4,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 lg:-ml-4">
            {TEXTS.GALLERY.items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-3 lg:pl-4 basis-[85%] sm:basis-[45%] lg:basis-[32%] xl:basis-[25%]"
              >
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer">
                  <Image
                    src={item.img.src}
                    alt={`${item.title} — ${item.subtitle} | Herboria`}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={item.img.blurDataURL}
                    className="object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-5 left-5 right-5 translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/65 text-[10px] font-medium tracking-widest uppercase mb-1 font-sans">{item.subtitle}</p>
                    <h3 className="text-white font-heading text-xl mb-1">{item.title}</h3>
                    <p className="text-white/80 text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            id="gallery-prev"
            className="hidden lg:flex left-4 border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-background"
            aria-label="Slide anterior"
          />
          <CarouselNext
            id="gallery-next"
            className="hidden lg:flex right-16 border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-background"
            aria-label="Próximo slide"
          />
        </Carousel>
      </div>
    </section>
  );
}
