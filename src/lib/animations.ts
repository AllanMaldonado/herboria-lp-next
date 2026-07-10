/**
 * animations.ts — Variantes de animação reutilizáveis para toda a aplicação.
 * Todas as animações usam apenas opacity e transform (GPU composited).
 * Durações curtas (<0.45s) garantem percepção de rapidez.
 */
import type { Variants } from "framer-motion";

/** Stagger container — aplica delay progressivo nos filhos */
export const staggerContainer = (stagger = 0.08): Variants => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: stagger } },
});

/** Entrada suave de baixo para cima — item padrão */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 360, damping: 30 } },
};

/** Entrada com delay customizável (para uso com custom prop) */
export const fadeUpDelayed = (delay = 0): Variants => ({
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
});

/** Entrada vindo da direita */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: { type: "spring", stiffness: 320, damping: 28 } },
};

/** Entrada vindo da esquerda */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0, transition: { type: "spring", stiffness: 320, damping: 28 } },
};

/** Escala suave — para cards e badges */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 32 } },
};

/** Troca de produto (hero) */
export const productSwap: Variants = {
  initial: { opacity: 0, scale: 0.97, y: 10 },
  animate: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, scale: 0.97, y: -10, transition: { duration: 0.28, ease: "easeIn" } },
};

/** Accordian (FAQ) — altura auto */
export const accordionContent: Variants = {
  hidden:  { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
};

/** Stacked card testimonial */
export const cardFlip: Variants = {
  initial: { opacity: 0, y: 14, rotate: -1 },
  animate: { opacity: 1, y: 0,  rotate: 0,  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -10, rotate: 1, transition: { duration: 0.22, ease: "easeIn" } },
};

/** Configuração useInView padrão */
export const IN_VIEW_OPTIONS = { once: true, margin: "-200px" } as const;
