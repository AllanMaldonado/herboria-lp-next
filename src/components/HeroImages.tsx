"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { StarIcon } from "./ui/Icons";

export function HeroImages() {
  const current = TEXTS.HERO.products[2];

  return (
    <div
      className="relative hidden lg:flex items-center lg:justify-end justify-center py-8 lg:py-0 w-full h-full min-h-[480px]"
    >
      <div className="relative z-10 w-full flex items-center lg:justify-end justify-center h-full">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto flex flex-col items-center justify-center"
        >
          <div className="relative w-full aspect-[4/3] lg:aspect-[5/4]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 90vw, 500px"
            />
          </div>

          {/* Label do produto flutuante, translúcido */}
          <motion.div
            className="absolute bottom-4 left-4 lg:bottom-12 lg:-left-6 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/40"
          >
            <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1">
              {current.tag}
            </p>
            <p className="font-heading text-base font-medium text-foreground">
              {current.label}
            </p>
          </motion.div>
        </motion.div>

        {/* Badge fixo superior: Feedback minimalista */}
        <motion.div
          className="absolute -top-4 right-4 lg:top-4 lg:-right-4 z-20 bg-white rounded-xl px-5 py-3 shadow-2xl border border-border/20 flex flex-col gap-1 max-w-[200px]"
        >
          <div className="flex gap-0.5" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="font-sans text-[10px] sm:text-[11px] italic text-muted-foreground leading-tight">
            "Minha pele mudou na 1ª semana."
          </span>
          <span className="font-heading text-xs font-semibold text-foreground">
            — Camila D.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
