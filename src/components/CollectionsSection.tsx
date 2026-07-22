"use client";

import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp, IN_VIEW_OPTIONS } from "@/lib/animations";
import { BackgroundEffect } from "./BackgroundEffect";
import { SectionHeader } from "./ui/SectionHeader";
import { TEXTS } from "@/lib/content";
import { WhatsAppIcon } from "./ui/Icons";
import { trackKitBuy, trackKitModalOpen } from "@/lib/tracking";

/** Converte preco no formato "R$ 89,90" para "89.90" para uso em eventos de tracking. */
function parsePrice(price: string): string {
  return price.replace('R$ ', '').replace(',', '.');
}

export function CollectionsSection() {
  const [selected, setSelected] = useState<(typeof TEXTS.KITS.items)[number] | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  useEffect(() => {
    if (selected) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selected]);

  return (
    <>
      <section id="colecoes" ref={ref} className="relative z-10 overflow-visible py-20 lg:py-32 bg-background snap-start">
        <BackgroundEffect
          side="left"
          id="collections-blob"
          className="w-[150vw] h-[150vw] md:w-[60vw] md:h-[60vw] max-w-[850px] max-h-[850px] -left-[80%] md:-left-[15%] top-[15%] md:top-[60%] -translate-y-1/2"
          colorStart="#F0E4C8"
          colorEnd="#EDD5AC"
          opacity={0.45}
        />
        
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-center max-w-xl mx-auto mb-14"
          >
            <SectionHeader
              tag={TEXTS.KITS.tag}
              title={TEXTS.KITS.title}
              subtitle={TEXTS.KITS.subtitle}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {TEXTS.KITS.items.map((kit) => (
              <motion.article
                key={kit.id}
                variants={fadeUp}
                className="group relative flex flex-col mx-auto w-full max-w-md lg:max-w-none bg-background rounded-2xl overflow-hidden border border-border/40 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full"
                onClick={() => {
                  trackKitModalOpen({ kitName: kit.name, value: parsePrice(kit.price) });
                  setSelected(kit);
                }}
              >
                <div
                  className="relative aspect-video lg:aspect-[4/3] w-full overflow-hidden bg-secondary/20 cursor-pointer text-left"
                >
                  <Image
                    src={kit.img.src}
                    alt={kit.name}
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={kit.img.blurDataURL}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {'tag' in kit && kit.tag && (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 text-[10px] font-semibold tracking-widest uppercase">
                      {kit.tag}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{kit.name}</h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed flex-grow mb-5">{kit.desc}</p>

                  <div className="flex pt-4 border-t border-border/40 mt-auto">
                    <div className="flex flex-col xl:flex-row gap-3 w-full">
                      <a
                        id={`kit-whatsapp-${kit.id}`}
                        href={kit.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackKitBuy({ kitName: kit.name, value: parsePrice(kit.price) });
                        }}
                        className="w-full xl:flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans text-[10px] lg:text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-3 rounded-full transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 text-center whitespace-nowrap"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" />
                        <span>{TEXTS.KITS.labels.primaryCta}</span>
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          trackKitModalOpen({ kitName: kit.name, value: parsePrice(kit.price) });
                          setSelected(kit);
                        }}
                        className="group/btn w-full xl:flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary/60 text-foreground font-sans text-[10px] lg:text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-3 rounded-full transition-all duration-200 hover:bg-secondary hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 cursor-pointer text-center whitespace-nowrap"
                      >
                        {TEXTS.KITS.labels.secondaryCta} <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={selected.name}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/80"
              style={{ willChange: "opacity" }}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setSelected(null);
              }}
              style={{ willChange: "transform, opacity" }}
              className="relative w-full max-w-4xl sm:h-[500px] 2xl:h-[600px] bg-background sm:rounded-2xl rounded-t-[2rem] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col sm:flex-row z-10"
            >
              {/* Drag Handle (Mobile only) */}
              <div className="absolute top-0 left-0 w-full h-12 flex justify-center items-start pt-3 sm:hidden z-30 bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
                <div className="w-12 h-1.5 bg-white/70 rounded-full" />
              </div>

              <button onClick={() => setSelected(null)} aria-label="Fechar"
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-white shadow-lg text-black rounded-full flex items-center justify-center transition-transform hover:scale-105 text-sm cursor-pointer">✕</button>

              <div className="w-full sm:w-1/2 h-64 sm:h-auto relative shrink-0 bg-secondary/10 overflow-hidden">
                <Image src={selected.img.src} alt={selected.name} fill placeholder="blur" blurDataURL={selected.img.blurDataURL} className="object-cover sm:object-cover drop-shadow-2xl scale-[1.1] sm:scale-100" sizes="50vw" priority />
              </div>

              <div className="w-full sm:w-1/2 p-7 sm:p-8 2xl:p-12 flex flex-col pb-8 sm:pb-8 2xl:pb-12 justify-center">
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-2 sm:mb-2 2xl:mb-3">{TEXTS.KITS.tag}</span>
                <h2 className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-medium text-foreground mb-3 sm:mb-3 2xl:mb-5">{selected.name}</h2>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5 sm:mb-4 2xl:mb-8">{selected.desc}</p>

                <h4 className="font-sans text-[10px] sm:text-xs font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-2 2xl:mb-4">{TEXTS.KITS.labels.benefits}</h4>
                <ul className="space-y-2 sm:space-y-1.5 2xl:space-y-3 mb-6 sm:mb-4 2xl:mb-8">
                  {selected.benefits.map((b, i) => (
                    <li key={i} className="flex items-center text-xs sm:text-[13px] 2xl:text-sm text-muted-foreground font-sans gap-2 sm:gap-3">
                      <span className="text-primary text-xs sm:text-sm">✦</span>{b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 sm:pt-4 2xl:pt-8 border-t border-border/40 flex flex-col gap-4 sm:gap-2 2xl:gap-4">
                  <div>
                    <p className="font-sans text-[10px] sm:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-widest mb-1 sm:mb-1 2xl:mb-2">{TEXTS.KITS.labels.price}</p>
                    <p className="font-heading text-2xl sm:text-3xl 2xl:text-4xl font-medium text-foreground">{selected.price}</p>
                  </div>
                  <a href={selected.whatsapp} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackKitBuy({ kitName: selected.name, value: parsePrice(selected.price) })}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase px-6 py-3.5 sm:py-4 2xl:py-5 rounded-full transition-all duration-200 hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 w-full mt-2 sm:mt-1 2xl:mt-2">
                    <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {TEXTS.KITS.labels.primaryCta}
                  </a>
                  <p className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest text-primary/60 font-semibold mt-2 sm:mt-1 2xl:mt-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Compra 100% Segura
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
