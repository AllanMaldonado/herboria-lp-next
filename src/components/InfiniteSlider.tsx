"use client";

import { motion } from "framer-motion";

export function InfiniteSlider() {
  const words = [
    "Cold Process", "Óleos Essenciais", "Feito à Mão", "Vegano", 
    "Cruelty-Free", "Aromaterapia", "Biodegradável", "Sem Sintéticos"
  ];
  
  // Duplicando a array para criar um loop infinito e sem cortes visuais
  const duplicatedWords = [...words, ...words, ...words];

  return (
    <div className="w-full bg-primary/10 py-6 overflow-hidden border-y border-primary/20 flex relative">
      {/* Sombras laterais para dar profundidade ao slider */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap items-center gap-12"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      >
        {duplicatedWords.map((word, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="text-foreground/80 font-heading text-3xl italic tracking-wider">
              {word}
            </span>
            <span className="text-primary/40 text-lg">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
