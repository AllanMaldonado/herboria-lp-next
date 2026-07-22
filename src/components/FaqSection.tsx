"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { staggerContainer, fadeUp, accordionContent, IN_VIEW_OPTIONS } from "@/lib/animations";
import { TEXTS } from "@/lib/content";
import { trackFaqExpand } from "@/lib/tracking";

function FaqItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/50 py-5">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:rounded group cursor-pointer"
      >
        <span className="font-heading text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {question}
        </span>
        <span
          className="w-7 h-7 shrink-0 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all duration-200"
          aria-hidden="true"
          style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.22s ease" }}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={accordionContent}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <p className="pt-4 font-sans text-sm text-muted-foreground leading-[1.8] pr-10">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, IN_VIEW_OPTIONS);

  // Close when scrolling out of view
  useEffect(() => {
    if (!inView) {
      setOpenIndex(null);
    }
  }, [inView]);

  // Close when clicking outside the accordion list
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (openIndex !== null && listRef.current && !listRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }
    
    if (openIndex !== null) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [openIndex]);

  return (
    <section id="faq" ref={ref} className="py-20 lg:py-32 bg-secondary/20 snap-start">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-14"
        >
          <SectionHeader
            tag={TEXTS.FAQ.tag}
            title={TEXTS.FAQ.title}
            subtitle={TEXTS.FAQ.subtitle}
          />
        </motion.div>

        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {TEXTS.FAQ.items.map((item, i) => (
            <FaqItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => {
                const isOpening = openIndex !== i;
                setOpenIndex(openIndex === i ? null : i);
                // Only track when expanding, not collapsing
                if (isOpening) trackFaqExpand({ question: item.question });
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
