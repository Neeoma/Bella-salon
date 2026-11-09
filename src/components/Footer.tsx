"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/SocialIcons";
import { BrandLogo } from "@/components/BrandLogo";
import { SALON_INFO } from "@/data/salon";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error || "Unable to subscribe.");
        return;
      }
      setStatus("success");
      setFeedback(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  };

  return (
    <footer className="bg-midnight text-ivory border-t border-bronze/25">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        {/* Top editorial row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-champagne/15">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo variant="light" />
            <p className="font-serif text-xl sm:text-2xl text-champagne leading-relaxed max-w-md italic">
              &ldquo;Where architectural stillness meets quiet editorial beauty.&rdquo;
            </p>
            <p className="text-xs text-champagne/70 leading-relaxed max-w-md">
              Receive seasonal ritual previews, private bridal availability, and
              atelier invitations from Bella Salon Victoria Island, Lagos.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md pt-1">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address for Atelier List
              </label>
              <div className="flex border border-champagne/25 bg-espresso/60 focus-within:border-bronze transition-colors">
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent px-4 py-3.5 text-xs tracking-[0.12em] text-ivory placeholder:text-champagne/45 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 px-5 py-3.5 bg-bronze text-ivory text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-bronze-light hover:text-midnight transition-colors disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Join List"}
                </button>
              </div>
              {feedback && (
                <p
                  className={`mt-2.5 text-xs flex items-center gap-1.5 ${
                    status === "error" ? "text-red-300" : "text-bronze-light"
                  }`}
                >
                  {status === "success" && <Check className="w-3.5 h-3.5" />}
                  {feedback}
                </p>
              )}
            </form>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze font-semibold">
                The Atelier
              </h3>
              <ul className="space-y-2.5 text-xs text-champagne/80">
                <li>
                  <Link href="/" className="hover:text-ivory transition-colors">
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-ivory transition-colors">
                    About Us & Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-ivory transition-colors">
                    Services & Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-ivory transition-colors">
                    Transformation Lookbook
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-ivory transition-colors">
                    Meet the Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:text-ivory transition-colors">
                    Online Booking
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze font-semibold">
                Disciplines
              </h3>
              <ul className="space-y-2.5 text-xs text-champagne/80">
                <li>
                  <Link
                    href="/services?category=Hair"
                    className="hover:text-ivory transition-colors"
                  >
                    Hair Architecture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services?category=Nails"
                    className="hover:text-ivory transition-colors"
                  >
                    Nail Couture
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services?category=Skin"
                    className="hover:text-ivory transition-colors"
                  >
                    24K Gold & Clinical Skin
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services?category=Makeup"
                    className="hover:text-ivory transition-colors"
                  >
                    Bridal & Editorial Glam
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services?category=Spa"
                    className="hover:text-ivory transition-colors"
                  >
                    Sanctuary Spa Rituals
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.28em] text-bronze font-semibold">
                Concierge
              </h3>
              <ul className="space-y-3 text-xs text-champagne/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-bronze shrink-0 mt-0.5" />
                  <span>
                    {SALON_INFO.addressLine1}
                    <br />
                    {SALON_INFO.addressLine2}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-bronze shrink-0" />
                  <a
                    href={SALON_INFO.phoneHref}
                    className="hover:text-ivory transition-colors"
                  >
                    {SALON_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-bronze shrink-0" />
                  <a
                    href={`mailto:${SALON_INFO.email}`}
                    className="hover:text-ivory transition-colors break-all"
                  >
                    {SALON_INFO.email}
                  </a>
                </li>
              </ul>

              <div className="pt-2 space-y-1 text-[11px] text-champagne/65">
                {SALON_INFO.hours.slice(0, 3).map((h) => (
                  <p key={h.days}>
                    <span className="text-champagne/90">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-champagne/60">
          <p>
            © {new Date().getFullYear()} Bella Salon Lagos Atelier Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-ivory transition-colors uppercase tracking-[0.2em] text-[10px]"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-bronze" />
              Instagram
            </a>
            <a
              href={SALON_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ivory transition-colors uppercase tracking-[0.2em] text-[10px]"
            >
              TikTok
              <ArrowUpRight className="w-3 h-3 text-bronze" />
            </a>
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
                "Hello Bella Salon Concierge, I would like to inquire about booking an appointment."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ivory transition-colors uppercase tracking-[0.2em] text-[10px]"
            >
              WhatsApp
              <ArrowUpRight className="w-3 h-3 text-bronze" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
