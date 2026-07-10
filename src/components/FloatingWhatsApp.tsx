"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./ui/Icons";
import { TEXTS } from "@/lib/content";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={TEXTS.SITE.whatsappGeneral}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      aria-label="Fale conosco pelo WhatsApp"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </motion.a>
  );
}
