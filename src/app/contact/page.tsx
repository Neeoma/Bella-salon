import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { SALON_INFO } from "@/data/salon";
import { SanctuaryMap } from "@/components/SanctuaryMap";
import { ContactFormSection } from "@/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact & Visit Our Victoria Island Sanctuary",
  description:
    "Visit Bella Salon at 14 Adeola Odeku Crescent, Victoria Island, Lagos. View opening hours, WhatsApp concierge booking, directions, and send inquiries.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Bella Salon Concierge, I would like to inquire about an appointment."
  )}`;

  return (
    <div className="pt-28 pb-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-14">
        <header className="max-w-3xl space-y-4">
          <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-dark font-semibold">
            Visit The Sanctuary
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-midnight leading-tight">
            Concierge & Directions
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed">
            Nestled in a quiet sun-lit penthouse loft along Adeola Odeku in
            Victoria Island, Lagos. Connect via WhatsApp concierge, reserve
            online, or visit us for a private consultation.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-midnight text-ivory p-7 sm:p-8 border border-bronze/35 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-bronze shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-light">
                      Address
                    </p>
                    <p className="font-serif text-xl mt-0.5">
                      {SALON_INFO.addressLine1}
                    </p>
                    <p className="text-xs text-champagne/80">
                      {SALON_INFO.addressLine2}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-bronze shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-light">
                      Telephone
                    </p>
                    <a
                      href={SALON_INFO.phoneHref}
                      className="font-serif text-xl hover:text-champagne transition-colors"
                    >
                      {SALON_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-bronze shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-light">
                      Concierge Email
                    </p>
                    <a
                      href={`mailto:${SALON_INFO.email}`}
                      className="text-sm text-ivory hover:text-champagne underline underline-offset-4"
                    >
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-bronze shrink-0 mt-1" />
                  <div className="w-full space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-bronze-light">
                      Opening Hours
                    </p>
                    {SALON_INFO.hours.map((h) => (
                      <div
                        key={h.days}
                        className="flex justify-between text-xs border-b border-champagne/10 pb-1"
                      >
                        <span className="text-champagne/75">{h.days}</span>
                        <span className="text-ivory font-medium">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp & Online Booking CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-bronze text-ivory text-[10px] uppercase tracking-[0.24em] font-medium hover:bg-ivory hover:text-midnight transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Concierge Booking
                </a>
                <Link
                  href="/booking"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-champagne/30 text-ivory text-[10px] uppercase tracking-[0.24em] hover:border-ivory transition-colors"
                >
                  Book Online Now
                </Link>
              </div>

              {/* Social Links */}
              <div className="pt-3 border-t border-champagne/15 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-champagne/80">
                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-ivory"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-bronze" />
                  {SALON_INFO.instagramHandle}
                </a>
                <a
                  href={SALON_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-ivory"
                >
                  TikTok {SALON_INFO.tiktokHandle}
                  <ArrowUpRight className="w-3 h-3 text-bronze" />
                </a>
              </div>
            </div>

            <SanctuaryMap />
          </div>

          {/* Right Column: Contact Form & Etiquette */}
          <div className="lg:col-span-7">
            <ContactFormSection />
          </div>
        </div>
      </div>
    </div>
  );
}
