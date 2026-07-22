 "use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./ui/Icons";
import { TEXTS } from "@/lib/content";
import { trackFloatingWhatsApp } from "@/lib/tracking";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={TEXTS.SITE.whatsappGeneral}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackFloatingWhatsApp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl shadow-black/20 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </motion.a>
  );
}
