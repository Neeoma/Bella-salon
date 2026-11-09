"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MessageCircle, Sparkles, X } from "lucide-react";
import { SALON_INFO } from "@/data/salon";

export function FloatingConcierge() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Avoid visual clutter on the booking wizard itself
  if (pathname === "/booking") return null;

  const whatsappHref = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Bella Salon Concierge, I would love to schedule a treatment."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-72 bg-midnight text-ivory border border-bronze/40 shadow-2xl p-5 space-y-4"
          >
            <div className="flex items-start justify-between border-b border-champagne/15 pb-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-bronze">
                  Private Concierge
                </p>
                <p className="font-serif text-lg text-ivory mt-0.5">
                  How may we assist you?
                </p>
              </div>
              <button
                type="button"
                aria-label="Close concierge menu"
                onClick={() => setOpen(false)}
                className="text-champagne/70 hover:text-ivory p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between w-full px-4 py-3 bg-bronze text-ivory text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-bronze-light hover:text-midnight transition-colors"
              >
                <span>Reserve Online</span>
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 border border-champagne/25 text-champagne text-[11px] uppercase tracking-[0.2em] hover:border-bronze hover:text-ivory transition-colors"
              >
                <span>WhatsApp Concierge</span>
                <MessageCircle className="w-4 h-4 text-bronze" strokeWidth={1.5} />
              </a>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center pt-1 text-[10px] uppercase tracking-[0.22em] text-champagne/70 hover:text-ivory transition-colors"
              >
                Bridal & Group Inquiries →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle Bella Salon Concierge"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-midnight/95 text-ivory border border-bronze/50 shadow-[0_12px_32px_rgba(23,21,19,0.28)] hover:bg-bronze hover:border-bronze transition-all duration-300 backdrop-blur-md"
      >
        <Sparkles className="w-4 h-4 text-champagne" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-[0.24em] font-medium hidden sm:inline">
          Concierge
        </span>
      </button>
    </div>
  );
}
