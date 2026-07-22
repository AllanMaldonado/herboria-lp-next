"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { StarRating } from "./ui/Icons";

export function HeroImages() {
  const current = TEXTS.HERO.products[2];

  return (
    <div
      className="relative flex items-center lg:justify-end justify-center py-4 lg:py-0 w-full h-full min-h-[350px] lg:min-h-[480px] -mt-6 lg:mt-0"
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full flex items-center lg:justify-end justify-center h-full"
      >
        <div
          className="relative w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto flex flex-col items-center justify-center"
        >
          <motion.div variants={fadeUp} className="relative w-full aspect-square lg:aspect-[5/4]">
            <Image
              src={current.src.src}
              alt={current.alt}
              fill
              priority
              placeholder={current.src.blurDataURL ? "blur" : "empty"}
              blurDataURL={current.src.blurDataURL}
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </motion.div>

          {/* Label do produto flutuante, translúcido */}
          <motion.div
            variants={fadeUp}
            className="absolute bottom-1 left-2 lg:bottom-12 lg:-left-6 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2.5 lg:px-6 lg:py-4 shadow-xl border border-white/40"
          >
            <p className="font-sans text-[9px] lg:text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-0.5 lg:mb-1">
              {current.tag}
            </p>
            <p className="font-heading text-sm lg:text-base font-medium text-foreground">
              {current.label}
            </p>
          </motion.div>
        </div>

        {/* Badge fixo superior: Feedback minimalista */}
        <motion.div
          variants={fadeUp}
          className="absolute -top-3 right-0 lg:top-4 lg:-right-4 z-20 bg-white rounded-xl px-4 py-2.5 lg:px-5 lg:py-3 shadow-2xl border border-border/20 flex flex-col gap-0.5 lg:gap-1 max-w-[150px] lg:max-w-[200px]"
        >
          <StarRating
            iconClass="w-2.5 h-2.5 lg:w-3 lg:h-3"
            colorClass="text-yellow-500 fill-yellow-500"
            className="flex gap-0.5"
            aria-hidden="true"
          />
          <span className="font-sans text-[9px] lg:text-[11px] italic text-muted-foreground leading-tight">
            &quot;{TEXTS.HERO.heroBadge.quote}&quot;
          </span>
          <span className="font-heading text-[10px] lg:text-xs font-semibold text-foreground">
            — {TEXTS.HERO.heroBadge.author}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
